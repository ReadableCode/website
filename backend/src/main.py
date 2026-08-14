# %%
# Imports #


import time
from pathlib import Path

import uvicorn
from fastapi import FastAPI
from fastapi.responses import PlainTextResponse

# %%
# Variables #

app = FastAPI(title="ReadableCode API", description="Backend for site.tinkernet.me")

# No CORS middleware: the site is served same-origin. The frontend's nginx
# reverse-proxies /api/ to this container on the internal docker network, so
# the browser only ever talks to one origin. The backend publishes no host
# ports and is not reachable from the internet directly.

app_start_time = time.time()

# Featured projects. Kept in sync with the profile README and the GitHub
# Pages mirror. The live React frontend renders its cards from /projects.
# An empty url means the repo is private; renderers skip the link.
PROJECTS = [
    {
        "id": "sync-plex",
        "name": "Sync_Plex",
        "url": "https://github.com/ReadableCode/Sync_Plex",
        "blurb": (
            "A household media system: search and add shows or movies across every "
            "Sonarr, Radarr, and Plex server on the network from a CLI, a Textual TUI, "
            "or a phone-friendly web app, with user accounts and an approval queue. A "
            "companion tool mirrors selected titles onto an external drive for travel."
        ),
        "tags": ["Python", "Textual", "NiceGUI"],
    },
    {
        "id": "herdstone",
        "name": "herdstone",
        "url": "https://github.com/ReadableCode/herdstone",
        "blurb": (
            "A machine-herd monitor. One Python engine with three thin UIs (Typer CLI, "
            "Textual TUI, NiceGUI web) that import it in-process, no internal REST layer. "
            "Concurrent ping fan-out, JSON-driven inventory, Ansible importer."
        ),
        "tags": ["Python", "Textual", "asyncio"],
    },
    {
        "id": "status-board",
        "name": "status_board",
        "url": "https://github.com/ReadableCode/status_board",
        "blurb": (
            "A terminal dashboard showing remote cron job status over SSH and pull "
            "requests awaiting my review across several accounts, in one pane. Panel "
            "definitions live in separate config repos, and SSH jump chains are part of "
            "the config so it behaves the same on every machine."
        ),
        "tags": ["Python", "Textual", "SSH"],
    },
    {
        "id": "readable-utils",
        "name": "readable_utils",
        "url": "https://github.com/ReadableCode/readable_utils",
        "blurb": (
            "A versioned Python utility package that replaced the helper directories I "
            "used to copy between repos. Installed from git by tag, with optional "
            "dependency extras so each consumer only installs what it needs. Used by "
            "herdstone, status_board, and others."
        ),
        "tags": ["Python", "packaging", "uv"],
    },
    {
        "id": "data-tool-pack",
        "name": "Data Tool Pack (Python / Go / Rust)",
        "url": "https://github.com/ReadableCode/Data_Tool_Pack_Py",
        "blurb": (
            "Uniform connectors for Snowflake, Databricks, S3, Vault, DuckDB, Google "
            "Workspace, and Looker, so analytics work doesn't start with a day of setup. "
            "Python, Go, and Rust editions."
        ),
        "tags": ["Python", "Go", "Rust", "data"],
    },
    {
        "id": "load-log",
        "name": "load-log",
        "url": "https://github.com/ReadableCode/load-log",
        "blurb": (
            "A health tracker with a Textual TUI and a Streamlit web UI over shared "
            "storage. Neither UI touches Postgres directly: both go through PostgREST "
            "with JWT auth and row-level security."
        ),
        "tags": ["PostgREST", "JWT", "RLS"],
    },
    {
        "id": "postgrest-auth",
        "name": "postgrest-auth",
        "url": "https://github.com/ReadableCode/postgrest-auth",
        "blurb": (
            "A small JWT auth service that sits next to PostgREST: POST /token checks a "
            "bcrypt hash and returns a JWT carrying the Postgres role and user id for RLS. "
            "Written once, used by my other apps."
        ),
        "tags": ["FastAPI", "JWT", "bcrypt"],
    },
    {
        "id": "book-bot",
        "name": "Book-Bot",
        "url": "https://github.com/ReadableCode/Book-Bot",
        "blurb": (
            "An offline eBook organizer. A local LLM (no internet or accounts required) "
            "works out author, series, order, and title from messy folders and rebuilds "
            "the library into clean nested folders. Can be pointed at hosted APIs instead."
        ),
        "tags": ["Python", "local-LLM", "SQLite"],
    },
    {
        "id": "dotfiles",
        "name": "dotfiles",
        "url": "https://github.com/ReadableCode/dotfiles",
        "blurb": (
            "Config sync and provisioning across Linux, Windows, macOS, Android, a "
            "router, and a NAS. Pulls configs over SSH/SCP, provisions with Ansible, and "
            "includes a Go git_puller cross-compiled for four OS/arch targets."
        ),
        "tags": ["Ansible", "Go", "Bash"],
    },
    {
        "id": "trojan-force",
        "name": "Trojan-Force",
        "url": "https://github.com/ReadableCode/Trojan-Force",
        "blurb": (
            "A browser tower-defense game (TypeScript, Phaser 3, Vite): mine resources, "
            "build supply chains, survive 20 waves. Custom pathfinding, resource manager, "
            "and event bus, plus LAN multi-device play."
        ),
        "tags": ["TypeScript", "Phaser 3"],
    },
    {
        "id": "terminal-todo",
        "name": "Terminal To-Do",
        "url": "https://github.com/ReadableCode/Terminal_To_Do",
        "blurb": (
            "A terminal Kanban board driven by Linux-like commands, with pluggable "
            "storage (self-hosted MinIO/S3 or Google Sheets)."
        ),
        "tags": ["Python", "TUI", "MinIO"],
    },
    {
        "id": "docker",
        "name": "Self-hosted platform",
        "url": "",
        "blurb": (
            "The infrastructure everything else runs on: multi-host Docker Compose behind "
            "a SWAG reverse proxy with TLS and dynamic DNS. elitedesk, the main server, "
            "runs Authelia, Vaultwarden, Postgres with PostgREST and pgAdmin, MinIO, "
            "Grafana, ntfy, Portainer, Plex, a private registry, and my own apps, each "
            "included from its own repo's compose file. behemoth, an Unraid NAS, holds "
            "the bulk storage. Pushing to master redeploys whatever changed. The repo "
            "stays private since it maps my internal network."
        ),
        "tags": ["Docker", "SWAG", "self-hosting"],
    },
]

