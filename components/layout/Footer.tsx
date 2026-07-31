"use client";

import Link from "next/link";
import Image from "next/image";
import { footerContact as defaultFooterContact, copyright as defaultCopyright } from "@/data/navigation";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableText } from "@/components/cms/EditableText";
import { EditableLink } from "@/components/cms/EditableLink";
import {
  FacebookIcon,
  XIcon,
  LinkedinIcon,
  InstagramIcon,
} from "@/components/ui/icons";
import footerLogo from "@/public/images/brand/logo-footer.png";
import stayConnected1 from "@/public/images/decor/stayConnected1.svg";

/** Column Heading with white vertical accent bar */
function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="block h-4 w-[2px] rounded-full bg-white" aria-hidden />
      <h2 className="text-body-sm-bold text-white">
        {children}
      </h2>
    </div>
  );
}

export function Footer() {
  const { getContentValue } = useCms();
  const footerContact = getContentValue("navigation", "footerContact", defaultFooterContact);
  const copyright = getContentValue("navigation", "copyright", defaultCopyright);

  return (
    <footer className="relative overflow-hidden bg-[#2d4236] text-white pt-14 pb-10 lg:pt-16 lg:pb-12">
      {/* Botanical leaves watermark overlay at far right */}
      <Image
        src={stayConnected1}
        alt=""
        aria-hidden
        width={360}
        height={320}
        className="pointer-events-none absolute right-0 bottom-0 z-0 hidden w-[360px] opacity-20 mix-blend-soft-light lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">

        {/* Main Footer Grid */}
        <div className="grid gap-10 lg:grid-cols-[260px_1fr_1.3fr] lg:gap-14 lg:items-start">

          {/* Column 1: Rounded Card Container with Brand Logo & Social Badges */}
          <div className="flex flex-col justify-between rounded-[20px] bg-[#385042] border border-white/10 p-6 h-[210px] shadow-sm">
            {/* Logo */}
            <Link href="/" aria-label="Resilience Counselling — Home" className="block text-left">
              <Image
                src={footerLogo}
                alt="Resilience Counselling"
                width={130}
                height={100}
                className="h-auto w-[125px] object-contain"
              />
            </Link>

            {/* Social Icon Badges (Facebook, X, LinkedIn, Instagram) */}
            <div className="flex items-center gap-2.5">
              <EditableLink
                pageId="navigation"
                path="socialLinks[0].href"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-8 items-center justify-center rounded-full bg-white/15 text-white/90 transition-all hover:bg-white/30 hover:text-white"
              >
                <FacebookIcon size={14} />
              </EditableLink>
              <EditableLink
                pageId="navigation"
                path="socialLinks[1].href"
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="flex size-8 items-center justify-center rounded-full bg-white/15 text-white/90 transition-all hover:bg-white/30 hover:text-white"
              >
                <XIcon size={13} />
              </EditableLink>
              <EditableLink
                pageId="navigation"
                path="socialLinks[2].href"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex size-8 items-center justify-center rounded-full bg-white/15 text-white/90 transition-all hover:bg-white/30 hover:text-white"
              >
                <LinkedinIcon size={13} />
              </EditableLink>
              <EditableLink
                pageId="navigation"
                path="socialLinks[3].href"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-8 items-center justify-center rounded-full bg-white/15 text-white/90 transition-all hover:bg-white/30 hover:text-white"
              >
                <InstagramIcon size={14} />
              </EditableLink>
            </div>
          </div>

          {/* Column 2: Location & Timing */}
          <div className="flex flex-col pt-1 w-full">
            <ColumnHeading>Location &amp; Timing</ColumnHeading>

            <dl className="mt-6 flex flex-col gap-5 font-heading text-body-sm w-full">
              <div className="w-full">
                <dt className="font-bold text-white">Office Hours:</dt>
                <dd className="mt-1 text-white/60 leading-relaxed w-full">
                  <EditableText pageId="navigation" path="footerContact.officeHours" value={footerContact.officeHours} />
                </dd>
              </div>

              <div className="w-full">
                <dt className="font-bold text-white">Address:</dt>
                <dd className="mt-1 text-white/60 leading-relaxed max-w-[280px] w-full">
                  <EditableText pageId="navigation" path="footerContact.address" value={footerContact.address} isTextArea />
                </dd>
              </div>
            </dl>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col pt-1 w-full">
            <ColumnHeading>Contact</ColumnHeading>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 font-heading text-body-sm w-full">
              <div className="w-full">
                <dt className="font-bold text-white">Email:</dt>
                <dd className="mt-1 w-full">
                  <span className="text-white/60 hover:text-white transition-colors w-full">
                    <EditableText pageId="navigation" path="footerContact.email" value={footerContact.email} />
                  </span>
                </dd>
              </div>

              <div className="w-full">
                <dt className="font-bold text-white">Phone:</dt>
                <dd className="mt-1 w-full">
                  <span className="text-white/60 hover:text-white transition-colors w-full">
                    <EditableText pageId="navigation" path="footerContact.phone" value={footerContact.phone} />
                  </span>
                </dd>
              </div>

              <div className="w-full">
                <dt className="font-bold text-white">Cell:</dt>
                <dd className="mt-1 w-full">
                  <span className="text-white/60 hover:text-white transition-colors w-full">
                    <EditableText pageId="navigation" path="footerContact.cell" value={footerContact.cell} />
                  </span>
                </dd>
              </div>

              <div className="w-full">
                <dt className="font-bold text-white">Fax:</dt>
                <dd className="mt-1 text-white/60 w-full">
                  <EditableText pageId="navigation" path="footerContact.fax" value={footerContact.fax} />
                </dd>
              </div>
            </dl>
          </div>

        </div>

        {/* Sub-footer Bottom Bar */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 font-heading text-body-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
            <p className="w-full sm:w-auto">
              <EditableText pageId="navigation" path="copyright" value={copyright} />
            </p>

            <ul className="flex items-center gap-4">
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms &amp; conditions
                </Link>
              </li>
              <li aria-hidden="true">•</li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}
