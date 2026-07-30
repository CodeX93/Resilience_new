import Link from "next/link";
import Image from "next/image";
import { whatWeOffer } from "@/data/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Carousel } from "@/components/ui/Carousel";
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
}: {
  title: string;
  icon: keyof typeof cardIcon;
  href: string;
}) {
  const Icon = cardIcon[icon];
  return (
    <article className="flex h-[188px] w-[413px] max-w-[82vw] flex-col justify-between rounded-2xl border border-camel-400/70 bg-gradient-to-br from-[#fdfaf4] to-[#ece1d2] p-6">
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
      <h3 className="max-w-[75%] text-body-xl text-green-950">{title}</h3>
    </article>
  );
}

export function WhatWeOfferSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f0e7] py-20 lg:py-24">
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
        <SectionHeading eyebrow={whatWeOffer.eyebrow} heading={whatWeOffer.heading} />

        <Carousel ariaLabel="Services we offer" className="mt-12">
          {whatWeOffer.cards.map((card) => (
            <OfferCard key={card.title} {...card} />
          ))}
        </Carousel>

        {/* Quote (left-aligned) with soft ellipse behind it */}
        <div className="relative mt-16 w-fit max-w-full">
          <Image
            src={quoteEllipseWide}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-0 top-1/2 w-[574px] max-w-full -translate-y-1/2"
          />
          <figure className="relative">
            <blockquote className="max-w-[560px] text-quote text-green-700">
              &ldquo;{whatWeOffer.quote.text}&rdquo;
            </blockquote>
            <figcaption className="mt-3 pl-10 text-body-base text-green-600">
              &mdash; {whatWeOffer.quote.author}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
