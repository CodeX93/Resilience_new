import Image from "next/image";
import { aboutPageData } from "@/data/about";
import { ButtonLink } from "@/components/ui/Button";
import heroBranch from "@/public/images/decor/hero-branch.svg";

export function RootedInConnectionSection() {
  const { banner } = aboutPageData;

  return (
    <section className="relative overflow-hidden bg-[#f7f0e7] py-20 lg:py-24">
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <div className="relative overflow-hidden rounded-[28px] border border-camel-400/80 bg-gradient-to-br from-[#ffffff] via-[#faf6f0] to-[#f3ebd9] p-10 sm:p-14 text-center shadow-ds3">
          {/* Inner decor illustration left */}
          <Image
            src={heroBranch}
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -left-10 z-0 hidden w-[220px] opacity-50 lg:block"
          />

          <div className="relative z-10 flex flex-col items-center">
            <h2 className="font-heading text-h2 text-green-950 max-w-2xl">
              {banner.heading}
            </h2>
            <p className="mt-3 text-body-base text-green-700/90 max-w-md">
              {banner.subheading}
            </p>
            <div className="mt-8">
              <ButtonLink href={banner.ctaHref} variant="primary" size="lg">
                {banner.ctaLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
