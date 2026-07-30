import type { Metadata } from "next";
import { siteConfig, absoluteUrl } from "./site";

type PageSeo = {
  title: string;
  description?: string;
  /** Path relative to the site root, e.g. "/about". */
  path?: string;
  /** Override the default OG image (absolute or root-relative path). */
  image?: string;
  noIndex?: boolean;
};

/**
 * Build per-page Metadata following SEO best practices:
 * canonical URL, title template, Open Graph + Twitter cards.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
}: PageSeo): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: canonical,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      site: siteConfig.twitter,
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD builders                                                    */
/* ------------------------------------------------------------------ */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.png"),
    description: siteConfig.description,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function webPageJsonLd({
  title,
  description = siteConfig.description,
  path = "/",
}: {
  title: string;
  description?: string;
  path?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
