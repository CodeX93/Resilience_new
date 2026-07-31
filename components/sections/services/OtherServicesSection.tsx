import Image from "next/image";
import { servicesPageData } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { FileTextIcon, UserCheckIcon, AwardIcon } from "@/components/ui/icons";
import servicesBranchB from "@/public/images/decor/services-branch-b.svg";

function OtherServiceIcon({ icon, size = 20 }: { icon: string; size?: number }) {
  switch (icon) {
    case "file-text":
      return <FileTextIcon size={size} />;
    case "user-check":
      return <UserCheckIcon size={size} />;
    case "award":
      return <AwardIcon size={size} />;
    default:
      return <FileTextIcon size={size} />;
  }
}

export function OtherServicesSection() {
  const { otherServices } = servicesPageData;

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] py-20 lg:py-24">
      {/* Decorative leaf branch top-left (Group (1).svg) */}
      <Image
        src={servicesBranchB}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 top-4 z-0 hidden w-[200px] lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <SectionHeading
          eyebrow={otherServices.eyebrow}
          heading={otherServices.heading}
        />

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {otherServices.cards.map((card) => (
            <article
              key={card.title}
              className="flex flex-col justify-between rounded-3xl border border-camel-400/70 p-8 shadow-ds2 transition-transform duration-300 hover:-translate-y-1"
              style={{ background: "linear-gradient(180deg, #FFFCF7 0%, #E8E2D8 100%)" }}
            >
              <div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-camel-200/80 text-green-700 shadow-ds1 mb-6">
                  <OtherServiceIcon icon={card.icon} size={22} />
                </div>
                <h3 className="font-heading text-h3 text-green-950 mb-4">
                  {card.title}
                </h3>
                <p className="text-body-base text-green-700/90 leading-relaxed">
                  {card.description}
                </p>
                {card.subtext && (
                  <p className="mt-4 text-body-sm text-green-700/80 leading-relaxed border-t border-camel-300/50 pt-4">
                    {card.subtext}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink href={otherServices.ctaHref} variant="primary" size="lg">
            {otherServices.ctaLabel}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
