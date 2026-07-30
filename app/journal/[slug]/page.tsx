import type { Metadata } from "next";
import { featuredPost } from "@/data/journal";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { JournalDetailHeroSection } from "@/components/sections/journal/JournalDetailHeroSection";
import { JournalDetailContentSection } from "@/components/sections/journal/JournalDetailContentSection";
import { ExploreMorePostsSection } from "@/components/sections/journal/ExploreMorePostsSection";

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

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = featuredPost; // Default fallback to featured post content

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
      <JournalDetailHeroSection
        title={post.title}
        tag={post.tag}
        date={post.date}
        readTime="5 Min Read"
        image={post.image}
        imageAlt={post.imageAlt}
      />
      <JournalDetailContentSection />
      <ExploreMorePostsSection />
    </>
  );
}
