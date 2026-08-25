[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
$serverEnvPath = Join-Path $repoRoot '.env.local'
$clientEnvPath = Join-Path $repoRoot 'presence-client\.env'

function Read-EnvValues {
    param([string]$Path)

    $values = [ordered]@{}
    if (-not (Test-Path -LiteralPath $Path)) {
        return $values
    }

    foreach ($rawLine in Get-Content -LiteralPath $Path) {
        $line = $rawLine.Trim()
        if (-not $line -or $line.StartsWith('#') -or -not $line.Contains('=')) {
            continue
        }

        $parts = $line.Split('=', 2)
        $key = $parts[0].Trim()
        $value = $parts[1].Trim().Trim('"').Trim("'")
        if ($key) {
            $values[$key] = $value
        }
    }

    return $values
}

function Read-HiddenValue {
    param([string]$Prompt)

    $secureValue = Read-Host $Prompt -AsSecureString
    $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureValue)
    try {
        return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
    }
    finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
    }
}

function Write-Utf8Lines {
    param(
        [string]$Path,
        [string[]]$Lines
    )

    [IO.File]::WriteAllLines($Path, $Lines, [Text.UTF8Encoding]::new($false))
}

$serverValues = Read-EnvValues -Path $serverEnvPath
$clientValues = Read-EnvValues -Path $clientEnvPath

$presenceSecret = [string]$clientValues['PRESENCE_WRITE_SECRET']
if (-not $presenceSecret) {
    $presenceSecret = Read-HiddenValue 'Paste a new PRESENCE_WRITE_SECRET'
}
if (-not $presenceSecret) {
    throw 'PRESENCE_WRITE_SECRET cannot be empty.'
}

$upstashUrl = [string]$serverValues['UPSTASH_REDIS_REST_URL']
if (-not $upstashUrl) {
    $upstashUrl = (Read-Host 'Paste UPSTASH_REDIS_REST_URL').Trim()
}

$parsedUrl = $null
if (-not [Uri]::TryCreate($upstashUrl, [UriKind]::Absolute, [ref]$parsedUrl) -or
    $parsedUrl.Scheme -ne 'https' -or
    -not $parsedUrl.Host) {
    throw 'UPSTASH_REDIS_REST_URL must be a complete HTTPS URL.'
}
$upstashUrl = $upstashUrl.TrimEnd('/')

$upstashToken = [string]$serverValues['UPSTASH_REDIS_REST_TOKEN']
if (-not $upstashToken) {
    $upstashToken = Read-HiddenValue 'Paste UPSTASH_REDIS_REST_TOKEN'
}
if (-not $upstashToken) {
    throw 'UPSTASH_REDIS_REST_TOKEN cannot be empty.'
}

$serverValues['UPSTASH_REDIS_REST_URL'] = $upstashUrl
$serverValues['UPSTASH_REDIS_REST_TOKEN'] = $upstashToken
$serverValues['PRESENCE_WRITE_SECRET'] = $presenceSecret

$serverLines = [Collections.Generic.List[string]]::new()
foreach ($key in @('UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'PRESENCE_WRITE_SECRET')) {
    $serverLines.Add("$key=$($serverValues[$key])")
}
foreach ($entry in $serverValues.GetEnumerator()) {
    if ($entry.Key -notin @('UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'PRESENCE_WRITE_SECRET')) {
        $serverLines.Add("$($entry.Key)=$($entry.Value)")
    }
}

$clientValues['PRESENCE_API_URL'] = 'http://127.0.0.1:3000/api/presence'
$clientValues['PRESENCE_WRITE_SECRET'] = $presenceSecret
if (-not $clientValues['PRESENCE_POLL_SECONDS']) {
    $clientValues['PRESENCE_POLL_SECONDS'] = '20'
}

$clientLines = [Collections.Generic.List[string]]::new()
foreach ($key in @('PRESENCE_API_URL', 'PRESENCE_WRITE_SECRET', 'PRESENCE_POLL_SECONDS')) {
    $clientLines.Add("$key=$($clientValues[$key])")
}
$clientLines.Add('')
$clientLines.Add('# Optional Spotify account playback integration')
foreach ($key in @('SPOTIFY_CLIENT_ID', 'SPOTIFY_CLIENT_SECRET', 'SPOTIFY_REFRESH_TOKEN', 'SPOTIFY_REDIRECT_URI')) {
    $value = [string]$clientValues[$key]
    if ($key -eq 'SPOTIFY_REDIRECT_URI' -and -not $value) {
        $value = 'http://127.0.0.1:8765/callback'
    }
    $clientLines.Add("$key=$value")
}

Write-Utf8Lines -Path $serverEnvPath -Lines $serverLines
Write-Utf8Lines -Path $clientEnvPath -Lines $clientLines

Write-Output 'Presence environment configured successfully.'
Write-Output '.env.local: Upstash URL/token and write secret are present.'
Write-Output 'presence-client/.env: local API URL and matching write secret are present.'
Write-Output 'No secret values were printed. Restart the Next.js dev server before testing.'
