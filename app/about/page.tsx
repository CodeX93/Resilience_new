import type { Metadata } from "next";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { WhoWeAreAboutSection } from "@/components/sections/about/WhoWeAreAboutSection";
import { OurVisionSection } from "@/components/sections/about/OurVisionSection";
import { OurApproachSection } from "@/components/sections/about/OurApproachSection";
import { RootedInConnectionSection } from "@/components/sections/about/RootedInConnectionSection";

export const metadata: Metadata = buildMetadata({
  title: "About Us — Roots, Philosophy, Diversity, and Connection",
  description:
    "Learn about Resilience Counseling's multidisciplinary team of psychotherapists, psychologists, and social workers in London, ON — grounded in diversity, resilience, and collaborative care.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: `${siteConfig.name} — About Us`,
            path: "/about",
          }),
        ]}
      />
      <WhoWeAreAboutSection />
      <OurVisionSection />
      <OurApproachSection />
      <RootedInConnectionSection />
    </>
  );
}
