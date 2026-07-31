"use client";

import Link from "next/link";
import { primaryNav, authLink, primaryCta as defaultPrimaryCta, contactInfo as defaultContactInfo } from "@/data/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableText } from "@/components/cms/EditableText";
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
  const { getContentValue } = useCms();
  const contactInfo = getContentValue("navigation", "contactInfo", defaultContactInfo);
  const primaryCta = getContentValue("navigation", "primaryCta", defaultPrimaryCta);

  return (
    <header className="relative z-40 w-full bg-[#faf2ef]">
      {/* Utility bar */}
      <div className="hidden bg-camel-300 text-green-700 lg:block">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-20 py-2">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-body-sm">
              <ClockIcon size={20} />
              <EditableText pageId="navigation" path="contactInfo.hours" value={contactInfo.hours} />
            </span>
            <span className="h-4 w-px bg-green-700/30" />
            <span className="flex items-center gap-2 text-body-sm">
              <MapPinIcon size={20} />
              <EditableText pageId="navigation" path="contactInfo.address" value={contactInfo.address} />
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-body-sm hover:text-green-900">
              <PhoneIcon size={20} />
              <EditableText pageId="navigation" path="contactInfo.phone" value={contactInfo.phone} />
            </span>
            <span className="h-4 w-px bg-green-700/30" />
            <span className="flex items-center gap-2 text-body-sm hover:text-green-900">
              <MailIcon size={20} />
              Email:&nbsp;<EditableText pageId="navigation" path="contactInfo.email" value={contactInfo.email} />
            </span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto max-w-[1440px] px-4 py-3 sm:px-6 lg:px-20 lg:py-4">
        <div className="flex h-[70px] items-center justify-between gap-6 rounded-[20px] border border-camel-400 bg-[#FEFDFC] px-5 shadow-ds1">
          <Logo variant="mark" height={44} priority />

          <nav className="hidden items-center gap-8 xl:flex" aria-label="Primary">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body font-bold text-[12px] leading-[18px] text-[#131F1C] transition-colors hover:text-green-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 xl:flex">
            <Link
              href={authLink.href}
              className="font-body font-bold text-[14px] leading-[22px] text-[#314C43] transition-colors hover:text-green-900"
            >
              {authLink.label}
            </Link>
            <ButtonLink href={primaryCta.href} className="!bg-[#314C43] hover:!bg-green-800 !text-white font-body font-bold !text-[14px] !leading-[22px] px-5 py-2.5">
              <EditableText pageId="navigation" path="primaryCta.label" value={primaryCta.label} />
            </ButtonLink>
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
