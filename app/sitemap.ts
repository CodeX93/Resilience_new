import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { routes } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
