"use client";

import Image from "next/image";
import { aboutPageData as defaultAboutPageData } from "@/data/about";
import { ButtonLink } from "@/components/ui/Button";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableText } from "@/components/cms/EditableText";
import sprigLeft from "@/public/images/decor/about-sprig-left.svg";
import sprigRight from "@/public/images/decor/about-sprig-right.svg";

export function OurVisionSection() {
  const { getContentValue } = useCms();
  const aboutPageData = getContentValue("about", "", defaultAboutPageData);
  const { vision } = aboutPageData;

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] py-20 lg:py-24">
      {/* Decorative green sprig, left edge (Group (2)) */}
      <Image
        src={sprigLeft}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-10 top-0 z-0 hidden w-[240px] max-w-[18vw] lg:block"
      />

      {/* Decorative green sprig, right edge (Group (1)) */}
      <Image
        src={sprigRight}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-8 bottom-0 z-0 hidden w-[210px] max-w-[16vw] lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="font-heading text-h2 text-green-950 w-full">
            <EditableText pageId="about" path="vision.heading" value={vision.heading} />
          </h2>

          <div className="mt-8 flex flex-col gap-6 text-body-lg text-green-700/90 leading-relaxed w-full">
            {vision.paragraphs.map((p: string, i: number) => (
              <p key={i}>
                <EditableText pageId="about" path={`vision.paragraphs[${i}]`} value={p} isTextArea />
              </p>
            ))}
          </div>

          <div className="mt-10">
            <ButtonLink href={vision.ctaHref} variant="primary" size="lg">
              <EditableText pageId="about" path="vision.ctaLabel" value={vision.ctaLabel} />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
