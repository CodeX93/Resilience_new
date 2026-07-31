"use client";

import { useEffect } from "react";
import Image from "next/image";
import { featuredPost as defaultFeaturedPost } from "@/data/journal";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableText } from "@/components/cms/EditableText";
import { EditableImage } from "@/components/cms/EditableImage";
import leaf from "@/public/images/icons/leaf.svg";
import journalBgWave from "@/public/images/decor/journal-bg-wave.svg";
import journalSprigHero from "@/public/images/decor/journal-sprig-hero.svg";

export function JournalHeroSection() {
  const { isEditMode, journalPosts, loadJournalPosts, updateJournalPost, getContentValue } = useCms();
  const heading = getContentValue("journal", "heading", "The Resilience Journal");

  useEffect(() => {
    loadJournalPosts();
  }, [loadJournalPosts]);

  const post =
    journalPosts[0] ||
    {
      ...defaultFeaturedPost,
      slug: defaultFeaturedPost.href.replace("/journal/", ""),
    };

  const handleUpdate = async (field: string, value: string) => {
    await updateJournalPost(post.slug, { [field]: value });
  };

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] pt-12 pb-16 lg:pt-16 lg:pb-20">
      {/* ── Vector 34: large cream wave background sweep (lowest layer) ── */}
      <Image
        src={journalBgWave}
        alt=""
        aria-hidden
        width={1103}
        height={539}
        className="pointer-events-none absolute right-0 top-0 z-0 hidden w-[72%] max-w-[960px] lg:block opacity-90"
      />

      {/* ── Group 1597881382: botanical sprig illustration top-right ──
          Positioned above top-right of image card, extending left toward title
          and passing behind the top-right rounded edge of the image card.  ── */}
      <Image
        src={journalSprigHero}
        alt=""
        aria-hidden
        width={215}
        height={200}
        className="pointer-events-none absolute right-[30px] top-[-10px] z-[1] hidden w-[360px] lg:w-[440px] max-w-none opacity-85 lg:block"
      />

      {/* ── Main Content (z-10 ensures card is in front of sprig & wave) ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        {/* Page Title */}
        <h1 className="font-heading text-h1 text-center text-green-950">
          <EditableText pageId="journal" path="heading" value={heading} />
        </h1>

        {/* Featured Article Card */}
        <article className="mt-10 grid overflow-hidden rounded-3xl border border-camel-400/70 shadow-ds4 lg:grid-cols-[1fr_1.45fr]">

          {/* Left Column: Warm cream gradient background (NOT white) */}
          <div className="flex flex-col items-start justify-center gap-5 bg-gradient-to-br from-[#FAF6F0] via-[#F6EFE5] to-[#EFE7D8] p-8 sm:p-10 lg:p-12">
            {(post.tag || isEditMode) && (
              <span className="inline-flex items-center gap-2 rounded-full border border-camel-400/50 bg-white/70 px-4 py-1.5 text-body-sm text-green-800 shadow-ds1 font-medium">
                <Image src={leaf} alt="" width={13} height={13} aria-hidden />
                {isEditMode ? (
                  <EditableText
                    pageId={`journal-${post.slug}`}
                    path="tag"
                    value={post.tag}
                    onChange={(val) => handleUpdate("tag", val)}
                  />
                ) : (
                  post.tag
                )}
              </span>
            )}

            <h2 className="font-heading text-h2 text-green-950 w-full">
              {isEditMode ? (
                <EditableText
                  pageId={`journal-${post.slug}`}
                  path="title"
                  value={post.title}
                  onChange={(val) => handleUpdate("title", val)}
                />
              ) : (
                post.title
              )}
            </h2>

            <p className="text-body-base text-green-700/90 leading-relaxed w-full">
              {isEditMode ? (
                <EditableText
                  pageId={`journal-${post.slug}`}
                  path="excerpt"
                  value={post.excerpt}
                  isTextArea
                  onChange={(val) => handleUpdate("excerpt", val)}
                />
              ) : (
                post.excerpt
              )}
            </p>

            <ButtonLink
              href={`/journal/${post.slug}`}
              variant="secondary"
              size="md"
              className="mt-3"
              trailingIcon={<ArrowUpRightIcon size={16} />}
            >
              Learn more
            </ButtonLink>
          </div>

          {/* Right Column: Featured Image */}
          <div className="relative min-h-[280px] w-full bg-[#2e2e2e] lg:min-h-[400px]">
            {isEditMode ? (
              <EditableImage
                pageId={`journal-${post.slug}`}
                path="image"
                src={post.image}
                alt={post.imageAlt || post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                onSave={async (src, alt) => {
                  await updateJournalPost(post.slug, { image: src, imageAlt: alt });
                }}
              />
            ) : (
              <Image
                src={post.image}
                alt={post.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
