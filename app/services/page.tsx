import type { Metadata } from "next";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServicesHeroSection } from "@/components/sections/services/ServicesHeroSection";
import { OtherServicesSection } from "@/components/sections/services/OtherServicesSection";
import { CoverageSection } from "@/components/sections/services/CoverageSection";

export const metadata: Metadata = buildMetadata({
  title: "Our Services — Therapies for Every Step of Your Journey",
  description:
    "Comprehensive, evidence-based therapy tailored to your needs. Individual, family, couples, child, refugee, and specialized counseling in London, ON & virtual across Ontario.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: `${siteConfig.name} — Our Services`,
            path: "/services",
          }),
        ]}
      />
      <ServicesHeroSection />
      <OtherServicesSection />
      <CoverageSection />
    </>
  );
}