MY_INFO = """\
ReadableCode - Jason Christiansen

About
-----
I'm Jason, ReadableCode on GitHub. I build automation and reusable tools
for problems I find interesting. Everything here is a personal project;
most of it runs on my homelab, wired together with Docker and redeployed
on push. Comments, forks, and PRs are welcome.

Projects
--------
"""


# %%
# Functions #


def read_cpu_temps():
    """Read temperature sensors from sysfs.

    Docker mounts the host's /sys read-only into containers, so hwmon exposes
    the real sensors of the machine serving this request. Falls back to
    thermal_zone entries, and returns [] where the kernel exposes no sensors
    (e.g. some VMs/CI).
    """
    temps = []
    for hwmon in sorted(Path("/sys/class/hwmon").glob("hwmon*")):
        try:
            chip = (hwmon / "name").read_text().strip()
        except OSError:
            continue
        for temp_input in sorted(hwmon.glob("temp*_input")):
            try:
                millideg = int(temp_input.read_text().strip())
            except (OSError, ValueError):
                continue
            try:
                label = (hwmon / temp_input.name.replace("_input", "_label")).read_text().strip()
            except OSError:
                label = temp_input.name.removesuffix("_input")
            temps.append({"chip": chip, "label": label, "celsius": millideg / 1000})
    if not temps:
        for zone in sorted(Path("/sys/class/thermal").glob("thermal_zone*")):
            try:
                chip = (zone / "type").read_text().strip()
                millideg = int((zone / "temp").read_text().strip())
            except (OSError, ValueError):
                continue
            temps.append({"chip": chip, "label": zone.name, "celsius": millideg / 1000})
    return temps


