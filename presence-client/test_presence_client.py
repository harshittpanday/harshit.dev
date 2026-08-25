import unittest
from datetime import datetime, timedelta, timezone

from presence_client import StartedAtTracker, build_presence_payload, load_env_file, validate_api_url
import os
import tempfile
from pathlib import Path


NOW = datetime(2026, 8, 25, 12, 0, tzinfo=timezone.utc)


class PresencePayloadTests(unittest.TestCase):
    def setUp(self) -> None:
        self.tracker = StartedAtTracker()

    def test_no_activity_is_offline(self) -> None:
        payload = build_presence_payload(set(), None, self.tracker, NOW)
        self.assertEqual(payload["status"], "offline")

    def test_antigravity_is_coding(self) -> None:
        payload = build_presence_payload({"Antigravity IDE"}, None, self.tracker, NOW)
        self.assertEqual(payload["primary"]["activityType"], "coding")

    def test_minecraft_is_playing(self) -> None:
        payload = build_presence_payload({"Minecraft"}, None, self.tracker, NOW)
        self.assertEqual(payload["primary"]["activityType"], "playing")

    def test_spotify_can_be_the_only_activity(self) -> None:
        spotify = {
            "activityType": "listening",
            "app": "Spotify",
            "title": "Gulaabo",
            "artist": "Arpit Bala",
            "startedAt": None,
        }
        payload = build_presence_payload(set(), spotify, self.tracker, NOW)
        self.assertEqual(payload["status"], "online")
        self.assertEqual(payload["spotify"]["title"], "Gulaabo")

    def test_primary_and_spotify_are_combined(self) -> None:
        spotify = {
            "activityType": "listening",
            "app": "Spotify",
            "title": "Track",
            "artist": "Artist",
            "startedAt": None,
        }
        payload = build_presence_payload({"Antigravity IDE"}, spotify, self.tracker, NOW)
        self.assertEqual(payload["primary"]["app"], "Antigravity IDE")
        self.assertEqual(payload["spotify"]["app"], "Spotify")

    def test_started_at_survives_later_updates(self) -> None:
        first = build_presence_payload({"Antigravity IDE"}, None, self.tracker, NOW)
        later = build_presence_payload(
            {"Antigravity IDE"}, None, self.tracker, NOW + timedelta(minutes=2)
        )
        self.assertEqual(first["primary"]["startedAt"], later["primary"]["startedAt"])

    def test_local_env_overrides_an_inherited_value(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / ".env"
            path.write_text("PRESENCE_API_URL=http://127.0.0.1:3000/api/presence\n")
            os.environ["PRESENCE_API_URL"] = "https://stale.example/api/presence"
            load_env_file(path)
            self.assertEqual(
                os.environ["PRESENCE_API_URL"],
                "http://127.0.0.1:3000/api/presence",
            )

    def test_placeholder_api_url_is_rejected(self) -> None:
        with self.assertRaises(ValueError):
            validate_api_url("https://your-domain.example/api/presence")


if __name__ == "__main__":
    unittest.main()
