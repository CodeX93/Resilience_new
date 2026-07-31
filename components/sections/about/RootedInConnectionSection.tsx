"use client";

import Image from "next/image";
import { aboutPageData as defaultAboutPageData } from "@/data/about";
import { ButtonLink } from "@/components/ui/Button";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableText } from "@/components/cms/EditableText";
import heroBranch from "@/public/images/decor/hero-branch.svg";

export function RootedInConnectionSection() {
  const { getContentValue } = useCms();
  const aboutPageData = getContentValue("about", "", defaultAboutPageData);
  const { banner } = aboutPageData;

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] py-20 lg:py-24">
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <div className="relative overflow-hidden rounded-[28px] border border-camel-400/80 p-10 sm:p-14 text-center shadow-ds3 mx-4 sm:mx-8 lg:mx-20" style={{ background: "linear-gradient(0deg, #E8E2D8 0%, #FFFCF7 100%)" }}>
          {/* Inner decor illustration left */}
          <Image
            src={heroBranch}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -left-10 z-0 hidden w-[220px] opacity-50 lg:block"
          />

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="font-heading text-h2 text-green-950 max-w-2xl w-full">
              <EditableText pageId="about" path="banner.heading" value={banner.heading} />
            </h2>
            <p className="mt-3 text-body-base text-green-700/90 max-w-md w-full">
              <EditableText pageId="about" path="banner.subheading" value={banner.subheading} isTextArea />
            </p>
            <div className="mt-8">
              <ButtonLink href={banner.ctaHref} variant="primary" size="lg">
                <EditableText pageId="about" path="banner.ctaLabel" value={banner.ctaLabel} />
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
