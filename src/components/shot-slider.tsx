"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import type { ProjectShot } from "@/lib/projects";

const PHONE_SLIDE_PX = 240;
const PHONE_GAP_PX = 12;

function phoneSlidesPerView(width: number, total: number) {
  if (width <= 0 || total <= 1) return 1;
  const fit = Math.floor((width + PHONE_GAP_PX) / (PHONE_SLIDE_PX + PHONE_GAP_PX));
  return Math.max(1, Math.min(total, fit));
}

export function ShotSlider({ shots, title }: { shots: ProjectShot[]; title: string }) {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);
  const startX = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const kind = shots[0]?.kind ?? "desktop";
  const maxIndex = Math.max(0, shots.length - perView);
  const canSlide = maxIndex > 0;
  const activeEnd = Math.min(index + perView, shots.length);

  function go(delta: number) {
    setIndex((current) => {
      const next = current + delta;
      if (next < 0) return maxIndex;
      if (next > maxIndex) return 0;
      return next;
    });
  }

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || kind !== "phone") {
      setPerView(1);
      return;
    }

    const target = stage;

    function measure() {
      const gap = Number.parseFloat(getComputedStyle(target).columnGap || "0") || 0;
      let navRoom = 0;
      target.querySelectorAll<HTMLElement>(".shot-nav").forEach((nav) => {
        const position = getComputedStyle(nav).position;
        if (position === "absolute" || position === "fixed") return;
        navRoom += nav.offsetWidth + gap;
      });
      const width = Math.max(0, target.clientWidth - navRoom);
      setPerView(phoneSlidesPerView(width, shots.length));
    }

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(target);
    return () => observer.disconnect();
  }, [kind, shots.length]);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (!canSlide) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canSlide, maxIndex]);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    startX.current = event.clientX;
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (startX.current === null || !canSlide) return;
    const delta = event.clientX - startX.current;
    startX.current = null;
    if (delta > 40) go(-1);
    if (delta < -40) go(1);
  }

  const slideStep =
    kind === "phone" && perView > 1
      ? `calc((100% + ${PHONE_GAP_PX}px) / ${perView})`
      : "100%";

  return (
    <div className={`shot-slider ${kind}`}>
      <div className="shot-stage" ref={stageRef}>
        {canSlide ? (
          <button
            type="button"
            className="shot-nav prev"
            onClick={() => go(-1)}
            aria-label="Предыдущий скриншот"
          >
            ←
          </button>
        ) : null}
        <div
          className={`shot-viewport ${kind}`}
          style={
            kind === "phone"
              ? ({ "--shot-spv": perView } as CSSProperties)
              : undefined
          }
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div
            className="shot-track"
            style={{
              transform: `translateX(calc(-${index} * ${slideStep}))`,
            }}
          >
            {shots.map((shot) => (
              <figure className="shot-slide" key={shot.src}>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes={
                    shot.kind === "phone"
                      ? "(max-width: 700px) 70vw, 260px"
                      : "(max-width: 700px) 90vw, 820px"
                  }
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />
              </figure>
            ))}
          </div>
        </div>
        {canSlide ? (
          <button
            type="button"
            className="shot-nav next"
            onClick={() => go(1)}
            aria-label="Следующий скриншот"
          >
            →
          </button>
        ) : null}
      </div>
      {shots.length > 1 ? (
        <div className="shot-meta">
          <div className="shot-dots" role="tablist" aria-label={`Скриншоты ${title}`}>
            {shots.map((shot, i) => {
              const visible = i >= index && i < index + perView;
              return (
                <button
                  type="button"
                  key={shot.src}
                  className={visible ? "is-active" : ""}
                  aria-label={`Скриншот ${i + 1}`}
                  aria-current={visible ? "true" : undefined}
                  onClick={() => setIndex(Math.min(i, maxIndex))}
                />
              );
            })}
          </div>
          <span className="shot-count">
            {perView > 1 ? `${index + 1}–${activeEnd}` : index + 1} / {shots.length}
          </span>
        </div>
      ) : null}
    </div>
  );
}
