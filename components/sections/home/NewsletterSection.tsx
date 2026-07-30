"use client";

import { useState } from "react";
import Image from "next/image";
import { newsletter } from "@/data/home";
import { Button } from "@/components/ui/Button";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";
import stayConnected1 from "@/public/images/decor/stayConnected1.svg";
import stayConnected2 from "@/public/images/decor/stayConnected2.svg";

export function NewsletterSection() {
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
    <section className="relative overflow-hidden bg-[#f7f0e7] py-20 lg:py-24">

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
        <div className="relative overflow-hidden rounded-[28px] bg-[#faf6f0] shadow-ds3">

          {/* stayConnected2 — botanical branch, bottom-left INSIDE the card */}
          <Image
            src={stayConnected2}
            alt=""
            aria-hidden
            width={212}
            height={323}
            className="pointer-events-none absolute bottom-0 left-0 z-0 hidden opacity-70 lg:block"
          />

          {/* Card content — above the branch illustration */}
          <div className="relative z-10 grid gap-10 p-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-14">

            {/* Left: heading + description + socials */}
            <div className="flex flex-col items-start gap-4">
              <h2 className="font-heading text-h2 text-green-950">
                {newsletter.heading}
              </h2>
              <p className="max-w-[340px] text-body-base text-green-700/80">
                {newsletter.description}
              </p>

              {/* Social icons */}
              <div className="mt-2 flex items-center gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex size-8 items-center justify-center rounded-full text-green-800 transition-colors hover:text-green-950"
                >
                  <FacebookIcon size={20} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex size-8 items-center justify-center rounded-full text-green-800 transition-colors hover:text-green-950"
                >
                  <InstagramIcon size={20} />
                </a>
              </div>
            </div>

            {/* Right: form */}
            {submitted ? (
              <p
                role="status"
                className="rounded-2xl border border-green-200 bg-mint-200 p-6 text-body-base text-green-700"
              >
                Thank you for subscribing — we&apos;ll be in touch.
              </p>
            ) : (
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
                {/* Email input */}
                <label className="flex flex-col gap-1.5">
                  <span className="sr-only">{newsletter.emailLabel}</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={newsletter.emailLabel}
                    aria-invalid={!!error}
                    className="w-full rounded-xl border border-camel-600/30 bg-white px-5 py-3.5 text-body-base text-green-950 outline-none placeholder:text-green-700/40 focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                  />
                </label>

                {/* Name input */}
                <label className="flex flex-col gap-1.5">
                  <span className="sr-only">{newsletter.nameLabel}</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={newsletter.nameLabel}
                    className="w-full rounded-xl border border-camel-600/30 bg-white px-5 py-3.5 text-body-base text-green-950 outline-none placeholder:text-green-700/40 focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
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
                  className="w-fit !bg-green-900 hover:!bg-green-950"
                >
                  {newsletter.ctaLabel}
                </Button>

                {/* Note */}
                <p className="max-w-[340px] text-body-sm text-green-700/70">
                  {newsletter.note}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
