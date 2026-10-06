import { navLinks } from "@/lib/site";

export function Header() {
  return (
    <header className="nav">
      <a className="brand" href="#top">
        <span className="brand-dot" aria-hidden="true" />
        DAG TECH
      </a>
      <nav aria-label="Основная навигация">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <a className="btn btn-small" href="#contact">
        Обсудить проект
      </a>
    </header>
  );
}
