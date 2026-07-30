import Image from "next/image";
import leaf from "@/public/images/icons/leaf.svg";

/**
 * The small pill/eyebrow shown above each section heading in the design
 * (e.g. "Therapies, Workshops, and Holistic Services").
 */
export function SectionIdentifier({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-green-300/50 bg-green-200 px-4 py-1.5 text-body-sm text-green-700 ${
        className ?? ""
      }`}
    >
      <Image src={leaf} alt="" width={14} height={14} aria-hidden />
      {children}
    </span>
  );
}
