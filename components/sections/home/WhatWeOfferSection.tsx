/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { whatWeOffer as defaultWhatWeOffer } from "@/data/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableText } from "@/components/cms/EditableText";
import {
  ArrowUpRightIcon,
  UsersIcon,
  FamilyIcon,
  HandsIcon,
} from "@/components/ui/icons";
import offerLeaves from "@/public/images/decor/offer-leaves.svg";
import offerLeafLeft from "@/public/images/decor/offer-leaf-left.svg";
import quoteEllipseWide from "@/public/images/decor/quote-ellipse-wide.svg";

const cardIcon = {
  users: UsersIcon,
  family: FamilyIcon,
  hands: HandsIcon,
};

function OfferCard({
  title,
  icon,
  href,
  index,
}: {
  title: string;
  icon: keyof typeof cardIcon;
  href: string;
  index: number;
}) {
  const Icon = cardIcon[icon];
  return (
    <article className="flex h-[188px] w-[413px] max-w-[82vw] flex-col justify-between rounded-2xl border border-camel-400/70 p-6" style={{ background: "linear-gradient(180deg, #FFFCF7 0%, #E8E2D8 100%)" }}>
      <div className="flex items-start justify-between">
        <span className="flex size-10 items-center justify-center rounded-xl bg-white/70 text-green-700 shadow-[0px_3px_3.5px_#f6e8da]">
          <Icon size={20} />
        </span>
        <Link
          href={href}
          aria-label={`Learn more about ${title}`}
          className="flex size-[30px] items-center justify-center rounded-full border border-green-300 text-green-700 transition-colors hover:bg-green-50"
        >
          <ArrowUpRightIcon size={15} />
        </Link>
      </div>
      <h3 className="max-w-[75%] text-body-xl text-green-950">
        <EditableText pageId="home" path={`whatWeOffer.cards[${index}].title`} value={title} />
      </h3>
    </article>
  );
}

export function WhatWeOfferSection() {
  const { getContentValue } = useCms();
  const whatWeOffer = getContentValue("home", "whatWeOffer", defaultWhatWeOffer);

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] py-20 lg:py-24">
      {/* Decorative leaves */}
      <Image
        src={offerLeaves}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-2 right-0 z-0 hidden w-[220px] lg:block"
      />
      <Image
        src={offerLeafLeft}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 top-6 z-0 hidden w-[60px] opacity-70 lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <SectionHeading
          eyebrow={<EditableText pageId="home" path="whatWeOffer.eyebrow" value={whatWeOffer.eyebrow} />}
          heading={<EditableText pageId="home" path="whatWeOffer.heading" value={whatWeOffer.heading} />}
        />

        <Carousel ariaLabel="Services we offer" className="mt-12">
          {whatWeOffer.cards.map((card: any, index: number) => (
            <OfferCard key={index} {...card} index={index} />
          ))}
        </Carousel>

        {/* Quote with soft ellipse illustration */}
        <div className="relative mt-16 w-fit max-w-full">
          <Image
            src={quoteEllipseWide}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full scale-[1.15] object-fill opacity-100"
          />
          <figure className="relative py-8 pl-2 pr-4">
            <blockquote className="font-quote max-w-[520px] text-[28px] leading-relaxed tracking-normal text-[#485b50]">
              &ldquo;<EditableText pageId="home" path="whatWeOffer.quote.text" value={whatWeOffer.quote.text} isTextArea />&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-right font-quote text-[28px] leading-relaxed tracking-normal text-[#485b50]">
              &ndash;&nbsp;<EditableText pageId="home" path="whatWeOffer.quote.author" value={whatWeOffer.quote.author} />
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
