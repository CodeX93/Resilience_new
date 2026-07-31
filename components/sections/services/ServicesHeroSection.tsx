/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesPageData as defaultServicesPageData } from "@/data/services";
import { SectionIdentifier } from "@/components/ui/SectionIdentifier";
import { ButtonLink } from "@/components/ui/Button";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableText } from "@/components/cms/EditableText";
import { EditableImage } from "@/components/cms/EditableImage";
import {
  ChevronRightIcon,
  ArrowUpRightIcon,
  UserIcon,
  FamilyIcon,
  UsersIcon,
  HandsIcon,
} from "@/components/ui/icons";
import servicesHeroLeaves from "@/public/images/decor/services-hero-leaves.svg";
import quoteEllipseFreire from "@/public/images/decor/quote-ellipse-freire.svg";
import servicesBgShape from "@/public/images/decor/services-bg-shape.svg";
import servicesCardGlow from "@/public/images/decor/services-card-glow.svg";
import servicesQuoteSprig from "@/public/images/decor/services-quote-sprig.svg";

// Helper icon picker for categories
function CategoryIcon({ icon, size = 18 }: { icon: string; size?: number }) {
  switch (icon) {
    case "family":
      return <FamilyIcon size={size} />;
    case "users":
      return <UsersIcon size={size} />;
    case "hands":
      return <HandsIcon size={size} />;
    default:
      return <UserIcon size={size} />;
  }
}

