/**
 * Decorative pull-quote used between sections on the Home page.
 */
export function Quote({
  text,
  author,
  className,
}: {
  text: string;
  author: string;
  className?: string;
}) {
  return (
    <figure className={`flex flex-col items-center text-center ${className ?? ""}`}>
      <blockquote className="w-full max-w-2xl text-quote text-green-700">
        &ldquo;{text}&rdquo;
      </blockquote>
      <figcaption className="mt-3 text-body-base text-green-600">
        &mdash; {author}
      </figcaption>
    </figure>
  );
}
