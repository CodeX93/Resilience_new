/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPageContent, savePageContent } from "@/lib/cms-service";

const COOKIE_NAME = "cms_admin_session";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  return session && session.value === "authenticated";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get("pageId");

  if (!pageId) {
    return NextResponse.json({ error: "pageId parameter is required" }, { status: 400 });
  }

  try {
    const content = await getPageContent(pageId);
    return NextResponse.json({ content });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to load content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { pageId, content } = body;

    if (!pageId || !content) {
      return NextResponse.json({ error: "pageId and content are required" }, { status: 400 });
    }

    const result = await savePageContent(pageId, content);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save content" }, { status: 500 });
  }
}
