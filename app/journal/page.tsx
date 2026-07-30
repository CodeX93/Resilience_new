import type { Metadata } from "next";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { JournalHeroSection } from "@/components/sections/journal/JournalHeroSection";
import { JournalPostsGridSection } from "@/components/sections/journal/JournalPostsGridSection";
import { NewsletterSection } from "@/components/sections/home/NewsletterSection";

export const metadata: Metadata = buildMetadata({
  title: "The Resilience Journal — Reflections, Insights, and Updates",
  description:
    "Explore reflections, resources, and evidence-based insights on mental health, self-care, trauma recovery, and holistic well-being from Resilience Counseling.",
  path: "/journal",
});

export default function JournalPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: `${siteConfig.name} — The Resilience Journal`,
            path: "/journal",
          }),
        ]}
      />
      <JournalHeroSection />
      <JournalPostsGridSection />
      <NewsletterSection />
    </>
  );
}