def format_temps_text(temps):
    if not temps:
        return "No temperature sensors visible from this container."
    width = max(len(f"{t['chip']}/{t['label']}") for t in temps)
    lines = []
    for t in temps:
        c = t["celsius"]
        bar = "#" * max(1, min(40, int(c / 2.5)))
        lines.append(f"{t['chip'] + '/' + t['label']:<{width}}  {c:5.1f}°C  {bar}")
    return "\n".join(lines)


@app.get("/", response_class=PlainTextResponse)
def root():
    return "pong"


@app.get("/ping")
def ping():
    """Simple health check endpoint."""
    return {"status": "pong"}


@app.get("/status", response_class=PlainTextResponse)
def get_status():
    return f"App is running. Uptime: {time.time() - app_start_time:.0f}s"


@app.get("/projects")
def projects():
    """Featured project list. The live frontend renders its cards from this."""
    return {"projects": PROJECTS}


@app.get("/temp")
def temp(format: str = "text"):
    """Live CPU/board temperatures of the homelab machine serving this request."""
    temps = read_cpu_temps()
    if format == "json":
        return {"temps": temps}
    return PlainTextResponse(
        "Live sensor readings from the box serving this page:\n\n"
        + format_temps_text(temps)
        + "\n"
    )


@app.get("/curl", response_class=PlainTextResponse)
def curl_site():
    """The whole site as plaintext: `curl site.tinkernet.me/curl`."""
    uptime_s = int(time.time() - app_start_time)
    days, rem = divmod(uptime_s, 86400)
    hours, rem = divmod(rem, 3600)
    minutes, _ = divmod(rem, 60)

    sections = [
        r"""
    _ _        _   _      _                    _
 __(_) |_ ___ | |_(_)_ _ | |_____ _ _ _ _  ___| |_   _ __  ___
(_-< |  _/ -_)|  _| | ' \| / / -_) '_| ' \/ -_)  _|_| '  \/ -_)
/__/_|\__\___(_)__|_|_||_|_\_\___|_| |_||_\___|\__(_)_|_|_\___|
""",
        "You found the curlable edition. This page is rendered live by the same",
        "FastAPI backend as the website, self-hosted on my homelab.",
        "",
        f"Backend uptime: {days}d {hours}h {minutes}m",
        "",
        "== Sensors (live, from the serving hardware) " + "=" * 30,
        "",
        format_temps_text(read_cpu_temps()),
        "",
        "== About " + "=" * 66,
        "",
        my_info(),
        "== Endpoints " + "=" * 62,
        "",
        "  /curl           this page",
        "  /api/ping       health check (JSON)",
        "  /api/status     uptime, plaintext",
        "  /api/temp       live CPU temps (?format=json for JSON)",
        "  /api/projects   featured projects (JSON)",
        "  /api/my-info    bio + projects, plaintext",
        "",
        "== Visit " + "=" * 66,
        "",
        "  Browser:  https://site.tinkernet.me  (type `help` in the terminal)",
        "  GitHub:   https://github.com/ReadableCode",
        "",
    ]
    return "\n".join(sections)


@app.get("/my-info", response_class=PlainTextResponse)
def my_info():
    lines = [MY_INFO]
    for p in PROJECTS:
        url_line = f"\n  {p['url']}" if p["url"] else ""
        lines.append(f"- {p['name']}\n  {p['blurb']}{url_line}\n")
    lines.append("Also: a 2D game in Unity/C# (with my wife, not open source yet).\n")
    lines.append("Find me: https://github.com/ReadableCode / https://readablecode.github.io\n")
    return "\n".join(lines)


# %%
# Main for Testing #

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)


# %%
