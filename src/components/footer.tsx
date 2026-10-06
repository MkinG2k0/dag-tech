import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer>
      <a className="brand" href="#top">
        <span className="brand-dot" aria-hidden="true" />
        DAG TECH
      </a>
      <span>Разработка программных продуктов под ключ</span>
      <a className="footer-phone" href={siteConfig.phone.href}>
        {siteConfig.phone.display}
      </a>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}
