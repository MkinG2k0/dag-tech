"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function close() {
    setOpen(false);
  }

  return (
    <header className={open ? "nav is-open" : "nav"}>
      <Link className="brand" href="/#top" onClick={close}>
        <span className="brand-dot" aria-hidden="true" />
        DAG TECH
      </Link>
      <nav id={menuId} aria-label="Основная навигация" className={open ? "is-open" : undefined}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={close}>
            {link.label}
          </a>
        ))}
        <div className="nav-panel-contacts">
          <a href={siteConfig.phone.href} onClick={close}>
            {siteConfig.phone.display}
          </a>
          <a href={siteConfig.email.href} onClick={close}>
            {siteConfig.email.display}
          </a>
          <span>
            {siteConfig.geo.display}. {siteConfig.geo.served}
          </span>
          <Link href={siteConfig.privacyPath} onClick={close}>
            Политика ПДн
          </Link>
        </div>
      </nav>
      <a className="btn btn-small nav-cta" href="/#contact" onClick={close}>
        Обсудить проект
      </a>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Закрыть" : "Меню"}
      </button>
    </header>
  );
}
