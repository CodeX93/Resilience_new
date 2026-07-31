/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { servicesPageData as defaultServicesPageData } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableText } from "@/components/cms/EditableText";
import { FileTextIcon, UserCheckIcon, AwardIcon } from "@/components/ui/icons";
import servicesBranchB from "@/public/images/decor/services-branch-b.svg";

function OtherServiceIcon({ icon, size = 20 }: { icon: string; size?: number }) {
  switch (icon) {
    case "file-text":
      return <FileTextIcon size={size} />;
    case "user-check":
      return <UserCheckIcon size={size} />;
    case "award":
      return <AwardIcon size={size} />;
    default:
      return <FileTextIcon size={size} />;
  }
}

export function OtherServicesSection() {
  const { getContentValue } = useCms();
  const servicesPageData = getContentValue("services", "", defaultServicesPageData);
  const { otherServices } = servicesPageData;

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] py-20 lg:py-24">
      {/* Decorative leaf branch top-left (Group (1).svg) */}
      <Image
        src={servicesBranchB}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 top-4 z-0 hidden w-[200px] lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <SectionHeading
          eyebrow={<EditableText pageId="services" path="otherServices.eyebrow" value={otherServices.eyebrow} />}
          heading={<EditableText pageId="services" path="otherServices.heading" value={otherServices.heading} />}
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {otherServices.cards.map((card: any, i: number) => (
            <article
              key={i}
              className="flex flex-col justify-between rounded-3xl border border-camel-400/70 p-8 shadow-ds2 transition-transform duration-300 hover:-translate-y-1"
              style={{ background: "linear-gradient(180deg, #FFFCF7 0%, #E8E2D8 100%)" }}
            >
              <div className="w-full">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-camel-200/80 text-green-700 shadow-ds1 mb-6">
                  <OtherServiceIcon icon={card.icon} size={22} />
                </div>
                <h3 className="font-heading text-h3 text-green-950 mb-4 w-full">
                  <EditableText pageId="services" path={`otherServices.cards[${i}].title`} value={card.title} />
                </h3>
                <p className="text-body-base text-green-700/90 leading-relaxed w-full">
                  <EditableText pageId="services" path={`otherServices.cards[${i}].description`} value={card.description} isTextArea />
                </p>
                {card.subtext && (
                  <p className="mt-4 text-body-sm text-green-700/80 leading-relaxed border-t border-camel-300/50 pt-4 w-full">
                    <EditableText pageId="services" path={`otherServices.cards[${i}].subtext`} value={card.subtext} isTextArea />
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink href={otherServices.ctaHref} variant="primary" size="lg">
            <EditableText pageId="services" path="otherServices.ctaLabel" value={otherServices.ctaLabel} />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
