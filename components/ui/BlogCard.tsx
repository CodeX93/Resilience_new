import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import leaf from "@/public/images/icons/leaf.svg";
import type { PostItem } from "@/data/journal";

export function BlogCard({ post }: { post: PostItem }) {
  return (
    <article className="group flex flex-col justify-between rounded-[28px] border border-camel-400/60 bg-white p-6 shadow-ds2 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_18px_45px_rgba(52,26,16,0.14)] hover:border-camel-500/80">
      <div>
        {/* Top Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-camel-200">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="mt-5 flex flex-col items-start gap-3">
          {/* Tag pill */}
          <span className="inline-flex items-center gap-2 rounded-full border border-camel-300/80 bg-white px-3.5 py-1.5 text-body-sm text-green-800 font-medium shadow-ds1">
            <Image src={leaf} alt="" width={13} height={13} aria-hidden />
            {post.tag}
          </span>

          {/* Title */}
          <h3 className="font-heading text-h3 text-green-950 leading-snug line-clamp-2 transition-colors group-hover:text-green-800">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-body-sm text-green-700/80 leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Link CTA */}
      <div className="mt-6 pt-4 border-t border-camel-200/70 flex items-center justify-between">
        <Link
          href={post.href}
          className="inline-flex items-center gap-1.5 text-body-sm font-bold text-green-950 transition-colors group-hover:text-green-800"
        >
          Learn more
          <ArrowUpRightIcon size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </article>
  );
}
