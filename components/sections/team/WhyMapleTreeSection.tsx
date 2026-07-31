import type { TeamMemberDetail } from "@/data/team";

function MapleLeafIcon({ size = 54 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.5l2 3.5 3.5-1-1 3.5 3.5 2-3 2 1.5 3.5-3.5-1L12 21.5l-2-3-3.5 1 1.5-3.5-3-2 3.5-2-1-3.5 3.5 1z" />
      <path d="M12 14v7.5" />
    </svg>
  );
}

export function WhyMapleTreeSection({ member }: { member: TeamMemberDetail }) {
  if (!member.whyTreeTitle || !member.whyTreeText) return null;

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] pb-20 lg:pb-24">
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <div className="relative overflow-hidden rounded-[28px] border border-camel-400/80 bg-gradient-to-br from-[#ffffff] via-[#faf6f0] to-[#f3ebd9] p-8 sm:p-12 shadow-ds3 flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
          
          {/* Left: Maple Leaf Badge */}
          <div className="flex size-36 shrink-0 items-center justify-center rounded-full bg-camel-200/90 text-green-950 shadow-ds1 border border-camel-300">
            <MapleLeafIcon size={56} />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col items-start text-left">
            <h3 className="font-heading text-h2 text-green-950 mb-3">
              {member.whyTreeTitle}
            </h3>
            <div className="flex flex-col gap-3 text-body-base text-green-700/90 leading-relaxed">
              {member.whyTreeText.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
