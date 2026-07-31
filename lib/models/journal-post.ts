export interface ContentBlock {
  id: string;
  type: "paragraph" | "header" | "quote" | "image" | "bullet";
  value: string;
  alt?: string;
}

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  image: string;
  imageAlt: string;
  date: string;
  readTime?: string;
  blocks: ContentBlock[];
}
