import React from "react";

export function Quote({
  text,
  author,
  className,
}: {
  text?: React.ReactNode;
  author?: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={`flex flex-col items-center text-center ${className ?? ""}`}>
      <blockquote className="w-full max-w-lg font-quote text-[28px] text-[#485b50] tracking-normal leading-relaxed">
        {text ? <>&ldquo;{text}&rdquo;</> : "We don't have to do all of it alone. We were never meant to."}
      </blockquote>
      <figcaption className="w-full max-w-lg pt-4 font-quote text-[28px] text-[#485b50] tracking-normal leading-relaxed">
        {author ? <>-{author}</> : "-Brené Brown"}
      </figcaption>
    </figure>
  );
}
