import Image from "next/image";
import { featuredPost } from "@/data/journal";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import leaf from "@/public/images/icons/leaf.svg";
import journalWave from "@/public/images/decor/journal-wave-top-right.svg";
import journalBranch from "@/public/images/decor/journal-branch-right.svg";

export function JournalHeroSection() {
  const post = featuredPost;

  return (
    <section className="relative overflow-hidden bg-[#f7f0e7] pt-12 pb-16 lg:pt-16 lg:pb-20">
      {/* ── Vector 34: large cream wave sweeping from top-right ── */}
      <Image
        src={journalWave}
        alt=""
        aria-hidden
        width={1103}
        height={539}
        className="pointer-events-none absolute right-0 top-0 z-0 hidden w-[68%] max-w-[860px] lg:block"
      />

      {/* ── Botanical branch illustration top-right ── */}
      <Image
        src={journalBranch}
        alt=""
        aria-hidden
        width={354}
        height={622}
        className="pointer-events-none absolute right-0 top-0 z-0 hidden w-[200px] opacity-60 lg:block"
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        {/* Page Title */}
        <h1 className="font-heading text-h1 text-center text-green-950">
          The Resilience Journal
        </h1>

        {/* Featured Article Card */}
        <article className="mt-10 grid overflow-hidden rounded-3xl border border-camel-400/80 bg-gradient-to-br from-[#ffffff] to-[#faf6f0] shadow-ds3 lg:grid-cols-[1fr_1.45fr]">
          {/* Left: Content */}
          <div className="flex flex-col items-start justify-center gap-5 p-8 sm:p-10 lg:p-12">
            {post.tag && (
              <span className="inline-flex items-center gap-2 rounded-full bg-mint-300/70 px-4 py-1.5 text-body-sm text-green-700">
                <Image src={leaf} alt="" width={13} height={13} aria-hidden />
                {post.tag}
              </span>
            )}

            <h2 className="font-heading text-h2 text-green-950">
              {post.title}
            </h2>

            <p className="text-body-base text-green-700/90 leading-relaxed">
              {post.excerpt}
            </p>

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

          {/* Right: Featured Image */}
          <div className="relative min-h-[280px] w-full bg-[#2e2e2e] lg:min-h-[400px]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
