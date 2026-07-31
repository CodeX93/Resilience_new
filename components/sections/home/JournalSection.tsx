import Image from "next/image";
import { journal } from "@/data/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import leaf from "@/public/images/icons/leaf.svg";
import journalWave from "@/public/images/decor/journal-wave-top-right.svg";
import journalBranch from "@/public/images/decor/journal-branch-left.svg";
import journalLeafMask from "@/public/images/decor/journal-leaf-mask.svg";

export function JournalSection() {
  const post = journal.featured;

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] py-20 lg:py-24">

      {/* ── Vector 34: large cream wave — top-right background sweep ── */}
      <Image
        src={journalWave}
        alt=""
        aria-hidden
        width={1103}
        height={539}
        className="pointer-events-none absolute right-0 top-0 z-0 hidden w-[65%] max-w-[860px] lg:block"
      />

      {/* ── Group.svg: muted-green botanical branch — top-right, in front of wave ── */}
      <Image
        src={journalBranch}
        alt=""
        aria-hidden
        width={354}
        height={622}
        className="pointer-events-none absolute right-0 top-0 z-0 hidden w-[240px] opacity-80 lg:block"
      />

      {/* ── Mask group.svg: small textured leaf — bottom-left corner ── */}
      <Image
        src={journalLeafMask}
        alt=""
        aria-hidden
        width={85}
        height={168}
        className="pointer-events-none absolute bottom-0 left-0 z-0 hidden opacity-70 lg:block"
      />

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">

        {/* Centered heading */}
        <SectionHeading eyebrow={journal.eyebrow} heading={journal.heading} />

        {/* Featured article card */}
        <article className="mt-12 grid overflow-hidden rounded-3xl border border-camel-500/40 shadow-ds3 lg:grid-cols-[1fr_1.45fr]" style={{ background: "linear-gradient(180deg, #FFFCF7 0%, #E8E2D8 100%)" }}>

          {/* Left: text content */}
          <div className="flex flex-col items-start justify-center gap-5 p-8 lg:p-12">

            {/* Tag pill */}
            {post.tag && (
              <span className="inline-flex items-center gap-2 rounded-full bg-mint-300/70 px-4 py-1.5 text-body-sm text-green-700">
                <Image src={leaf} alt="" width={13} height={13} aria-hidden />
                {post.tag}
              </span>
            )}

            {/* Title */}
            <h3 className="font-heading text-h3 text-green-950">{post.title}</h3>

            {/* Excerpt */}
            <p className="text-body-sm leading-relaxed text-green-700/80">
              {post.excerpt}
            </p>

            {/* CTA */}
            <ButtonLink
              href={post.href}
              variant="secondary"
              size="md"
              className="mt-3"
              trailingIcon={<ArrowUpRightIcon size={16} />}
            >
              Learn more
            </ButtonLink>
          </div>

          {/* Right: featured image — dark fallback while asset is pending */}
          <div className="relative min-h-[280px] w-full bg-[#2e2e2e] lg:min-h-[380px]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        </article>

        {/* View all — centered below card */}
        <div className="mt-10 flex justify-center">
          <ButtonLink href={journal.ctaHref} variant="secondary" size="md">
            {journal.ctaLabel}
          </ButtonLink>
        </div>

      </div>
    </section>
  );
}
