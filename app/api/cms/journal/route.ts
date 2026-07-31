import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import clientPromise from "@/lib/mongodb";
import { journalPosts as defaultPosts, featuredPost as defaultFeatured } from "@/data/journal";
import { JournalPost } from "@/lib/models/journal-post";

const defaultBlocks = [
  { id: "b1", type: "paragraph" as const, value: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt." },
  { id: "b2", type: "header" as const, value: "Lorem ipsum dolor sit amet" },
  { id: "b3", type: "paragraph" as const, value: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
  { id: "b4", type: "header" as const, value: "Lorem ipsum dolor sit amet" },
  { id: "b5", type: "paragraph" as const, value: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
  { id: "b6", type: "image" as const, value: "/images/home/member-placeholder.png", alt: "Supplementation and daily wellness care products" },
  { id: "b7", type: "paragraph" as const, value: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
  { id: "b8", type: "header" as const, value: "Lorem ipsum dolor sit amet consectetur" },
  { id: "b9", type: "paragraph" as const, value: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
  { id: "b10", type: "image" as const, value: "/images/home/journal-featured.jpg", alt: "Medical research and clinical care" },
  { id: "b11", type: "paragraph" as const, value: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { id: "b12", type: "quote" as const, value: "Lorem ipsum dolor sit amet, consectetur, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud." },
  { id: "b13", type: "header" as const, value: "Lorem ipsum dolor sit amet consectetur" },
  { id: "b14", type: "paragraph" as const, value: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
  { id: "b15", type: "bullet" as const, value: "Lorem ipsum dolor sit" },
  { id: "b16", type: "paragraph" as const, value: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." },
  { id: "b17", type: "image" as const, value: "/images/about/our-approach.jpg", alt: "Therapy session and patient support" }
];

// Helper to seed the DB once, the first time the collection is ever accessed.
// A meta flag (rather than countDocuments() === 0) ensures that an admin who
// deletes every post afterwards sees a genuine empty state instead of the
// defaults silently reappearing on the next request.
async function getJournalCollection() {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection<JournalPost>("journal_posts");
  const meta = db.collection<{ _id: string; value: boolean }>("journal_meta");

  const seedFlag = await meta.findOne({ _id: "journal_seeded" });
  if (!seedFlag) {
    await meta.updateOne(
      { _id: "journal_seeded" },
      { $set: { value: true } },
      { upsert: true }
    );
    // Seed initial posts
    const allDefaults: JournalPost[] = [
      {
        id: defaultFeatured.id,
        slug: defaultFeatured.href.replace("/journal/", ""),
        title: defaultFeatured.title,
        excerpt: defaultFeatured.excerpt,
        tag: defaultFeatured.tag,
        image: defaultFeatured.image,
        imageAlt: defaultFeatured.imageAlt,
        date: defaultFeatured.date || "July 24, 2026",
        readTime: "5 Min Read",
        blocks: defaultBlocks,
      },
      ...defaultPosts.map((p) => ({
        id: p.id,
        slug: p.href.replace("/journal/", ""),
        title: p.title,
        excerpt: p.excerpt,
        tag: p.tag,
        image: p.image,
        imageAlt: p.imageAlt,
        date: p.date || "July 24, 2026",
        readTime: "4 Min Read",
        blocks: defaultBlocks,
      })),
    ];
    await collection.insertMany(allDefaults);
  }
  return collection;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    
    const collection = await getJournalCollection();
    
    if (slug) {
      const post = await collection.findOne({ slug });
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      return NextResponse.json({ post });
    }
    
    const posts = await collection.find({}).toArray();
    return NextResponse.json({ posts });
  } catch (err) {
    console.error("Journal GET error:", err);
    // Return static defaults if DB is offline
    const slug = new URL(request.url).searchParams.get("slug");
    if (slug) {
      if (slug === defaultFeatured.href.replace("/journal/", "")) {
        return NextResponse.json({
          post: {
            ...defaultFeatured,
            slug,
            readTime: "5 Min Read",
            blocks: defaultBlocks,
          }
        });
      }
      const match = defaultPosts.find((p) => p.href.replace("/journal/", "") === slug);
      if (match) {
        return NextResponse.json({
          post: {
            ...match,
            slug,
            readTime: "4 Min Read",
            blocks: defaultBlocks,
          }
        });
      }
      return NextResponse.json({ error: "Post not found (fallback)" }, { status: 404 });
    }
    const allFallback = [
      {
        ...defaultFeatured,
        slug: defaultFeatured.href.replace("/journal/", ""),
        readTime: "5 Min Read",
        blocks: defaultBlocks,
      },
      ...defaultPosts.map((p) => ({
        ...p,
        slug: p.href.replace("/journal/", ""),
        readTime: "4 Min Read",
        blocks: defaultBlocks,
      })),
    ];
    return NextResponse.json({ posts: allFallback });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("cms_admin_session")?.value;
    if (session !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, excerpt, tag, image, imageAlt, blocks } = body;
    
    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    
    const collection = await getJournalCollection();
    let slug = baseSlug;
    let counter = 1;
    while (await collection.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    const newPost: JournalPost = {
      id: "post-" + Date.now(),
      slug,
      title,
      excerpt: excerpt || "",
      tag: tag || "Public",
      image: image || "/images/home/journal-featured.jpg",
      imageAlt: imageAlt || title,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      readTime: "5 Min Read",
      blocks: blocks || [],
    };
    
    await collection.insertOne(newPost);
    return NextResponse.json({ success: true, post: newPost });
  } catch (err) {
    console.error("Journal POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("cms_admin_session")?.value;
    if (session !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { slug, title, excerpt, tag, image, imageAlt, blocks } = body;
    
    if (!slug) {
      return NextResponse.json({ error: "Slug is required for update" }, { status: 400 });
    }
    
    const collection = await getJournalCollection();
    const post = await collection.findOne({ slug });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    
    const updateData: Partial<JournalPost> = {};
    if (title !== undefined) updateData.title = title;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (tag !== undefined) updateData.tag = tag;
    if (image !== undefined) updateData.image = image;
    if (imageAlt !== undefined) updateData.imageAlt = imageAlt;
    if (blocks !== undefined) updateData.blocks = blocks;
    
    await collection.updateOne({ slug }, { $set: updateData });
    return NextResponse.json({ success: true, slug });
  } catch (err) {
    console.error("Journal PUT error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("cms_admin_session")?.value;
    if (session !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    
    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }
    
    const collection = await getJournalCollection();
    const result = await collection.deleteOne({ slug });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Journal DELETE error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
