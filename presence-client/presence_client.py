"""Privacy-focused Windows presence publisher for harshit.dev."""

from __future__ import annotations

import base64
import argparse
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


POWERSHELL_DETECTION_SCRIPT = r"""
$antigravity = $false
$minecraft = $false

Get-Process -ErrorAction SilentlyContinue | ForEach-Object {
    $name = ([string]$_.ProcessName).ToLowerInvariant()

    if ($name -eq "antigravity" -or $name -eq "antigravity ide") {
        $antigravity = $true
    }

    if ($name -eq "minecraft" -or $name -eq "minecraft.windows") {
        $minecraft = $true
    }
}

Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | ForEach-Object {
    $name = ([string]$_.Name).ToLowerInvariant()
    if ($name -eq "java.exe" -or $name -eq "javaw.exe") {
        $commandLine = [string]$_.CommandLine
        if ($commandLine -match "(?i)(net\.minecraft|minecraft\.client|lwjgl)") {
            $minecraft = $true
        }
    }
}

[PSCustomObject]@{
    antigravity = $antigravity
    minecraft = $minecraft
} | ConvertTo-Json -Compress
"""


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def as_iso(value: datetime) -> str:
    return value.astimezone(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z")


def load_env_file(path: Path) -> None:
    """Load a simple local .env, which is authoritative for this client."""
    if not path.exists():
        return

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key:
            os.environ[key] = value


def validate_api_url(value: str) -> str:
    parsed = urllib.parse.urlsplit(value)
    if parsed.scheme not in {"http", "https"} or not parsed.hostname:
        raise ValueError("PRESENCE_API_URL must be a complete HTTP(S) URL.")
    if parsed.username or parsed.password:
        raise ValueError("PRESENCE_API_URL must not contain credentials.")
    if parsed.hostname == "your-domain.example":
        raise ValueError(
            "PRESENCE_API_URL still uses the placeholder host; use "
            "http://127.0.0.1:3000/api/presence for local development."
        )
    return urllib.parse.urlunsplit(parsed)


def detect_allowed_apps() -> set[str]:
    """Return only normalized allowlisted app names; no process details escape PowerShell."""
    if sys.platform != "win32":
        raise RuntimeError("The presence client only supports Windows.")

    result = subprocess.run(
        [
            "powershell.exe",
            "-NoProfile",
            "-NonInteractive",
            "-Command",
            POWERSHELL_DETECTION_SCRIPT,
        ],
        check=True,
        capture_output=True,
        text=True,
        timeout=15,
        creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0),
    )
    detected = json.loads(result.stdout.strip())

    apps: set[str] = set()
    if detected.get("antigravity") is True:
        apps.add("Antigravity IDE")
    if detected.get("minecraft") is True:
        apps.add("Minecraft")
    return apps


class StartedAtTracker:
    def __init__(self) -> None:
        self._started_at: dict[str, datetime] = {}

    def update(self, active_apps: set[str], now: datetime) -> None:
        self._started_at = {
            app: started_at
            for app, started_at in self._started_at.items()
            if app in active_apps
        }
        for app in active_apps:
            self._started_at.setdefault(app, now)

    def get(self, app: str) -> datetime:
        return self._started_at[app]


