// Portfolio content. Kept in sync with the FastAPI backend's /projects
// endpoint, the profile README, and the GitHub Pages mirror.
// The live site prefers the backend's /projects response and falls back to
// this bundled copy when the API is unreachable (e.g. local dev / build).

export interface Project {
  id: string;
  name: string;
  url: string; // empty string = private repo, render without a link
  blurb: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "sync-plex",
    name: "Sync_Plex",
    url: "https://github.com/ReadableCode/Sync_Plex",
    blurb:
      "A household media system: search Plex libraries and add new shows or movies across the network's media servers from a CLI, a Textual TUI, or a phone-friendly web app, with user accounts and an approval queue. A companion tool mirrors selected titles onto an external drive for travel.",
    tags: ["Python", "Textual", "NiceGUI"],
  },
  {
    id: "herdstone",
    name: "herdstone",
    url: "https://github.com/ReadableCode/herdstone",
    blurb:
      "A machine-herd monitor. One Python engine with three thin UIs (Typer CLI, Textual TUI, NiceGUI web) that import it in-process, no internal REST layer. Concurrent ping fan-out, JSON-driven inventory, Ansible importer.",
    tags: ["Python", "Textual", "asyncio"],
  },
  {
    id: "status-board",
    name: "status_board",
    url: "https://github.com/ReadableCode/status_board",
    blurb:
      "A terminal dashboard showing remote cron job status over SSH and pull requests awaiting my review across several accounts, in one pane. Panel definitions live in separate config repos, and SSH jump chains are part of the config so it behaves the same on every machine.",
    tags: ["Python", "Textual", "SSH"],
  },
  {
    id: "readable-utils",
    name: "readable_utils",
    url: "https://github.com/ReadableCode/readable_utils",
    blurb:
      "A versioned Python utility package that replaced the helper directories I used to copy between repos. Installed from git by tag, with optional dependency extras so each consumer only installs what it needs. Used by herdstone, status_board, and others.",
    tags: ["Python", "packaging", "uv"],
  },
  {
    id: "data-tool-pack",
    name: "Data Tool Pack (Python / Go / Rust)",
    url: "https://github.com/ReadableCode/Data_Tool_Pack_Py",
    blurb:
      "Uniform connectors for Snowflake, Databricks, S3, Vault, DuckDB, Google Workspace, and Looker, so analytics work doesn't start with a day of setup. Python, Go, and Rust editions.",
    tags: ["Python", "Go", "Rust", "data"],
  },
  {
    id: "load-log",
    name: "load-log",
    url: "https://github.com/ReadableCode/load-log",
    blurb:
      "A health tracker with a Textual TUI and a Streamlit web UI over shared storage. Neither UI touches Postgres directly: both go through PostgREST with JWT auth and row-level security.",
    tags: ["PostgREST", "JWT", "RLS"],
  },
  {
    id: "postgrest-auth",
    name: "postgrest-auth",
    url: "https://github.com/ReadableCode/postgrest-auth",
    blurb:
      "A small JWT auth service that sits next to PostgREST: POST /token checks a bcrypt hash and returns a JWT carrying the Postgres role and user id for RLS. Written once, used by my other apps.",
    tags: ["FastAPI", "JWT", "bcrypt"],
  },
  {
    id: "book-bot",
    name: "Book-Bot",
    url: "https://github.com/ReadableCode/Book-Bot",
    blurb:
      "An offline eBook organizer. A local LLM (no internet or accounts required) works out author, series, order, and title from messy folders and rebuilds the library into clean nested folders. Can be pointed at hosted APIs instead.",
    tags: ["Python", "local-LLM", "SQLite"],
  },
  {
    id: "dotfiles",
    name: "dotfiles",
    url: "https://github.com/ReadableCode/dotfiles",
    blurb:
      "Config sync and provisioning across Linux, Windows, macOS, Android, a router, and a NAS. Pulls configs over SSH/SCP, provisions with Ansible, and includes a Go git_puller cross-compiled for four OS/arch targets.",
    tags: ["Ansible", "Go", "Bash"],
  },
  {
    id: "trojan-force",
    name: "Trojan-Force",
    url: "https://github.com/ReadableCode/Trojan-Force",
    blurb:
      "A browser tower-defense game (TypeScript, Phaser 3, Vite): mine resources, build supply chains, survive 20 waves. Custom pathfinding, resource manager, and event bus, plus LAN multi-device play.",
    tags: ["TypeScript", "Phaser 3"],
  },
  {
    id: "solitaire-associations",
    name: "Solitaire Associations",
    url: "https://github.com/ReadableCode/Solitaire_Associations",
    blurb:
      "A word-association solitaire game for the browser: cards deal into tableau columns and every word belongs to exactly one of four categories. 150 levels ramp on one curve that tightens the move budget, buries more of the deck, and withdraws hints as you climb. The engine is a dependency-free ES module, deterministic given a level and a seed, so the rules are tested under node with no browser involved.",
    tags: ["FastAPI", "vanilla JS", "PostgREST"],
  },
  {
    id: "terminal-todo",
    name: "Terminal To-Do",
    url: "https://github.com/ReadableCode/Terminal_To_Do",
    blurb:
      "A terminal Kanban board driven by Linux-like commands, with pluggable storage (self-hosted MinIO/S3 or Google Sheets).",
    tags: ["Python", "TUI", "MinIO"],
  },
  {
    id: "docker",
    name: "Self-hosted platform",
    url: "",
    blurb:
      "The infrastructure everything else runs on: multi-host Docker Compose behind a SWAG reverse proxy with TLS and dynamic DNS. The main server runs Authelia, Vaultwarden, Postgres with PostgREST and pgAdmin, MinIO, Grafana, ntfy, Portainer, Plex, a private registry, and my own apps, each included from its own repo's compose file. An Unraid NAS holds the bulk storage. Pushing to master redeploys whatever changed. The repo stays private since it maps my internal network.",
    tags: ["Docker", "SWAG", "self-hosting"],
  },
];

