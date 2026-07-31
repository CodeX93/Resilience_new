"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { teamRoleCategories } from "@/data/team";
import { TeamCard } from "@/components/ui/TeamCard";
import { useCms } from "@/components/cms/CmsProvider";
import offerLeaves from "@/public/images/decor/offer-leaves.svg";
import offerLeafLeft from "@/public/images/decor/offer-leaf-left.svg";
import heroBranch from "@/public/images/decor/hero-branch.svg";

export function TherapistsGridSection() {
  const { teamMembers, loadTeamMembers } = useCms();
  const [selectedRole, setSelectedRole] = useState<string>("All");

  useEffect(() => {
    loadTeamMembers();
  }, [loadTeamMembers]);

  // Filter members by role
  const filteredMembers =
    selectedRole === "All"
      ? teamMembers
      : teamMembers.filter((m) =>
          m.roleCategory?.toLowerCase().includes(selectedRole.toLowerCase())
        );

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] pt-12 pb-20 lg:pt-16 lg:pb-24">
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
        {filteredMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-8 rounded-3xl border border-camel-300 bg-white/60 shadow-ds3 max-w-2xl mx-auto py-16">
            <div className="relative w-28 h-28 bg-camel-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <span className="text-5xl" role="img" aria-label="Leaves">🌿</span>
            </div>
            <h3 className="font-heading text-h3 text-green-950 mb-2">No Therapists Found</h3>
            <p className="text-body-base text-green-700/80 max-w-md leading-relaxed">
              We couldn&apos;t find any therapists matching this category yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
