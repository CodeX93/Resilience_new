import Image from "next/image";
import { whoWeAre } from "@/data/home";
import { SectionIdentifier } from "@/components/ui/SectionIdentifier";
import { ButtonLink } from "@/components/ui/Button";
import decorLeft from "@/public/images/decor/who-we-are-decor-left.svg";
import waveBottom from "@/public/images/decor/who-we-are-wave-top.svg";
import quoteEllipseWide from "@/public/images/decor/quote-ellipse-wide.svg";

export function WhoWeAreSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f0e7] py-20 lg:py-24">

      {/* ── Decor Left: Frame 1948757454 (189×457px organic blob)
              Sits flush with the left edge of the viewport, spanning the full
              height of the section. The SVG's own clip-path keeps it tidy.    ── */}
      <Image
        src={decorLeft}
        alt=""
        aria-hidden
        width={189}
        height={457}
        className="pointer-events-none absolute left-0 top-0 z-0 hidden h-full w-auto object-left-top object-cover lg:block"
      />

      {/* ── Wave Bottom-Right: Vector 32 (1132×459px sweeping cream wave)
              Anchored to the bottom-right of the section — its path peaks on
              the right and sweeps down-left, forming a subtle wave under the
              image column.                                                     ── */}
      <Image
        src={waveBottom}
        alt=""
        aria-hidden
        width={1132}
        height={459}
        className="pointer-events-none absolute bottom-0 right-0 z-0 hidden w-[65%] max-w-[830px] lg:block"
      />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">

        {/* Two-column grid: text left | image right */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left: text content */}
          <div className="flex flex-col items-start">
            <SectionIdentifier>{whoWeAre.eyebrow}</SectionIdentifier>

            <h2 className="mt-6 font-heading text-h2 text-green-950">
              {whoWeAre.heading}
            </h2>

            <div className="mt-6 flex flex-col gap-5">
              {whoWeAre.paragraphs.map((p, i) => (
                <p key={i} className="text-body-base text-green-700/90">
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

        {/* Quote block — right-aligned to sit under the image column */}
        <div className="relative mt-10 flex justify-end">
          <div className="relative w-full max-w-[400px]">
            <Image
              src={quoteEllipseWide}
              alt=""
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 w-[420px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2"
            />
            <figure className="relative text-center">
              <blockquote className="text-quote text-green-700">
                &ldquo;{whoWeAre.quote.text}&rdquo;
              </blockquote>
              <figcaption className="mt-3 text-body-base text-green-600">
                &mdash; {whoWeAre.quote.author}
              </figcaption>
            </figure>
          </div>
        </div>

      </div>
    </section>
  );
}
