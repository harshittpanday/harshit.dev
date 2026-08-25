import assert from "node:assert/strict";
import test from "node:test";
import {
  PRESENCE_STALE_AFTER_MS,
  applyPresenceStaleness,
  parseStoredPresence,
  parsePresenceWrite,
} from "../src/lib/presence.ts";

const NOW = new Date("2026-08-25T12:00:00.000Z");

const primary = {
  activityType: "coding",
  app: "Antigravity IDE",
  title: null,
  artist: null,
  startedAt: "2026-08-25T11:00:00.000Z",
};

test("accepts an allowlisted primary activity and stamps server time", () => {
  const result = parsePresenceWrite(
    { status: "online", primary, spotify: null, updatedAt: "2000-01-01T00:00:00Z" },
    NOW,
  );
  assert.equal(result?.updatedAt, NOW.toISOString());
  assert.equal(result?.primary?.app, "Antigravity IDE");
});

test("accepts combined primary and Spotify activity", () => {
  const result = parsePresenceWrite(
    {
      status: "online",
      primary,
      spotify: {
        activityType: "listening",
        app: "Spotify",
        title: "Gulaabo",
        artist: "Arpit Bala",
        startedAt: null,
      },
      updatedAt: NOW.toISOString(),
    },
    NOW,
  );
  assert.equal(result?.primary?.app, "Antigravity IDE");
  assert.equal(result?.spotify?.title, "Gulaabo");
});

test("rejects unknown apps and private extra fields", () => {
  assert.equal(
    parsePresenceWrite(
      {
        status: "online",
        primary: { ...primary, app: "Unknown", windowTitle: "private" },
        spotify: null,
        updatedAt: NOW.toISOString(),
      },
      NOW,
    ),
    null,
  );
});

test("treats an update older than five minutes as offline", () => {
  const result = applyPresenceStaleness(
    {
      status: "online",
      primary,
      spotify: null,
      updatedAt: NOW.toISOString(),
    },
    NOW.getTime() + PRESENCE_STALE_AFTER_MS + 1,
  );
  assert.equal(result.status, "offline");
});

test("validates and preserves a stored update timestamp", () => {
  const stored = parseStoredPresence({
    status: "online",
    primary,
    spotify: null,
    updatedAt: NOW.toISOString(),
  });
  assert.equal(stored?.updatedAt, NOW.toISOString());
});
