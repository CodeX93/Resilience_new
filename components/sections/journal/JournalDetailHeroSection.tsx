import Image from "next/image";
import Link from "next/link";
import leaf from "@/public/images/icons/leaf.svg";
import journalWave from "@/public/images/decor/journal-wave-top-right.svg";
import offerLeaves from "@/public/images/decor/offer-leaves.svg";

interface DetailHeroProps {
  title: string;
  tag: string;
  date?: string;
  readTime?: string;
  image: string;
  imageAlt: string;
}

export function JournalDetailHeroSection({
  title,
  tag,
  date = "15 July 2026",
  readTime = "5 Min Read",
  image,
  imageAlt,
}: DetailHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#f7f0e7] pt-8 pb-12 lg:pt-12 lg:pb-16">
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
        {/* Breadcrumb Trail */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-body-sm text-green-700/80 font-medium">
          <Link href="/journal" className="transition hover:text-green-950">
            Blog
          </Link>
          <span className="text-green-700/40">&gt;</span>
          <span className="text-green-950 font-semibold truncate max-w-md">
            {title}
          </span>
        </nav>

        {/* Article H1 Title */}
        <h1 className="font-heading text-h1 text-center text-green-950 max-w-3xl mx-auto leading-tight">
          {title}
        </h1>

        {/* Featured Image Banner */}
        <div className="mt-8 relative aspect-[16/9] w-full max-w-4xl mx-auto overflow-hidden rounded-[28px] border border-camel-400/80 bg-[#2e2e2e] shadow-ds3">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover"
          />
        </div>

        {/* Meta Bar: Tag | Date | Read Time */}
        <div className="mt-6 flex items-center justify-center gap-3 text-body-sm font-semibold text-green-800">
          <span className="inline-flex items-center gap-1.5">
            <Image src={leaf} alt="" width={13} height={13} aria-hidden />
            {tag}
          </span>
          <span className="text-green-700/40">|</span>
          <span>{date}</span>
          <span className="text-green-700/40">|</span>
          <span>{readTime}</span>
        </div>
      </div>
    </section>
  );
}
