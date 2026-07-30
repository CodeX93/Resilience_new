"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { team } from "@/data/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import type { TeamMember } from "@/data/home";

/* ─── Team card ─────────────────────────────────────────────────────────── */
function TeamCard({ member }: { member: TeamMember }) {
  return (
    <a
      href={member.href}
      className="group flex w-[220px] shrink-0 flex-col items-center text-center"
    >
      {/* Circular photo */}
      <div className="relative size-[220px] overflow-hidden rounded-full bg-[#ede8df] shadow-ds3 transition-transform duration-300 group-hover:-translate-y-1.5">
        <Image
          src={member.photo}
          alt={`Portrait of ${member.name}`}
          fill
          sizes="220px"
          className="object-cover object-top"
        />
      </div>

      {/* Name */}
      <p className="mt-5 text-body-base-bold text-green-950">{member.name}</p>
      {/* Title */}
      <p className="mt-1 text-body-sm text-green-700/80">{member.title}</p>
    </a>
  );
}

/* ─── Arrow button ───────────────────────────────────────────────────────── */
function ArrowBtn({
  dir,
  disabled,
  onClick,
}: {
  dir: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={dir === "left" ? "Previous" : "Next"}
      onClick={onClick}
      disabled={disabled}
      className={`
        absolute top-[110px] z-10 flex size-12 items-center justify-center
        rounded-full shadow-ds2 transition-colors duration-200
        ${dir === "left" ? "-left-6" : "-right-6"}
        ${
          disabled
            ? "cursor-default bg-white text-green-700 opacity-60"
            : "bg-green-950 text-white hover:bg-green-800"
        }
      `}
    >
      {dir === "left" ? (
        <ChevronLeftIcon size={20} />
      ) : (
        <ChevronRightIcon size={20} />
      )}
    </button>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export function MeetOurTeamSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState(0);
  const count = team.members.length;

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
    const frac = max > 0 ? el.scrollLeft / max : 0;
    setActive(Math.round(frac * (count - 1)));
  };

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <section className="bg-[#fdf9f4] py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">

        {/* Heading — centered */}
        <SectionHeading eyebrow={team.eyebrow} heading={team.heading} />

        {/* Carousel track */}
        <div className="relative mt-14">
          <ArrowBtn dir="left" disabled={atStart} onClick={() => scrollBy(-1)} />

          <div
            ref={trackRef}
            role="group"
            aria-label="Our team members"
            className="flex snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth px-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {team.members.map((member, i) => (
              <div key={i} className="snap-start">
                <TeamCard member={member} />
              </div>
            ))}
          </div>

          <ArrowBtn dir="right" disabled={atEnd} onClick={() => scrollBy(1)} />
        </div>

        {/* Footer row: dots left · CTA right */}
        <div className="mt-8 flex items-center justify-between">
          {/* Pagination dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to member ${i + 1}`}
                onClick={() => {
                  const el = trackRef.current;
                  if (!el) return;
                  const max = el.scrollWidth - el.clientWidth;
                  el.scrollTo({
                    left: (max * i) / Math.max(count - 1, 1),
                    behavior: "smooth",
                  });
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-7 bg-green-950"
                    : "w-2 bg-green-300"
                }`}
              />
            ))}
          </div>

          {/* CTA */}
          <ButtonLink href={team.ctaHref} variant="secondary" size="md">
            {team.ctaLabel}
          </ButtonLink>
        </div>

      </div>
    </section>
  );
}
