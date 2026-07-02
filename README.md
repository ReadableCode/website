# website

My live, self-hosted portfolio — served at **[site.tinkernet.me](https://site.tinkernet.me)**.

A terminal-first, interactive site: type `help` in the in-browser terminal to
navigate, watch a `herdstone`-style concurrent-ping "herd monitor," and see a live
badge proving the page is dynamically served from my own homelab.

## Architecture

- **`frontend_react/`** — React 19 + Vite + TypeScript. Built to static assets and
  served by nginx. Its nginx also reverse-proxies `/api/` to the backend on the
  internal Docker network, so the browser only ever talks to one origin.
- **`backend/`** — FastAPI (uv). Endpoints: `/status`, `/ping`, `/projects`
  (the frontend renders its project cards from this), and `/my-info`
  (`curl https://site.tinkernet.me/api/my-info` to read my bio from the terminal).
  Publishes **no** host ports — reachable only through the frontend's `/api` proxy,
  never directly from the internet, so there's no CORS surface to widen.

## Deploy

Built and run via the self-hosted Docker Compose stack behind a SWAG reverse proxy
(single `site.tinkernet.me` origin). Push to `master` and it auto-deploys.

## Related

- 🐙 GitHub profile: <https://github.com/ReadableCode>
- 📄 Static mirror (GitHub Pages): <https://readablecode.github.io>
