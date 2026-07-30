import Link from "next/link";
import { primaryNav, authLink, primaryCta, contactInfo } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { ClockIcon, MapPinIcon, PhoneIcon, MailIcon } from "@/components/ui/icons";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

/**
 * Site header — rendered ONCE from app/layout.tsx so it persists across
 * navigation. Utility bar (camel) + rounded nav card. Only the mobile menu
 * is a client component.
 * Source: Figma Home — utility bar 1724:3450, Top Nav 1724:3449.
 */
export function Header() {
  return (
    <header className="relative z-40 w-full bg-[#f7f0e7]">
      {/* Utility bar */}
      <div className="hidden bg-camel-300 text-green-700 lg:block">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-20 py-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-body-sm">
              <ClockIcon size={20} />
              {contactInfo.hours}
            </span>
            <span className="h-4 w-px bg-green-700/30" />
            <span className="flex items-center gap-2 text-body-sm">
              <MapPinIcon size={20} />
              {contactInfo.address}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={contactInfo.phoneHref}
              className="flex items-center gap-2 text-body-sm hover:text-green-900"
            >
              <PhoneIcon size={20} />
              {contactInfo.phone}
            </a>
            <span className="h-4 w-px bg-green-700/30" />
            <a
              href={contactInfo.emailHref}
              className="flex items-center gap-2 text-body-sm hover:text-green-900"
            >
              <MailIcon size={20} />
              Email: {contactInfo.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto max-w-[1440px] px-4 py-3 sm:px-6 lg:px-20 lg:py-4">
        <div className="flex h-[70px] items-center justify-between gap-6 rounded-[20px] border border-camel-400 bg-camel-100 px-5 shadow-ds1">
          <Logo variant="mark" height={44} priority />

          <nav className="hidden items-center gap-8 xl:flex" aria-label="Primary">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body-sm text-green-950 transition-colors hover:text-green-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 xl:flex">
            <Link
              href={authLink.href}
              className="text-body-base-bold text-green-700 transition-colors hover:text-green-900"
            >
              {authLink.label}
            </Link>
            <ButtonLink href={primaryCta.href} size="lg">
              {primaryCta.label}
            </ButtonLink>
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
