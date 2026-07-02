import { useEffect, useState } from "react";
import Terminal from "./Terminal";
import HerdMonitor from "./HerdMonitor";
import LiveProof from "./LiveProof";
import { PROJECTS, SKILLS, LINKS, type Project } from "./data";

function useTheme() {
  useEffect(() => {
    const toggle = () => {
      const cur = document.documentElement.getAttribute("data-theme");
      const next = cur === "light" ? "dark" : "light";
      if (next === "dark") document.documentElement.removeAttribute("data-theme");
      else document.documentElement.setAttribute("data-theme", "light");
      try {
        localStorage.setItem("theme", next);
      } catch { /* ignore */ }
    };
    window.addEventListener("toggle-theme", toggle);
    try {
      if (localStorage.getItem("theme") === "light")
        document.documentElement.setAttribute("data-theme", "light");
    } catch { /* ignore */ }
    return () => window.removeEventListener("toggle-theme", toggle);
  }, []);
}

export default function App() {
  useTheme();
  // Prefer the live backend's project list (proves it's dynamically served);
  // fall back to the bundled copy when the API is unreachable.
  const [projects, setProjects] = useState<Project[]>(PROJECTS);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/projects", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        if (Array.isArray(d?.projects) && d.projects.length) setProjects(d.projects);
      })
      .catch(() => { /* keep bundled fallback */ });
    return () => ctrl.abort();
  }, []);

  return (
    <div className="wrap">
      <a href="#projects" className="skip">
        Skip to projects
      </a>
      <header className="top">
        <h1>
          <span className="caret">❯</span> readablecode
        </h1>
        <nav className="toplinks">
          <a href={LINKS.github} target="_blank" rel="noopener">
            github ↗
          </a>
          <a href={LINKS.pages} target="_blank" rel="noopener">
            pages ↗
          </a>
          <button
            className="btn"
            onClick={() => window.dispatchEvent(new CustomEvent("toggle-theme"))}
            aria-label="Toggle theme"
          >
            ◐ theme
          </button>
        </nav>
      </header>

      <Terminal />
      <p className="hint">
        Type <strong>help</strong> and hit enter. Try <strong>projects</strong>, <strong>skills</strong>, or{" "}
        <strong>curl /api/my-info</strong>. (↑/↓ history, Tab completes.)
      </p>

      <HerdMonitor />
      <LiveProof />

      <section id="projects">
        <h2>// projects</h2>
        <div className="cards">
          {projects.map((p) => (
            <div className="card" key={p.id}>
              <h3>
                <a href={p.url} target="_blank" rel="noopener">
                  {p.name}
                </a>
              </h3>
              <p>{p.blurb}</p>
              <div className="tags">
                {p.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="skills">
        <h2>// skills</h2>
        <div className="skills">
          {SKILLS.map(([area, tools]) => (
            <div className="skillrow" key={area}>
              <div className="area">{area}</div>
              <div className="tools">{tools}</div>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <span>Built &amp; self-hosted by Jason Christiansen · always up for collaboration.</span>
        <span>
          <a href={LINKS.github} target="_blank" rel="noopener">
            github
          </a>{" "}
          ·{" "}
          <a href={LINKS.pages} target="_blank" rel="noopener">
            pages
          </a>
        </span>
      </footer>
    </div>
  );
}
