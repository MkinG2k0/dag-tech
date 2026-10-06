import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "DAG TECH",
    description: siteConfig.description,
    start_url: "/",
    display: "browser",
    background_color: "#e7f3f6",
    theme_color: "#e7f3f6",
    lang: "ru",
  };
}
