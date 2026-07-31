"use client";

import Image from "next/image";
import { aboutPageData as defaultAboutPageData } from "@/data/about";
import { ButtonLink } from "@/components/ui/Button";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableText } from "@/components/cms/EditableText";
import { EditableImage } from "@/components/cms/EditableImage";
import fernTall from "@/public/images/decor/about-fern-tall.svg";

export function OurApproachSection() {
  const { getContentValue } = useCms();
  const aboutPageData = getContentValue("about", "", defaultAboutPageData);
  const { approach } = aboutPageData;

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] py-20 lg:py-24">
      {/* Decorative tall green fern, right edge (Group) */}
      <Image
        src={fernTall}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-6 bottom-0 z-0 hidden w-[198px] max-w-[15vw] lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Canopy/Forest photo */}
          <div className="relative aspect-[635/413] w-full overflow-hidden rounded-3xl shadow-ds4">
            <EditableImage
              pageId="about"
              path="approach.image"
              src={approach.image}
              alt={approach.imageAlt || "Our Approach"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Right: text content */}
          <div className="flex flex-col items-start w-full">
            <h2 className="font-heading text-h2 text-green-950 w-full">
              <EditableText pageId="about" path="approach.heading" value={approach.heading} />
            </h2>

            <div className="mt-6 flex flex-col gap-5 text-body-base text-green-700/90 leading-relaxed text-justify w-full">
              {approach.paragraphs.map((p: string, i: number) => (
                <p key={i}>
                  <EditableText pageId="about" path={`approach.paragraphs[${i}]`} value={p} isTextArea />
                </p>
              ))}
            </div>

            <ButtonLink
              href={approach.ctaHref}
              variant="secondary"
              size="lg"
              className="mt-8"
            >
              <EditableText pageId="about" path="approach.ctaLabel" value={approach.ctaLabel} />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
