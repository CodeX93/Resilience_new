/**
 * Navigation + contact content (data-driven), transcribed from the Figma
 * Home design (Top Nav 1724:3449, utility bar 1724:3450, Footer 1724:3434).
 */

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "The Resilience Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const authLink: NavLink = { label: "Login", href: "/login" };

export const primaryCta: NavLink = {
  label: "Book an Appointment",
  href: "/book",
};

/* ---- Contact / utility bar --------------------------------------------- */

export const contactInfo = {
  hours: "Mon - Fri, 10:00 AM to 6:00 PM",
  address: "111 Waterloo St Unit 406, London , ON",
  phone: "+1 (548)866-0366",
  phoneHref: "tel:+15488660366",
  email: "mail@resiliencec.com",
  emailHref: "mailto:mail@resiliencec.com",
};

/* ---- Footer ------------------------------------------------------------- */

export type SocialPlatform = "facebook" | "instagram" | "linkedin" | "youtube";

export const socialLinks: { platform: SocialPlatform; label: string; href: string }[] = [
  { platform: "facebook", label: "Facebook", href: "#" },
  { platform: "instagram", label: "Instagram", href: "#" },
  { platform: "linkedin", label: "LinkedIn", href: "#" },
  { platform: "youtube", label: "YouTube", href: "#" },
];

export const footerContact = {
  officeHours: "Monday to Friday, 10:00 AM to 6:00 PM",
  address: "111 Waterloo St Unit 406 London, Ontario, Canada N6B 2M4",
  email: "mail@resiliencec.com",
  emailHref: "mailto:mail@resiliencec.com",
  phone: "+1 (548) 866-0366",
  phoneHref: "tel:+15488660366",
  cell: "+1 (226) 210-4170",
  cellHref: "tel:+12262104170",
  fax: "+1 (226) 916-0283",
};

export const copyright =
  "© 2026 Resilience Counseling-London. All Rights Reserved.";

export const legalLinks: NavLink[] = [
  { label: "Terms & conditions", href: "/terms" },
  { label: "Privacy policy", href: "/privacy" },
];
