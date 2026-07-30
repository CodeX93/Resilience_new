import type { Metadata } from "next";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { WhatWeOfferSection } from "@/components/sections/home/WhatWeOfferSection";
import { WhoWeAreSection } from "@/components/sections/home/WhoWeAreSection";
import { MeetOurTeamSection } from "@/components/sections/home/MeetOurTeamSection";
import { JournalSection } from "@/components/sections/home/JournalSection";
import { NewsletterSection } from "@/components/sections/home/NewsletterSection";
import { footerContact } from "@/data/navigation";

export const metadata: Metadata = buildMetadata({
  title: "Therapy that respects your journey, heritage, and rhythm",
  description:
    "Resilience Counselling offers trauma-informed therapy for individuals, couples, and families in London, ON and virtually across Ontario — with care for refugees and newcomers in six languages.",
  path: "/",
});

/** LocalBusiness / medical practice structured data for the home page. */
function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    telephone: footerContact.phone,
    email: footerContact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "111 Waterloo St Unit 406",
      addressLocality: "London",
      addressRegion: "ON",
      postalCode: "N6B 2M4",
      addressCountry: "CA",
    },
    openingHours: "Mo-Fr 10:00-18:00",
    areaServed: "Ontario, Canada",
    availableLanguage: ["English", "Turkish", "Arabic", "Spanish", "Kurmanji", "Urdu"],
  };
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={[webPageJsonLd({ title: `${siteConfig.name} — Home`, path: "/" }), homeJsonLd()]} />
      <HeroSection />
      <WhatWeOfferSection />
      <WhoWeAreSection />
      <MeetOurTeamSection />
      <JournalSection />
      <NewsletterSection />
    </>
  );
}
