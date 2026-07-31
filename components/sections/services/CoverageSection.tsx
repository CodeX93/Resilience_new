"use client";

import Image from "next/image";
import { servicesPageData as defaultServicesPageData } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableText } from "@/components/cms/EditableText";
import { CheckIcon } from "@/components/ui/icons";
import leaf from "@/public/images/icons/leaf.svg";
import servicesBgShape from "@/public/images/decor/services-bg-shape.svg";
import servicesBranchA from "@/public/images/decor/services-branch-a.svg";
import servicesBranchC from "@/public/images/decor/services-branch-c.svg";
import servicesSprig from "@/public/images/decor/services-sprig.svg";

export function CoverageSection() {
  const { getContentValue } = useCms();
  const servicesPageData = getContentValue("services", "", defaultServicesPageData);
  const { coverage } = servicesPageData;

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] py-20 lg:py-24">
      {/* Large background organic sweep (Vector 32) */}
      <Image
        src={servicesBgShape}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 z-0 hidden w-[70%] max-w-[1000px] lg:block"
      />
      {/* Decorative leaf branch right (Group 1597881388) */}
      <Image
        src={servicesBranchA}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-16 z-0 hidden w-[230px] opacity-90 lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        {/* Section Heading */}
        <SectionHeading
          eyebrow={<EditableText pageId="services" path="coverage.eyebrow" value={coverage.eyebrow} />}
          heading={<EditableText pageId="services" path="coverage.heading" value={coverage.heading} isTextArea />}
        />

        {/* Small Leaf Accent Divider */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-green-700/30" />
          <Image src={leaf} alt="" width={16} height={16} aria-hidden style={{ mixBlendMode: "multiply" }} />
          <span className="h-px w-16 bg-green-700/30" />
        </div>

        {/* Provider Pills Grid */}
        <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          {coverage.providers.map((provider: string, i: number) => (
            <div
              key={i}
              className="flex items-center gap-2.5 rounded-full border border-camel-300 px-5 py-2.5 shadow-ds1 transition-transform hover:-translate-y-0.5"
              style={{ background: "linear-gradient(180deg, #FFFCF7 0%, #E8E2D8 100%)" }}
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-[#2F4631] text-white">
                <CheckIcon size={13} />
              </span>
              <span className="text-body-base-bold text-green-950">
                <EditableText pageId="services" path={`coverage.providers[${i}]`} value={provider} />
              </span>
            </div>
          ))}
        </div>

        {/* Subtext */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <Image src={leaf} alt="" width={14} height={14} aria-hidden className="opacity-80" style={{ mixBlendMode: "multiply" }} />
          <span className="font-heading text-h3 text-green-700">
            <EditableText pageId="services" path="coverage.subtext" value={coverage.subtext} />
          </span>
        </div>

        {/* Bottom CTA Card: "Not sure which service is right for you?" */}
        <div className="relative mt-20 overflow-hidden rounded-[28px] border border-camel-400/80 p-10 sm:p-14 shadow-ds3 text-center" style={{ background: "linear-gradient(180deg, #FFFCF7 0%, #E8E2D8 100%)" }}>
          {/* Inner decor bottom-left (Group (2).svg) */}
          <Image
            src={servicesBranchC}
            alt=""
            aria-hidden
            width={211}
            height={160}
            className="pointer-events-none absolute bottom-0 left-0 z-0 hidden w-[190px] lg:block"
          />
          {/* Inner decor top-right (Group (3).svg) */}
          <Image
            src={servicesSprig}
            alt=""
            aria-hidden
            width={88}
            height={121}
            className="pointer-events-none absolute right-6 top-0 z-0 hidden w-[80px] lg:block"
          />

          <div className="relative z-10 flex flex-col items-center">
            <h3 className="font-heading text-h2 text-green-950 max-w-xl w-full">
              <EditableText pageId="services" path="coverage.ctaBox.heading" value={coverage.ctaBox.heading} />
            </h3>
            <p className="mt-3 text-body-base text-green-700/90 max-w-md w-full">
              <EditableText pageId="services" path="coverage.ctaBox.subheading" value={coverage.ctaBox.subheading} isTextArea />
            </p>
            <div className="mt-8">
              <ButtonLink href={coverage.ctaBox.ctaHref} variant="primary" size="lg">
                <EditableText pageId="services" path="coverage.ctaBox.ctaLabel" value={coverage.ctaBox.ctaLabel} />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
