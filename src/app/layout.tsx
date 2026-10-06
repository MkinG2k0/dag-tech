import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { getSiteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["600"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: "%s — DAG TECH",
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      "ru-RU": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteUrl,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#e7f3f6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${manrope.variable} ${unbounded.variable}`}>
      <body>
        <div className="atmosphere" aria-hidden="true">
          <span className="orb orb-cyan" />
          <span className="orb orb-gold" />
          <span className="orb orb-lilac" />
          <span className="sheen" />
        </div>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
