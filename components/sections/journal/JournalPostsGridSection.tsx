"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { journalCategories } from "@/data/journal";
import { BlogCard } from "@/components/ui/BlogCard";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "@/components/ui/icons";
import { useCms } from "@/components/cms/CmsProvider";
import journalSprigA from "@/public/images/decor/journal-sprig-a.svg";
import journalSprigB from "@/public/images/decor/journal-sprig-b.svg";

export function JournalPostsGridSection() {
  const router = useRouter();
  const { isEditMode, journalPosts, loadJournalPosts, createJournalPost } = useCms();
  
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form fields for new post
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tag, setTag] = useState(journalCategories[1]); // Default to first actual category
  const [coverImage, setCoverImage] = useState("/images/home/journal-featured.jpg");
  const [uploadTab, setUploadTab] = useState<"file" | "url">("file");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadJournalPosts();
  }, [loadJournalPosts]);

  // Filter posts based on selected category
  const filteredPosts =
    selectedCategory === "All"
      ? journalPosts
      : journalPosts.filter(
          (p) => p.tag?.toLowerCase() === selectedCategory.toLowerCase()
        );

  // Pagination config
  const POSTS_PER_PAGE = 9;
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) || 1;
  const pageToRender = Math.min(currentPage, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (pageToRender - 1) * POSTS_PER_PAGE,
    pageToRender * POSTS_PER_PAGE
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/cms/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setCoverImage(data.url);
      } else {
        alert("Failed to upload image.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    const newPost = await createJournalPost({
      title,
      excerpt,
      tag,
      image: coverImage,
      imageAlt: title,
      blocks: [
        { id: "b1", type: "paragraph", value: "Start writing your article here..." }
      ]
    });
    setIsSubmitting(false);

    if (newPost) {
      setIsModalOpen(false);
      // Reset form
      setTitle("");
      setExcerpt("");
      setCoverImage("/images/home/journal-featured.jpg");
      // Redirect to the newly created post detail page
      router.push(`/journal/${newPost.slug}`);
    } else {
      alert("Failed to create post. Please try again.");
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] py-12 lg:py-20">
      {/* Decorative sprig left (Group (1).svg) */}
      <Image
        src={journalSprigA}
        alt=""
        aria-hidden
        width={184}
        height={300}
        className="pointer-events-none absolute left-0 top-0 z-0 hidden w-[180px] opacity-70 lg:block"
      />

      {/* Decorative sprig right (Group (2).svg) */}
      <Image
        src={journalSprigB}
        alt=""
        aria-hidden
        width={197}
        height={300}
        className="pointer-events-none absolute right-0 top-0 z-0 hidden w-[190px] opacity-70 lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        
        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-5xl mx-auto">
          {journalCategories.map((cat) => {
            const isActive = cat === selectedCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2 text-body-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "rounded-full bg-[#314C43] text-white shadow-ds2"
                    : "rounded-lg border border-camel-400/40 bg-white/80 text-green-950 hover:bg-camel-200/80"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Creator Control Card */}
        {isEditMode && (
          <div className="mt-8 flex justify-center w-full">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-green-800 hover:bg-green-900 text-white font-semibold px-6 py-3 shadow-ds2 transition cursor-pointer"
            >
              <PlusIcon size={18} />
              Create New Journal Post
            </button>
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center text-center p-8 rounded-3xl border border-camel-300 bg-white/60 shadow-ds3 max-w-2xl mx-auto py-16 animate-in fade-in duration-200">
            {/* Friendly botanical empty state illustration using leaves watermark styling */}
            <div className="relative w-28 h-28 bg-camel-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <span className="text-5xl" role="img" aria-label="Leaves">🌿</span>
            </div>
            <h3 className="font-heading text-h3 text-green-950 mb-2">No Journal Posts Found</h3>
            <p className="text-body-base text-green-700/80 max-w-md mb-8 leading-relaxed">
              We couldn&apos;t find any articles matching this category in the CMS database. Try checking a different topic, or create one yourself!
            </p>
            {isEditMode && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-green-800 hover:bg-green-900 text-white px-5 py-2.5 font-semibold transition shadow"
              >
                <PlusIcon size={16} />
                Add First Article
              </button>
            )}
          </div>
        ) : (
          <>
            {/* 3x3 Grid of Posts */}
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post) => (
                <BlogCard key={post.id} post={{ ...post, href: `/journal/${post.slug}` }} />
              ))}
            </div>

            {/* ── Pagination Bar Container ── */}
            {totalPages > 1 && (
              <div className="mt-14 flex justify-center">
                <div className="inline-flex items-center gap-4 rounded-[20px] border border-camel-400/50 bg-[#faf6f0]/90 px-4 py-2 shadow-ds1">
                  {/* Previous Page Arrow */}
                  <button
                    type="button"
                    aria-label="Previous page"
                    disabled={pageToRender === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="flex size-9 items-center justify-center rounded-full bg-[#efe8de] text-green-950/40 transition disabled:opacity-70"
                  >
                    <ChevronLeftIcon size={16} />
                  </button>

                  {/* Page Numbers */}
                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`font-heading text-body-base transition-all ${
                        pageToRender === page
                          ? "flex size-9 items-center justify-center rounded-full bg-green-950 text-white font-semibold shadow-ds1"
                          : "px-2.5 text-green-950 hover:text-green-700 font-medium"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  {/* Next Page Arrow */}
                  <button
                    type="button"
                    aria-label="Next page"
                    disabled={pageToRender === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="flex size-9 items-center justify-center rounded-full bg-mint-300/80 text-green-950 transition hover:bg-mint-300"
                  >
                    <ChevronRightIcon size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-[9999]" onClick={() => setIsModalOpen(false)}>
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-heading text-xl font-bold text-green-950 mb-4">Create New Journal Post</h3>
            <form onSubmit={handleCreatePost} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-green-800 mb-1">Post Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-green-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mint-500"
                  placeholder="e.g. Navigating Workplace Anxiety"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-green-800 mb-1">Short Excerpt (Card Summary)</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full rounded-lg border border-green-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mint-500 resize-none"
                  placeholder="Write a brief overview of this post..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-green-800 mb-1">Topic Category</label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full rounded-lg border border-green-200 p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-mint-500"
                >
                  {journalCategories.filter(c => c !== "All").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Cover Image Selector */}
              <div>
                <label className="block text-xs font-semibold text-green-800 mb-1">Cover Image</label>
                <div className="flex gap-2 mb-2 border-b border-green-100 pb-1">
                  <button
                    type="button"
                    onClick={() => setUploadTab("file")}
                    className={`text-xs font-bold pb-1 px-2 ${uploadTab === "file" ? "border-b-2 border-green-800 text-green-800" : "text-green-600/60"}`}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadTab("url")}
                    className={`text-xs font-bold pb-1 px-2 ${uploadTab === "url" ? "border-b-2 border-green-800 text-green-800" : "text-green-600/60"}`}
                  >
                    Image URL
                  </button>
                </div>

                {uploadTab === "file" ? (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full text-xs text-green-800 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-camel-100 file:text-green-950 hover:file:bg-camel-200 cursor-pointer"
                  />
                ) : (
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full rounded-lg border border-green-200 p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-mint-500"
                    placeholder="https://example.com/image.jpg"
                  />
                )}
              </div>

              {coverImage && (
                <div className="relative h-28 w-full overflow-hidden rounded-xl border border-camel-200 bg-camel-50">
                  <Image src={coverImage} alt="Cover Preview" fill className="object-cover" />
                </div>
              )}

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !title.trim()}
                  className="rounded-lg bg-green-800 px-5 py-2 text-sm font-semibold text-white hover:bg-green-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating..." : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
