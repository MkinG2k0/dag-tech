import { projects, projectPath } from "@/lib/projects";
import { getSiteUrl, siteConfig } from "@/lib/site";

export function JsonLd() {
  const url = getSiteUrl();

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url,
        description: siteConfig.description,
        logo: `${url}/icons/icon-512.png`,
        image: `${url}/icons/icon-512.png`,
        telephone: siteConfig.phone.e164,
        email: siteConfig.email.display,
        inLanguage: "ru",
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.geo.city,
          addressRegion: siteConfig.geo.region,
          addressCountry: siteConfig.geo.countryCode,
        },
        areaServed: [
          {
            "@type": "City",
            name: siteConfig.geo.city,
          },
          {
            "@type": "AdministrativeArea",
            name: siteConfig.geo.region,
          },
          {
            "@type": "Country",
            name: siteConfig.geo.country,
          },
        ],
        priceRange: "₽₽₽",
        knowsAbout: [
          "Мобильные приложения",
          "CRM",
          "ERP",
          "SaaS",
          "Автоматизация бизнеса",
          "Telegram Mini Apps",
        ],
        makesOffer: [
          {
            "@type": "Offer",
            name: "Мобильные приложения",
            description:
              "iOS и Android: клиентские сервисы, запись, программы лояльности, подписки и push.",
          },
          {
            "@type": "Offer",
            name: "CRM и внутренние системы",
            description:
              "Продажи, сотрудники, статусы, документы, отчёты и автоматизация ручных процессов.",
          },
          {
            "@type": "Offer",
            name: "Личные кабинеты и SaaS",
            description:
              "Роли, тарифы, биллинг, панели управления, интеграции и масштабируемая архитектура.",
          },
          {
            "@type": "Offer",
            name: "Интеграции и автоматизация",
            description:
              "Оплаты, уведомления, API, карты, внешние сервисы и бизнес-процессы.",
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "ru",
        publisher: { "@id": `${url}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${url}/#webpage`,
        url,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: "ru",
        isPartOf: { "@id": `${url}/#website` },
        about: { "@id": `${url}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}/#projects`,
        name: "Наши решения",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.title,
          url: `${url}${projectPath(project.id)}`,
          description: project.summary,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
