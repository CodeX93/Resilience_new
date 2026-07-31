import type { Metadata } from "next";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { TeamMemberDetailPageClient } from "@/components/sections/team/TeamMemberDetailPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const formattedName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return buildMetadata({
    title: `${formattedName} — Resilience Counseling`,
    description: "Meet our registered psychotherapists at Resilience Counseling in London, ON.",
    path: `/team/${slug}`,
  });
}

export default async function TeamMemberDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: `${siteConfig.name} — Therapist Profile`,
            path: `/team/${slug}`,
          }),
        ]}
      />
      <TeamMemberDetailPageClient slug={slug} />
    </>
  );
}
