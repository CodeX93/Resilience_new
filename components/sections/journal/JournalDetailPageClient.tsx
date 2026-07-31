"use client";

import React, { useState, useEffect } from "react";
import { useCms } from "@/components/cms/CmsProvider";
import { JournalDetailHeroSection } from "./JournalDetailHeroSection";
import { JournalDetailContentSection } from "./JournalDetailContentSection";
import { ExploreMorePostsSection } from "./ExploreMorePostsSection";

import { JournalPost } from "@/lib/models/journal-post";

interface JournalDetailPageClientProps {
  slug: string;
}

export function JournalDetailPageClient({ slug }: JournalDetailPageClientProps) {
  const { journalPosts, loadJournalPosts } = useCms();
  const [post, setPost] = useState<JournalPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      if (journalPosts.length === 0) {
        await loadJournalPosts();
      }
      try {
        const res = await fetch(`/api/cms/journal?slug=${slug}`);
        if (res.ok && active) {
          const data = await res.json();
          if (data.post) {
            setPost(data.post);
          }
        }
      } catch (err) {
        console.error("Error fetching post details:", err);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [slug, journalPosts.length, loadJournalPosts]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#faf2ef]">
        <div className="text-center">
          <span className="text-4xl animate-bounce inline-block mb-2">🌿</span>
          <p className="text-green-800 font-semibold">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#faf2ef]">
        <div className="text-center">
          <span className="text-5xl inline-block mb-4">🔍</span>
          <h2 className="font-heading text-h3 text-green-950 font-bold mb-2">Article Not Found</h2>
          <p className="text-green-700/80 mb-6">The article you are looking for does not exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <JournalDetailHeroSection post={post} setPost={setPost} />
      <JournalDetailContentSection post={post} setPost={setPost} />
      <ExploreMorePostsSection />
    </>
  );
}
