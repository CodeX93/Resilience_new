"use client";

import { useState, useEffect } from "react";
import { useCms } from "@/components/cms/CmsProvider";
import { TeamMemberHeroSection } from "./TeamMemberHeroSection";
import { TeamMemberBioSection } from "./TeamMemberBioSection";
import { WhyMapleTreeSection } from "./WhyMapleTreeSection";
import type { TeamMember } from "@/lib/models/team-member";

interface TeamMemberDetailPageClientProps {
  slug: string;
}

export function TeamMemberDetailPageClient({ slug }: TeamMemberDetailPageClientProps) {
  const { teamMembers, loadTeamMembers } = useCms();
  const [member, setMember] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      if (teamMembers.length === 0) {
        await loadTeamMembers();
      }
      try {
        const res = await fetch(`/api/cms/team?slug=${slug}`);
        if (res.ok && active) {
          const data = await res.json();
          if (data.member) {
            setMember(data.member);
          }
        }
      } catch (err) {
        console.error("Error fetching team member details:", err);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [slug, teamMembers.length, loadTeamMembers]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#faf2ef]">
        <div className="text-center">
          <span className="text-4xl animate-bounce inline-block mb-2">🌿</span>
          <p className="text-green-800 font-semibold">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#faf2ef]">
        <div className="text-center">
          <span className="text-5xl inline-block mb-4">🔍</span>
          <h2 className="font-heading text-h3 text-green-950 font-bold mb-2">Therapist Not Found</h2>
          <p className="text-green-700/80 mb-6">The profile you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <TeamMemberHeroSection member={member} setMember={setMember} />
      <TeamMemberBioSection member={member} setMember={setMember} />
      <WhyMapleTreeSection member={member} />
    </>
  );
}
