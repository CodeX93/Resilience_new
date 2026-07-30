/**
 * Central route registry. Add each page here as it's built — feeds the
 * sitemap and can drive nav generation. `changeFrequency`/`priority` are
 * SEO hints for crawlers.
 */
export type AppRoute = {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

export const routes: AppRoute[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  // Add pages here as they are implemented, e.g.:
  // { path: "/about", changeFrequency: "monthly", priority: 0.8 },
];
