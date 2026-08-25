"""One-time Spotify authorization helper for the local presence client."""

from __future__ import annotations

import base64
import json
import os
import secrets
import urllib.parse
import urllib.request
import webbrowser
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

from presence_client import load_env_file


DEFAULT_REDIRECT_URI = "http://127.0.0.1:8765/callback"


class CallbackHandler(BaseHTTPRequestHandler):
    query: dict[str, list[str]] | None = None

    def do_GET(self) -> None:  # noqa: N802 - BaseHTTPRequestHandler API
        parsed = urllib.parse.urlparse(self.path)
        CallbackHandler.query = urllib.parse.parse_qs(parsed.query)
        body = b"Spotify authorization received. You can close this tab."
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format: str, *args: object) -> None:
        return


def main() -> int:
    load_env_file(Path(__file__).with_name(".env"))
    client_id = os.getenv("SPOTIFY_CLIENT_ID", "").strip()
    client_secret = os.getenv("SPOTIFY_CLIENT_SECRET", "").strip()
    redirect_uri = os.getenv("SPOTIFY_REDIRECT_URI", DEFAULT_REDIRECT_URI).strip()

    if not client_id or not client_secret:
        print("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET first.")
        return 1

    parsed_redirect = urllib.parse.urlparse(redirect_uri)
    if parsed_redirect.scheme != "http" or parsed_redirect.hostname != "127.0.0.1":
        print("SPOTIFY_REDIRECT_URI must use the 127.0.0.1 loopback address.")
        return 1

    state = secrets.token_urlsafe(24)
    authorize_url = "https://accounts.spotify.com/authorize?" + urllib.parse.urlencode(
        {
            "response_type": "code",
            "client_id": client_id,
            "scope": "user-read-currently-playing",
            "redirect_uri": redirect_uri,
            "state": state,
        }
    )

    server = HTTPServer(("127.0.0.1", parsed_redirect.port or 80), CallbackHandler)
    server.timeout = 180
    print("Opening Spotify authorization in your browser...")
    webbrowser.open(authorize_url)
    server.handle_request()
    server.server_close()

    query = CallbackHandler.query or {}
    if query.get("state", [""])[0] != state or not query.get("code"):
        print("Spotify authorization failed or timed out.")
        return 1

    credentials = base64.b64encode(f"{client_id}:{client_secret}".encode("utf-8")).decode("ascii")
    request = urllib.request.Request(
        "https://accounts.spotify.com/api/token",
        data=urllib.parse.urlencode(
            {
                "grant_type": "authorization_code",
                "code": query["code"][0],
                "redirect_uri": redirect_uri,
            }
        ).encode("utf-8"),
        headers={
            "Authorization": f"Basic {credentials}",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=15) as response:
        token = json.load(response)

    refresh_token = token.get("refresh_token")
    if not refresh_token:
        print("Spotify did not return a refresh token. Revoke access and try again.")
        return 1

    print("\nAdd this value to presence-client/.env:")
    print(f"SPOTIFY_REFRESH_TOKEN={refresh_token}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
