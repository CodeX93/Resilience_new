import Link from "next/link";
import Image from "next/image";
import leafMark from "@/public/images/brand/logo-leaf.png";
import fullLogo from "@/public/images/brand/logo-mark.png";

/**
 * Brand logo. `variant="mark"` shows just the leaf mark (used in the nav);
 * `variant="full"` shows the leaf + "Resilience Counselling" wordmark.
 */
export function Logo({
  variant = "mark",
  height = 44,
  className,
  priority = false,
}: {
  variant?: "mark" | "full";
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const src = variant === "mark" ? leafMark : fullLogo;
  return (
    <Link
      href="/"
      aria-label="Resilience Counselling — home"
      className={`inline-flex items-center ${className ?? ""}`}
    >
      <Image
        src={src}
        alt="Resilience Counselling"
        height={height}
        style={{ height, width: "auto" }}
        priority={priority}
      />
    </Link>
  );
}
