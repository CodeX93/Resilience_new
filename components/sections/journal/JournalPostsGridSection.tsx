"use client";

import { useState } from "react";
import Image from "next/image";
import { journalCategories, journalPosts } from "@/data/journal";
import { BlogCard } from "@/components/ui/BlogCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import journalSprigA from "@/public/images/decor/journal-sprig-a.svg";
import journalSprigB from "@/public/images/decor/journal-sprig-b.svg";

export function JournalPostsGridSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filter posts based on selected category
  const filteredPosts =
    selectedCategory === "All"
      ? journalPosts
      : journalPosts.filter((p) => p.tag.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section className="relative overflow-hidden bg-[#f7f0e7] py-12 lg:py-20">
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
                className={`rounded-full px-5 py-2 text-body-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-green-950 text-white shadow-ds2"
                    : "border border-camel-400/60 bg-white/80 text-green-950 hover:bg-camel-200/80"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 3x3 Grid of Posts */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* ── Pagination Bar Container ── */}
        <div className="mt-14 flex justify-center">
          <div className="inline-flex items-center gap-4 rounded-[20px] border border-camel-400/50 bg-[#faf6f0]/90 px-4 py-2 shadow-ds1">
            {/* Previous Page Arrow */}
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="flex size-9 items-center justify-center rounded-full bg-[#efe8de] text-green-950/40 transition disabled:opacity-70"
            >
              <ChevronLeftIcon size={16} />
            </button>

            {/* Page Numbers 1, 2, 3 */}
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`font-heading text-body-base transition-all ${
                  currentPage === page
                    ? "flex size-9 items-center justify-center rounded-full bg-green-950 text-white font-semibold shadow-ds1"
                    : "px-2.5 text-green-950 hover:text-green-700 font-medium"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Ellipsis */}
            <span className="font-heading text-body-base text-green-950 px-1 font-medium">...</span>

            {/* Page Number 9 */}
            <button
              type="button"
              onClick={() => setCurrentPage(9)}
              className={`font-heading text-body-base transition-all ${
                currentPage === 9
                  ? "flex size-9 items-center justify-center rounded-full bg-green-950 text-white font-semibold shadow-ds1"
                  : "px-2.5 text-green-950 hover:text-green-700 font-medium"
              }`}
            >
              9
            </button>

            {/* Next Page Arrow */}
            <button
              type="button"
              aria-label="Next page"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, 9))}
              className="flex size-9 items-center justify-center rounded-full bg-mint-300/80 text-green-950 transition hover:bg-mint-300"
            >
              <ChevronRightIcon size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
