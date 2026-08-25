# Windows presence client

This standard-library-only Python script detects only Antigravity IDE and Minecraft, optionally reads current Spotify account playback, and publishes a sanitized presence payload. It never publishes process names, paths, filenames, window titles, server/world names, browser data, or terminal data.

## Website and storage setup

1. Create an Upstash Redis database.
2. Run the local configuration helper from the repository root. It reuses the client's existing write secret and privately prompts for the Upstash URL and token:

   ```powershell
   pwsh -File scripts\configure-presence.ps1
   ```

3. The helper writes these server-side variables to the ignored root `.env.local`:

   ```text
   UPSTASH_REDIS_REST_URL=https://...
   UPSTASH_REDIS_REST_TOKEN=...
   PRESENCE_WRITE_SECRET=<a long random value>
   ```

4. Restart the local Next.js server (or redeploy the hosted site) after adding the variables. Do not prefix any of them with `NEXT_PUBLIC_`.
5. For local development, `presence-client/.env` uses `PRESENCE_API_URL=http://127.0.0.1:3000/api/presence`. For production, replace it with the deployed `/api/presence` URL. `PRESENCE_WRITE_SECRET` must exactly match the value in the root `.env.local`; the helper keeps them synchronized.

## Run manually on Windows

From the repository root in PowerShell:

```powershell
Copy-Item presence-client\.env.example presence-client\.env
notepad presence-client\.env
py -3 presence-client\presence_client.py
```

To publish one update and exit while verifying the pipeline:

```powershell
py -3 presence-client\presence_client.py --once
```

If `py` is unavailable, install Python 3.11 or newer and run:

```powershell
python presence-client\presence_client.py
```

Stop with `Ctrl+C`. No explicit offline write is needed: the website treats the last online update as offline after five minutes.

## Optional Spotify setup

1. Create an app in the Spotify Developer Dashboard.
2. Add this exact redirect URI to the app: `http://127.0.0.1:8765/callback`.
3. Put the app's client ID and client secret in `presence-client/.env`.
4. Run the one-time authorization helper:

   ```powershell
   py -3 presence-client\spotify_auth.py
   ```

5. Approve the `user-read-currently-playing` scope and paste the printed `SPOTIFY_REFRESH_TOKEN` into `presence-client/.env`.
6. Run `presence_client.py` normally. If the refresh token later expires or is revoked, rerun `spotify_auth.py`.

Spotify is optional. When its three credential variables are absent, Antigravity IDE and Minecraft detection continue normally.
