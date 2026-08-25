import { parseStoredPresence, type PresenceRecord } from "@/lib/presence";

const PRESENCE_KEY = "portfolio:presence:v1";

type RedisResponse = {
  result?: unknown;
  error?: string;
};

export class PresenceStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PresenceStorageError";
  }
}

const getRedisConfig = () => {
  const rawUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!rawUrl || !token) {
    const missing = [
      !rawUrl && "UPSTASH_REDIS_REST_URL",
      !token && "UPSTASH_REDIS_REST_TOKEN",
    ].filter(Boolean).join(", ");
    throw new PresenceStorageError(`Missing server environment variable(s): ${missing}.`);
  }

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    throw new PresenceStorageError("UPSTASH_REDIS_REST_URL is not a valid URL.");
  }

  if (!/^https?:$/.test(url.protocol) || url.username || url.password) {
    throw new PresenceStorageError("UPSTASH_REDIS_REST_URL must be an HTTP(S) URL without credentials.");
  }

  url.search = "";
  url.hash = "";
  return { url: url.toString().replace(/\/$/, ""), token };
};

const runRedisCommand = async (command: Array<string | number>): Promise<RedisResponse> => {
  const config = getRedisConfig();
  let response: Response;
  try {
    response = await fetch(config.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
      cache: "no-store",
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "unknown network error";
    throw new PresenceStorageError(`Redis ${command[0]} network failure: ${reason}`);
  }

  let body: RedisResponse;
  try {
    body = (await response.json()) as RedisResponse;
  } catch {
    throw new PresenceStorageError(
      `Redis ${command[0]} returned non-JSON HTTP ${response.status}.`,
    );
  }

  if (!response.ok || typeof body.error === "string") {
    const detail = typeof body.error === "string" ? body.error.slice(0, 200) : "request failed";
    throw new PresenceStorageError(
      `Redis ${command[0]} returned HTTP ${response.status}: ${detail}`,
    );
  }

  return body;
};

export const readStoredPresence = async (): Promise<PresenceRecord | null> => {
  const response = await runRedisCommand(["GET", PRESENCE_KEY]);
  if (response.result === null || response.result === undefined) return null;
  if (typeof response.result !== "string") {
    throw new PresenceStorageError("Redis GET returned an unexpected result type.");
  }

  try {
    const parsed = parseStoredPresence(JSON.parse(response.result));
    if (!parsed) throw new PresenceStorageError("Stored presence failed validation.");
    return parsed;
  } catch {
    throw new PresenceStorageError("Stored presence is not valid presence JSON.");
  }
};

export const writeStoredPresence = async (presence: PresenceRecord): Promise<void> => {
  const response = await runRedisCommand([
    "SET",
    PRESENCE_KEY,
    JSON.stringify(presence),
    "EX",
    86400,
  ]);
  if (response.result !== "OK") {
    throw new PresenceStorageError("Redis SET did not return OK.");
  }
};
