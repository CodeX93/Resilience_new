export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  title: string;
  roleCategory: string;
  photo: string;
  photoAlt: string;
  email: string;
  phone: string;
  location: string;
  coreSkills: string;
  focus: string;
  bio: string[];
  treeArtwork: string;
  treeArtworkAlt: string;
  treeQuote?: string;
  whyTreeTitle?: string;
  whyTreeText?: string[];
}
