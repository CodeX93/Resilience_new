import Image from "next/image";
import offerLeafLeft from "@/public/images/decor/offer-leaf-left.svg";
import heroBranch from "@/public/images/decor/hero-branch.svg";

export function JournalDetailContentSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f0e7] py-12 lg:py-20">
      {/* Decorative leaf branch left */}
      <Image
        src={offerLeafLeft}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 top-24 z-0 hidden w-[180px] opacity-70 lg:block"
      />

      {/* Decorative leaf branch right */}
      <Image
        src={heroBranch}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-[550px] z-0 hidden w-[220px] opacity-65 lg:block"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-10">
        {/* Intro Paragraph */}
        <p className="text-body-lg text-green-700/90 leading-relaxed font-body">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
          odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
          voluptatem sequi nesciunt.
        </p>

        {/* Section Heading 1 */}
        <h2 className="mt-10 font-heading text-h2 text-green-950">
          Lorem ipsum dolor sit amet
        </h2>
        <p className="mt-4 text-body-base text-green-700/90 leading-relaxed">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo.
        </p>

        {/* Section Heading 2 */}
        <h2 className="mt-10 font-heading text-h2 text-green-950">
          Lorem ipsum dolor sit amet
        </h2>
        <p className="mt-4 text-body-base text-green-700/90 leading-relaxed">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo.
        </p>

        {/* Inline Image 1 */}
        <div className="relative my-10 aspect-[16/10] w-full overflow-hidden rounded-3xl border border-camel-400/70 bg-[#ede8df] shadow-ds2">
          <Image
            src="/images/home/member-placeholder.png"
            alt="Supplementation and daily wellness care products"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <p className="text-body-base text-green-700/90 leading-relaxed">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo.
        </p>

        {/* Section Heading 3 */}
        <h2 className="mt-10 font-heading text-h2 text-green-950">
          Lorem ipsum dolor sit amet consectetur
        </h2>
        <p className="mt-4 text-body-base text-green-700/90 leading-relaxed">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo.
        </p>

        {/* Inline Image 2 */}
        <div className="relative my-10 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-camel-400/70 bg-[#2e2e2e] shadow-ds2">
          <Image
            src="/images/home/journal-featured.jpg"
            alt="Medical research and clinical care"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>

        <p className="text-body-base text-green-700/90 leading-relaxed">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        {/* Quote Callout Box */}
        <div className="my-10 rounded-3xl border border-camel-400/80 bg-gradient-to-br from-[#ffffff] to-[#faf6f0] p-8 sm:p-10 text-center shadow-ds2">
          <blockquote className="font-quote text-quote text-green-950 italic">
            &ldquo;Lorem ipsum dolor sit amet, consectetur, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud.&rdquo;
          </blockquote>
        </div>

        {/* Section Heading 4 */}
        <h2 className="mt-10 font-heading text-h2 text-green-950">
          Lorem ipsum dolor sit amet consectetur
        </h2>
        <p className="mt-4 text-body-base text-green-700/90 leading-relaxed">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo.
        </p>

        {/* Bullet List Item */}
        <div className="mt-6 flex items-center gap-3 font-body font-bold text-body-lg text-green-950">
          <span className="text-green-700">✦</span>
          <span>Lorem ipsum dolor sit</span>
        </div>

        <p className="mt-3 text-body-base text-green-700/90 leading-relaxed">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt
          explicabo.
        </p>

        {/* Inline Image 3: Therapy Session */}
        <div className="relative my-10 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-camel-400/70 bg-[#ede8df] shadow-ds2">
          <Image
            src="/images/about/our-approach.jpg"
            alt="Therapy session and patient support"
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
