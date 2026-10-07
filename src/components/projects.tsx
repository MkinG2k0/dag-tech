"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import type { Project, ProjectShot } from "@/lib/projects";

const DIALOG_MS = 420;

export function Projects({ projects }: { projects: Project[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);
  const active = projects.find((project) => project.id === activeId) ?? null;

  function finishClose() {
    const dialog = dialogRef.current;
    closingRef.current = false;
    dialog?.classList.remove("is-visible");
    if (dialog?.open) dialog.close();
    setActiveId(null);
    document.documentElement.classList.remove("has-dialog");
    document.body.style.overflow = "";
  }

  function closeDialog() {
    const dialog = dialogRef.current;
    if (!dialog?.open || closingRef.current) {
      finishClose();
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Reveal header while modal fades out — avoids a hard pop at the end.
    document.documentElement.classList.remove("has-dialog");

    if (reduced) {
      finishClose();
      return;
    }

    closingRef.current = true;
    dialog.classList.remove("is-visible");

    window.setTimeout(() => {
      if (closingRef.current) finishClose();
    }, DIALOG_MS);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !active) return;

    closingRef.current = false;
    dialog.classList.remove("is-visible");
    if (!dialog.open) dialog.showModal();
    document.documentElement.classList.add("has-dialog");
    document.body.style.overflow = "hidden";

    // Force a closed-frame paint, then animate in.
    void dialog.offsetWidth;
    const timer = window.setTimeout(() => {
      dialog.classList.add("is-visible");
      closeRef.current?.focus();
    }, 16);

    return () => window.clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("has-dialog");
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div className="projects">
        {projects.map((project) => (
          <button
            type="button"
            className="project glass"
            key={project.id}
            onClick={() => setActiveId(project.id)}
            aria-haspopup="dialog"
            aria-expanded={activeId === project.id}
          >
            <div className="mock">
              {project.cover ? (
                <Image
                  src={project.cover}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: project.coverPosition ?? "center top",
                  }}
                />
              ) : (
                <div className="mock-fallback">{project.title}</div>
              )}
            </div>
            <div className="project-copy">
              <small>{project.tag}</small>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <span className="project-more">Смотреть →</span>
            </div>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby={active ? `project-title-${active.id}` : undefined}
        onCancel={(event) => {
          event.preventDefault();
          closeDialog();
        }}
        onClose={() => {
          if (!closingRef.current) {
            setActiveId(null);
            document.documentElement.classList.remove("has-dialog");
            document.body.style.overflow = "";
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        {active ? (
          <div className="project-dialog-card">
            <div className="project-dialog-head">
              <small>{active.tag}</small>
              <button
                ref={closeRef}
                type="button"
                className="project-dialog-close"
                onClick={closeDialog}
              >
                Закрыть
              </button>
            </div>
            <h3 id={`project-title-${active.id}`}>{active.title}</h3>
            <p>{active.description}</p>
            {active.shots.length > 0 ? (
              <ShotSlider key={active.id} shots={active.shots} title={active.title} />
            ) : null}
            {active.href ? (
              <a
                className="project-cta"
                href={active.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {active.hrefLabel}
              </a>
            ) : null}
          </div>
        ) : null}
      </dialog>
    </>
  );
}

function ShotSlider({ shots, title }: { shots: ProjectShot[]; title: string }) {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const kind = shots[index]?.kind ?? "desktop";
  const canSlide = shots.length > 1;

  function go(delta: number) {
    setIndex((current) => (current + delta + shots.length) % shots.length);
  }

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
  }, [canSlide, shots.length]);

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

  return (
    <div className={`shot-slider ${kind}`}>
      <div className="shot-stage">
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
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div
            className="shot-track"
            style={{ transform: `translateX(-${index * 100}%)` }}
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
      {canSlide ? (
        <div className="shot-meta">
          <div className="shot-dots" role="tablist" aria-label={`Скриншоты ${title}`}>
            {shots.map((shot, i) => (
              <button
                type="button"
                key={shot.src}
                className={i === index ? "is-active" : ""}
                aria-label={`Скриншот ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <span className="shot-count">
            {index + 1} / {shots.length}
          </span>
        </div>
      ) : null}
    </div>
  );
}
