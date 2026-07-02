import { useEffect, useState } from "react";
import { LINKS } from "./data";

export default function LiveProof() {
  const [badge, setBadge] = useState("● checking backend…");
  const [live, setLive] = useState<boolean | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000);
    fetch("/api/status", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.text() : Promise.reject()))
      .then((txt) => {
        clearTimeout(t);
        const m = txt.match(/uptime[:\s]*(\d+(?:\.\d+)?)/i);
        setBadge(m ? "● live · uptime " + Math.round(parseFloat(m[1])) + "s" : "● live now");
        setLive(true);
      })
      .catch(() => {
        clearTimeout(t);
        setBadge("● self-hosted");
        setLive(false);
      });
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, []);

  return (
    <section id="proof-sec">
      <h2>// live &amp; self-hosted</h2>
      <div className="proof">
        <span className={"badge" + (live === false ? " dim" : "")}>{badge}</span>
        <div className="proof-text">
          {live
            ? "You're looking at the live page — served from my own homelab. This React front end talks to a FastAPI back end that publishes no public ports; it's reachable only through this page's same-origin /api proxy, behind a self-hosted reverse proxy with real TLS."
            : "This page is served from my own homelab: a React front end and a FastAPI back end behind a self-hosted reverse proxy. (The uptime badge is quiet right now, but the projects and bio still come from the same stack.)"}
        </div>
        <a className="btn" href={LINKS.pages} target="_blank" rel="noopener">
          static mirror ↗
        </a>
      </div>
    </section>
  );
}
