/**
 * Journal page content & posts list
 */

export interface PostItem {
  id: string;
  title: string;
  excerpt: string;
  tag: string;
  image: string;
  imageAlt: string;
  href: string;
  date?: string;
}

export const journalCategories = [
  "All",
  "Anxiety and Stress",
  "Bullying",
  "Depression",
  "Public",
  "Refugees",
  "Self care",
  "Sleep hygiene",
  "Supervision and training",
];

export const featuredPost: PostItem = {
  id: "featured-1",
  title: "Injectable Steroids: A Complete Guide",
  excerpt:
    "Injectable steroids are compounds commonly used in the world of sports and bodybuilding to increase muscle mass, improve performance, and accelerate recovery. These products are synthetic versions of male sex hormones, primarily testosterone, and are administered via intramuscular injections.",
  tag: "Self care",
  image: "/images/home/journal-featured.jpg",
  imageAlt: "Hand holding a small injectable vial",
  href: "/journal/injectable-steroids-a-complete-guide",
  date: "July 24, 2026",
};

export const journalPosts: PostItem[] = [
  {
    id: "post-1",
    title: "Optimal Supplementation for Maximal...",
    excerpt: "Introduction hypertrophy, or the increase in muscle mass...",
    tag: "Self care",
    image: "/images/journal/Rectangle 9975.png",
    imageAlt: "Plant protein powder and shaker",
    href: "/journal/optimal-supplementation-for-maximal",
  },
  {
    id: "post-2",
    title: "Oxandrolone 10 mg in Bodybuilding: An...",
    excerpt: "Introduction hypertrophy, or the increase in muscle mass...",
    tag: "Self care",
    image: "/images/journal/Rectangle 9975 (1).png",
    imageAlt: "Athlete training with dumbbells",
    href: "/journal/oxandrolone-10mg-in-bodybuilding",
  },
  {
    id: "post-3",
    title: "Optimal Supplementation for Maximal...",
    excerpt: "Introduction hypertrophy, or the increase in muscle mass...",
    tag: "Self care",
    image: "/images/journal/Rectangle 9975 (2).png",
    imageAlt: "Plant protein powder and shaker",
    href: "/journal/optimal-supplementation-for-maximal-2",
  },
  {
    id: "post-4",
    title: "Optimal Supplementation for Maximal...",
    excerpt: "Introduction hypertrophy, or the increase in muscle mass...",
    tag: "Self care",
    image: "/images/journal/Rectangle 9975.png",
    imageAlt: "Plant protein powder and shaker",
    href: "/journal/optimal-supplementation-for-maximal-3",
  },
  {
    id: "post-5",
    title: "Oxandrolone 10 mg in Bodybuilding: An...",
    excerpt: "Introduction hypertrophy, or the increase in muscle mass...",
    tag: "Self care",
    image: "/images/journal/Rectangle 9975 (1).png",
    imageAlt: "Athlete training with dumbbells",
    href: "/journal/oxandrolone-10mg-in-bodybuilding-2",
  },
  {
    id: "post-6",
    title: "Optimal Supplementation for Maximal...",
    excerpt: "Introduction hypertrophy, or the increase in muscle mass...",
    tag: "Self care",
    image: "/images/journal/Rectangle 9975 (2).png",
    imageAlt: "Plant protein powder and shaker",
    href: "/journal/optimal-supplementation-for-maximal-4",
  },
  {
    id: "post-7",
    title: "Optimal Supplementation for Maximal...",
    excerpt: "Introduction hypertrophy, or the increase in muscle mass...",
    tag: "Self care",
    image: "/images/journal/Rectangle 9975.png",
    imageAlt: "Plant protein powder and shaker",
    href: "/journal/optimal-supplementation-for-maximal-5",
  },
  {
    id: "post-8",
    title: "Oxandrolone 10 mg in Bodybuilding: An...",
    excerpt: "Introduction hypertrophy, or the increase in muscle mass...",
    tag: "Self care",
    image: "/images/journal/Rectangle 9975 (1).png",
    imageAlt: "Athlete training with dumbbells",
    href: "/journal/oxandrolone-10mg-in-bodybuilding-3",
  },
  {
    id: "post-9",
    title: "Optimal Supplementation for Maximal...",
    excerpt: "Introduction hypertrophy, or the increase in muscle mass...",
    tag: "Self care",
    image: "/images/journal/Rectangle 9975 (2).png",
    imageAlt: "Plant protein powder and shaker",
    href: "/journal/optimal-supplementation-for-maximal-6",
  },
];
