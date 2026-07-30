"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesPageData, type ServiceCategory } from "@/data/services";
import { SectionIdentifier } from "@/components/ui/SectionIdentifier";
import { ButtonLink } from "@/components/ui/Button";
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
  const { hero, categories } = servicesPageData;
  const [selectedId, setSelectedId] = useState<string>(categories[0].id);
  const [therapistIndex, setTherapistIndex] = useState<number>(0);

  const activeCategory: ServiceCategory =
    categories.find((c) => c.id === selectedId) || categories[0];

  const therapists = activeCategory.therapists;

  const handleNextTherapist = () => {
    setTherapistIndex((prev) => (prev + 1) % therapists.length);
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f0e7] pt-12 pb-20 lg:pt-16 lg:pb-24">
      {/* Top right decorative leaf cluster (Group.svg) */}
      <Image
        src={servicesHeroLeaves}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-0 hidden w-[380px] lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        {/* Header / Intro */}
        <div className="flex flex-col items-start max-w-3xl">
          <SectionIdentifier>{hero.eyebrow}</SectionIdentifier>
          <h1 className="mt-6 font-heading text-h1 text-green-950">
            {hero.heading}
          </h1>
          <p className="mt-4 text-body-base text-green-700/90 leading-relaxed">
            {hero.subheading}
          </p>
        </div>

        {/* Main 2-Column Content: Left Category List | Right Category Details Card */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[380px_1fr] lg:gap-12 lg:items-start">
          
          {/* Left: Category Selector List — container matches section, active tab is white */}
          <div className="flex flex-col gap-1.5 rounded-3xl p-2 max-h-[780px] overflow-y-auto [scrollbar-width:thin]">
            {categories.map((cat) => {
              const isActive = cat.id === activeCategory.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(cat.id);
                    setTherapistIndex(0);
                  }}
                  className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-left text-green-950 transition-all duration-200 ${
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
                      {cat.title}
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

          {/* Right: Active Service Detail Box */}
          <div className="flex flex-col rounded-3xl border border-camel-400/70 bg-gradient-to-br from-[#ffffff] to-[#faf6f0] p-8 sm:p-12 shadow-ds3">
            {/* Header of Detail Card */}
            <div className="flex flex-col items-center text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-camel-200 text-green-700 shadow-ds1 mb-4">
                <CategoryIcon icon={activeCategory.icon} size={24} />
              </span>
              <h2 className="font-heading text-h2 text-green-950">
                {activeCategory.title}
              </h2>
              <p className="mt-4 max-w-xl text-body-base text-green-700/90 leading-relaxed">
                {activeCategory.description}
              </p>

              <div className="my-8 w-full max-w-lg h-px bg-camel-400/50" />

              <ButtonLink href="/book" variant="primary" size="lg">
                Request a free consultation
              </ButtonLink>
            </div>

            {/* Therapists Subsection */}
            <div className="mt-16 pt-12 border-t border-camel-300/60">
              <h3 className="font-heading text-h3 text-green-950">
                Therapists Who Offer This Service
              </h3>

              {/* Therapist Cards Row with edge next-arrow */}
              <div className="relative mt-12">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {therapists.map((therapist, idx) => (
                    <article
                      key={therapist.name + idx}
                      className="flex flex-col items-center p-2 text-center"
                    >
                      <div className="relative size-44 overflow-hidden rounded-full bg-camel-200">
                        <Image
                          src={therapist.photo}
                          alt={`Photo of ${therapist.name}`}
                          fill
                          sizes="176px"
                          className="object-cover"
                        />
                      </div>

                      <h4 className="mt-6 font-body text-body-base-bold text-green-950">
                        {therapist.name}
                      </h4>
                      <p className="mt-1 text-body-sm text-green-700/80 font-medium">
                        {therapist.title}
                      </p>
                      <p className="mt-3 text-body-sm text-green-700/70 leading-normal line-clamp-3">
                        {therapist.focus}
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
                    className="absolute right-0 top-[96px] z-10 flex size-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-green-700 text-white shadow-ds2 transition hover:bg-green-800"
                  >
                    <ChevronRightIcon size={20} />
                  </button>
                )}
              </div>

              {/* Pagination indicators */}
              {therapists.length > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  {therapists.map((_, i) => (
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

        {/* Section 1 Quote (centered) with soft ellipse (Ellipse 7273) */}
        <div className="relative mt-20 flex justify-center">
          <div className="relative w-full max-w-[640px]">
            <Image
              src={quoteEllipseFreire}
              alt=""
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 w-[640px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2"
            />
            <figure className="relative text-center">
              <blockquote className="font-quote text-quote text-green-950 italic">
                &ldquo;{hero.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-body-base font-body text-green-700">
                {hero.quote.author}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
