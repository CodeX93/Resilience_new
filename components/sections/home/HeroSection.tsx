import Image from "next/image";
import { hero } from "@/data/home";
import { ButtonLink } from "@/components/ui/Button";
import { SectionIdentifier } from "@/components/ui/SectionIdentifier";
import { Quote } from "@/components/ui/Quote";
import { ClockIcon } from "@/components/ui/icons";
import leaf from "@/public/images/icons/leaf.svg";
import heroBranch from "@/public/images/decor/hero-branch.svg";
import heroBgShape from "@/public/images/decor/hero-bg-shape.svg";
import quoteEllipse from "@/public/images/decor/quote-ellipse.svg";

function VideoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2.5" y="6" width="13" height="12" rx="2" />
      <path d="m15.5 10 6-3.5v11L15.5 14" />
    </svg>
  );
}

function LeafBullet() {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-mint-300 bg-white shadow-[0px_3px_3.5px_#f6e8da]">
      <Image src={leaf} alt="" width={16} height={16} aria-hidden />
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f0e7]">
      {/* Right-side organic background shape (Figma Vector 34) */}
      <Image
        src={heroBgShape}
        alt=""
        aria-hidden
        priority
        className="pointer-events-none absolute bottom-0 right-0 z-0 hidden h-auto w-[62%] max-w-[1086px] lg:block"
      />
      {/* Bottom-left leaf branch illustration (Figma Group 1597881384) */}
      <Image
        src={heroBranch}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 z-0 hidden h-[300px] w-auto lg:block"
      />

      <div className="relative z-10 mx-auto grid max-w-[1440px] items-start gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1fr_522px] lg:gap-16 lg:px-20 lg:py-20">
        {/* Left column */}
        <div className="flex flex-col items-start">
          <SectionIdentifier>{hero.eyebrow}</SectionIdentifier>

          <h1 className="mt-6 max-w-[736px] font-heading text-h1 text-green-950">
            {hero.heading}
          </h1>

          <ul className="mt-8 flex max-w-[724px] flex-col gap-4">
            {hero.bullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3">
                <LeafBullet />
                <span className="text-body-sm text-green-700">{bullet}</span>
              </li>
            ))}
          </ul>

          {/* Quote with soft ellipse highlight behind it (Figma Ellipse 7271) */}
          <div className="relative mt-16 w-full max-w-[440px] self-center">
            <Image
              src={quoteEllipse}
              alt=""
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 w-[460px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2"
            />
            <Quote
              className="relative"
              text={hero.quote.text}
              author={hero.quote.author}
            />
          </div>
        </div>

        {/* Consultation card */}
        <div className="w-full rounded-[20px] border border-green-200 bg-gradient-to-b from-[#fffcf7] to-[#e8e2d8] p-8 shadow-ds4">
          <p className="mx-auto max-w-[291px] text-center text-body-lg text-green-700">
            {hero.card.heading}
          </p>

          <div className="mt-7 flex flex-col gap-6">
            {hero.card.rows.map((row) => (
              <div key={row.label} className="flex flex-col gap-6">
                <span className="block h-px w-full bg-camel-600/40" />
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-3 text-body-base text-green-600">
                    {row.icon === "clock" ? <ClockIcon size={20} /> : <VideoIcon size={20} />}
                    {row.label}
                  </span>
                  <span className="text-body-base-bold text-green-700">{row.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-4">
            <ButtonLink href={hero.card.ctaHref} size="lg" className="w-full">
              {hero.card.ctaLabel}
            </ButtonLink>
            <p className="text-center text-body-sm text-green-600">{hero.card.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
