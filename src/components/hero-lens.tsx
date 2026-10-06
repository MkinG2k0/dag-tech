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

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");

    function buildClone() {
      clone.replaceChildren();
      for (const child of Array.from(hero.children)) {
        if (child === root) continue;
        clone.appendChild(child.cloneNode(true));
      }
      clone.setAttribute("inert", "");
      clone.style.width = `${hero.offsetWidth}px`;
      clone.style.height = `${hero.offsetHeight}px`;
    }

    buildClone();
    const ro = new ResizeObserver(buildClone);
    ro.observe(hero);

    let raf = 0;
    let targetX = hero.offsetWidth * 0.36;
    let targetY = hero.offsetHeight * 0.4;
    let x = targetX;
    let y = targetY;
    let inside = true;
    const start = performance.now();

    function onPointer(event: PointerEvent) {
      const box = hero.getBoundingClientRect();
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
        targetX = hero.offsetWidth * (0.34 + Math.sin(t * 0.35) * 0.2);
        targetY = hero.offsetHeight * (0.42 + Math.cos(t * 0.27) * 0.14);
        inside = true;
      }

      const ease = 0.16;
      const nx = x + (targetX - x) * ease;
      const ny = y + (targetY - y) * ease;
      const vx = nx - x;
      const vy = ny - y;
      x = nx;
      y = ny;

      const size = lens.offsetWidth;
      const speed = Math.hypot(vx, vy);
      const stretch = Math.min(speed * 0.03, 0.08);
      const angle = Math.atan2(vy, vx);

      lens.style.opacity = inside ? "1" : "0";
      lens.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0) rotate(${angle}rad) scale(${1 + stretch}, ${1 - stretch * 0.4})`;
      inner.style.transform = `rotate(${-angle}rad)`;
      clone.style.transform = `translate3d(${size / 2 - x}px, ${size / 2 - y}px, 0)`;
      if (shine) {
        shine.style.transform = `translate(${-vx * 5}px, ${-vy * 6}px)`;
      }

      raf = requestAnimationFrame(frame);
    }

    if (reduce.matches) {
      const size = 220;
      lens.style.transform = `translate(${targetX - size / 2}px, ${targetY - size / 2}px)`;
      clone.style.transform = `translate(${size / 2 - targetX}px, ${size / 2 - targetY}px)`;
      lens.style.opacity = "1";
      return () => ro.disconnect();
    }

    hero.addEventListener("pointermove", onPointer, { passive: true });
    hero.addEventListener("pointerenter", onPointer, { passive: true });
    hero.addEventListener("pointerleave", () => {
      inside = fine.matches ? false : true;
    });
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      hero.removeEventListener("pointermove", onPointer);
      hero.removeEventListener("pointerenter", onPointer);
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
