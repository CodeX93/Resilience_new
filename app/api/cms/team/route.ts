import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import clientPromise from "@/lib/mongodb";
import { TeamMember } from "@/lib/models/team-member";
import { teamMembersSeed } from "@/lib/seed/team-members-seed";

// Seeds the collection once, the first time it's ever accessed. A meta flag
// (rather than countDocuments() === 0) ensures that an admin who deletes
// every member afterwards sees a genuine empty state instead of the seed
// data silently reappearing on the next request.
async function getTeamCollection() {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection<TeamMember>("team_members");
  const meta = db.collection<{ _id: string; value: boolean }>("team_meta");

  const seedFlag = await meta.findOne({ _id: "team_seeded" });
  if (!seedFlag) {
    await meta.updateOne(
      { _id: "team_seeded" },
      { $set: { value: true } },
      { upsert: true }
    );
    await collection.insertMany(teamMembersSeed);
  }
  return collection;
}

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("cms_admin_session")?.value === "authenticated";
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    const collection = await getTeamCollection();

    if (slug) {
      const member = await collection.findOne({ slug });
      if (!member) {
        return NextResponse.json({ error: "Team member not found" }, { status: 404 });
      }
      return NextResponse.json({ member });
    }

    const members = await collection.find({}).toArray();
    return NextResponse.json({ members });
  } catch (err) {
    console.error("Team GET error:", err);
    return NextResponse.json({ error: "Failed to load team members" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { slug, ...updates } = body;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required for update" }, { status: 400 });
    }

    const collection = await getTeamCollection();
    const member = await collection.findOne({ slug });
    if (!member) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    delete updates.id;
    delete updates.slug;

    await collection.updateOne({ slug }, { $set: updates });
    return NextResponse.json({ success: true, slug });
  } catch (err) {
    console.error("Team PUT error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
