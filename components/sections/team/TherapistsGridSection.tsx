"use client";

import { useState } from "react";
import Image from "next/image";
import { teamRoleCategories, teamMembersList } from "@/data/team";
import { TeamCard } from "@/components/ui/TeamCard";
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
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto mb-14">
          {teamRoleCategories.map((role) => {
            const isActive = role === selectedRole;
            return (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`font-heading text-body-sm transition-all duration-200 ${
                  isActive
                    ? "rounded-full bg-[#34483d] text-white px-6 py-2.5 shadow-ds2 font-medium"
                    : "rounded-xl border border-[#e4dacb] bg-black/[0.04] text-green-950 px-5 py-2.5 hover:bg-black/[0.08] font-medium"
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
            <TeamCard key={member.slug} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
