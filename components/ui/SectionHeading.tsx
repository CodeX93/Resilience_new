import { SectionIdentifier } from "./SectionIdentifier";

/** Centered eyebrow pill + section heading, used across Home sections. */
export function SectionHeading({
  eyebrow,
  heading,
  align = "center",
  className,
}: {
  eyebrow: string;
  heading: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      } ${className ?? ""}`}
    >
      <SectionIdentifier>{eyebrow}</SectionIdentifier>
      <h2 className="font-heading text-h2 text-green-950">{heading}</h2>
    </div>
  );
}
