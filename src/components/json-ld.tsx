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
        telephone: siteConfig.phone.e164,
        inLanguage: "ru",
        areaServed: "RU",
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
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
