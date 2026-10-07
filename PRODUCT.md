# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Owners and operators of businesses in Russia who need custom software and are comparing studios. They arrive with a concrete job: a mobile app, CRM, client cabinet, store, or automation. They need to understand what DAG TECH builds, see work that already runs, and send a brief or a message.

Inferred from the live site copy. Confirmed by the redesign request, which keeps this site and its offers.

## Product Purpose

DAG TECH is a product studio site. It explains turnkey software development and converts a visitor into a brief or a direct conversation. Success is a submitted quiz or contact form that the studio can answer the same day.

## Positioning

One studio takes the product from the first screen through backend, integrations, and release, instead of the client assembling a designer, frontend, backend, and DevOps separately.

## Operating Context

Russian-language marketing site. Studio is in Makhachkala, Republic of Dagestan, and works across Russia. Visitors call, email, or submit a form. Leads go out by email from the site's API routes.

## Capabilities and Constraints

- Pages: home and privacy policy.
- Home sections: offer, directions, services, shipped projects with screenshots, process, two-minute brief, contact.
- Forms must keep working: quiz (`/api/quiz`) and contact (`/api/contact`), including consent and the honeypot.
- Project screenshots and links in `src/lib/projects.ts` are real. Do not invent clients, quotes, or metrics.
- Published commercial facts already on the page: projects start from 200 000 ₽; a typical MVP is 2–4 weeks; delivery is turnkey through launch.
- Phone +7 (903) 428-61-98, email dagtech.studio@gmail.com, privacy policy at `/privacy`.
- Stack already in the repo: Next.js, React, TypeScript, Tailwind CSS. Not a greenfield choice.

## Brand Commitments

- Name: DAG TECH.
- Voice: Russian, plain, specific. No hype, no invented proof.
- Headline already in use: «Цифровые продукты без лишнего шума».
- Visual constraint volunteered with the redesign request: the supplied shader animation is the site's visual material. Dark field, generative line field, large tight white type, blue as the action color from the component demo.

## Evidence on Hand

- Site copy and offers in `src/app/page.tsx` and `src/lib/site.ts`.
- Seven shipped products with screenshots under `public/projects/` and records in `src/lib/projects.ts`.
- Privacy policy dated 6 October 2026.
- No testimonials, logos of clients, or third-party ratings. Do not add them.

## Product Principles

- Show the work and the offer before any decoration.
- Keep every published price, timeline, contact, and product description factual.
- The brief and the contact form are the actions the page exists to complete.
- Russian copy stays the product's own language.
