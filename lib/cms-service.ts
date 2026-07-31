import clientPromise from "./mongodb";
import * as home from "@/data/home";
import { aboutPageData as about } from "@/data/about";
import { servicesPageData as services } from "@/data/services";
import { teamRoleCategories } from "@/data/team";
import { contactPageData as contact } from "@/data/contact";
import * as journal from "@/data/journal";
import * as navigation from "@/data/navigation";

/* eslint-disable @typescript-eslint/no-explicit-any */
const defaultDataMap: Record<string, any> = {
  home: {
    hero: home.hero,
    whatWeOffer: home.whatWeOffer,
    whoWeAre: home.whoWeAre,
    team: home.team,
    journal: home.journal,
    newsletter: home.newsletter,
  },
  about: about,
  services: services,
  team: {
    roleCategories: teamRoleCategories,
  },
  contact: contact,
  journal: {
    categories: journal.journalCategories,
    featuredPost: journal.featuredPost,
    posts: journal.journalPosts,
  },
  navigation: {
    primaryNav: navigation.primaryNav,
    authLink: navigation.authLink,
    primaryCta: navigation.primaryCta,
    contactInfo: navigation.contactInfo,
    socialLinks: navigation.socialLinks,
    footerContact: navigation.footerContact,
    copyright: navigation.copyright,
    legalLinks: navigation.legalLinks,
  },
};

function deepMerge(target: any, source: any): any {
  if (!source) return target;
  if (!target) return source;

  if (Array.isArray(target) && Array.isArray(source)) {
    return source; // For arrays, override completely to avoid item duplication/ordering issues
  }

  if (typeof target === "object" && typeof source === "object") {
    const result = { ...target };
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === "object") {
        result[key] = deepMerge(target[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
    return result;
  }

  return source;
}

export async function getPageContent(pageId: string) {
  const defaultData = defaultDataMap[pageId];
  if (!defaultData) {
    throw new Error(`Invalid page ID: ${pageId}`);
  }

  try {
    const client = await clientPromise;
    const db = client.db("resilience_cms");
    const collection = db.collection("page_content");

    const doc = await collection.findOne({ pageId });
    if (!doc) {
      // Initialize with default data if empty
      await collection.insertOne({ pageId, content: defaultData, updatedAt: new Date() });
      return defaultData;
    }

    return deepMerge(defaultData, doc.content);
  } catch (error) {
    console.error(`MongoDB error fetching page content for ${pageId}:`, error);
    // Graceful fallback to static files
    return defaultData;
  }
}

export async function savePageContent(pageId: string, newContent: any) {
  const defaultData = defaultDataMap[pageId];
  if (!defaultData) {
    throw new Error(`Invalid page ID: ${pageId}`);
  }

  try {
    const client = await clientPromise;
    const db = client.db("resilience_cms");
    const collection = db.collection("page_content");

    // Clean any MongoDB _id fields if they leaked into nested content
    const sanitizedContent = JSON.parse(JSON.stringify(newContent));

    await collection.updateOne(
      { pageId },
      {
        $set: {
          content: sanitizedContent,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
    return { success: true };
  } catch (error) {
    console.error(`MongoDB error saving page content for ${pageId}:`, error);
    throw error;
  }
}
