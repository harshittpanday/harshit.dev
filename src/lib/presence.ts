export const PRESENCE_STALE_AFTER_MS = 5 * 60 * 1000;

export type PrimaryPresenceActivity = {
  activityType: "coding" | "playing";
  app: "Antigravity IDE" | "Minecraft";
  title: null;
  artist: null;
  startedAt: string;
};

export type SpotifyPresenceActivity = {
  activityType: "listening";
  app: "Spotify";
  title: string;
  artist: string;
  startedAt: string | null;
};

export type PresenceRecord = {
  status: "online" | "offline";
  primary: PrimaryPresenceActivity | null;
  spotify: SpotifyPresenceActivity | null;
  updatedAt: string;
};

export const offlinePresence = (updatedAt = new Date(0).toISOString()): PresenceRecord => ({
  status: "offline",
  primary: null,
  spotify: null,
  updatedAt,
});

const hasOnlyKeys = (value: Record<string, unknown>, allowedKeys: string[]) =>
  Object.keys(value).every((key) => allowedKeys.includes(key));

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isTimestamp = (value: unknown): value is string =>
  typeof value === "string" && Number.isFinite(Date.parse(value));

const isShortText = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0 && value.length <= 200;

const parsePrimary = (value: unknown): PrimaryPresenceActivity | null | undefined => {
  if (value === null) return null;
  if (!isObject(value)) return undefined;
  if (!hasOnlyKeys(value, ["activityType", "app", "title", "artist", "startedAt"])) {
    return undefined;
  }

  const isAntigravity =
    value.activityType === "coding" && value.app === "Antigravity IDE";
  const isMinecraft = value.activityType === "playing" && value.app === "Minecraft";

  if (
    (!isAntigravity && !isMinecraft) ||
    value.title !== null ||
    value.artist !== null ||
    !isTimestamp(value.startedAt)
  ) {
    return undefined;
  }

  return {
    activityType: value.activityType,
    app: value.app,
    title: null,
    artist: null,
    startedAt: new Date(value.startedAt).toISOString(),
  } as PrimaryPresenceActivity;
};

const parseSpotify = (value: unknown): SpotifyPresenceActivity | null | undefined => {
  if (value === null) return null;
  if (!isObject(value)) return undefined;
  if (!hasOnlyKeys(value, ["activityType", "app", "title", "artist", "startedAt"])) {
    return undefined;
  }

  if (
    value.activityType !== "listening" ||
    value.app !== "Spotify" ||
    !isShortText(value.title) ||
    !isShortText(value.artist) ||
    (value.startedAt !== null && !isTimestamp(value.startedAt))
  ) {
    return undefined;
  }

  return {
    activityType: "listening",
    app: "Spotify",
    title: value.title.trim(),
    artist: value.artist.trim(),
    startedAt: value.startedAt === null ? null : new Date(value.startedAt).toISOString(),
  };
};

export const parsePresenceWrite = (
  value: unknown,
  receivedAt = new Date(),
): PresenceRecord | null => {
  if (!isObject(value)) return null;
  if (!hasOnlyKeys(value, ["status", "primary", "spotify", "updatedAt"])) return null;
  if (value.status !== "online" && value.status !== "offline") return null;

  const primary = parsePrimary(value.primary);
  const spotify = parseSpotify(value.spotify);
  if (primary === undefined || spotify === undefined) return null;

  if (value.status === "offline") {
    if (primary !== null || spotify !== null) return null;
    return offlinePresence(receivedAt.toISOString());
  }

  if (primary === null && spotify === null) return null;

  return {
    status: "online",
    primary,
    spotify,
    updatedAt: receivedAt.toISOString(),
  };
};

export const parseStoredPresence = (value: unknown): PresenceRecord | null => {
  if (!isObject(value) || !isTimestamp(value.updatedAt)) return null;
  return parsePresenceWrite(value, new Date(value.updatedAt));
};

export const applyPresenceStaleness = (
  presence: PresenceRecord,
  now = Date.now(),
): PresenceRecord => {
  const updatedAt = Date.parse(presence.updatedAt);
  if (
    presence.status !== "online" ||
    !Number.isFinite(updatedAt) ||
    now - updatedAt > PRESENCE_STALE_AFTER_MS
  ) {
    return offlinePresence(presence.updatedAt);
  }

  return presence;
};
