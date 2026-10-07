"use client";

import { useEffect, useRef } from "react";

export function HeroLens() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const lens = lensRef.current;
    const inner = innerRef.current;
    const clone = cloneRef.current;
    const shine = shineRef.current;
    const hero = root?.parentElement;
    if (!root || !lens || !inner || !clone || !hero) return;

    const rootNode: HTMLDivElement = root;
    const lensNode: HTMLDivElement = lens;
    const innerNode: HTMLDivElement = inner;
    const cloneNode: HTMLDivElement = clone;
    const heroNode: HTMLElement = hero;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");

    function buildClone() {
      cloneNode.replaceChildren();
      for (const child of Array.from(heroNode.children)) {
        if (child === rootNode) continue;
        cloneNode.appendChild(child.cloneNode(true));
      }
      cloneNode.setAttribute("inert", "");
      cloneNode.style.width = `${heroNode.offsetWidth}px`;
      cloneNode.style.height = `${heroNode.offsetHeight}px`;
    }

    buildClone();
    const ro = new ResizeObserver(buildClone);
    ro.observe(heroNode);

    let raf = 0;
    let targetX = heroNode.offsetWidth * 0.36;
    let targetY = heroNode.offsetHeight * 0.4;
    let x = targetX;
    let y = targetY;
    let inside = true;
    const start = performance.now();

    function onPointer(event: PointerEvent) {
      const box = heroNode.getBoundingClientRect();
      targetX = event.clientX - box.left;
      targetY = event.clientY - box.top;
      inside =
        event.clientX >= box.left &&
        event.clientX <= box.right &&
        event.clientY >= box.top &&
        event.clientY <= box.bottom;
    }

    function frame(now: number) {
      if (!fine.matches) {
        const t = (now - start) / 1000;
        targetX = heroNode.offsetWidth * (0.34 + Math.sin(t * 0.35) * 0.2);
        targetY = heroNode.offsetHeight * (0.42 + Math.cos(t * 0.27) * 0.14);
        inside = true;
      }

      const ease = 0.16;
      const nx = x + (targetX - x) * ease;
      const ny = y + (targetY - y) * ease;
      const vx = nx - x;
      const vy = ny - y;
      x = nx;
      y = ny;

      const size = lensNode.offsetWidth;
      const speed = Math.hypot(vx, vy);
      const stretch = Math.min(speed * 0.03, 0.08);
      const angle = Math.atan2(vy, vx);

      lensNode.style.opacity = inside ? "1" : "0";
      lensNode.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0) rotate(${angle}rad) scale(${1 + stretch}, ${1 - stretch * 0.4})`;
      innerNode.style.transform = `rotate(${-angle}rad)`;
      cloneNode.style.transform = `translate3d(${size / 2 - x}px, ${size / 2 - y}px, 0)`;
      if (shine) {
        shine.style.transform = `translate(${-vx * 5}px, ${-vy * 6}px)`;
      }

      raf = requestAnimationFrame(frame);
    }

    if (reduce.matches) {
      const size = 220;
      lensNode.style.transform = `translate(${targetX - size / 2}px, ${targetY - size / 2}px)`;
      cloneNode.style.transform = `translate(${size / 2 - targetX}px, ${size / 2 - targetY}px)`;
      lensNode.style.opacity = "1";
      return () => ro.disconnect();
    }

    heroNode.addEventListener("pointermove", onPointer, { passive: true });
    heroNode.addEventListener("pointerenter", onPointer, { passive: true });
    heroNode.addEventListener("pointerleave", () => {
      inside = fine.matches ? false : true;
    });
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      heroNode.removeEventListener("pointermove", onPointer);
      heroNode.removeEventListener("pointerenter", onPointer);
    };
  }, []);

  return (
    <div className="hero-lens-root" ref={rootRef} aria-hidden="true">
      <div className="hero-lens" ref={lensRef}>
        <div className="hero-lens-inner" ref={innerRef}>
          <div className="hero-lens-magnify">
            <div className="hero hero-lens-clone" ref={cloneRef} />
          </div>
          <span className="hero-lens-chroma a" />
          <span className="hero-lens-chroma b" />
          <span className="hero-lens-glass" />
          <span className="hero-lens-shine" ref={shineRef} />
        </div>
      </div>
    </div>
  );
}
