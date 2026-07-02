import { useEffect, useRef, useState } from "react";
import { NODES, LINKS } from "./data";

type NodeState = { name: string; status: "pending" | "online" | "offline"; ms: string };

const reduce =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function HerdMonitor() {
  const [nodes, setNodes] = useState<NodeState[]>(
    NODES.map((name) => ({ name, status: "pending", ms: "…" }))
  );
  const timers = useRef<number[]>([]);

  const ping = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setNodes(NODES.map((name) => ({ name, status: "pending", ms: "…" })));
    NODES.forEach((name, i) => {
      const delay = reduce ? 0 : 200 + Math.random() * 1600;
      const t = window.setTimeout(() => {
        const up = Math.random() > 0.18;
        setNodes((prev) => {
          const next = [...prev];
          next[i] = {
            name,
            status: up ? "online" : "offline",
            ms: up ? Math.round(6 + Math.random() * 40) + "ms" : "timeout",
          };
          return next;
        });
      }, delay);
      timers.current.push(t);
    });
  };

  useEffect(() => {
    ping();
    return () => timers.current.forEach(clearTimeout);
  }, []);

  return (
    <section id="herd">
      <h2>// herd monitor</h2>
      <p className="mono-note">
        A nod to{" "}
        <a href={LINKS.github + "/herdstone"} target="_blank" rel="noopener">
          herdstone
        </a>{" "}
        — concurrent pings fanning out across a fleet.{" "}
        <button className="btn" onClick={ping}>
          re-ping
        </button>
      </p>
      <div className="herd">
        {nodes.map((n) => (
          <div key={n.name} className={"node " + n.status}>
            <span className="glyph" />
            <span>{n.name}</span>
            <span className="ms">{n.ms}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