class SpotifyIntegration:
    def __init__(self, client_id: str, client_secret: str, refresh_token: str) -> None:
        self.client_id = client_id
        self.client_secret = client_secret
        self.refresh_token = refresh_token
        self._access_token: str | None = None
        self._expires_at = 0.0

    @classmethod
    def from_environment(cls) -> "SpotifyIntegration | None":
        values = (
            os.getenv("SPOTIFY_CLIENT_ID"),
            os.getenv("SPOTIFY_CLIENT_SECRET"),
            os.getenv("SPOTIFY_REFRESH_TOKEN"),
        )
        if not all(values):
            return None
        return cls(values[0] or "", values[1] or "", values[2] or "")

    def _refresh_access_token(self) -> str:
        credentials = base64.b64encode(
            f"{self.client_id}:{self.client_secret}".encode("utf-8")
        ).decode("ascii")
        request = urllib.request.Request(
            "https://accounts.spotify.com/api/token",
            data=urllib.parse.urlencode(
                {
                    "grant_type": "refresh_token",
                    "refresh_token": self.refresh_token,
                }
            ).encode("utf-8"),
            headers={
                "Authorization": f"Basic {credentials}",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method="POST",
        )
        with urllib.request.urlopen(request, timeout=15) as response:
            payload = json.load(response)

        self._access_token = payload["access_token"]
        self._expires_at = time.monotonic() + int(payload.get("expires_in", 3600)) - 60
        return self._access_token

    def _get_access_token(self) -> str:
        if not self._access_token or time.monotonic() >= self._expires_at:
            return self._refresh_access_token()
        return self._access_token

    def currently_playing(self) -> dict[str, Any] | None:
        request = urllib.request.Request(
            "https://api.spotify.com/v1/me/player/currently-playing",
            headers={"Authorization": f"Bearer {self._get_access_token()}"},
        )

        try:
            with urllib.request.urlopen(request, timeout=15) as response:
                if response.status == 204:
                    return None
                playback = json.load(response)
        except urllib.error.HTTPError as error:
            if error.code == 401:
                self._access_token = None
            response_body = error.read(500).decode("utf-8", errors="replace").strip()
            try:
                response_json = json.loads(response_body)
                spotify_error = response_json.get("error", {})
                if isinstance(spotify_error, dict):
                    detail = spotify_error.get("message", "request rejected")
                else:
                    detail = str(spotify_error)
            except (json.JSONDecodeError, AttributeError):
                detail = "request rejected"
            raise RuntimeError(
                f"Spotify currently-playing returned HTTP {error.code}: {detail}"
            ) from error

        item = playback.get("item")
        if not playback.get("is_playing") or not isinstance(item, dict):
            return None
        if item.get("type") != "track":
            return None

        title = item.get("name")
        artists = item.get("artists")
        artist_names = [artist.get("name") for artist in artists or [] if artist.get("name")]
        if not isinstance(title, str) or not title.strip() or not artist_names:
            return None

        timestamp = playback.get("timestamp")
        started_at = None
        if isinstance(timestamp, (int, float)):
            started_at = as_iso(datetime.fromtimestamp(timestamp / 1000, timezone.utc))

        return {
            "activityType": "listening",
            "app": "Spotify",
            "title": title[:200],
            "artist": ", ".join(artist_names)[:200],
            "startedAt": started_at,
        }


def build_presence_payload(
    active_apps: set[str],
    spotify: dict[str, Any] | None,
    tracker: StartedAtTracker,
    now: datetime,
) -> dict[str, Any]:
    tracker.update(active_apps, now)

    primary = None
    primary_app = "Minecraft" if "Minecraft" in active_apps else None
    if primary_app is None and "Antigravity IDE" in active_apps:
        primary_app = "Antigravity IDE"

    if primary_app:
        primary = {
            "activityType": "playing" if primary_app == "Minecraft" else "coding",
            "app": primary_app,
            "title": None,
            "artist": None,
            "startedAt": as_iso(tracker.get(primary_app)),
        }

    return {
        "status": "online" if primary or spotify else "offline",
        "primary": primary,
        "spotify": spotify,
        "updatedAt": as_iso(now),
    }


def publish_presence(api_url: str, write_secret: str, payload: dict[str, Any]) -> None:
    request = urllib.request.Request(
        api_url,
        data=json.dumps(payload, separators=(",", ":")).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {write_secret}",
            "Content-Type": "application/json",
            "User-Agent": "harshit-dev-presence/1.0",
        },
        method="POST",
    )
    opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
    try:
        with opener.open(request, timeout=15) as response:
            if response.status != 200:
                raise RuntimeError(f"Presence endpoint returned HTTP {response.status}.")
    except urllib.error.HTTPError as error:
        response_body = error.read(500).decode("utf-8", errors="replace").strip()
        try:
            response_json = json.loads(response_body)
            detail = response_json.get("error", "request rejected")
        except (json.JSONDecodeError, AttributeError):
            detail = "request rejected"
        raise RuntimeError(f"Presence endpoint returned HTTP {error.code}: {detail}") from error
    except urllib.error.URLError as error:
        host = urllib.parse.urlsplit(api_url).hostname or "configured host"
        raise RuntimeError(f"Could not connect to presence host {host}: {error.reason}") from error


def main() -> int:
    parser = argparse.ArgumentParser(description="Publish allowlisted Windows desktop presence.")
    parser.add_argument("--once", action="store_true", help="Publish once, then exit.")
    args = parser.parse_args()

    load_env_file(Path(__file__).with_name(".env"))

    raw_api_url = os.getenv("PRESENCE_API_URL", "").strip()
    write_secret = os.getenv("PRESENCE_WRITE_SECRET", "").strip()
    if not raw_api_url or not write_secret:
        print("PRESENCE_API_URL and PRESENCE_WRITE_SECRET are required.", file=sys.stderr)
        return 1

    try:
        api_url = validate_api_url(raw_api_url)
    except ValueError as error:
        print(f"Invalid client configuration: {error}", file=sys.stderr)
        return 1

    try:
        poll_seconds = max(10, min(300, int(os.getenv("PRESENCE_POLL_SECONDS", "20"))))
    except ValueError:
        print("PRESENCE_POLL_SECONDS must be an integer.", file=sys.stderr)
        return 1

    tracker = StartedAtTracker()
    spotify_client = SpotifyIntegration.from_environment()
    print(f"Presence endpoint: {api_url}", flush=True)
    print(
        "Presence client started. Spotify is "
        + ("enabled." if spotify_client else "disabled (app detection still works)."),
        flush=True,
    )

    try:
        while True:
            cycle_started = time.monotonic()
            update_succeeded = False
            try:
                active_apps = detect_allowed_apps()
                spotify = None
                if spotify_client:
                    try:
                        spotify = spotify_client.currently_playing()
                    except Exception as spotify_error:
                        print(f"Spotify update skipped: {spotify_error}", file=sys.stderr)
                payload = build_presence_payload(active_apps, spotify, tracker, utc_now())
                publish_presence(api_url, write_secret, payload)
                update_succeeded = True
                visible = [payload["primary"]["app"]] if payload["primary"] else []
                if payload["spotify"]:
                    visible.append("Spotify")
                print(f"Published: {', '.join(visible) if visible else 'Offline'}")
            except Exception as error:  # keep a temporary network/API failure from stopping the client
                print(f"Presence update failed: {error}", file=sys.stderr)

            if args.once:
                return 0 if update_succeeded else 1

            elapsed = time.monotonic() - cycle_started
            time.sleep(max(0, poll_seconds - elapsed))
    except KeyboardInterrupt:
        print("\nPresence client stopped; the website will become offline within five minutes.")
        return 0


if __name__ == "__main__":
    raise SystemExit(main())
