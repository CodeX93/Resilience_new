/**
 * Team page data & detailed therapist profiles
 */

export interface TeamMemberDetail {
  slug: string;
  name: string;
  title: string;
  roleCategory: string;
  photo: string;
  email: string;
  phone: string;
  location: string;
  coreSkills: string;
  focus: string;
  bio: string[];
  treeArtwork?: string;
  treeQuote?: string;
  whyTreeTitle?: string;
  whyTreeText?: string[];
}

export const teamRoleCategories = [
  "All",
  "Art Therapist",
  "Psychotherapist",
  "Psychotherapist (Qualifying)",
  "Social Worker and Therapist",
  "Clinical Psychologist",
];

export const teamMembersList: TeamMemberDetail[] = [
  {
    slug: "lolove-canady",
    name: "Lolove Canady, RP-Q",
    title: "Registered Psychotherapist (Qualifying)",
    roleCategory: "Psychotherapist (Qualifying)",
    photo: "/images/home/member-placeholder.png",
    email: "mail@resiliencec.com",
    phone: "+ 1 (548) 866-0366",
    location: "111 Waterloo St. London ON N6B 2M4",
    coreSkills: "Working with both Teens and adults",
    focus: "Specializes in anxiety, emotional regulation, and neurodiversity.",
    bio: [
      "With a warm and empathetic approach, I am a Registered Psychotherapist (Qualifying) with a Master's degree in Psychology, specializing in mental health and applied behavior analysis. I am dedicated to creating a safe, supportive, and nonjudgmental space where clients feel genuinely heard, valued, and empowered to explore their thoughts and emotions.",
      "I work with children, teens, and adults, supporting individuals facing challenges such as anxiety, depression, ADHD, anger, and difficulties with emotional regulation. My practice is grounded in cultural humility and a strong respect for each client's unique background, values, and lived experiences.",
      "By combining active listening with sensitivity to non-verbal communication, I strive to foster a therapeutic relationship that promotes resilience, growth, and self-awareness. I also have training in psychometry and conduct assessments related to ADHD, autism, and cognitive disabilities, allowing me to offer a holistic and informed approach to care.",
      "I believe that therapists must also prioritize their own wellness to support others effectively. I engage in regular supervision, peer consultation, and ongoing professional development to continually refine my skills and remain grounded in evidence-based practices. My goal is to support clients in building healthier habits, cultivating balance, making sense of themselves, and achieving meaningful, lasting change.",
    ],
    treeQuote:
      "Like the maple, I believe our greatest strength lies not in resisting change, but in growing beautifully through it.",
    whyTreeTitle: "Why the Maple Tree?",
    whyTreeText: [
      "The maple reminds me that change is a natural part of growth. Its deep roots provide stability while its branches continue to reach toward new possibilities.",
      "In therapy, I hope to offer that same balance of grounding, compassion, and encouragement as clients move through life's seasons.",
    ],
  },
  {
    slug: "amjed-abojedi",
    name: "Amjed Abojedi",
    title: "Psychotherapist",
    roleCategory: "Psychotherapist",
    photo: "/images/home/member-placeholder.png",
    email: "mail@resiliencec.com",
    phone: "+ 1 (548) 866-0366",
    location: "111 Waterloo St. London ON N6B 2M4",
    coreSkills: "Child & Family Dynamics, War Trauma, CBT",
    focus:
      "Psychotherapist, and researcher with profound expertise in child and family dynamics.",
    bio: [
      "Amjed is a seasoned psychotherapist and researcher dedicated to supporting children, adults, and families through life transitions and relational challenges.",
      "His clinical focus centers on family dynamics, emotional regulation, and trauma recovery, combining evidence-based modalities with deep cultural empathy.",
    ],
    treeQuote:
      "Deep roots allow trees to weather the strongest storms.",
    whyTreeTitle: "Why Deep Roots?",
    whyTreeText: [
      "Grounding ourselves in family, heritage, and inner values provides stability during uncertainty.",
    ],
  },
  {
    slug: "jessica-bateman",
    name: "Jessica Bateman, RP",
    title: "Registered Psychotherapist",
    roleCategory: "Psychotherapist",
    photo: "/images/home/member-placeholder.png",
    email: "mail@resiliencec.com",
    phone: "+ 1 (548) 866-0366",
    location: "111 Waterloo St. London ON N6B 2M4",
    coreSkills: "Relationships, Stress Management, Personal Growth",
    focus:
      "Focuses on relationships, stress management, and personal growth.",
    bio: [
      "Jessica is a Registered Psychotherapist who helps individuals and couples foster meaningful connections and overcome emotional hurdles.",
      "She specializes in relational therapy, burnout recovery, and stress regulation.",
    ],
  },
  {
    slug: "ingi-elakary",
    name: "Ingi ElAkary",
    title: "Registered Psychotherapist",
    roleCategory: "Psychotherapist",
    photo: "/images/home/member-placeholder.png",
    email: "mail@resiliencec.com",
    phone: "+ 1 (548) 866-0366",
    location: "111 Waterloo St. London ON N6B 2M4",
    coreSkills: "Trauma-informed care, Anxiety, Multilingual Support",
    focus:
      "Specializes in trauma-informed care, anxiety, and cultural support.",
    bio: [
      "Ingi provides trauma-informed therapy tailored to newcomers, refugees, and individuals navigating identity and anxiety.",
      "She offers bilingual therapy in English and Arabic.",
    ],
  },
  {
    slug: "mahnoor-ahmed",
    name: "Mahnoor Ahmed, RP",
    title: "Registered Psychotherapist",
    roleCategory: "Psychotherapist",
    photo: "/images/home/member-placeholder.png",
    email: "mail@resiliencec.com",
    phone: "+ 1 (548) 866-0366",
    location: "111 Waterloo St. London ON N6B 2M4",
    coreSkills: "Anxiety, Self-esteem, Life Transitions",
    focus:
      "Specializes in anxiety, self-esteem, and life transitions.",
    bio: [
      "Mahnoor works with young adults and adults facing life transitions, anxiety, and identity shifts.",
    ],
  },
  {
    slug: "seniha-yildiz",
    name: "Seniha Yildiz, RP",
    title: "Registered Psychotherapist",
    roleCategory: "Clinical Psychologist",
    photo: "/images/home/member-placeholder.png",
    email: "mail@resiliencec.com",
    phone: "+ 1 (548) 866-0366",
    location: "111 Waterloo St. London ON N6B 2M4",
    coreSkills: "Refugee Care, IFHP, War Trauma",
    focus:
      "Specializes in newcomer transition, trauma recovery, and family counseling.",
    bio: [
      "Seniha is a lead psychotherapist specializing in newcomer and refugee care, war trauma, and culturally integrative therapy.",
    ],
  },
];
