/**
 * Home page content (data-driven), transcribed from the Figma Home design
 * (node 1724:2590). Copy pulled from Figma metadata + design context.
 *
 * NOTE: image fields point at /public paths that still need the real exported
 * assets (team photos, blog image, "Who We Are" image). They are marked with
 * `// TODO asset`. Everything else is final copy from the design.
 */

/* ---- Hero --------------------------------------------------------------- */

export const hero = {
  eyebrow: "Resilience Counseling & Psychotherapy",
  heading: "Therapy that respects your journey, heritage, and rhythm.",
  bullets: [
    "Supporting individuals of all ages from diverse backgrounds, with a focus on refugees and newcomers",
    "Support for individuals, couples, and families",
    "In-person services available in London, ON",
    "Virtual services available across Ontario and select provinces",
    "Services offered in English, Turkish, Arabic, Spanish, Kurmanji, and Urdu, with interpreters available",
  ],
  card: {
    heading: "Let’s start with a conversation to see if we are the right fit...",
    rows: [
      { label: "Meeting Time", value: "15–25 minutes", icon: "clock" as const },
      { label: "How We Meet", value: "Secure online & Phone", icon: "meet" as const },
    ],
    ctaLabel: "Request a free consultation",
    ctaHref: "/book",
    note: "We respond within 1-2 Weeks, All conversations are confidential.",
  },
  quote: {
    text: "We don’t have to do all of it alone. We were never meant to.",
    author: "Brené Brown",
  },
};

/* ---- What We Offer ------------------------------------------------------ */

export const whatWeOffer = {
  eyebrow: "Therapies, Workshops, and Additional Services",
  heading: "What We Offer",
  cards: [
    { title: "Individual Counseling", icon: "users" as const, href: "/services" },
    { title: "Family counseling", icon: "family" as const, href: "/services" },
    { title: "Refuge counseling (IPHP Inclusive)", icon: "hands" as const, href: "/services" },
    { title: "Couples Counseling", icon: "users" as const, href: "/services" },
  ],
  quote: {
    text: "We are never more human than when we are in relationship with another.",
    author: "Harry Stack Sullivan",
  },
};

/* ---- Who We Are --------------------------------------------------------- */

export const whoWeAre = {
  eyebrow: "Roots, Philosophy, Diversity, and Connection",
  heading: "Who We Are",
  paragraphs: [
    "Like trees growing side by side, we see our diversity as a strength and draw on our varied experiences and perspectives to enrich the individuals and communities we serve. While each of us brings something unique, we are connected through a shared foundation rooted in the belief that every person holds the capacity for strength and resilience in the face of uncertainty and challenge.",
    "This sense of togetherness within our diversity nourishes our work, allowing us to support one another and offer care that is thoughtful, holistic, and grounded in the lived experiences of those we serve.",
  ],
  ctaLabel: "Learn more about us",
  ctaHref: "/about",
  image: "/images/home/who-we-are.jpg",
  imageAlt: "Sunlit forest of tall trees with intertwined roots",
  quote: {
    text: "Out of suffering have emerged the strongest souls.",
    author: "Khalil Gibran",
  },
};

/* ---- Meet Our Team ------------------------------------------------------ */

export type TeamMember = {
  name: string;
  title: string;
  photo: string; // TODO asset
  href: string;
};

export const team = {
  eyebrow: "Profiles, Roles, and Introductions",
  heading: "Meet Our Team",
  ctaLabel: "View all team members",
  ctaHref: "/team",
  members: [
    { name: "Seniha Yildiz, RP", title: "Registered Psychotherapist", photo: "/images/home/member-placeholder.png", href: "/team" },
    { name: "Jessica Bateman, RP", title: "Registered Psychotherapist", photo: "/images/home/member-placeholder.png", href: "/team" },
    { name: "Mahnoor Ahmed, RP", title: "Registered Psychotherapist", photo: "/images/home/member-placeholder.png", href: "/team" },
    { name: "Ingi ElAkary", title: "Registered Psychotherapist (Qualifying)", photo: "/images/home/member-placeholder.png", href: "/team" },
    { name: "Team Member", title: "Registered Psychotherapist", photo: "/images/home/member-placeholder.png", href: "/team" },
    { name: "Team Member", title: "Registered Psychotherapist", photo: "/images/home/member-placeholder.png", href: "/team" },
  ] satisfies TeamMember[],
};

/* ---- The Resilience Journal (Blog) ------------------------------------- */

export type JournalPost = {
  title: string;
  excerpt: string;
  image: string; // TODO asset
  imageAlt: string;
  href: string;
  tag?: string;
};

export const journal = {
  eyebrow: "Reflections, Insights, and Updates",
  heading: "The Resilience Journal",
  ctaLabel: "View all",
  ctaHref: "/journal",
  featured: {
    title: "Injectable Steroids: A Complete Guide",
    excerpt:
      "Injectable steroids are compounds commonly used in the world of sports and bodybuilding to increase muscle mass, improve performance, and accelerate recovery. These products are available in a range of forms and are administered via intramuscular injection.",
    image: "/images/home/journal-featured.jpg", // TODO asset
    imageAlt: "Hand holding a small injectable vial",
    href: "/journal/injectable-steroids-a-complete-guide",
    tag: "Self care",
  } satisfies JournalPost,
};

/* ---- Newsletter --------------------------------------------------------- */

export const newsletter = {
  heading: "Stay Connected",
  description:
    "If you’d like, you can receive occasional reflections, resources, and updates from us.",
  emailLabel: "Email Address",
  nameLabel: "First Name (Optional)",
  ctaLabel: "Subscribe",
  note: "You are member of our team. Your information is kept private and treated.",
};
