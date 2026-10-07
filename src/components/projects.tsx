"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Project, ProjectShot } from "@/lib/projects";

const CLOSE_MS = 360;

function scrollbarWidth() {
  return Math.max(0, window.innerWidth - document.documentElement.clientWidth);
}

function lockPageScroll() {
  const html = document.documentElement;
  if (!html.hasAttribute("data-scroll-lock")) {
    html.style.setProperty("--scroll-lock", `${scrollbarWidth()}px`);
    html.setAttribute("data-scroll-lock", "");
  }
  html.style.overflow = "hidden";
  html.style.paddingRight = html.style.getPropertyValue("--scroll-lock");
}

function unlockPageScroll() {
  const html = document.documentElement;
  html.removeAttribute("data-scroll-lock");
  html.style.removeProperty("--scroll-lock");
  html.style.overflow = "";
  html.style.paddingRight = "";
}

export function Projects({ projects }: { projects: Project[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);
  const active = projects.find((project) => project.id === activeId) ?? null;

  function closeDialog() {
    const dialog = dialogRef.current;
    if (!dialog?.open || closingRef.current) return;

    closingRef.current = true;
    dialog.classList.add("is-closing");

    const finish = () => {
      if (!closingRef.current) return;
      closingRef.current = false;
      dialog.classList.remove("is-closing");
      if (dialog.open) dialog.close();
      unlockPageScroll();
      setActiveId(null);
    };

    let fallback = 0;
    const onEnd = (event: TransitionEvent) => {
      if (event.target !== dialog) return;
      dialog.removeEventListener("transitionend", onEnd);
      window.clearTimeout(fallback);
      finish();
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    dialog.addEventListener("transitionend", onEnd);
    fallback = window.setTimeout(finish, CLOSE_MS);
  }

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !active) return;

    if (!dialog.open) {
      lockPageScroll();
      dialog.showModal();
      lockPageScroll();
      closeRef.current?.focus();
    }

    function onCancel(event: Event) {
      event.preventDefault();
      closeDialog();
    }

    dialog.addEventListener("cancel", onCancel);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
    };
  }, [active]);

  useEffect(() => {
    return () => unlockPageScroll();
  }, []);

  return (
    <>
      <div className="projects">
        {projects.map((project) => (
          <button
            type="button"
            className={project.featured ? "project is-featured" : "project"}
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
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <span className="project-more">Смотреть</span>
            </div>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="project-dialog"
        aria-labelledby={active ? `project-title-${active.id}` : undefined}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        {active ? (
          <div className="project-dialog-card">
            <div className="project-dialog-head">
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
  const [paged, setPaged] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  function prefersReduce() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function scrollTo(next: number) {
    const root = scrollerRef.current;
    const slide = root?.children[next] as HTMLElement | undefined;
    if (!root || !slide) return;
    root.scrollTo({
      left: slide.offsetLeft,
      behavior: prefersReduce() ? "auto" : "smooth",
    });
  }

  function go(delta: number) {
    setIndex((current) => {
      const next = Math.min(shots.length - 1, Math.max(0, current + delta));
      scrollTo(next);
      return next;
    });
  }

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const measure = () => {
      setPaged(root.scrollWidth > root.clientWidth + 8);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, [shots.length]);

  useEffect(() => {
    if (!paged) return;

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
  }, [paged, shots.length]);

  function onScroll() {
    const root = scrollerRef.current;
    if (!root) return;
    const slides = Array.from(root.children) as HTMLElement[];
    let best = 0;
    let distance = Infinity;
    for (let i = 0; i < slides.length; i += 1) {
      const next = Math.abs(slides[i].offsetLeft - root.scrollLeft);
      if (next < distance) {
        distance = next;
        best = i;
      }
    }
    setIndex(best);
  }

  return (
    <div className="shot-slider">
      <div
        ref={scrollerRef}
        className="shot-film"
        onScroll={onScroll}
      >
        {shots.map((shot) => (
          <figure className={`shot-slide ${shot.kind}`} key={shot.src}>
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes={
                shot.kind === "phone"
                  ? "(max-width: 700px) 72vw, 240px"
                  : "(max-width: 700px) 90vw, 720px"
              }
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
          </figure>
        ))}
      </div>
      {paged ? (
        <div className="shot-meta">
          <button
            type="button"
            className="shot-nav prev"
            onClick={() => go(-1)}
            disabled={index === 0}
            aria-label="Предыдущий скриншот"
          >
            Назад
          </button>
          <div className="shot-dots" role="tablist" aria-label={`Скриншоты ${title}`}>
            {shots.map((shot, i) => (
              <button
                type="button"
                key={shot.src}
                className={i === index ? "is-active" : ""}
                aria-label={`Скриншот ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => {
                  setIndex(i);
                  scrollTo(i);
                }}
              />
            ))}
          </div>
          <span className="shot-count">
            {index + 1} / {shots.length}
          </span>
          <button
            type="button"
            className="shot-nav next"
            onClick={() => go(1)}
            disabled={index === shots.length - 1}
            aria-label="Следующий скриншот"
          >
            Дальше
          </button>
        </div>
      ) : null}
    </div>
  );
}
