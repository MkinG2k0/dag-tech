const PRODUCTION_SITE_URL = "https://dagtech.tech";

export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  // Prefer the custom domain so robots/canonical/icons point at dagtech.tech,
  // not the *.vercel.app mirror (Yandex indexes the Host from robots.txt).
  if (process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production") {
    return PRODUCTION_SITE_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "DAG TECH",
  legalName: "DAG TECH",
  tagline: "Цифровые продукты для бизнеса",
  title: "DAG TECH — цифровые продукты для бизнеса",
  description:
    "Разработка мобильных приложений, CRM, личных кабинетов и автоматизации под ключ. DAG TECH в Махачкале проектирует и запускает софт для бизнеса по всей России.",
  locale: "ru_RU",
  language: "ru",
  phone: {
    display: "+7 (903) 428-61-98",
    href: "tel:+79034286198",
    e164: "+79034286198",
  },
  email: {
    display: "dagtech.studio@gmail.com",
    href: "mailto:dagtech.studio@gmail.com",
  },
  geo: {
    city: "Махачкала",
    region: "Республика Дагестан",
    country: "Россия",
    countryCode: "RU",
    display: "Махачкала, Дагестан",
    served: "Работаем по всей России",
  },
  privacyPath: "/privacy",
  keywords: [
    "разработка мобильных приложений",
    "разработка CRM",
    "SaaS разработка",
    "личный кабинет",
    "автоматизация бизнеса",
    "Telegram Mini Apps",
    "MVP под ключ",
    "DAG TECH",
    "разработка Махачкала",
    "разработка Дагестан",
  ],
};

export const navLinks = [
  { href: "/#services", label: "Услуги" },
  { href: "/#solutions", label: "Наши решения" },
  { href: "/#process", label: "Как работаем" },
] as const;
