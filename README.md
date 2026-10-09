# DAG TECH

Лендинг студии разработки на Next.js: мобильные приложения, CRM, SaaS и автоматизация под ключ.

## Стек

- Next.js App Router
- TypeScript
- SEO: metadata, Open Graph, JSON-LD, sitemap, robots

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Формы

Заявки с лендинга уходят в `POST /api/contact` и `POST /api/quiz` на `dagtech.studio@gmail.com` через Gmail SMTP (`SMTP_USER` / `SMTP_PASS`).

## SEO

В Vercel задайте `NEXT_PUBLIC_SITE_URL=https://dagtech.tech` (не `*.vercel.app`), иначе canonical/Host уйдут на зеркало и Яндекс может не взять фавикон.
