/**
 * Decorative pull-quote used in Hero and between sections.
 */
export function Quote({
  text,
  author,
  className,
}: {
  text?: string;
  author?: string;
  className?: string;
}) {
  return (
    <figure className={`flex flex-col items-center text-center ${className ?? ""}`}>
      <blockquote className="w-full max-w-lg font-quote text-[28px] text-[#485b50] tracking-normal leading-relaxed">
        &ldquo;We don&apos;t have to do all of it alone.
        <br />
        We were never meant to.&rdquo;
      </blockquote>
      <figcaption className="w-full max-w-lg pt-4 font-quote text-[28px] text-[#485b50] tracking-normal leading-relaxed">
        -Bren&eacute; Brown
      </figcaption>
    </figure>
  );
}
