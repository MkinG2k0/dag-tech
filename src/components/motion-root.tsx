"use client";

import { useEffect } from "react";

function revealAll(nodes: HTMLElement[]) {
  for (const node of nodes) node.classList.add("is-in");
}

export function MotionRoot() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let io: IntersectionObserver | null = null;
    let cancelled = false;

    function arm() {
      if (cancelled) return;
      const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      if (!nodes.length) return;

      if (reduced) {
        revealAll(nodes);
        return;
      }

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-in");
            io?.unobserve(entry.target);
          }
        },
        { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
      );

      for (const node of nodes) io.observe(node);
    }

    if (document.documentElement.classList.contains("is-ready")) {
      arm();
    } else {
      const onReady = () => arm();
      window.addEventListener("site:ready", onReady, { once: true });
      // Fallback if loader already skipped / unmounted without event
      const fallback = window.setTimeout(arm, 2600);
      return () => {
        cancelled = true;
        window.removeEventListener("site:ready", onReady);
        window.clearTimeout(fallback);
        io?.disconnect();
      };
    }

    return () => {
      cancelled = true;
      io?.disconnect();
    };
  }, []);

  return null;
}
