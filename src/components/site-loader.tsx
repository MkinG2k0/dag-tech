"use client";

import { useEffect, useState } from "react";

const MIN_MS = 900;
const MAX_MS = 2400;

export function SiteLoader() {
  const [phase, setPhase] = useState<"show" | "leave" | "gone">("show");

  useEffect(() => {
    const started = performance.now();
    let leaveTimer = 0;
    let maxTimer = 0;
    let finished = false;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function finish() {
      if (finished) return;
      finished = true;

      const elapsed = performance.now() - started;
      const wait = reduced ? 0 : Math.max(0, MIN_MS - elapsed);

      leaveTimer = window.setTimeout(() => {
        document.documentElement.classList.add("is-ready");
        window.dispatchEvent(new Event("site:ready"));
        if (reduced) {
          setPhase("gone");
          return;
        }
        setPhase("leave");
        window.setTimeout(() => setPhase("gone"), 520);
      }, wait);
    }

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    maxTimer = window.setTimeout(finish, MAX_MS);

    return () => {
      window.removeEventListener("load", finish);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(maxTimer);
    };
  }, []);

  useEffect(() => {
    if (phase === "gone") return;
    document.documentElement.classList.add("is-booting");
    return () => {
      document.documentElement.classList.remove("is-booting");
    };
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      className={phase === "leave" ? "site-loader is-leaving" : "site-loader"}
      role="status"
      aria-live="polite"
      aria-busy={phase === "show"}
    >
      <div className="site-loader-mark">
        <span className="brand-dot" aria-hidden="true" />
        <span className="site-loader-name">DAG TECH</span>
      </div>
      <div className="site-loader-track" aria-hidden="true">
        <span className="site-loader-fill" />
      </div>
      <span className="site-loader-sr">Загрузка</span>
    </div>
  );
}