export function ServicesHeroSection() {
  const { getContentValue } = useCms();
  const servicesPageData = getContentValue("services", "", defaultServicesPageData);
  const { hero, categories } = servicesPageData;
  const [selectedId, setSelectedId] = useState<string>(categories[0].id);
  const [therapistIndex, setTherapistIndex] = useState<number>(0);

  const activeCategoryIndex = categories.findIndex((c: any) => c.id === selectedId);
  const activeIndex = activeCategoryIndex !== -1 ? activeCategoryIndex : 0;
  const activeCategory = categories[activeIndex];

  const therapists = activeCategory.therapists;

  const handleNextTherapist = () => {
    setTherapistIndex((prev) => (prev + 1) % therapists.length);
  };

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] pt-12 pb-20 lg:pt-16 lg:pb-24">
      {/* Top right decorative leaf cluster (Group.svg) — tucks behind the detail card */}
      <Image
        src={servicesHeroLeaves}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-[calc(50%-960px)] top-[24px] z-0 hidden w-[500px] lg:block"
      />

      {/* Wide soft gradient sweep across the bottom of the section (Vector 32) */}
      <Image
        src={servicesBgShape}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 hidden w-[2000px] max-w-none -translate-x-1/2 lg:block"
      />

      {/* Leaf sprig coming in from the right edge, level with the Paulo Freire quote (Group 1597881388) */}
      <Image
        src={servicesQuoteSprig}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-[48px] right-0 z-0 hidden w-[170px] lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        {/* Header / Intro */}
        <div className="flex flex-col items-start max-w-3xl w-full">
          <SectionIdentifier>
            <EditableText pageId="services" path="hero.eyebrow" value={hero.eyebrow} />
          </SectionIdentifier>
          <h1 className="mt-6 font-heading text-h1 text-green-950 w-full">
            <EditableText pageId="services" path="hero.heading" value={hero.heading} />
          </h1>
          <p className="mt-4 text-body-base text-green-700/90 leading-relaxed w-full">
            <EditableText pageId="services" path="hero.subheading" value={hero.subheading} isTextArea />
          </p>
        </div>

        {/* Main 2-Column Content: Left Category List | Right Category Details Card */}
        <div className="relative mt-12 grid gap-8 lg:grid-cols-[420px_1fr] lg:gap-12 lg:items-stretch">

          {/* Soft gradient glow behind the detail card, arcing across its upper area (Vector 34) */}
          <Image
            src={servicesCardGlow}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-[-100px] top-[120px] z-0 hidden w-[1080px] max-w-none lg:block"
          />

          {/* Left: Category Selector List — full list, distributed to match the detail card height */}
          <div className="relative z-10 flex flex-col gap-1.5 rounded-3xl p-2 lg:justify-between">
            {categories.map((cat: any, i: number) => {
              const isActive = cat.id === activeCategory.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(cat.id);
                    setTherapistIndex(0);
                  }}
                  className={`group flex items-center justify-between rounded-2xl px-6 py-[22px] text-left text-green-950 transition-all duration-200 ${
                    isActive
                      ? "bg-white shadow-ds2"
                      : "bg-transparent hover:bg-white/50"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`flex size-9 items-center justify-center rounded-full text-green-700 transition-colors ${
                        isActive ? "bg-camel-200" : "bg-camel-200/70 group-hover:bg-camel-300"
                      }`}
                    >
                      <CategoryIcon icon={cat.icon} size={16} />
                    </span>
                    <span className="text-body-sm font-semibold leading-snug">
                      <EditableText pageId="services" path={`categories[${i}].title`} value={cat.title} />
                    </span>
                  </div>
                  {isActive ? (
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-green-700 text-white">
                      <ChevronRightIcon size={14} />
                    </span>
                  ) : (
                    <ChevronRightIcon size={18} className="shrink-0 text-green-700/50" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Active Service Detail Box — matching height with outer vertical padding around content */}
          <div className="relative z-10 flex flex-col justify-between rounded-3xl border border-camel-400/70 bg-gradient-to-br from-[#ffffff] to-[#faf6f0] p-8 sm:p-12 shadow-ds3">
            {/* Header of Detail Card */}
            <div className="flex flex-col items-center text-center w-full">
              <span className="flex size-14 items-center justify-center rounded-full bg-camel-200 text-green-700 shadow-ds1 mb-4">
                <CategoryIcon icon={activeCategory.icon} size={24} />
              </span>
              <h2 className="font-heading text-h2 text-green-950 w-full">
                <EditableText pageId="services" path={`categories[${activeIndex}].title`} value={activeCategory.title} />
              </h2>
              <p className="mt-4 max-w-xl text-body-base text-green-700/90 leading-relaxed w-full">
                <EditableText pageId="services" path={`categories[${activeIndex}].description`} value={activeCategory.description} isTextArea />
              </p>

              <div className="my-8 w-full max-w-lg h-px bg-camel-400/50" />

              <ButtonLink href="/book" variant="primary" size="lg">
                Request a free consultation
              </ButtonLink>
            </div>

            {/* Therapists Subsection — added vertical margins to expand Right container height */}
            <div className="my-16 pt-12 border-t border-camel-300/60 w-full">
              <h3 className="font-heading text-h3 text-green-950 w-full mb-8">
                Therapists Who Offer This Service
              </h3>

              {/* Therapist Cards Row with edge next-arrow */}
              <div className="relative mt-12 w-full">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {therapists.map((therapist: any, idx: number) => (
                    <article
                      key={idx}
                      className="flex flex-col items-center p-2 text-center"
                    >
                      <div className="relative size-[220px] overflow-hidden rounded-full bg-camel-200">
                        <EditableImage
                          pageId="services"
                          path={`categories[${activeIndex}].therapists[${idx}].photo`}
                          src={therapist.photo}
                          alt={`Photo of ${therapist.name}`}
                          fill
                          sizes="220px"
                          className="object-cover"
                        />
                      </div>

                      <h4 className="mt-6 font-body text-body-base-bold text-green-950 w-full">
                        <EditableText pageId="services" path={`categories[${activeIndex}].therapists[${idx}].name`} value={therapist.name} />
                      </h4>
                      <p className="mt-1 text-body-sm text-green-700/80 font-medium w-full">
                        <EditableText pageId="services" path={`categories[${activeIndex}].therapists[${idx}].title`} value={therapist.title} />
                      </p>
                      <p className="mt-3 text-body-sm text-green-700/70 leading-normal line-clamp-3 w-full">
                        <EditableText pageId="services" path={`categories[${activeIndex}].therapists[${idx}].focus`} value={therapist.focus} isTextArea />
                      </p>

                      <Link
                        href={therapist.href}
                        className="mt-6 inline-flex items-center gap-1.5 text-body-sm font-semibold text-green-800 transition hover:text-green-950"
                      >
                        View Profile
                        <ArrowUpRightIcon size={14} />
                      </Link>
                    </article>
                  ))}
                </div>

                {therapists.length > 1 && (
                  <button
                    type="button"
                    aria-label="Next therapist"
                    onClick={handleNextTherapist}
                    className="absolute right-0 top-[110px] z-10 flex size-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-green-700 text-white shadow-ds2 transition hover:bg-green-800"
                  >
                    <ChevronRightIcon size={20} />
                  </button>
                )}
              </div>

              {/* Pagination indicators */}
              {therapists.length > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  {therapists.map((_: any, i: number) => (
                    <span
                      key={i}
                      className={`h-2 rounded-full transition-all ${
                        i === therapistIndex
                          ? "w-6 bg-green-950"
                          : "w-2 bg-green-300"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 1 Quote (centered) with soft ellipse */}
        <div className="relative mt-20 mx-auto max-w-[600px]">
          <Image
            src={quoteEllipseFreire}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 w-[120%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-95"
          />
          <figure className="relative text-center px-6 py-4">
            <blockquote className="font-quote text-[28px] leading-relaxed tracking-normal text-[#485b50]">
              &ldquo;<EditableText pageId="services" path="hero.quote.text" value={hero.quote.text} isTextArea />&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-right font-quote text-[28px] leading-relaxed tracking-normal text-[#485b50]">
              &ndash;&nbsp;<EditableText pageId="services" path="hero.quote.author" value={hero.quote.author} />
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
