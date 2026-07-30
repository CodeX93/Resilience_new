"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { teamRoleCategories, teamMembersList, type TeamMemberDetail } from "@/data/team";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import offerLeaves from "@/public/images/decor/offer-leaves.svg";
import offerLeafLeft from "@/public/images/decor/offer-leaf-left.svg";
import heroBranch from "@/public/images/decor/hero-branch.svg";

export function TherapistsGridSection() {
  const [selectedRole, setSelectedRole] = useState<string>("All");

  // Filter members by role
  const filteredMembers =
    selectedRole === "All"
      ? teamMembersList
      : teamMembersList.filter((m) =>
          m.roleCategory.toLowerCase().includes(selectedRole.toLowerCase())
        );

  return (
    <section className="relative overflow-hidden bg-[#f7f0e7] pt-12 pb-20 lg:pt-16 lg:pb-24">
      {/* Decorative top-right branch */}
      <Image
        src={offerLeaves}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 z-0 hidden w-[240px] opacity-75 lg:block"
      />

      {/* Decorative left branch */}
      <Image
        src={offerLeafLeft}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 top-36 z-0 hidden w-[160px] opacity-70 lg:block"
      />

      {/* Decorative bottom-right branch */}
      <Image
        src={heroBranch}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-12 z-0 hidden w-[220px] opacity-60 lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        {/* Page Title */}
        <h1 className="font-heading text-h1 text-center text-green-950 mb-8">
          Our Therapists
        </h1>

        {/* Role Filter Pills Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-5xl mx-auto mb-14">
          {teamRoleCategories.map((role) => {
            const isActive = role === selectedRole;
            return (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`rounded-full px-5 py-2.5 text-body-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-green-950 text-white shadow-ds2"
                    : "border border-camel-400/60 bg-white/80 text-green-950 hover:bg-camel-200/80"
                }`}
              >
                {role}
              </button>
            );
          })}
        </div>

        {/* Grid of Therapists */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <article
              key={member.slug}
              className="group flex flex-col items-center text-center"
            >
              {/* Circular Photo */}
              <Link
                href={`/team/${member.slug}`}
                className="relative size-[220px] overflow-hidden rounded-full bg-[#ede8df] shadow-ds3 transition-transform duration-300 group-hover:-translate-y-1.5"
              >
                <Image
                  src={member.photo}
                  alt={`Portrait of ${member.name}`}
                  fill
                  sizes="220px"
                  className="object-cover object-top"
                />
              </Link>

              {/* Name */}
              <h3 className="mt-5 font-body font-bold text-body-base-bold text-green-950">
                <Link href={`/team/${member.slug}`} className="hover:text-green-800 transition-colors">
                  {member.name}
                </Link>
              </h3>

              {/* Title */}
              <p className="mt-1 text-body-sm text-green-700/80 font-medium">
                {member.title}
              </p>

              {/* Focus / Description */}
              <p className="mt-2 text-body-sm text-green-700/70 leading-relaxed max-w-[250px] line-clamp-3">
                {member.focus}
              </p>

              {/* Link CTA */}
              <Link
                href={`/team/${member.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-body-sm font-bold text-green-800 transition-colors hover:text-green-950"
              >
                View Profile
                <ArrowUpRightIcon size={14} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
