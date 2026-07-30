import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "sm" | "md" | "lg" | "xl";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-body font-bold " +
  "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-green-700 text-green-50 hover:bg-green-800 active:bg-green-900",
  secondary:
    "border border-green-700 text-green-700 bg-transparent hover:bg-green-50 active:bg-green-100",
  tertiary: "text-green-700 bg-transparent hover:bg-green-50 active:bg-green-100",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-body-sm",
  md: "px-4 py-2.5 text-body-sm",
  lg: "px-5 py-3 text-body-base",
  xl: "px-6 py-3.5 text-body-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  children: ReactNode;
};

function cx(...parts: (string | undefined | false)[]) {
  return parts.filter(Boolean).join(" ");
}

/** Button rendered as a link. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "lg",
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link
      href={href}
      className={cx(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </Link>
  );
}

/** Button rendered as a native <button>. */
export function Button({
  variant = "primary",
  size = "lg",
  leadingIcon,
  trailingIcon,
  className,
  children,
  type = "button",
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type={type}
      className={cx(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
