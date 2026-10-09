"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ProjectBody } from "@/components/project-body";
import {
  getProjectById,
  getProjectSeo,
  projectPath,
  type Project,
} from "@/lib/projects";
import { siteConfig } from "@/lib/site";

const DIALOG_MS = 420;
const HOME_RETURN = "/#solutions";

function projectIdFromPath(pathname: string) {
  const match = pathname.match(/^\/projects\/([^/]+)\/?$/);
  return match?.[1] ?? null;
}

export function Projects({ projects }: { projects: Project[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closingRef = useRef(false);
  const syncingUrlRef = useRef(false);
  const defaultTitleRef = useRef<string | null>(null);
  const active = projects.find((project) => project.id === activeId) ?? null;

  function setDocumentTitle(project: Project | null) {
    if (defaultTitleRef.current === null) {
      defaultTitleRef.current = document.title;
    }
    if (!project) {
      document.title = defaultTitleRef.current;
      return;
    }
    const seo = getProjectSeo(project);
    document.title = `${seo.title} — ${siteConfig.name}`;
  }

  function pushProjectUrl(id: string) {
    const next = projectPath(id);
    if (window.location.pathname === next) return;
    syncingUrlRef.current = true;
    window.history.pushState({ projectModal: id }, "", next);
    syncingUrlRef.current = false;
  }

  function restoreHomeUrl() {
    if (!projectIdFromPath(window.location.pathname)) return;
    syncingUrlRef.current = true;
    window.history.pushState({ projectModal: null }, "", HOME_RETURN);
    syncingUrlRef.current = false;
  }

  function finishClose({ skipUrl = false } = {}) {
    const dialog = dialogRef.current;
    // Keep closingRef true while calling dialog.close() so onClose skips cleanup.
    closingRef.current = true;
    dialog?.classList.remove("is-visible");
    if (dialog?.open) dialog.close();
    closingRef.current = false;
    setActiveId(null);
    setDocumentTitle(null);
    document.documentElement.classList.remove("has-dialog");
    document.body.style.overflow = "";
    if (!skipUrl) restoreHomeUrl();
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

  function openProject(id: string) {
    if (!getProjectById(id)) return;
    setActiveId(id);
    pushProjectUrl(id);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !active) return;

    closingRef.current = false;
    dialog.classList.remove("is-visible");
    if (!dialog.open) dialog.showModal();
    document.documentElement.classList.add("has-dialog");
    document.body.style.overflow = "hidden";
    setDocumentTitle(active);

    // Force a closed-frame paint, then animate in.
    void dialog.offsetWidth;
    const timer = window.setTimeout(() => {
      dialog.classList.add("is-visible");
      closeRef.current?.focus();
    }, 16);

    return () => window.clearTimeout(timer);
  }, [active]);

  useEffect(() => {
    function onPopState() {
      if (syncingUrlRef.current) return;
      const id = projectIdFromPath(window.location.pathname);
      const project = id ? projects.find((item) => item.id === id) : null;
      if (project) {
        setActiveId(project.id);
        setDocumentTitle(project);
        return;
      }

      const dialog = dialogRef.current;
      closingRef.current = false;
      dialog?.classList.remove("is-visible");
      if (dialog?.open) dialog.close();
      setActiveId(null);
      setDocumentTitle(null);
      document.documentElement.classList.remove("has-dialog");
      document.body.style.overflow = "";
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [projects]);

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
          <a
            className="project glass"
            key={project.id}
            href={projectPath(project.id)}
            aria-haspopup="dialog"
            aria-expanded={activeId === project.id}
            onClick={(event) => {
              if (
                event.defaultPrevented ||
                event.button !== 0 ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              ) {
                return;
              }
              event.preventDefault();
              openProject(project.id);
            }}
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
          </a>
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
            setDocumentTitle(null);
            document.documentElement.classList.remove("has-dialog");
            document.body.style.overflow = "";
            restoreHomeUrl();
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
            <ProjectBody
              project={active}
              headingId={`project-title-${active.id}`}
              headingLevel="h3"
            />
          </div>
        ) : null}
      </dialog>
    </>
  );
}
