import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { MailIcon, PhoneIcon, MapPinIcon } from "@/components/ui/icons";
import stayConnected1 from "@/public/images/decor/stayConnected1.svg";
import stayConnected2 from "@/public/images/decor/stayConnected2.svg";
import type { TeamMemberDetail } from "@/data/team";

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

export function TeamMemberHeroSection({ member }: { member: TeamMemberDetail }) {
  return (
    <section className="relative overflow-hidden bg-[#f7f0e7] pt-12 pb-16 lg:pt-16 lg:pb-20">
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:items-center">
          
          {/* ── Left Column: Member Meta & Details ── */}
          <div className="flex flex-col items-start">
            <h1 className="font-heading text-h1 text-green-950">
              {member.name}
            </h1>
            <p className="mt-1.5 text-body-base font-semibold text-green-700/80">
              {member.title}
            </p>

            <div className="mt-8 flex flex-col gap-5 border-t border-camel-300/50 pt-6 w-full">
              {/* Email */}
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-camel-200 text-green-800 shadow-ds1">
                  <MailIcon size={18} />
                </span>
                <div>
                  <p className="text-body-sm font-medium text-green-700/70">Email</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="mt-0.5 block text-body-base font-semibold text-green-950 hover:text-green-700 transition"
                  >
                    {member.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-camel-200 text-green-800 shadow-ds1">
                  <PhoneIcon size={18} />
                </span>
                <div>
                  <p className="text-body-sm font-medium text-green-700/70">Phone</p>
                  <a
                    href={`tel:${member.phone.replace(/[^0-9+]/g, "")}`}
                    className="mt-0.5 block text-body-base font-semibold text-green-950 hover:text-green-700 transition"
                  >
                    {member.phone}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-camel-200 text-green-800 shadow-ds1">
                  <MapPinIcon size={18} />
                </span>
                <div>
                  <p className="text-body-sm font-medium text-green-700/70">Location</p>
                  <p className="mt-0.5 text-body-base font-semibold text-green-950">
                    {member.location}
                  </p>
                </div>
              </div>

              {/* Core Skills */}
              <div className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-camel-200 text-green-800 shadow-ds1">
                  <SparklesIcon size={18} />
                </span>
                <div>
                  <p className="text-body-sm font-medium text-green-700/70">Core skills</p>
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
          <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-[28px] border border-camel-400/80 bg-gradient-to-br from-[#ffffff] to-[#faf6f0] p-6 shadow-ds3">
            {/* Top right inner leaf decor */}
            <Image
              src={stayConnected1}
              alt=""
              aria-hidden
              width={160}
              height={150}
              className="pointer-events-none absolute -top-4 -right-4 z-10 hidden opacity-60 lg:block"
            />
            {/* Bottom left inner leaf decor */}
            <Image
              src={stayConnected2}
              alt=""
              aria-hidden
              width={160}
              height={200}
              className="pointer-events-none absolute -bottom-6 -left-6 z-10 hidden opacity-60 lg:block"
            />

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-camel-200">
              <Image
                src={member.photo}
                alt={`Portrait of ${member.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-top"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
