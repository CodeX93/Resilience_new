/**
 * Services page data-driven content
 */

export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  description: string;
  therapists: {
    name: string;
    title: string;
    focus: string;
    photo: string;
    href: string;
  }[];
}

export const servicesPageData = {
  hero: {
    eyebrow: "Our Services",
    heading: "Therapies for every step of your journey",
    subheading:
      "Comprehensive, evidence-based care tailored to your needs. Explore our services below to find the support that resonates with you.",
    quote: {
      text: "No one liberates anyone else, people liberate themselves in communion with each other.",
      author: "Paulo Freire",
    },
  },
  categories: [
    {
      id: "individual",
      title: "Individual Counseling",
      icon: "user",
      description:
        "Support for individuals of all ages to explore personal challenges, strengthen self-awareness, and nurture overall mental health and well-being through one-on-one therapy.",
      therapists: [
        {
          name: "Mahnoor Ahmed, RP",
          title: "Registered Psychotherapist",
          focus: "Focuses in anxiety, self-esteem, and life transitions.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
        {
          name: "Jessica Bateman, RP",
          title: "Registered Psychotherapist",
          focus: "Focuses in relationships, stress management, and personal growth.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
        {
          name: "Ingi ElAkary",
          title: "Registered Psychotherapist",
          focus: "Specializes in trauma-informed care, anxiety, and emotional support.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
      ],
    },
    {
      id: "family",
      title: "Family Counseling",
      icon: "family",
      description:
        "Guidance for families seeking to improve communication, resolve conflicts, and strengthen bonds during challenging life stages or transitions.",
      therapists: [
        {
          name: "Seniha Yildiz, RP",
          title: "Registered Psychotherapist",
          focus: "Focuses on family dynamics, cultural integration, and relational healing.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
        {
          name: "Jessica Bateman, RP",
          title: "Registered Psychotherapist",
          focus: "Focuses in family communication and conflict resolution.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
      ],
    },
    {
      id: "couples",
      title: "Couples Counseling",
      icon: "users",
      description:
        "Therapeutic support for couples aiming to deepen intimacy, navigate relationship hurdles, rebuild trust, and enhance constructive communication.",
      therapists: [
        {
          name: "Jessica Bateman, RP",
          title: "Registered Psychotherapist",
          focus: "Focuses in couples therapy, emotional intimacy, and communication.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
        {
          name: "Mahnoor Ahmed, RP",
          title: "Registered Psychotherapist",
          focus: "Supports couples working through relationship transitions and stress.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
      ],
    },
    {
      id: "child",
      title: "Child Counseling",
      icon: "child",
      description:
        "Gentle, developmentally appropriate therapy for children to express feelings, manage anxiety, and navigate emotional or behavioral challenges.",
      therapists: [
        {
          name: "Ingi ElAkary",
          title: "Registered Psychotherapist (Qualifying)",
          focus: "Specializes in child emotional regulation and play-informed techniques.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
      ],
    },
    {
      id: "adolescent",
      title: "Adolescent and Teen Counseling",
      icon: "teen",
      description:
        "A safe, non-judgmental space for teens to navigate peer pressure, academic stress, identity formation, and mood challenges.",
      therapists: [
        {
          name: "Mahnoor Ahmed, RP",
          title: "Registered Psychotherapist",
          focus: "Specializes in adolescent mental health and self-esteem building.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
      ],
    },
    {
      id: "student",
      title: "University and College Student Counseling",
      icon: "graduation",
      description:
        "Targeted therapy for post-secondary students coping with academic burnout, career uncertainty, independence, and social adjustments.",
      therapists: [
        {
          name: "Jessica Bateman, RP",
          title: "Registered Psychotherapist",
          focus: "Supports students with stress, perfectionism, and life transitions.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
      ],
    },
    {
      id: "mva",
      title: "Motor Vehicle Accident Counseling (MVA)",
      icon: "car",
      description:
        "Specialized therapeutic care to help individuals recover from driving trauma, PTSD, chronic pain, and anxiety following a motor vehicle collision.",
      therapists: [
        {
          name: "Seniha Yildiz, RP",
          title: "Registered Psychotherapist",
          focus: "Experienced in trauma recovery, accident rehabilitation, and pain management.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
      ],
    },
    {
      id: "anger",
      title: "Anger Management",
      icon: "shield",
      description:
        "Practical strategies and self-regulation techniques to understand triggers, communicate emotions constructively, and foster healthy responses.",
      therapists: [
        {
          name: "Mahnoor Ahmed, RP",
          title: "Registered Psychotherapist",
          focus: "Guides clients in emotional regulation and healthy communication.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
      ],
    },
    {
      id: "refugee",
      title: "Refugee Counseling (IPHP Inclusive)",
      icon: "globe",
      description:
        "Trauma-informed, culturally sensitive mental health support for refugees, newcomers, and asylum seekers covered under IFHP.",
      therapists: [
        {
          name: "Seniha Yildiz, RP",
          title: "Registered Psychotherapist",
          focus: "Specializes in newcomer transition, war trauma, and culturally adapted care.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
        {
          name: "Ingi ElAkary",
          title: "Registered Psychotherapist (Qualifying)",
          focus: "Provides multilingual care in Arabic and English for newcomers.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
      ],
    },
    {
      id: "faith",
      title: "Faith-Based Counseling",
      icon: "heart",
      description:
        "Holistic counseling that respects and incorporates your spiritual or religious beliefs into the healing process.",
      therapists: [
        {
          name: "Seniha Yildiz, RP",
          title: "Registered Psychotherapist",
          focus: "Integrates faith-sensitive perspectives with evidence-based psychotherapy.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
      ],
    },
    {
      id: "transitions",
      title: "Life Transitions Counseling",
      icon: "compass",
      description:
        "Support during major life changes such as career shifts, relocation, retirement, parenthood, or divorce.",
      therapists: [
        {
          name: "Jessica Bateman, RP",
          title: "Registered Psychotherapist",
          focus: "Helps clients navigate identity shifts and life milestones.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
      ],
    },
    {
      id: "grief",
      title: "Grief Counseling",
      icon: "feather",
      description:
        "Compassionate support to help you process loss, honor your feelings, and find path forward through bereavement.",
      therapists: [
        {
          name: "Mahnoor Ahmed, RP",
          title: "Registered Psychotherapist",
          focus: "Provides gentle guidance through bereavement and complicated grief.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
      ],
    },
    {
      id: "adhd",
      title: "ADHD / Neurodivergence Counseling",
      icon: "sparkles",
      description:
        "Neurodiversity-affirming therapy designed to build executive functioning skills, self-compassion, and personalized coping strategies.",
      therapists: [
        {
          name: "Jessica Bateman, RP",
          title: "Registered Psychotherapist",
          focus: "Affirming care for adults and teens with ADHD and neurodivergent traits.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
      ],
    },
    {
      id: "art",
      title: "Art-Based Counseling",
      icon: "palette",
      description:
        "Creative and expressive modalities that allow individuals to explore emotions and experiences beyond traditional talk therapy.",
      therapists: [
        {
          name: "Ingi ElAkary",
          title: "Registered Psychotherapist (Qualifying)",
          focus: "Uses expressive arts for emotional processing and self-exploration.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
      ],
    },
    {
      id: "learning",
      title: "Learning Disabilities Counseling",
      icon: "book",
      description:
        "Empowering support for individuals navigating academic or workplace challenges associated with learning differences.",
      therapists: [
        {
          name: "Mahnoor Ahmed, RP",
          title: "Registered Psychotherapist",
          focus: "Fosters self-advocacy and coping skills for learning differences.",
          photo: "/images/home/member-placeholder.png",
          href: "/team",
        },
      ],
    },
  ] as ServiceCategory[],

  otherServices: {
    eyebrow: "Additional services",
    heading: "Other Services you may be Looking for",
    cards: [
      {
        icon: "file-text",
        title: "Psychometric Assessments",
        description:
          "We offer comprehensive, standardized tools to better understand an individual's emotional, behavioral, cognitive, and psychological functioning. This may include interviews, questionnaires, and screening tools tailored to the client's needs and goals.",
        subtext:
          "Results can inform diagnosis, treatment planning, accommodations, and self-understanding.",
      },
      {
        icon: "user-check",
        title: "Supervision for Therapists",
        description:
          "We provide supportive, collaborative supervision for individuals registered or in the process of registering with the College of Registered Psychotherapists of Ontario.",
        subtext:
          "Supervision is offered in individual, dyadic, and group settings, with guidance in assessment, documentation, and therapeutic practice.",
      },
      {
        icon: "award",
        title: "Workshops & Training",
        description:
          "We offer workshops and training for clients, parents, families, therapists, and other helping professionals.",
        subtext:
          "Our sessions are tailored to community and professional needs and are designed to support well-being, community growth, and skill development.",
      },
    ],
    ctaLabel: "Request more information",
    ctaHref: "/contact",
  },

  coverage: {
    eyebrow: "WE ACCEPT INSURANCE",
    heading:
      "Our services may be fully or partially covered by workplace benefits or health insurance",
    providers: [
      "Telus Health",
      "Canada Life",
      "Manulife",
      "Desjardins",
      "Blue Cross",
      "Beneva",
      "Empire Life",
      "IFHP Coverage",
      "Union Coverage",
      "Green Shield",
    ],
    subtext: "including many additional insurance providers",
    ctaBox: {
      heading: "Not sure which service is right for you?",
      subheading: "We're here to help you find the best fit for your needs.",
      ctaLabel: "Request a free consultation",
      ctaHref: "/book",
    },
  },
};
