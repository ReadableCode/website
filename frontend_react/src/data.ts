// Portfolio content. Kept in sync with the FastAPI backend's /projects
// endpoint, the profile README, and the GitHub Pages mirror.
// The live site prefers the backend's /projects response and falls back to
// this bundled copy when the API is unreachable (e.g. local dev / build).

export interface Project {
  id: string;
  name: string;
  url: string;
  blurb: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "data-tool-pack",
    name: "Data Tool Pack (Python / Go / Rust)",
    url: "https://github.com/ReadableCode/Data_Tool_Pack_Py",
    blurb:
      "Uniform connectors for Snowflake, Databricks, S3, Vault, DuckDB, Google Workspace, and Looker, so analytics work doesn't start with a day of setup. Python, Go, and Rust editions.",
    tags: ["Python", "Go", "Rust", "data"],
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
    id: "terminal-todo",
    name: "Terminal To-Do",
    url: "https://github.com/ReadableCode/Terminal_To_Do",
    blurb:
      "A terminal Kanban board driven by Linux-like commands, with pluggable storage (self-hosted MinIO/S3 or Google Sheets).",
    tags: ["Python", "TUI", "MinIO"],
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
    id: "docker",
    name: "Self-hosted platform",
    url: "https://github.com/ReadableCode/Docker",
    blurb:
      "The infrastructure everything else runs on: multi-host Docker Compose behind a SWAG reverse proxy with TLS and dynamic DNS, a private registry, self-hosted secrets, and metrics. Pushing to master redeploys whatever changed.",
    tags: ["Docker", "SWAG", "self-hosting"],
  },
  {
    id: "duck-db-api",
    name: "duck_db_api",
    url: "https://github.com/ReadableCode/duck_db_api",
    blurb:
      "A thin FastAPI service over DuckDB for ad-hoc table create/insert/query, with basic safety guards and file upload ingestion.",
    tags: ["FastAPI", "DuckDB"],
  },
  {
    id: "cash-flow-commander",
    name: "Cash Flow Commander",
    url: "https://github.com/ReadableCode/Cash_Flow_Commander",
    blurb:
      "A personal finance manager built for multiple frontends over pluggable storage backends. Postgres today; Sheets, SQLite, and Excel planned.",
    tags: ["Python", "Postgres"],
  },
  {
    id: "georgetown",
    name: "A Girl's Guide to Georgetown",
    url: "https://github.com/ReadableCode/a_girls_guide_to_georgetown",
    blurb:
      "A Go/Fiber backend that serves pages dynamically for a student-run site, so the students own the HTML/CSS/JS and can iterate without backend rebuilds.",
    tags: ["Go", "Fiber", "Docker"],
  },
];

export const SKILLS: [string, string][] = [
  ["Languages", "Python (uv), TypeScript, Go, Rust, SQL, Bash / PowerShell / AutoHotkey, C#"],
  ["Web / API", "FastAPI, React 19 + Vite, Streamlit, NiceGUI, Phaser 3"],
  ["TUI / CLI", "Textual, Typer, custom terminal apps"],
  ["Data", "pandas, DuckDB, warehouse connectors (Snowflake/Databricks/Looker), OCR/PDF"],
  ["Databases / storage", "PostgreSQL + PostgREST, Alembic + RLS, SQLite, MinIO/S3, Vault"],
  ["Auth / security", "JWT (HS256), bcrypt, Postgres Row-Level Security"],
  [
    "Infra / DevOps",
    "Docker & multi-host Compose, SWAG + TLS + dynamic DNS, private registry, Ansible, k3s, Tailscale, uv, push-to-master auto-deploy",
  ],
  ["AI", "Local-LLM inference with a swappable OpenAI backend"],
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
