import Image from "next/image";
import { aboutPageData } from "@/data/about";
import { SectionIdentifier } from "@/components/ui/SectionIdentifier";
import { ButtonLink } from "@/components/ui/Button";
import decorLeft from "@/public/images/decor/who-we-are-decor-left.svg";
import waveBottom from "@/public/images/decor/who-we-are-wave-top.svg";
import quoteEllipseWide from "@/public/images/decor/quote-ellipse-wide.svg";
import branchLg from "@/public/images/decor/about-branch-lg.svg";
import branchSm from "@/public/images/decor/about-branch-sm.svg";

export function WhoWeAreAboutSection() {
  const { whoWeAre } = aboutPageData;

  return (
    <section className="relative overflow-hidden bg-[#f7f0e7] py-20 lg:py-24">
      {/* ── Decor Left: Frame 1948757454 (189×457px organic blob) ── */}
      <Image
        src={decorLeft}
        alt=""
        aria-hidden
        width={189}
        height={457}
        className="pointer-events-none absolute left-0 top-0 z-0 hidden h-full w-auto object-left-top object-cover lg:block"
      />

      {/* ── Wave Bottom-Right: Vector 32 (1132×459px sweeping cream wave) ── */}
      <Image
        src={waveBottom}
        alt=""
        aria-hidden
        width={1132}
        height={459}
        className="pointer-events-none absolute bottom-0 right-0 z-0 hidden w-[65%] max-w-[830px] lg:block"
      />

      {/* ── Cream branch cluster, top-right (Group 1597881399 + 1597881400) ── */}
      <Image
        src={branchLg}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -top-2 right-24 z-[1] hidden w-[238px] max-w-[20vw] lg:block"
      />
      <Image
        src={branchSm}
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-16 right-4 z-[1] hidden w-[103px] max-w-[9vw] lg:block"
      />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        {/* Two-column grid: text left | image right */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: text content */}
          <div className="flex flex-col items-start">
            <SectionIdentifier>{whoWeAre.eyebrow}</SectionIdentifier>

            <h1 className="mt-6 font-heading text-h2 text-green-950">
              {whoWeAre.heading}
            </h1>

            <div className="mt-6 flex flex-col gap-5">
              {whoWeAre.paragraphs.map((p, i) => (
                <p key={i} className="text-body-base text-green-700/90 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <ButtonLink
              href={whoWeAre.ctaHref}
              variant="secondary"
              size="lg"
              className="mt-8"
            >
              {whoWeAre.ctaLabel}
            </ButtonLink>
          </div>

          {/* Right: forest photo */}
          <div className="relative aspect-[635/413] w-full overflow-hidden rounded-3xl shadow-ds4">
            <Image
              src={whoWeAre.image}
              alt={whoWeAre.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Quote block — right-aligned under image column */}
        <div className="relative mt-10 flex justify-end">
          <div className="relative w-full max-w-[440px]">
            <Image
              src={quoteEllipseWide}
              alt=""
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 w-[460px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2"
            />
            <figure className="relative text-center">
              <blockquote className="font-quote text-quote text-green-950 italic">
                &ldquo;{whoWeAre.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-body-base font-body text-green-700">
                &mdash; {whoWeAre.quote.author}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
