import type { Metadata } from "next";
import { featuredPost } from "@/data/journal";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return buildMetadata({
    title: `${formattedTitle} — The Resilience Journal`,
    description:
      "Read our latest article on evidence-based mental health, self-care practices, and holistic therapy from Resilience Counseling.",
    path: `/journal/${slug}`,
  });
}

import { JournalDetailPageClient } from "@/components/sections/journal/JournalDetailPageClient";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = featuredPost; // Default fallback for JSON-LD

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: `${post.title} — ${siteConfig.name}`,
            path: `/journal/${slug}`,
          }),
        ]}
      />
      <JournalDetailPageClient slug={slug} />
    </>
  );
}