export const SKILLS: [string, string][] = [
  ["Languages", "Python (uv), TypeScript, Go, Rust, SQL, Bash / PowerShell / AutoHotkey, C#"],
  ["Web / API", "FastAPI, React 19 + Vite, nginx, Streamlit, NiceGUI, Phaser 3"],
  ["TUI / CLI", "Textual, Typer, Rich, custom terminal apps"],
  ["Data", "pandas, DuckDB, warehouse connectors (Snowflake/Databricks/Looker), OCR/PDF"],
  ["Databases / storage", "PostgreSQL + PostgREST, Alembic + RLS, SQLite, MinIO/S3, Vault"],
  ["Auth / security", "Authelia SSO, JWT (HS256), bcrypt/argon2, Postgres Row-Level Security"],
  [
    "Infra / DevOps",
    "Docker & multi-host Compose, SWAG + TLS + dynamic DNS, private registry, Grafana + ntfy, Ansible, k3s, Tailscale, WireGuard, push-to-master auto-deploy",
  ],
  [
    "Automation / ops",
    "SSH automation (paramiko, jump hosts), scheduled backups (Postgres dumps, rsync offsite), Home Assistant",
  ],
  ["Testing / quality", "pytest, mypy, ESLint, GitHub Actions"],
  ["AI", "Local LLM serving (llama.cpp, CUDA), swappable OpenAI backend, agent-assisted development with Claude Code"],
];

export const BIO = `I'm Jason, ReadableCode on GitHub. I build automation and reusable tools
for problems I find interesting. Everything here is a personal project;
most of it runs on my homelab, wired together with Docker and redeployed
on push. Comments, forks, and PRs are welcome.`;

export const NODES = ["atlas", "nimbus", "cinder", "willow", "pascal", "juniper", "onyx", "harbor"];

export const LINKS = {
  github: "https://github.com/ReadableCode",
  pages: "https://readablecode.github.io",
  live: "https://site.tinkernet.me",
};
