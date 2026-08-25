import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import {
  applyPresenceStaleness,
  offlinePresence,
  parsePresenceWrite,
} from "@/lib/presence";
import { readStoredPresence, writeStoredPresence } from "@/lib/presence-storage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStoreHeaders = {
  "Cache-Control": "no-store, max-age=0",
};

const logDevelopmentError = (operation: "GET" | "POST", error: unknown) => {
  if (process.env.NODE_ENV === "production") return;
  const message = error instanceof Error ? error.message : "Unknown presence error.";
  console.error(`[presence:${operation}] ${message}`);
};

const getWriteSecretState = (request: Request) => {
  const expected = process.env.PRESENCE_WRITE_SECRET?.trim();
  const authorization = request.headers.get("authorization");
  const provided = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : "";

  if (!expected) return "unconfigured" as const;
  if (!provided) return "invalid" as const;

  const expectedBytes = Buffer.from(expected);
  const providedBytes = Buffer.from(provided);
  return (
    expectedBytes.length === providedBytes.length &&
    timingSafeEqual(expectedBytes, providedBytes)
  ) ? "valid" as const : "invalid" as const;
};

export async function GET() {
  try {
    const stored = await readStoredPresence();
    const presence = stored ? applyPresenceStaleness(stored) : offlinePresence();
    return NextResponse.json(presence, { headers: noStoreHeaders });
  } catch (error) {
    logDevelopmentError("GET", error);
    return NextResponse.json(
      { error: "Presence is temporarily unavailable." },
      { status: 503, headers: noStoreHeaders },
    );
  }
}

export async function POST(request: Request) {
  const writeSecretState = getWriteSecretState(request);
  if (writeSecretState === "unconfigured") {
    logDevelopmentError("POST", new Error("PRESENCE_WRITE_SECRET is missing."));
    return NextResponse.json(
      { error: "Presence writes are not configured." },
      { status: 503, headers: noStoreHeaders },
    );
  }

  if (writeSecretState === "invalid") {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[presence:POST] Rejected request with an invalid write secret.");
    }
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401, headers: noStoreHeaders },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch (error) {
    logDevelopmentError("POST", error);
    return NextResponse.json(
      { error: "Invalid JSON." },
      { status: 400, headers: noStoreHeaders },
    );
  }

  const presence = parsePresenceWrite(body);
  if (!presence) {
    return NextResponse.json(
      { error: "Invalid presence payload." },
      { status: 400, headers: noStoreHeaders },
    );
  }

  try {
    await writeStoredPresence(presence);
    return NextResponse.json({ success: true, presence }, { headers: noStoreHeaders });
  } catch (error) {
    logDevelopmentError("POST", error);
    return NextResponse.json(
      { error: "Presence storage is temporarily unavailable." },
      { status: 503, headers: noStoreHeaders },
    );
  }
}
