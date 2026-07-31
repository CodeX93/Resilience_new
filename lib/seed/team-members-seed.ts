import { TeamMember } from "@/lib/models/team-member";

const treeQuote =
  "Like the maple, I believe our greatest strength lies not in resisting change, but in growing beautifully through it.";
const whyTreeTitle = "Why the Maple Tree?";
const whyTreeText = [
  "The maple reminds me that change is a natural part of growth. Its deep roots provide stability while its branches continue to reach toward new possibilities.",
  "In therapy, I hope to offer that same balance of grounding, compassion, and encouragement as clients move through life's seasons.",
];

const loremBio = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
];

function base(overrides: Partial<TeamMember> & Pick<TeamMember, "slug" | "id">): TeamMember {
  return {
    photo: "",
    photoAlt: "",
    treeArtwork: "",
    treeArtworkAlt: "",
    treeQuote,
    whyTreeTitle,
    whyTreeText,
    email: "",
    phone: "+1 (548) 866-0366",
    location: "111 Waterloo St. London ON N6B 2M4",
    coreSkills: "",
    focus: "",
    bio: [],
    name: "",
    title: "",
    roleCategory: "",
    ...overrides,
  };
}

export const teamMembersSeed: TeamMember[] = [
  base({
    id: "team-amjed-abojedi",
    slug: "amjed-abojedi",
    name: "Amjed Abojedi, PhD, RP",
    title: "Registered Psychotherapist",
    roleCategory: "Psychotherapist",
    email: "aabojedi@resiliencec.com",
    coreSkills: "Working with both children and adults",
    focus:
      "Bilingual clinical consultant and psychotherapist specializing in child protection, play therapy, and refugee trauma recovery.",
    bio: [
      "Amjed Abojedi PhD RP is a bilingual clinical consultant, psychotherapist, and researcher with profound expertise in child and family dynamics. He has extensive experience in child protection interventions, working closely with social agencies to develop comprehensive plans for child welfare and protection. Dr. Abojedi completed APT and CACPT-certified training in play therapy at the Rocky Mountain Play Therapy Institute in Canada.",
      "As a Canadian Certified Counselor and play-based psychotherapy practitioner, he has dedicated his career to helping children exposed to prolonged trauma, unstable living conditions, violence, and bullying. With 18 years of progressive experience in psychotherapy and mental health, Dr. Abojedi has cultivated a culturally sensitive approach to psychological intervention.",
      "His work with displaced refugees incorporates diverse CBT and CPT strategies, such as reframing, psychoeducation, solution-focused therapy, cognitive modeling and restructuring, emotional processing, and stress inoculation. He also employs emotional regulation strategies to assist refugees in managing anxiety, depression, and PTSD symptoms.",
      "Through his work, he has helped refugees develop healthier coping strategies, build resilience, and gain the confidence to thrive in their communities.",
    ],
  }),
  base({
    id: "team-soaad",
    slug: "soaad",
    name: "Soaad",
    title: "Lorem ipsum dolor",
    roleCategory: "Psychotherapist",
    email: "email@example.com",
    coreSkills: "Lorem ipsum dolor",
    focus: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    bio: loremBio,
  }),
  base({
    id: "team-jessica-bateman",
    slug: "jessica-bateman",
    name: "Jessica Bateman, RPQ",
    title: "Psychotherapist, Art Therapist",
    roleCategory: "Art Therapist",
    email: "email@example.com",
    coreSkills: "Working with both children and adults",
    focus:
      "Person-centred psychotherapist and art therapist supporting grief, anxiety, and emotion regulation.",
    bio: [
      "Hi there, I'm Jessica Bateman RP-Q, a person-centred psychotherapist currently pursuing my Master of Arts in Counselling Psychology from Yorkville University. With a background in using an existential and phenomenological approach to art therapy for those in assisted living facilities and those experiencing grief and loss.",
      "I am now equipped with various verbal techniques, including cognitive behavioural therapy, to support adults and youth dealing with issues such as anxiety, depression, and emotion regulation. My approach to therapy involves working collaboratively with individuals to identify their strengths and empower them to live authentically.",
    ],
  }),
  base({
    id: "team-mae-latif",
    slug: "mae-latif",
    name: "Mae Latif, RP-Q",
    title: "Registered Psychotherapist (Qualifying)",
    roleCategory: "Psychotherapist (Qualifying)",
    email: "mail@resiliencec.com",
    coreSkills: "Working with both children and adults",
    focus:
      "Supports clients navigating intergenerational trauma, identity, and culturally-rooted healing.",
    bio: [
      "My curiosity about human interactions and behavior started early in life. Growing up as a child of immigrant parents, I had to negotiate the tension between the culture in my family home and the outside world. I always had to scan my environment and adapt accordingly between Western and Middle Eastern social norms, which meant that I had to be highly attuned to my surroundings. Naturally, I leaned towards trying to understand political diplomacy and cultural nuances. I went on to pursue a Bachelor's degree in International Affairs, specializing in Politics, Economics, and History at the University of Toronto.",
      "Over the years, I worked within minority communities to empower individuals with knowledge to overcome barriers associated with immigration. Such experiences informed my understanding of the impacts of social and economic disparities on mental well-being, sparking my interest in psychology. In tandem, I was constantly on a journey of personal growth and wanting to better myself. I spent years acquiring academic and experiential knowledge in psychology and sociology. I am currently completing my Master of Arts in Counselling Psychology at Yorkville University. Additionally, I am training in trauma-informed therapies to guide individuals and families to understand the nature of intergenerational trauma and its profound effects on the self, body, relationships, and spirituality.",
      "I am also in the process of developing therapeutic strategies catering to clients from collectivist cultures. My passion also lies in bringing knowledge from Islamic literature and healing modalities to the Western world to move beyond a mental health model that solely centers on the mind to one that acknowledges emotional pain can be held in the body, particularly in the heart. I prioritize supplying the knowledge I've gathered to my clients, as every individual, when given adequate resources, is their best healer.",
      "The therapeutic container I provide allows individuals to turn inwards and explore parts of themselves that they may have buried deep down. I also know that acquiring practical skills and solutions is necessary to navigate daily life and integrate this into my work. I am honored to be entrusted by clients with their most sensitive stories and approach my profession with integrity.",
    ],
  }),
  base({
    id: "team-lolove-canady",
    slug: "lolove-canady",
    name: "Lolove Canady, RP-Q",
    title: "Registered Psychotherapist (Qualifying)",
    roleCategory: "Psychotherapist (Qualifying)",
    email: "mail@resiliencec.com",
    coreSkills: "Working with both Teens and adults",
    focus:
      "Specializes in anxiety, emotional regulation, and neurodiversity-informed care for teens and adults.",
    bio: [
      "With a warm and empathetic approach, I am a Registered Psychotherapist (Qualifying) with a Master's degree in Psychology, specializing in mental health and applied behavior analysis. I am dedicated to creating a safe, supportive, and nonjudgmental space where clients feel genuinely heard, valued, and empowered to explore their thoughts and emotions.",
      "I work with children, teens, and adults, supporting individuals facing challenges such as anxiety, depression, ADHD, anger, and difficulties with emotional regulation. My practice is grounded in cultural humility and a strong respect for each client's unique background, values, and lived experiences.",
      "By combining active listening with sensitivity to non-verbal communication, I strive to foster a therapeutic relationship that promotes resilience, growth, and self-awareness. I also have training in psychometry and conduct assessments related to ADHD, autism, and cognitive disabilities, allowing me to offer a holistic and informed approach to care.",
      "I believe that therapists must also prioritize their own wellness to support others effectively. I engage in regular supervision, peer consultation, and ongoing professional development to continually refine my skills and remain grounded in evidence-based practices. My goal is to support clients in building healthier habits, cultivating balance, making sense of themselves, and achieving meaningful, lasting change.",
    ],
  }),
  base({
    id: "team-seniha-yildiz",
    slug: "seniha-yildiz",
    name: "Seniha Yildiz, RP",
    title: "Registered Psychotherapist (Qualifying)",
    roleCategory: "Psychotherapist (Qualifying)",
    email: "syildiz@resiliencec.com",
    coreSkills: "Working with both children and adults",
    focus:
      "Chaplain and psychotherapist specializing in spiritually integrated care for depression, anxiety, and PTSD.",
    bio: [
      "Seniha Yildiz RP is a chaplain and registered psychotherapist specializing in providing psychological counseling and spiritually integrated psychotherapy. She focuses on treating depression, anxiety, PTSD, and family and couple relationship issues. Seniha has a profound understanding of the underlying factors contributing to mental health issues and their impact on individuals and their loved ones.",
      "Seniha completed her master's degrees in theological studies and counseling psychology in Canada. She believes that personal, unhelpful thoughts and feelings are central to mental health issues such as depression and anxiety, as well as relationship problems. Seniha helps individuals uncover their core beliefs about themselves, others, and the world, and works with them to build self-esteem and self-confidence through their own resources and strengths.",
      "Passionate about self-development and maintaining healthy families and relationships, Seniha favors Acceptance and Commitment Therapy (ACT) and Emotionally Focused Therapy (EFT). However, she integrates elements from other therapeutic modalities to tailor her approach to each individual's context and needs. She has also enhanced her expertise in treating trauma-related issues and providing couple and family counseling through various certificate programs.",
    ],
  }),
  base({
    id: "team-jennifer-house",
    slug: "jennifer-house",
    name: "Jennifer House, RP-Q",
    title: "Registered Psychotherapist",
    roleCategory: "Psychotherapist",
    email: "mail@resiliencec.com",
    coreSkills: "Working with both Teens and adults",
    focus:
      "Integrative, person-centred therapist supporting clients with strength-based and mindfulness approaches.",
    bio: [
      "Hello! My name is Jennifer House, I am a Registered Psychotherapist – Qualifying (RP-Q), completing my Master's of Counselling Psychology from Yorkville University. My approach is non-judgmental, compassionate, and person-centred. I utilize a integrative approach which can incorporate modalities such as a strength-based approach, solution-focused, acceptance and commitment therapy, mindfulness, and cognitive behavioural therapy.",
      "Supporting people is what I am passionate about. My interest is how I can work with my clients in a collaborative way to understand them and best provide them with an experience that will help their overall wellbeing to the best of my ability.",
    ],
  }),
  base({
    id: "team-shaher-awawdeh",
    slug: "shaher-awawdeh",
    name: "Shaher Awawdeh PhD, MSW, RSW",
    title: "Social Worker and Therapist",
    roleCategory: "Social Worker and Therapist",
    email: "mail@resiliencec.com",
    coreSkills: "Working with both Teens and adults",
    focus:
      "Registered social worker specializing in post-migration stress, racial trauma, and refugee resilience.",
    bio: [
      "I hold a Master of Social Work from Wilfrid Laurier University and am a registered social worker with the Ontario College of Social Workers and Social Service Workers. In my therapeutic practice, I integrate a range of evidence-based counselling approaches, with a particular focus on post-migration stress, race-based traumatic stress, and the complex emotional experiences that accompany major life transitions. I strive to create a supportive, culturally responsive, and empowering space where clients feel heard, valued, and understood. My passion for helping others, combined with a grounded sense of empathy and respect, shapes my commitment to working collaboratively with you to identify meaningful strategies for healing and growth.",
      "In addition to my social work education, I hold a PhD in International Relations from the University of Exeter in the UK. For more than two decades, I have worked with vulnerable and marginalized communities, including refugees, displaced individuals, survivors of discrimination and torture, and at-risk youth and women. My experience with international organizations, including the United Nations, has strengthened my dedication to advocacy, resilience-building, and trauma-informed care. These global experiences continue to guide my therapeutic work today, fueling my belief in every person's capacity for recovery, well-being, and a renewed sense of hope.",
    ],
  }),
  base({
    id: "team-dana",
    slug: "dana",
    name: "Dana",
    title: "Lorem ipsum dolor",
    roleCategory: "Psychotherapist",
    email: "email@example.com",
    coreSkills: "Lorem ipsum dolor",
    focus: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    bio: loremBio,
  }),
  base({
    id: "team-duaa",
    slug: "duaa",
    name: "Duaa",
    title: "Lorem ipsum dolor",
    roleCategory: "Psychotherapist",
    email: "email@example.com",
    coreSkills: "Lorem ipsum dolor",
    focus: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    bio: loremBio,
  }),
];
