/**
 * Central site configuration.
 * Update `url` once you have the production domain — it feeds metadataBase,
 * canonical URLs, Open Graph, sitemap, robots, and JSON-LD.
 */
export const siteConfig = {
  name: "Resilience",
  // TODO: replace with the real production domain.
  url: "https://resilience.example.com",
  description:
    "Resilience — therapy that respects your journey, heritage, and rhythm.",
  // Open Graph image from the Figma style guide (1200×630). Add the asset to /public.
  ogImage: "/og-image.jpg",
  locale: "en_US",
  twitter: "@resilience",
} as const;

export type SiteConfig = typeof siteConfig;

/** Absolute URL helper for canonical links, OG, JSON-LD, sitemap. */
export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean === "/" ? "" : clean}`;
}
