import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProjectBody } from "@/components/project-body";
import {
  getProjectById,
  getProjectSeo,
  projects,
  projectPath,
} from "@/lib/projects";
import { getSiteUrl, siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return {};

  const seo = getProjectSeo(project);
  const url = getSiteUrl();
  const canonical = seo.path;
  const image = project.cover
    ? {
        url: project.cover,
        alt: project.title,
      }
    : undefined;

  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      project.title,
      project.tag,
      "DAG TECH",
      "кейс",
      "портфолио",
      siteConfig.geo.city,
    ],
    alternates: {
      canonical,
      languages: {
        "ru-RU": canonical,
      },
    },
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      url: `${url}${canonical}`,
      siteName: siteConfig.name,
      title: `${project.title} — ${siteConfig.name}`,
      description: seo.description,
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${siteConfig.name}`,
      description: seo.description,
      images: image ? [image.url] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const url = getSiteUrl();
  const path = projectPath(project.id);
  const pageUrl = `${url}${path}`;
  const seo = getProjectSeo(project);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Главная",
            item: url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Наши решения",
            item: `${url}/#solutions`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${pageUrl}#software`,
        name: project.title,
        description: project.description,
        applicationCategory: project.tag,
        operatingSystem: project.tag.includes("Android")
          ? "Android"
          : project.tag.includes("Windows")
            ? "Windows"
            : "Web",
        image: project.cover ? `${url}${project.cover}` : undefined,
        url: pageUrl,
        inLanguage: "ru",
        author: {
          "@type": "Organization",
          name: siteConfig.name,
          url,
        },
        offers: project.href
          ? {
              "@type": "Offer",
              url: project.href,
              availability: "https://schema.org/InStock",
              price: "0",
              priceCurrency: "RUB",
            }
          : undefined,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: `${seo.title} — ${siteConfig.name}`,
        description: seo.description,
        inLanguage: "ru",
        isPartOf: { "@id": `${url}/#website` },
        about: { "@id": `${pageUrl}#software` },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        primaryImageOfPage: project.cover
          ? { "@type": "ImageObject", url: `${url}${project.cover}` }
          : undefined,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a className="skip-link" href="#project">
        К содержанию
      </a>
      <Header />
      <main id="project" className="project-page">
        <nav className="project-page-nav" aria-label="Хлебные крошки">
          <Link href="/">Главная</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#solutions">Наши решения</Link>
          <span aria-hidden="true">/</span>
          <span>{project.title}</span>
        </nav>

        <article className="project-page-card glass">
          {project.cover ? (
            <div className="project-page-cover">
              <Image
                src={project.cover}
                alt={`Обложка проекта ${project.title}`}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 920px"
                style={{
                  objectFit: "cover",
                  objectPosition: project.coverPosition ?? "center top",
                }}
              />
            </div>
          ) : null}
          <div className="project-page-body">
            <div className="project-dialog-head">
              <small>{project.tag}</small>
              <Link className="project-dialog-close" href="/#solutions">
                К решениям
              </Link>
            </div>
            <ProjectBody
              project={project}
              headingId={`project-title-${project.id}`}
              headingLevel="h1"
            />
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
