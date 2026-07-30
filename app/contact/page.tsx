import type { Metadata } from "next";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactSection } from "@/components/sections/contact/ContactSection";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us — Resilience Counseling & Psychotherapy",
  description:
    "Get in touch with Resilience Counseling in London, ON. Reach us by phone, email, or send us a message to request a free consultation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd({
            title: `${siteConfig.name} — Contact Us`,
            path: "/contact",
          }),
        ]}
      />
      <ContactSection />
    </>
  );
}
