"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableText } from "@/components/cms/EditableText";
import { EditableImage } from "@/components/cms/EditableImage";
import leaf from "@/public/images/icons/leaf.svg";
import journalWave from "@/public/images/decor/journal-wave-top-right.svg";
import offerLeaves from "@/public/images/decor/offer-leaves.svg";

import { JournalPost } from "@/lib/models/journal-post";

interface DetailHeroProps {
  post: JournalPost;
  setPost: (val: JournalPost) => void;
}

export function JournalDetailHeroSection({ post, setPost }: DetailHeroProps) {
  const router = useRouter();
  const { isEditMode, updateJournalPost, deleteJournalPost } = useCms();
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdate = async (field: keyof JournalPost, value: any) => {
    const updatedPost = { ...post, [field]: value } as JournalPost;
    setPost(updatedPost);
    await updateJournalPost(post.slug, { [field]: value });
  };

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] pt-8 pb-12 lg:pt-12 lg:pb-16">
      {/* ── Vector 34: large cream wave top-right ── */}
      <Image
        src={journalWave}
        alt=""
        aria-hidden
        width={1103}
        height={539}
        className="pointer-events-none absolute right-0 top-0 z-0 hidden w-[65%] max-w-[840px] lg:block"
      />

      {/* ── Leaf branch illustration top-right ── */}
      <Image
        src={offerLeaves}
        alt=""
        aria-hidden
        width={255}
        height={243}
        className="pointer-events-none absolute right-0 top-0 z-0 hidden w-[220px] opacity-65 lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        {/* Breadcrumb Trail & Delete Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-body-sm text-green-700/80 font-medium">
            <Link href="/journal" className="transition hover:text-green-950">
              Blog
            </Link>
            <span className="text-green-700/40">&gt;</span>
            <span className="text-green-950 font-semibold truncate max-w-md">
              {post.title}
            </span>
          </nav>
          
          {isEditMode && (
            <button
              onClick={async () => {
                if (confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
                  const success = await deleteJournalPost(post.slug);
                  if (success) {
                    router.push("/journal");
                  } else {
                    alert("Failed to delete post.");
                  }
                }
              }}
              className="rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-semibold px-4 py-2 shadow transition cursor-pointer"
            >
              Delete Post
            </button>
          )}
        </div>

        {/* Article H1 Title */}
        <h1 className="font-heading text-h1 text-center text-green-950 max-w-3xl mx-auto leading-tight w-full">
          {isEditMode ? (
            <EditableText
              pageId={`journal-${post.slug}`}
              path="title"
              value={post.title}
              onChange={(newVal) => handleUpdate("title", newVal)}
            />
          ) : (
            post.title
          )}
        </h1>

        {/* Featured Image Banner */}
        <div className="mt-8 relative aspect-[16/9] w-full max-w-4xl mx-auto overflow-hidden rounded-[28px] border border-camel-400/80 bg-[#2e2e2e] shadow-ds3">
          {isEditMode ? (
            <EditableImage
              pageId={`journal-${post.slug}`}
              path="image"
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
              onSave={async (src, alt) => {
                const updatedPost = { ...post, image: src, imageAlt: alt } as JournalPost;
                setPost(updatedPost);
                await updateJournalPost(post.slug, { image: src, imageAlt: alt });
              }}
            />
          ) : (
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          )}
        </div>

        {/* Meta Bar: Tag | Date | Read Time */}
        <div className="mt-6 flex items-center justify-center gap-3 text-body-sm font-semibold text-green-800">
          <span className="inline-flex items-center gap-1.5">
            <Image src={leaf} alt="" width={13} height={13} aria-hidden />
            {isEditMode ? (
              <EditableText
                pageId={`journal-${post.slug}`}
                path="tag"
                value={post.tag}
                onChange={(newVal) => handleUpdate("tag", newVal)}
              />
            ) : (
              post.tag
            )}
          </span>
          <span className="text-green-700/40">|</span>
          <span>
            {isEditMode ? (
              <EditableText
                pageId={`journal-${post.slug}`}
                path="date"
                value={post.date}
                onChange={(newVal) => handleUpdate("date", newVal)}
              />
            ) : (
              post.date
            )}
          </span>
          <span className="text-green-700/40">|</span>
          <span>
            {isEditMode ? (
              <EditableText
                pageId={`journal-${post.slug}`}
                path="readTime"
                value={post.readTime || "5 Min Read"}
                onChange={(newVal) => handleUpdate("readTime", newVal)}
              />
            ) : (
              post.readTime || "5 Min Read"
            )}
          </span>
        </div>
      </div>
    </section>
  );
}
