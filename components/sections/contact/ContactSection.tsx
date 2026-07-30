"use client";

import { useState } from "react";
import Image from "next/image";
import { contactPageData } from "@/data/contact";
import { Button } from "@/components/ui/Button";
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  ChevronDownIcon,
} from "@/components/ui/icons";
import stayConnected1 from "@/public/images/decor/stayConnected1.svg";
import stayConnected2 from "@/public/images/decor/stayConnected2.svg";

export function ContactSection() {
  const { title, info, form } = contactPageData;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clientType, setClientType] = useState<"new" | "existing">("new");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) {
      setError("Please fill in all required fields (*).");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section className="relative overflow-hidden bg-[#f7f0e7] py-12 lg:py-20">
      {/* Top Right Decorative SVG */}
      <Image
        src={stayConnected1}
        alt=""
        aria-hidden
        width={215}
        height={200}
        className="pointer-events-none absolute right-0 top-0 z-0 hidden opacity-75 lg:block"
      />

      {/* Bottom Left Decorative SVG */}
      <Image
        src={stayConnected2}
        alt=""
        aria-hidden
        width={212}
        height={323}
        className="pointer-events-none absolute bottom-0 left-0 z-0 hidden opacity-65 lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16 lg:items-start">
          
          {/* ── Left Column: Contact Details + Google Map Embed ── */}
          <div className="flex flex-col">
            <h1 className="font-heading text-h1 text-green-950 mb-8">
              {title}
            </h1>

            <div className="flex flex-col gap-6">
              {/* Row 1: Clinic Location */}
              <div className="flex items-start gap-4 border-b border-camel-400/40 pb-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-camel-200 text-green-800 shadow-ds1">
                  <MapPinIcon size={20} />
                </span>
                <div>
                  <p className="text-body-sm font-medium text-green-700/70">
                    {info.location.label}
                  </p>
                  <p className="mt-1 text-body-base font-semibold text-green-950">
                    {info.location.address}
                  </p>
                </div>
              </div>

              {/* Row 2: Phone and WhatsApp */}
              <div className="flex items-start gap-4 border-b border-camel-400/40 pb-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-camel-200 text-green-800 shadow-ds1">
                  <PhoneIcon size={20} />
                </span>
                <div>
                  <p className="text-body-sm font-medium text-green-700/70">
                    {info.phone.label}
                  </p>
                  <div className="mt-1 flex flex-col gap-0.5 text-body-base font-semibold text-green-950">
                    <a href={info.phone.mainHref} className="hover:text-green-700 transition">
                      Main: {info.phone.main}
                    </a>
                    <a href={info.phone.faxHref} className="hover:text-green-700 transition">
                      Fax: {info.phone.fax}
                    </a>
                  </div>
                </div>
              </div>

              {/* Row 3: Email */}
              <div className="flex items-start gap-4 border-b border-camel-400/40 pb-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-camel-200 text-green-800 shadow-ds1">
                  <MailIcon size={20} />
                </span>
                <div>
                  <p className="text-body-sm font-medium text-green-700/70">
                    {info.email.label}
                  </p>
                  <a
                    href={info.email.href}
                    className="mt-1 block text-body-base font-semibold text-green-950 hover:text-green-700 transition"
                  >
                    {info.email.value}
                  </a>
                </div>
              </div>

              {/* Row 4: Office Hours */}
              <div className="flex items-start gap-4 pb-2">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-camel-200 text-green-800 shadow-ds1">
                  <ClockIcon size={20} />
                </span>
                <div>
                  <p className="text-body-sm font-medium text-green-700/70">
                    {info.hours.label}
                  </p>
                  <p className="mt-1 text-body-base font-semibold text-green-950">
                    {info.hours.weekday}
                  </p>
                  <p className="text-body-sm text-green-700/80">
                    {info.hours.weekend}
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Box */}
            <div className="mt-8 h-[260px] w-full overflow-hidden rounded-3xl border border-camel-400/80 bg-white shadow-ds2">
              <iframe
                title="Resilience Counseling Clinic Location Map"
                src={info.location.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full"
              />
            </div>
          </div>

          {/* ── Right Column: Send Us a Message Form ── */}
          <div className="rounded-[28px] border border-camel-400/80 bg-gradient-to-br from-[#ffffff] to-[#faf6f0] p-8 sm:p-10 lg:p-12 shadow-ds3">
            <h2 className="font-heading text-h2 text-green-950">
              {form.heading}
            </h2>
            <p className="mt-2 text-body-sm text-green-700/80 mb-6">
              {form.description}
            </p>

            {submitted ? (
              <div role="status" className="rounded-2xl border border-green-200 bg-mint-200/80 p-6 text-body-base text-green-800">
                <p className="font-semibold">Thank you for reaching out!</p>
                <p className="mt-1 text-body-sm text-green-700">
                  Our intake coordinator will review your message and get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                {/* First Name & Last Name */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1 text-body-sm text-green-950">
                    <span className="sr-only">First Name</span>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name *"
                      className="w-full rounded-xl border border-camel-600/30 bg-white/90 px-4 py-3.5 text-body-base text-green-950 outline-none placeholder:text-green-700/40 focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-body-sm text-green-950">
                    <span className="sr-only">Last Name</span>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name *"
                      className="w-full rounded-xl border border-camel-600/30 bg-white/90 px-4 py-3.5 text-body-base text-green-950 outline-none placeholder:text-green-700/40 focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    />
                  </label>
                </div>

                {/* Email & Phone Number */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1 text-body-sm text-green-950">
                    <span className="sr-only">Email</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email *"
                      className="w-full rounded-xl border border-camel-600/30 bg-white/90 px-4 py-3.5 text-body-base text-green-950 outline-none placeholder:text-green-700/40 focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-body-sm text-green-950">
                    <span className="sr-only">Phone Number</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
                      className="w-full rounded-xl border border-camel-600/30 bg-white/90 px-4 py-3.5 text-body-base text-green-950 outline-none placeholder:text-green-700/40 focus:border-green-400 focus:ring-2 focus:ring-green-400/20"
                    />
                  </label>
                </div>

                {/* Radio Buttons: Are you a new or existing client? */}
                <div className="flex flex-col gap-2 pt-1">
                  <span className="text-body-sm font-medium text-green-800">
                    Are you a new or existing client?
                  </span>
                  <div className="flex items-center gap-6">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-body-sm font-semibold text-green-950">
                      <input
                        type="radio"
                        name="clientType"
                        value="new"
                        checked={clientType === "new"}
                        onChange={() => setClientType("new")}
                        className="size-4 accent-green-900 cursor-pointer"
                      />
                      New Client
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer text-body-sm font-semibold text-green-950">
                      <input
                        type="radio"
                        name="clientType"
                        value="existing"
                        checked={clientType === "existing"}
                        onChange={() => setClientType("existing")}
                        className="size-4 accent-green-900 cursor-pointer"
                      />
                      Existing Client
                    </label>
                  </div>
                </div>

                {/* Service Dropdown Select */}
                <div className="relative">
                  <span className="sr-only">How can we help you?</span>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-camel-600/30 bg-white/90 px-4 py-3.5 text-body-base text-green-950 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 cursor-pointer"
                  >
                    {form.serviceOptions.map((opt, i) => (
                      <option key={i} value={i === 0 ? "" : opt} disabled={i === 0}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    size={18}
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-green-700/60"
                  />
                </div>

                {/* Message Textarea */}
                <label className="flex flex-col gap-1 text-body-sm text-green-950">
                  <span className="sr-only">Message</span>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                    className="w-full rounded-xl border border-camel-600/30 bg-white/90 p-4 text-body-base text-green-950 outline-none placeholder:text-green-700/40 focus:border-green-400 focus:ring-2 focus:ring-green-400/20 resize-y min-h-[130px]"
                  />
                </label>

                {error && <p className="text-body-sm text-red-600">{error}</p>}

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-fit !bg-green-900 hover:!bg-green-950 text-white px-8 py-3.5 rounded-xl font-bold"
                  >
                    Send Message
                  </Button>
                </div>

                {/* Privacy Note */}
                <p className="text-body-sm text-green-700/70 mt-1">
                  {form.privacyNote}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
