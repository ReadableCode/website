# %%
# Imports #


import time

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

# Canonical featured projects — kept in sync with the profile README and the
# GitHub Pages mirror. The live React frontend renders its cards from /projects.
PROJECTS = [
    {
        "id": "data-tool-pack",
        "name": "Data Tool Pack (Py · Go · Rust)",
        "url": "https://github.com/ReadableCode/Data_Tool_Pack_Py",
        "blurb": (
            "A batteries-included data-engineering toolkit: uniform connectors for "
            "Snowflake, Databricks, S3, Vault, DuckDB, Google Workspace, and Looker "
            "— so analytics work starts without the setup tax. Three language editions."
        ),
        "tags": ["Python", "Go", "Rust", "data"],
    },
    {
        "id": "herdstone",
        "name": "herdstone",
        "url": "https://github.com/ReadableCode/herdstone",
        "blurb": (
            "A cross-platform machine-herd monitor. One Python engine, three thin UIs "
            "(Typer CLI, Textual TUI, NiceGUI web) that import it in-process — no internal "
            "REST layer. Concurrent ICMP ping fan-out, JSON-driven inventory, Ansible importer."
        ),
        "tags": ["Python", "Textual", "asyncio"],
    },
    {
        "id": "load-log",
        "name": "load-log",
        "url": "https://github.com/ReadableCode/load-log",
        "blurb": (
            "A personal health tracker with a Textual TUI and a Streamlit web UI over a "
            "shared data plane. Neither UI touches Postgres directly — both authenticate to "
            "a JWT service and read/write through PostgREST, with per-schema roles + RLS."
        ),
        "tags": ["PostgREST", "JWT", "RLS"],
    },
    {
        "id": "postgrest-auth",
        "name": "postgrest-auth",
        "url": "https://github.com/ReadableCode/postgrest-auth",
        "blurb": (
            "A small, app-agnostic JWT auth microservice beside PostgREST: POST /token "
            "verifies a bcrypt hash and returns a JWT carrying the Postgres role + user id "
            "for RLS. Add once, reuse across every app."
        ),
        "tags": ["FastAPI", "JWT", "bcrypt"],
    },
    {
        "id": "book-bot",
        "name": "Book-Bot",
        "url": "https://github.com/ReadableCode/Book-Bot",
        "blurb": (
            "An offline-first, AI-powered eBook organizer. A local LLM (no internet or "
            "accounts required) infers author, series, order, and title from messy folders "
            "and restructures libraries into clean nested trees — with a swap path to hosted APIs."
        ),
        "tags": ["Python", "local-LLM", "SQLite"],
    },
    {
        "id": "terminal-todo",
        "name": "Terminal To-Do",
        "url": "https://github.com/ReadableCode/Terminal_To_Do",
        "blurb": (
            "A terminal Kanban board driven by Linux-like commands, with pluggable "
            "cloud-backed storage (self-hosted MinIO/S3 or Google Sheets)."
        ),
        "tags": ["Python", "TUI", "MinIO"],
    },
    {
        "id": "dotfiles",
        "name": "dotfiles",
        "url": "https://github.com/ReadableCode/dotfiles",
        "blurb": (
            "A cross-platform config-sync and provisioning system spanning Linux, Windows, "
            "macOS, Android, a router, and a NAS. Pulls configs over SSH/SCP, provisions with "
            "Ansible, and ships a Go git_puller cross-compiled for four OS/arch targets."
        ),
        "tags": ["Ansible", "Go", "Bash"],
    },
    {
        "id": "trojan-force",
        "name": "Trojan-Force",
        "url": "https://github.com/ReadableCode/Trojan-Force",
        "blurb": (
            "A browser tower-defense game (TypeScript + Phaser 3 + Vite): mine resources, "
            "build supply chains, survive 20 waves. Hand-rolled pathfinding, resource "
            "manager, and event bus, with LAN multi-device play."
        ),
        "tags": ["TypeScript", "Phaser 3"],
    },
    {
        "id": "docker",
        "name": "Self-hosted platform",
        "url": "https://github.com/ReadableCode/Docker",
        "blurb": (
            "The infrastructure everything else runs on: multi-host Docker Compose behind a "
            "SWAG reverse proxy with automatic TLS and dynamic DNS, a private container "
            "registry, self-hosted secrets, metrics — plus push-to-master auto-deploy."
        ),
        "tags": ["Docker", "SWAG", "self-hosting"],
    },
    {
        "id": "duck-db-api",
        "name": "duck_db_api",
        "url": "https://github.com/ReadableCode/duck_db_api",
        "blurb": (
            "A thin FastAPI service over DuckDB for ad-hoc table create / insert / query, "
            "with basic safety guards and file-upload ingestion."
        ),
        "tags": ["FastAPI", "DuckDB"],
    },
    {
        "id": "cash-flow-commander",
        "name": "Cash Flow Commander",
        "url": "https://github.com/ReadableCode/Cash_Flow_Commander",
        "blurb": (
            "A personal-finance manager designed for multiple front-ends over pluggable "
            "storage backends — Postgres today, with Sheets / SQLite / Excel planned."
        ),
        "tags": ["Python", "Postgres"],
    },
    {
        "id": "georgetown",
        "name": "A Girl's Guide to Georgetown",
        "url": "https://github.com/ReadableCode/a_girls_guide_to_georgetown",
        "blurb": (
            "A student-led dev platform: a Go/Fiber backend dynamically serves pages so "
            "students own the HTML/CSS/JS and iterate without backend rebuilds."
        ),
        "tags": ["Go", "Fiber", "Docker"],
    },
]

MY_INFO = """\
ReadableCode — Jason Christiansen

About
-----
Greetings! I'm a developer dedicated to automation and modular, reusable
solutions to problems I find interesting. Everything here is a personal
project; most of it runs on a self-hosted homelab wired together with Docker
and auto-deployed on push. Please comment, fork, and contribute.

Projects
--------
"""


# %%
# Functions #


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
    """Canonical featured-project list — the live frontend renders its cards from this."""
    return {"projects": PROJECTS}


@app.get("/my-info", response_class=PlainTextResponse)
def my_info():
    lines = [MY_INFO]
    for p in PROJECTS:
        lines.append(f"• {p['name']}\n  {p['blurb']}\n  {p['url']}\n")
    lines.append("Also: a 2D game in Unity/C# (with my wife, not open source yet).\n")
    lines.append("Find me: https://github.com/ReadableCode · https://readablecode.github.io\n")
    return "\n".join(lines)


# %%
# Main for Testing #

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)


# %%
