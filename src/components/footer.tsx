import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="glass">
      <Link className="brand" href="/#top">
        <span className="brand-dot" aria-hidden="true" />
        DAG TECH
      </Link>
      <span>Разработка программных продуктов под ключ</span>
      <span>
        {siteConfig.geo.display} · {siteConfig.geo.served}
      </span>
      <a className="footer-phone" href={siteConfig.phone.href}>
        {siteConfig.phone.display}
      </a>
      <a className="footer-mail" href={siteConfig.email.href}>
        {siteConfig.email.display}
      </a>
      <Link className="footer-legal" href={siteConfig.privacyPath}>
        Политика ПДн
      </Link>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}
