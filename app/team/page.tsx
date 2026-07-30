import type { Metadata } from "next";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { TherapistsGridSection } from "@/components/sections/team/TherapistsGridSection";

export const metadata: Metadata = buildMetadata({
  title: "Our Therapists — Profiles, Roles, and Introductions",
  description:
    "Meet our team of registered psychotherapists, clinical psychologists, and social workers at Resilience Counseling in London, ON.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: `${siteConfig.name} — Our Therapists`,
            path: "/team",
          }),
        ]}
      />
      <TherapistsGridSection />
    </>
  );
}
