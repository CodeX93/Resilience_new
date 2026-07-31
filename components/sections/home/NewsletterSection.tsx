"use client";

import { useState } from "react";
import Image from "next/image";
import { newsletter as defaultNewsletter } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableText } from "@/components/cms/EditableText";
import { EditableLink } from "@/components/cms/EditableLink";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import stayConnected1 from "@/public/images/decor/stayConnected1.svg";
import stayConnected2 from "@/public/images/decor/stayConnected2.svg";

export function NewsletterSection() {
  const { getContentValue } = useCms();
  const newsletter = getContentValue("home", "newsletter", defaultNewsletter);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    /* ── Outer section: cream bg ── */
    <section className="relative overflow-hidden bg-[#faf2ef] py-20 lg:py-24">

      {/* stayConnected1 — botanical leaves, top-right OUTSIDE the card */}
      <Image
        src={stayConnected1}
        alt=""
        aria-hidden
        width={215}
        height={200}
        className="pointer-events-none absolute right-0 top-0 z-10 hidden opacity-80 lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">

        {/* ── Inner card ── */}
        <div className="relative overflow-hidden rounded-[28px] border border-camel-400/60 shadow-ds3 mx-4 sm:mx-8 lg:mx-20" style={{ background: "linear-gradient(180deg, #FFFCF7 0%, #E8E2D8 100%)" }}>

          {/* stayConnected2 — botanical branch, bottom-left INSIDE the card */}
          <Image
            src={stayConnected2}
            alt=""
            aria-hidden
            width={212}
            height={323}
            className="pointer-events-none absolute bottom-0 left-0 z-0 hidden opacity-70 lg:block"
          />

          {/* Card content — aligned to top (lg:items-start) */}
          <div className="relative z-10 grid gap-10 p-10 lg:grid-cols-2 lg:items-start lg:gap-16 lg:p-14">

            {/* Left: heading + description starting from top */}
            <div className="flex flex-col items-start gap-4 w-full">
              <h2 className="font-heading text-h2 text-green-950 w-full">
                <EditableText pageId="home" path="newsletter.heading" value={newsletter.heading} />
              </h2>
              <p className="max-w-[360px] text-body-base text-green-700/80 leading-relaxed w-full">
                <EditableText pageId="home" path="newsletter.description" value={newsletter.description} isTextArea />
              </p>
            </div>

            {/* Right: form + note + social icons at bottom */}
            {submitted ? (
              <p
                role="status"
                className="rounded-2xl border border-green-200 bg-mint-200 p-6 text-body-base text-green-700"
              >
                Thank you for subscribing — we&apos;ll be in touch.
              </p>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4 w-full">
                {/* Email input */}
                <label className="flex flex-col gap-1.5 w-full">
                  <span className="sr-only">
                    <EditableText pageId="home" path="newsletter.emailLabel" value={newsletter.emailLabel} />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={newsletter.emailLabel}
                    aria-invalid={!!error}
                    className="w-full rounded-xl border border-camel-500/30 bg-[#faf6f0]/70 px-4 py-3.5 text-body-base text-green-950 outline-none placeholder:text-green-700/40 focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                  />
                </label>

                {/* Name input */}
                <label className="flex flex-col gap-1.5 w-full">
                  <span className="sr-only">
                    <EditableText pageId="home" path="newsletter.nameLabel" value={newsletter.nameLabel} />
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={newsletter.nameLabel}
                    className="w-full rounded-xl border border-camel-500/30 bg-[#faf6f0]/70 px-4 py-3.5 text-body-base text-green-950 outline-none placeholder:text-green-700/40 focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                  />
                </label>

                {error && (
                  <p className="text-body-sm text-red-600">{error}</p>
                )}

                {/* Subscribe button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-fit !bg-[#34483d] hover:!bg-green-950 text-white font-semibold rounded-xl px-7 py-3 mt-1"
                >
                  <EditableText pageId="home" path="newsletter.ctaLabel" value={newsletter.ctaLabel} />
                </Button>

                {/* Privacy note */}
                <p className="max-w-[360px] text-body-sm text-green-700/70 leading-normal mt-1 w-full">
                  <EditableText pageId="home" path="newsletter.note" value={newsletter.note} isTextArea />
                </p>

                {/* Social icons — ON RIGHT SECTION BELOW PRIVACY NOTE */}
                <div className="mt-3 flex items-center gap-3">
                  <EditableLink
                    pageId="home"
                    path="newsletter.facebookUrl"
                    href={newsletter.facebookUrl || "https://facebook.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex size-7 items-center justify-center rounded-full bg-[#efe8de] text-green-950 transition-colors hover:bg-camel-300"
                  >
                    <FacebookIcon size={16} />
                  </EditableLink>
                  <EditableLink
                    pageId="home"
                    path="newsletter.instagramUrl"
                    href={newsletter.instagramUrl || "https://instagram.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex size-7 items-center justify-center rounded-full bg-[#efe8de] text-green-950 transition-colors hover:bg-camel-300"
                  >
                    <InstagramIcon size={16} />
                  </EditableLink>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
