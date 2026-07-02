import { useEffect, useRef, useState } from "react";
import { PROJECTS, SKILLS, BIO, type Project } from "./data";

interface Line {
  html: string;
  cls?: string;
}

const esc = (s: string) =>
  s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c] as string));

const pad = (s: string, n: number) => (s.length >= n ? s : s + " ".repeat(n - s.length));

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useRef<string[]>([]);
  const histIdx = useRef(0);

  const push = (html: string, cls?: string) => setLines((prev) => [...prev, { html, cls }]);

  useEffect(() => {
    push("<span class='out-accent'>readablecode</span> // portfolio terminal — v1.0");
    push("type <span class='out-amber'>help</span> to get started, or scroll for the graphical view.", "out-dim");
    push("");
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [lines]);

  const openProject = (name: string) => {
    const p: Project | undefined = PROJECTS.find(
      (x) => x.id === name || x.name.toLowerCase() === (name || "").toLowerCase()
    );
    if (!p) {
      push("no such project: " + esc(name || "") + "  (try <span class='out-amber'>projects</span>)", "out-amber");
      return;
    }
    push("<span class='out-accent'>" + esc(p.name) + "</span>");
    push(esc(p.blurb), "out-dim");
    push("→ <a href='" + p.url + "' target='_blank' rel='noopener'>" + p.url + "</a>");
    push("opening in a new tab…", "out-dim");
    window.open(p.url, "_blank", "noopener");
  };

  const curlMyInfo = async () => {
    push("<span class='out-dim'>$ curl https://site.tinkernet.me/api/my-info</span>");
    try {
      const r = await fetch("/api/my-info");
      if (!r.ok) throw new Error();
      const txt = await r.text();
      txt.split("\n").forEach((l) => push(esc(l)));
      push("");
      push("↑ that came live from my own FastAPI backend, proxied same-origin.", "out-dim");
    } catch {
      BIO.split("\n").forEach((l) => push(esc(l)));
      push("(backend unreachable right now — showed the bundled copy.)", "out-dim");
    }
  };

  const COMMANDS: Record<string, () => void> = {
    help() {
      push("available commands:", "out-accent");
      push("  about      whoami       skills");
      push("  projects   open &lt;name&gt;   ls");
      push("  curl /api/my-info         theme");
      push("  clear      help");
    },
    about() {
      BIO.split("\n").forEach((l) => push(esc(l)));
    },
    whoami() {
      push("jason — ReadableCode. developer, automator, homelab tinkerer.", "out-accent");
    },
    skills() {
      SKILLS.forEach(([a, t]) =>
        push("<span class='out-accent'>" + esc(pad(a, 22)) + "</span>" + esc(t))
      );
    },
    projects() {
      push(
        "open a project with <span class='out-amber'>open &lt;name&gt;</span> — e.g. <span class='out-amber'>open herdstone</span>",
        "out-dim"
      );
      PROJECTS.forEach((p) =>
        push("  <span class='out-accent'>" + esc(pad(p.id, 22)) + "</span>" + esc(p.name))
      );
    },
    ls() {
      push(PROJECTS.map((p) => p.id).join("   "), "out-dim");
    },
    clear() {
      setLines([]);
    },
    theme() {
      window.dispatchEvent(new CustomEvent("toggle-theme"));
      push("theme toggled.", "out-dim");
    },
  };

  const run = (raw: string) => {
    const cmd = raw.trim();
    push(
      "<span class='prompt-user'>jason@readablecode</span>:<span class='prompt-path'>~</span>$ " + esc(cmd)
    );
    if (!cmd) return;
    history.current.push(cmd);
    histIdx.current = history.current.length;
    const [name, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ");
    if (name === "open") return openProject(arg);
    if (name === "curl") {
      if (/my-info/.test(cmd)) {
        void curlMyInfo();
        return;
      }
      push("this terminal only knows <span class='out-amber'>curl /api/my-info</span>.", "out-amber");
      return;
    }
    const fn = COMMANDS[name];
    if (fn) return fn();
    push("command not found: " + esc(name) + "  — type <span class='out-amber'>help</span>", "out-amber");
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      if (histIdx.current > 0) {
        histIdx.current--;
        setValue(history.current[histIdx.current]);
      }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (histIdx.current < history.current.length - 1) {
        histIdx.current++;
        setValue(history.current[histIdx.current]);
      } else {
        histIdx.current = history.current.length;
        setValue("");
      }
      e.preventDefault();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const all = Object.keys(COMMANDS).concat(["open", "curl"]);
      const m = all.filter((c) => c.startsWith(value.trim()));
      if (m.length === 1) setValue(m[0] + " ");
      else if (m.length > 1) push(m.join("   "), "out-dim");
    }
  };

  return (
    <div className="term" onClick={() => inputRef.current?.focus()}>
      <div className="term-bar">
        <span className="dot r" />
        <span className="dot y" />
        <span className="dot g" />
        <span className="term-title">jason@readablecode: ~</span>
      </div>
      <div className="term-body" ref={bodyRef} aria-live="polite">
        {lines.map((l, i) => (
          <div key={i} className={"line" + (l.cls ? " " + l.cls : "")} dangerouslySetInnerHTML={{ __html: l.html }} />
        ))}
      </div>
      <div className="input-row">
        <span className="ps1">jason@readablecode:~$</span>
        <input
          ref={inputRef}
          id="cmd"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKey}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-label="Terminal input"
        />
      </div>
    </div>
  );
}
