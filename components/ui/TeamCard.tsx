import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import type { TeamMember } from "@/lib/models/team-member";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="group flex flex-col items-center text-center">
      {/* Circular Photo with Soft Drop Shadow & Border */}
      <Link
        href={`/team/${member.slug}`}
        className="relative size-[230px] overflow-hidden rounded-full border border-[#e8dfce]/90 bg-[#f4eee6] shadow-[0_8px_24px_rgba(160,135,100,0.18)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_32px_rgba(160,135,100,0.25)]"
      >
        {member.photo && (
          <Image
            src={member.photo}
            alt={member.photoAlt || `Portrait of ${member.name}`}
            fill
            sizes="230px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </Link>

      {/* Name — Extra Bold */}
      <h3 className="mt-5 font-heading text-[20px] text-green-950 font-extrabold leading-snug">
        <Link href={`/team/${member.slug}`} className="hover:text-green-800 transition-colors">
          {member.name}
        </Link>
      </h3>

      {/* Role Title */}
      <p className="mt-1 font-heading text-body-sm text-[#7a6a57] font-medium">
        {member.title}
      </p>

      {/* Focus / Description */}
      <p className="mt-2.5 font-heading text-body-sm text-[#948370] leading-relaxed max-w-[260px] line-clamp-3">
        {member.focus}
      </p>

      {/* View Profile Link — Extra Bold Green 700 / Primary */}
      <Link
        href={`/team/${member.slug}`}
        className="mt-4 inline-flex items-center gap-1.5 font-heading text-body-sm font-extrabold text-[#34483d] transition-colors hover:text-green-950"
      >
        View Profile
        <ArrowUpRightIcon size={14} className="text-[#34483d] stroke-[3] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </article>
  );
}
