"use client";

import Image from "next/image";
import quoteEllipseWide from "@/public/images/decor/quote-ellipse-wide.svg";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableImage } from "@/components/cms/EditableImage";
import type { TeamMember } from "@/lib/models/team-member";

interface TeamMemberBioProps {
  member: TeamMember;
  setMember: (val: TeamMember) => void;
}

export function TeamMemberBioSection({ member, setMember }: TeamMemberBioProps) {
  const { isEditMode, updateTeamMember } = useCms();

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
            {/* Tree illustration — no decorative card, just the image */}
            <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
              {isEditMode ? (
                <EditableImage
                  pageId={`team-${member.slug}`}
                  path="treeArtwork"
                  src={member.treeArtwork}
                  alt={member.treeArtworkAlt || "Tree illustration representing strength and growth"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-center"
                  onSave={async (src, alt) => {
                    const updated = { ...member, treeArtwork: src, treeArtworkAlt: alt };
                    setMember(updated);
                    await updateTeamMember(member.slug, { treeArtwork: src, treeArtworkAlt: alt });
                  }}
                />
              ) : member.treeArtwork ? (
                <Image
                  src={member.treeArtwork}
                  alt={member.treeArtworkAlt || "Tree illustration representing strength and growth"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-center"
                />
              ) : null}
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
