import Image from "next/image";
import quoteEllipseWide from "@/public/images/decor/quote-ellipse-wide.svg";
import type { TeamMemberDetail } from "@/data/team";

export function TeamMemberBioSection({ member }: { member: TeamMemberDetail }) {
  return (
    <section className="relative overflow-hidden bg-[#f7f0e7] py-16 lg:py-24">
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:items-start">
          
          {/* ── Left Column: Biography Text ── */}
          <div className="flex flex-col items-start">
            <h2 className="font-heading text-h2 text-green-950 mb-6">
              Biography
            </h2>

            <div className="flex flex-col gap-5 text-body-base text-green-700/90 leading-relaxed">
              {member.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* ── Right Column: Tree Artwork + Quote ── */}
          <div className="flex flex-col items-center">
            {/* Tree Artwork Card */}
            <div className="relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl border border-camel-400/80 bg-white p-6 shadow-ds2">
              <Image
                src={member.treeArtwork || "/images/about/our-approach.jpg"}
                alt="Maple tree illustration representing strength and growth"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>

            {/* Quote below Artwork */}
            {member.treeQuote && (
              <div className="relative mt-8 w-full max-w-md">
                <Image
                  src={quoteEllipseWide}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 w-[420px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 opacity-70"
                />
                <figure className="relative text-center">
                  <blockquote className="font-quote text-quote text-green-950 italic leading-snug">
                    &ldquo;{member.treeQuote}&rdquo;
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
