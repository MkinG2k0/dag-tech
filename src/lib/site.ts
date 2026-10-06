export function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
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
    "Разработка мобильных приложений, CRM, личных кабинетов и автоматизации под ключ. DAG TECH проектирует и запускает софт, который решает конкретную задачу бизнеса.",
  locale: "ru_RU",
  language: "ru",
  phone: {
    display: "+7 (903) 428-61-98",
    href: "tel:+79034286198",
    e164: "+79034286198",
  },
  keywords: [
    "разработка мобильных приложений",
    "разработка CRM",
    "SaaS разработка",
    "личный кабинет",
    "автоматизация бизнеса",
    "Telegram Mini Apps",
    "MVP под ключ",
    "DAG TECH",
  ],
};

export const navLinks = [
  { href: "#services", label: "Услуги" },
  { href: "#solutions", label: "Наши решения" },
  { href: "#process", label: "Как работаем" },
] as const;
