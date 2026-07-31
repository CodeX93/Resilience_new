"use client";

import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { SolidMailIcon, SolidPhoneIcon, SolidMapPinIcon } from "@/components/ui/icons";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableImage } from "@/components/cms/EditableImage";
import stayConnected1 from "@/public/images/decor/stayConnected1.svg";
import stayConnected2 from "@/public/images/decor/stayConnected2.svg";
import type { TeamMember } from "@/lib/models/team-member";

function SparklesIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

interface TeamMemberHeroProps {
  member: TeamMember;
  setMember: (val: TeamMember) => void;
}

export function TeamMemberHeroSection({ member, setMember }: TeamMemberHeroProps) {
  const { isEditMode, updateTeamMember } = useCms();

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] pt-12 pb-16 lg:pt-16 lg:pb-20">
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:items-stretch">
          
          {/* ── Left Column: Member Meta & Details ── */}
          <div className="flex flex-col items-start">
            <h1 className="font-heading text-h1 text-green-950">
              {member.name}
            </h1>
            <p className="mt-1.5 text-body-base font-semibold text-green-700/80">
              {member.title}
            </p>

            <div className="mt-8 flex flex-col gap-0 border-t border-camel-300/50 pt-6 w-full">
              {/* Email */}
              <div className="flex items-start gap-4 border-b border-dashed border-[#e6dccf] pb-6 mb-6">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-b from-[#ffffff] via-[#FAF5EE] to-[#F1E8DC] border border-[#E8DFC5] shadow-[0_4px_14px_rgba(180,160,130,0.18)] text-[#7D5C3F]">
                  <SolidMailIcon size={22} />
                </span>
                <div>
                  <p className="text-body-sm font-medium text-[#8f7b66]">Email</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-0.5 block text-body-base font-semibold text-green-950 hover:text-green-700 transition"
                  >
                    {member.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 border-b border-dashed border-[#e6dccf] pb-6 mb-6">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-b from-[#ffffff] via-[#FAF5EE] to-[#F1E8DC] border border-[#E8DFC5] shadow-[0_4px_14px_rgba(180,160,130,0.18)] text-[#7D5C3F]">
                  <SolidPhoneIcon size={22} />
                </span>
                <div>
                  <p className="text-body-sm font-medium text-[#8f7b66]">Phone</p>
                  <a
                    href={`tel:${member.phone.replace(/[^0-9+]/g, "")}`}
                    className="mt-0.5 block text-body-base font-semibold text-green-950 hover:text-green-700 transition"
                  >
                    {member.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 border-b border-dashed border-[#e6dccf] pb-6 mb-6">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-b from-[#ffffff] via-[#FAF5EE] to-[#F1E8DC] border border-[#E8DFC5] shadow-[0_4px_14px_rgba(180,160,130,0.18)] text-[#7D5C3F]">
                  <SolidMapPinIcon size={22} />
                </span>
                <div>
                  <p className="text-body-sm font-medium text-[#8f7b66]">Location</p>
                  <p className="mt-0.5 text-body-base font-semibold text-green-950">
                    {member.location}
                  </p>
                </div>
              </div>

              {/* Core Skills */}
              <div className="flex items-start gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-b from-[#ffffff] via-[#FAF5EE] to-[#F1E8DC] border border-[#E8DFC5] shadow-[0_4px_14px_rgba(180,160,130,0.18)] text-[#7D5C3F]">
                  <SparklesIcon size={22} />
                </span>
                <div>
                  <p className="text-body-sm font-medium text-[#8f7b66]">Core skills</p>
                  <p className="mt-0.5 text-body-base font-semibold text-green-950">
                    {member.coreSkills}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <ButtonLink href="/book" variant="primary" size="lg" className="!bg-green-900 hover:!bg-green-950">
                Book an appointment
              </ButtonLink>
            </div>
          </div>

          {/* ── Right Column: Photo with Botanical Frame ── */}
          <div className="relative h-full">
            {/* Top-right leaf decor — outside card so it overflows the corner */}
            <Image
              src={stayConnected1}
              alt=""
              aria-hidden
              width={170}
              height={160}
              className="pointer-events-none absolute -top-6 -right-6 z-10 hidden opacity-80 lg:block"
            />
            {/* Bottom-left leaf decor — outside card so it overflows the corner */}
            <Image
              src={stayConnected2}
              alt=""
              aria-hidden
              width={170}
              height={210}
              className="pointer-events-none absolute -bottom-8 -left-8 z-10 hidden opacity-80 lg:block"
            />

            {/* Photo card — fills full height of left column, no inner padding */}
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-[28px] border border-camel-400/80 shadow-ds3 bg-[#ede8df]">
              {isEditMode ? (
                <EditableImage
                  pageId={`team-${member.slug}`}
                  path="photo"
                  src={member.photo}
                  alt={member.photoAlt || `Portrait of ${member.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-top"
                  onSave={async (src, alt) => {
                    const updated = { ...member, photo: src, photoAlt: alt };
                    setMember(updated);
                    await updateTeamMember(member.slug, { photo: src, photoAlt: alt });
                  }}
                />
              ) : member.photo ? (
                <Image
                  src={member.photo}
                  alt={member.photoAlt || `Portrait of ${member.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover object-top"
                />
              ) : null}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
