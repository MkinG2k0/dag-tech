export function Footer() {
  return (
    <footer>
      <a className="brand" href="#top">
        <span className="brand-dot" aria-hidden="true" />
        DAG TECH
      </a>
      <span>Разработка программных продуктов под ключ</span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
}
