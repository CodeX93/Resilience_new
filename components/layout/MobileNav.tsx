"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  primaryNav,
  authLink,
  primaryCta,
  contactInfo,
} from "@/data/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneIcon, MailIcon } from "@/components/ui/icons";

/**
 * Mobile navigation: hamburger toggle + slide-down panel.
 * The only interactive (client) part of the header. Shown below `xl`.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-green-700 hover:bg-green-50"
      >
        <span className="relative block h-4 w-6" aria-hidden>
          <span
            className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[7px] h-0.5 w-6 bg-current transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[14px] h-0.5 w-6 bg-current transition-transform ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-dark-40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            id="mobile-menu"
            className="fixed inset-x-0 top-0 z-50 max-h-dvh overflow-y-auto bg-camel-100 shadow-ds3"
          >
            <nav
              className="flex flex-col gap-1 p-6 pt-8"
              aria-label="Mobile"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-heading text-[22px] text-green-700">
                  Resilience
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-green-700 hover:bg-green-50"
                >
                  <span className="text-2xl leading-none">&times;</span>
                </button>
              </div>

              {primaryNav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-body-base text-green-950 hover:bg-green-50"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={authLink.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-body-base-bold text-green-700 hover:bg-green-50"
              >
                {authLink.label}
              </Link>
              <ButtonLink
                href={primaryCta.href}
                size="lg"
                className="mt-2 w-full"
                onClick={() => setOpen(false)}
              >
                {primaryCta.label}
              </ButtonLink>

              <div className="mt-6 flex flex-col gap-3 border-t border-camel-400 pt-6 text-body-sm text-green-700">
                <a href={contactInfo.phoneHref} className="flex items-center gap-2">
                  <PhoneIcon size={18} />
                  {contactInfo.phone}
                </a>
                <a href={contactInfo.emailHref} className="flex items-center gap-2">
                  <MailIcon size={18} />
                  {contactInfo.email}
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
