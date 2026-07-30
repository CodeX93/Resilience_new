import Image from "next/image";
import leaf from "@/public/images/icons/leaf.svg";

/**
 * Placeholder for imagery not yet exported from Figma (team photos, blog and
 * "Who We Are" images). Swap for <Image src={realSrc} …/> once assets land —
 * the intended src/alt already live in data/home.ts.
 */
export function ImagePlaceholder({
  className,
  label,
  rounded = "rounded-2xl",
}: {
  className?: string;
  label?: string;
  rounded?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center overflow-hidden bg-gradient-to-br from-mint-300 via-mint-400 to-green-300 ${rounded} ${
        className ?? ""
      }`}
    >
      <Image src={leaf} alt="" width={40} height={40} className="opacity-40" aria-hidden />
    </div>
  );
}
