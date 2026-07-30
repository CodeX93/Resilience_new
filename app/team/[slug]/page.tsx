import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { teamMembersList } from "@/data/team";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { TeamMemberHeroSection } from "@/components/sections/team/TeamMemberHeroSection";
import { TeamMemberBioSection } from "@/components/sections/team/TeamMemberBioSection";
import { WhyMapleTreeSection } from "@/components/sections/team/WhyMapleTreeSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = teamMembersList.find((m) => m.slug === slug);

  if (!member) {
    return buildMetadata({
      title: "Therapist Profile — Resilience Counseling",
      description: "Meet our registered psychotherapists at Resilience Counseling.",
      path: `/team/${slug}`,
    });
  }

  return buildMetadata({
    title: `${member.name} — ${member.title}`,
    description: `${member.name} is a ${member.title} at Resilience Counseling in London, ON. ${member.focus}`,
    path: `/team/${slug}`,
  });
}

export default async function TeamMemberDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = teamMembersList.find((m) => m.slug === slug) || teamMembersList[0];

  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: `${member.name} — ${siteConfig.name}`,
            path: `/team/${slug}`,
          }),
        ]}
      />
      <TeamMemberHeroSection member={member} />
      <TeamMemberBioSection member={member} />
      <WhyMapleTreeSection member={member} />
    </>
  );
}
