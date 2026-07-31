import { journalPosts } from "@/data/journal";
import { BlogCard } from "@/components/ui/BlogCard";

export function ExploreMorePostsSection() {
  // Grab 3 posts to display as related items
  const relatedPosts = journalPosts.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-[#faf2ef] py-16 lg:py-24">
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <h2 className="font-heading text-h2 text-green-950 mb-10">
          Explore more
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
