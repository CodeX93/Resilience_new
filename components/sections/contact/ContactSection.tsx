"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { contactPageData as defaultContactPageData } from "@/data/contact";
import { Button } from "@/components/ui/Button";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableText } from "@/components/cms/EditableText";
import {
  SolidMapPinIcon,
  SolidPhoneIcon,
  SolidMailIcon,
  SolidClockIcon,
  ChevronDownIcon,
} from "@/components/ui/icons";
import stayConnected1 from "@/public/images/decor/stayConnected1.svg";
import stayConnected2 from "@/public/images/decor/stayConnected2.svg";

/** Custom styled, non-native dropdown component */
function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
}: {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayOptions = options.filter((opt) => opt !== placeholder);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-xl border border-[#e2d7c5] bg-[#faf6f0] px-4 py-3.5 text-left text-body-base text-green-950 outline-none transition-all focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/15"
      >
        <span className={value ? "text-green-950 font-medium" : "text-[#a0907d]"}>
          {value || placeholder}
        </span>
        <ChevronDownIcon
          size={18}
          className={`text-[#7a6a57] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-full z-40 mt-1.5 max-h-60 overflow-y-auto rounded-xl border border-[#e2d7c5] bg-white p-1.5 shadow-ds3 [scrollbar-width:thin]"
        >
          {displayOptions.map((opt) => (
            <li
              key={opt}
              role="option"
              aria-selected={value === opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={`cursor-pointer rounded-lg px-3.5 py-2.5 text-body-sm transition-colors ${
                value === opt
                  ? "bg-[#f4efe4] font-semibold text-green-950"
                  : "text-green-950 hover:bg-[#faf6f0]"
              }`}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ContactSection() {
  const { getContentValue, isEditMode, updateField } = useCms();
  const contactPageData = getContentValue("contact", "", defaultContactPageData);
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
      setError("Please fill in all required fields.");
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
    <section className="relative overflow-hidden bg-[#faf2ef] py-12 lg:py-20">
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
          <div className="flex flex-col w-full">
            <h1 className="font-heading text-h2 sm:text-[40px] text-green-950 mb-8 w-full">
              <EditableText pageId="contact" path="title" value={title} />
            </h1>

            <div className="flex flex-col gap-6 w-full">
              {/* Row 1: Clinic Location (Solid MapPin Icon in Camel 900) */}
              <div className="flex items-start gap-4 border-b border-dashed border-[#e6dccf] pb-6 w-full">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-b from-[#ffffff] via-[#FAF5EE] to-[#F1E8DC] border border-[#E8DFC5] shadow-[0_4px_14px_rgba(180,160,130,0.18)] text-[#7D5C3F]">
                  <SolidMapPinIcon size={24} />
                </span>
                <div className="w-full">
                  <p className="text-body-sm font-medium text-[#8f7b66] w-full">
                    <EditableText pageId="contact" path="info.location.label" value={info.location.label} />
                  </p>
                  <p className="mt-1 font-heading text-body-base text-green-950 leading-snug w-full">
                    <EditableText pageId="contact" path="info.location.address" value={info.location.address} isTextArea />
                  </p>
                </div>
              </div>

              {/* Row 2: Phone and WhatsApp (Solid Phone Icon in Camel 900) */}
              <div className="flex items-start gap-4 border-b border-dashed border-[#e6dccf] pb-6 w-full">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-b from-[#ffffff] via-[#FAF5EE] to-[#F1E8DC] border border-[#E8DFC5] shadow-[0_4px_14px_rgba(180,160,130,0.18)] text-[#7D5C3F]">
                  <SolidPhoneIcon size={22} />
                </span>
                <div className="w-full">
                  <p className="text-body-sm font-medium text-[#8f7b66] w-full">
                    <EditableText pageId="contact" path="info.phone.label" value={info.phone.label} />
                  </p>
                  <div className="mt-1 flex flex-col gap-0.5 font-heading text-body-base text-green-950 w-full">
                    <span className="hover:text-green-700 transition w-full">
                      Main: <EditableText pageId="contact" path="info.phone.main" value={info.phone.main} />
                    </span>
                    <span className="hover:text-green-700 transition w-full">
                      Fax: <EditableText pageId="contact" path="info.phone.fax" value={info.phone.fax} />
                    </span>
                  </div>
                </div>
              </div>

              {/* Row 3: Email (Solid Mail Icon in Camel 900) */}
              <div className="flex items-start gap-4 border-b border-dashed border-[#e6dccf] pb-6 w-full">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-b from-[#ffffff] via-[#FAF5EE] to-[#F1E8DC] border border-[#E8DFC5] shadow-[0_4px_14px_rgba(180,160,130,0.18)] text-[#7D5C3F]">
                  <SolidMailIcon size={22} />
                </span>
                <div className="w-full">
                  <p className="text-body-sm font-medium text-[#8f7b66] w-full">
                    <EditableText pageId="contact" path="info.email.label" value={info.email.label} />
                  </p>
                  <span className="mt-1 block font-heading text-body-base text-green-950 hover:text-green-700 transition w-full">
                    <EditableText pageId="contact" path="info.email.value" value={info.email.value} />
                  </span>
                </div>
              </div>

              {/* Row 4: Office Hours (Solid Clock Icon in Camel 900) */}
              <div className="flex items-start gap-4 pb-2 w-full">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-b from-[#ffffff] via-[#FAF5EE] to-[#F1E8DC] border border-[#E8DFC5] shadow-[0_4px_14px_rgba(180,160,130,0.18)] text-[#7D5C3F]">
                  <SolidClockIcon size={22} />
                </span>
                <div className="w-full">
                  <p className="text-body-sm font-medium text-[#8f7b66] w-full">
                    <EditableText pageId="contact" path="info.hours.label" value={info.hours.label} />
                  </p>
                  <p className="mt-1 font-heading text-body-base text-green-950 leading-snug w-full">
                    <EditableText pageId="contact" path="info.hours.weekday" value={info.hours.weekday} />
                  </p>
                  <p className="font-heading text-body-sm text-green-700/80 w-full">
                    <EditableText pageId="contact" path="info.hours.weekend" value={info.hours.weekend} />
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map Box */}
            <div className="relative mt-8 h-[260px] w-full overflow-hidden rounded-3xl border border-camel-400/80 bg-white shadow-ds2 group">
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
              {isEditMode && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-30">
                  <button
                    type="button"
                    onClick={() => {
                      const newUrl = prompt(
                        "Paste the Google Maps 'Embed a map' iframe code or src URL.\n\nTo get this:\n1. Go to Google Maps\n2. Search your location\n3. Click Share -> 'Embed a map'\n4. Copy the URL (starts with https://www.google.com/maps/embed) or the whole HTML code.",
                        info.location.embedMapUrl
                      );
                      if (newUrl) {
                        let cleanUrl = newUrl.trim();
                        // Regex to extract src from an iframe tag
                        const srcMatch = cleanUrl.match(/src=["'](https:\/\/www\.google\.com\/maps\/embed[^"']+)["']/i);
                        if (srcMatch) {
                          cleanUrl = srcMatch[1];
                        }
                        
                        if (!cleanUrl.startsWith("https://www.google.com/maps/embed")) {
                          alert("Invalid URL. Standard Google Maps links (e.g. maps.app.goo.gl or google.com/maps/place) cannot be embedded directly in an iframe.\n\nPlease follow the 'Embed a map' instructions on Google Maps to get the correct URL starting with 'https://www.google.com/maps/embed'.");
                          return;
                        }
                        
                        updateField("contact", "info.location.embedMapUrl", cleanUrl);
                      }
                    }}
                    className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-green-950 shadow hover:bg-green-50 transition cursor-pointer"
                  >
                    Change Map Location URL
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Right Column: Send Us a Message Form ── */}
          <div className="rounded-[28px] border border-[#e5dccf] p-8 sm:p-10 lg:p-12 shadow-ds3 w-full" style={{ background: "linear-gradient(180deg, #FFFCF7 0%, #E8E2D8 100%)" }}>
            <h2 className="font-heading text-h2 text-green-950 w-full">
              <EditableText pageId="contact" path="form.heading" value={form.heading} />
            </h2>
            <p className="mt-2 text-body-sm text-[#837260] mb-6 leading-relaxed w-full">
              <EditableText pageId="contact" path="form.description" value={form.description} isTextArea />
            </p>

            {submitted ? (
              <div role="status" className="rounded-2xl border border-green-200 bg-mint-200/80 p-6 text-body-base text-green-800">
                <p className="font-semibold">Thank you for reaching out!</p>
                <p className="mt-1 text-body-sm text-green-700">
                  Our intake coordinator will review your message and get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5 w-full">
                {/* First Name & Last Name */}
                <div className="grid gap-4 sm:grid-cols-2 w-full">
                  <label className="flex flex-col gap-1 w-full">
                    <span className="sr-only">First Name</span>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name *"
                      className="w-full rounded-xl border border-[#e2d7c5] bg-[#faf6f0] px-4 py-3.5 text-body-base text-green-950 outline-none placeholder:text-[#a0907d] focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/15 transition-all"
                    />
                  </label>
                  <label className="flex flex-col gap-1 w-full">
                    <span className="sr-only">Last Name</span>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name *"
                      className="w-full rounded-xl border border-[#e2d7c5] bg-[#faf6f0] px-4 py-3.5 text-body-base text-green-950 outline-none placeholder:text-[#a0907d] focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/15 transition-all"
                    />
                  </label>
                </div>

                {/* Email & Phone Number */}
                <div className="grid gap-4 sm:grid-cols-2 w-full">
                  <label className="flex flex-col gap-1 w-full">
                    <span className="sr-only">Email</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email *"
                      className="w-full rounded-xl border border-[#e2d7c5] bg-[#faf6f0] px-4 py-3.5 text-body-base text-green-950 outline-none placeholder:text-[#a0907d] focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/15 transition-all"
                    />
                  </label>
                  <label className="flex flex-col gap-1 w-full">
                    <span className="sr-only">Phone Number</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
                      className="w-full rounded-xl border border-[#e2d7c5] bg-[#faf6f0] px-4 py-3.5 text-body-base text-green-950 outline-none placeholder:text-[#a0907d] focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/15 transition-all"
                    />
                  </label>
                </div>

                {/* Custom Styled Radio Buttons: Are you a new or existing client? */}
                <div className="flex flex-col gap-2 pt-1 w-full">
                  <span className="text-body-sm font-medium text-[#7a6a57] w-full">
                    Are you a new or existing client?
                  </span>
                  <div className="flex items-center gap-6 w-full">
                    {/* New Client Option */}
                    <button
                      type="button"
                      role="radio"
                      aria-checked={clientType === "new"}
                      onClick={() => setClientType("new")}
                      className="inline-flex items-center gap-2.5 cursor-pointer outline-none group"
                    >
                      <span
                        className={`flex size-5 items-center justify-center rounded-full transition-all ${
                          clientType === "new"
                            ? "bg-[#34483d] border border-[#34483d]"
                            : "border border-[#c4b6a2] bg-[#faf6f0] group-hover:border-[#34483d]"
                        }`}
                      >
                        {clientType === "new" && (
                          <span className="size-2 rounded-full bg-white" />
                        )}
                      </span>
                      <span
                        className={`font-heading text-body-sm font-medium ${
                          clientType === "new" ? "text-green-950" : "text-[#7a6a57]"
                        }`}
                      >
                        New Client
                      </span>
                    </button>

                    {/* Existing Client Option */}
                    <button
                      type="button"
                      role="radio"
                      aria-checked={clientType === "existing"}
                      onClick={() => setClientType("existing")}
                      className="inline-flex items-center gap-2.5 cursor-pointer outline-none group"
                    >
                      <span
                        className={`flex size-5 items-center justify-center rounded-full transition-all ${
                          clientType === "existing"
                            ? "bg-[#34483d] border border-[#34483d]"
                            : "border border-[#c4b6a2] bg-[#faf6f0] group-hover:border-[#34483d]"
                        }`}
                      >
                        {clientType === "existing" && (
                          <span className="size-2 rounded-full bg-white" />
                        )}
                      </span>
                      <span
                        className={`font-heading text-body-sm font-medium ${
                          clientType === "existing" ? "text-green-950" : "text-[#7a6a57]"
                        }`}
                      >
                        Existing Client
                      </span>
                    </button>
                  </div>
                </div>

                {/* Custom Non-Native Dropdown */}
                <CustomSelect
                  options={form.serviceOptions}
                  value={service}
                  onChange={(val) => setService(val)}
                  placeholder="How can we help you? *"
                />

                {/* Message Textarea */}
                <label className="flex flex-col gap-1 w-full">
                  <span className="sr-only">Message</span>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message"
                    className="w-full rounded-xl border border-[#e2d7c5] bg-[#faf6f0] p-4 text-body-base text-green-950 outline-none placeholder:text-[#a0907d] focus:border-green-600 focus:bg-white focus:ring-2 focus:ring-green-600/15 transition-all resize-y min-h-[140px]"
                  />
                </label>

                {error && <p className="text-body-sm text-red-600">{error}</p>}

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-fit !bg-[#34483d] hover:!bg-green-950 text-white px-8 py-3.5 rounded-xl font-semibold shadow-ds2"
                  >
                    Send Message
                  </Button>
                </div>

                {/* Privacy Note */}
                <p className="text-body-sm text-[#7a6a57] leading-relaxed mt-1 w-full">
                  <EditableText pageId="contact" path="form.privacyNote" value={form.privacyNote} isTextArea />
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
