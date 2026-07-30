"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

/**
 * Horizontal scroll-snap carousel with prev/next controls + pagination dots.
 * Enabled arrow = filled green; disabled (at an end) = white.
 */
export function Carousel({
  children,
  ariaLabel,
  className,
  showDots = true,
}: {
  children: ReactNode[];
  ariaLabel: string;
  className?: string;
  showDots?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [active, setActive] = useState(0);
  const count = children.length;

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
    const frac = max > 0 ? el.scrollLeft / max : 0;
    setActive(Math.round(frac * (count - 1)));
  };

  useEffect(() => {
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.7, 460), behavior: "smooth" });
  };

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (max * i) / Math.max(count - 1, 1), behavior: "smooth" });
  };

  const arrowBase =
    "absolute top-1/2 z-10 flex size-14 -translate-y-1/2 items-center justify-center rounded-full shadow-ds2 transition max-lg:size-11";

  return (
    <div className={className}>
      <div className="relative">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          className={`${arrowBase} left-0 -translate-x-1/2 ${
            atStart
              ? "cursor-default bg-white text-green-700"
              : "bg-green-700 text-white hover:bg-green-800"
          }`}
        >
          <ChevronLeftIcon size={24} />
        </button>

        <div
          ref={trackRef}
          role="group"
          aria-label={ariaLabel}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {children.map((child, i) => (
            <div key={i} className="snap-start shrink-0">
              {child}
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          className={`${arrowBase} right-0 translate-x-1/2 ${
            atEnd
              ? "cursor-default bg-white text-green-700"
              : "bg-green-700 text-white hover:bg-green-800"
          }`}
        >
          <ChevronRightIcon size={24} />
        </button>
      </div>

      {showDots && count > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to item ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-green-700" : "w-2 bg-green-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
