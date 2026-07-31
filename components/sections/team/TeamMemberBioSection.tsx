import Image from "next/image";
import quoteEllipseWide from "@/public/images/decor/quote-ellipse-wide.svg";
import type { TeamMemberDetail } from "@/data/team";

export function TeamMemberBioSection({ member }: { member: TeamMemberDetail }) {
  return (
    <section className="relative overflow-hidden bg-[#faf2ef] py-16 lg:py-24">
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:items-start">

          {/* ── Left Column: Biography Text ── */}
          <div className="flex flex-col items-start">
            <h2 className="font-heading text-h2 text-green-950 mb-8">
              Biography
            </h2>

            <div className="flex flex-col gap-5 text-body-base text-green-700/80 leading-relaxed text-justify">
              {member.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* ── Right Column: Tree Illustration + Quote ── */}
          <div className="flex flex-col items-stretch gap-6">
            {/* Tree image card — rounded, bordered, cream background */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-camel-300/80 bg-[#EDE5DC] shadow-ds2" style={{ aspectRatio: "4/3" }}>
              <Image
                src={member.treeArtwork || "/images/about/our-approach.jpg"}
                alt="Tree illustration representing strength and growth"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center"
              />
            </div>

            {/* Quote — large italic serif with ellipse background illustration */}
            {member.treeQuote && (
              <div className="relative px-2 py-6">
                <Image
                  src={quoteEllipseWide}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 w-[110%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-80"
                />
                <figure className="relative">
                  <blockquote className="font-quote text-[1.25rem] leading-relaxed text-green-950 italic">
                    &ldquo;&thinsp;{member.treeQuote}&rdquo;
                  </blockquote>
                </figure>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
