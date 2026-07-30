"use client";

import { useState } from "react";
import Image from "next/image";
import { journalCategories, journalPosts } from "@/data/journal";
import { BlogCard } from "@/components/ui/BlogCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import offerLeafLeft from "@/public/images/decor/offer-leaf-left.svg";
import offerLeaves from "@/public/images/decor/offer-leaves.svg";

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
      {/* Decorative leaf branch left */}
      <Image
        src={offerLeafLeft}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 top-4 z-0 hidden w-[160px] opacity-70 lg:block"
      />

      {/* Decorative leaf branch right */}
      <Image
        src={offerLeaves}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-12 z-0 hidden w-[200px] opacity-60 lg:block"
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

        {/* Pagination Bar */}
        <div className="mt-14 flex items-center justify-center gap-2">
          {/* Previous Page Arrow */}
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="flex size-9 items-center justify-center rounded-full border border-camel-300 bg-white/90 text-green-800 transition hover:bg-camel-200/80"
          >
            <ChevronLeftIcon size={16} />
          </button>

          {/* Page Number 1 */}
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`flex size-9 items-center justify-center rounded-full text-body-sm font-bold transition ${
              currentPage === 1
                ? "bg-green-950 text-white shadow-ds1"
                : "bg-white/80 text-green-950 hover:bg-camel-200"
            }`}
          >
            1
          </button>

          {/* Page Number 2 */}
          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`flex size-9 items-center justify-center rounded-full text-body-sm font-bold transition ${
              currentPage === 2
                ? "bg-green-950 text-white shadow-ds1"
                : "bg-white/80 text-green-950 hover:bg-camel-200"
            }`}
          >
            2
          </button>

          {/* Page Number 3 */}
          <button
            type="button"
            onClick={() => setCurrentPage(3)}
            className={`flex size-9 items-center justify-center rounded-full text-body-sm font-bold transition ${
              currentPage === 3
                ? "bg-green-950 text-white shadow-ds1"
                : "bg-white/80 text-green-950 hover:bg-camel-200"
            }`}
          >
            3
          </button>

          {/* Ellipsis */}
          <span className="px-1 text-body-sm text-green-700/60 font-bold">...</span>

          {/* Page Number 9 */}
          <button
            type="button"
            onClick={() => setCurrentPage(9)}
            className={`flex size-9 items-center justify-center rounded-full text-body-sm font-bold transition ${
              currentPage === 9
                ? "bg-green-950 text-white shadow-ds1"
                : "bg-white/80 text-green-950 hover:bg-camel-200"
            }`}
          >
            9
          </button>

          {/* Next Page Arrow */}
          <button
            type="button"
            aria-label="Next page"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, 9))}
            className="flex size-9 items-center justify-center rounded-full border border-camel-300 bg-white/90 text-green-800 transition hover:bg-camel-200/80"
          >
            <ChevronRightIcon size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
