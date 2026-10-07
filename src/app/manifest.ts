import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "DAG TECH",
    description: siteConfig.description,
    start_url: "/",
    display: "browser",
    background_color: "#000000",
    theme_color: "#000000",
    lang: "ru",
  };
}
