"use client";

import Image from "next/image";
import { journal as defaultJournal, type JournalPost } from "@/data/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { useCms } from "@/components/cms/CmsProvider";
import { EditableText } from "@/components/cms/EditableText";
import { EditableImage } from "@/components/cms/EditableImage";
import journalLeafMask from "@/public/images/decor/journal-leaf-mask.svg";

function JournalCard({ post, index }: { post: JournalPost; index: number }) {
  return (
    <article className="flex flex-col items-start gap-4 rounded-[20px] border border-black/5 bg-white/80 p-4 shadow-[0px_4px_10.1px_rgba(176,125,73,0.3)]">
      <div className="relative h-[247px] w-full overflow-hidden rounded-2xl bg-camel-200">
        <EditableImage
          pageId="home"
          path={`journal.posts[${index}].image`}
          src={post.image}
          alt={post.imageAlt || post.title}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {post.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="rounded-[4px] bg-mint-200 px-3 py-1.5 text-body-sm text-green-700"
            >
              <EditableText pageId="home" path={`journal.posts[${index}].tags[${tagIndex}]`} value={tag} />
            </span>
          ))}
        </div>
      )}

      <h3 className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-body-xl text-green-700">
        <EditableText pageId="home" path={`journal.posts[${index}].title`} value={post.title} />
      </h3>

      <ButtonLink
        href={post.href}
        variant="tertiary"
        size="sm"
        className="!px-0 font-bold"
        trailingIcon={<ArrowUpRightIcon size={14} />}
      >
        Read More
      </ButtonLink>
    </article>
  );
}

export function JournalSection() {
  const { getContentValue } = useCms();
  const journal = getContentValue("home", "journal", defaultJournal);
  const posts: JournalPost[] = journal.posts ?? [];

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] py-20 lg:py-24">

      {/* ── Mask group.svg: small textured leaf — top-left corner ── */}
      <Image
        src={journalLeafMask}
        alt=""
        aria-hidden
        width={85}
        height={168}
        className="pointer-events-none absolute left-0 top-0 z-0 hidden opacity-70 lg:block"
      />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">

        {/* Centered heading */}
        <SectionHeading
          eyebrow={<EditableText pageId="home" path="journal.eyebrow" value={journal.eyebrow} />}
          heading={<EditableText pageId="home" path="journal.heading" value={journal.heading} />}
        />

        {/* Post cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <JournalCard key={index} post={post} index={index} />
          ))}
        </div>

        {/* View all — centered below cards */}
        <div className="mt-10 flex justify-center">
          <ButtonLink href={journal.ctaHref} variant="secondary" size="md">
            <EditableText pageId="home" path="journal.ctaLabel" value={journal.ctaLabel} />
          </ButtonLink>
        </div>

      </div>
    </section>
  );
}
