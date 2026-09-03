import Image from "next/image";

import type { ImageRef } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Renders a photograph, or a deliberate stand-in when none exists yet.
 *
 * No photography has been supplied and the brief rules out generic stock, so
 * the fallback is an abstract ridgeline drawn in brand colours. It reads as a
 * design choice rather than a broken image, and it is unmistakably not a
 * photograph of anywhere real - which matters, because showing a stock
 * mountain under the name of a specific valley would be a lie.
 *
 * Swap in real images by populating heroImage in the data layer; nothing here
 * needs to change.
 */
export function ImageFrame({
  image,
  aspect = "landscape",
  className,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  priority = false,
  showCredit = false,
}: {
  image: ImageRef | null;
  aspect?: "landscape" | "portrait" | "square" | "wide";
  className?: string;
  sizes?: string;
  priority?: boolean;
  /**
   * Overlays the photographer credit. Enabled on large, single images where
   * the text is legible. Small grid cards leave it off and are covered by the
   * /credits page instead, which is accepted practice for CC attribution on
   * the web - the licence asks for attribution reasonable to the medium, not
   * a caption on every thumbnail.
   */
  showCredit?: boolean;
}) {
  const aspectClass = {
    landscape: "aspect-[4/3]",
    portrait: "aspect-[3/4]",
    square: "aspect-square",
    wide: "aspect-[16/9]",
  }[aspect];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm bg-ink-800",
        aspectClass,
        className,
      )}
    >
      {image ? (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
          {showCredit && image.credit ? (
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/75 to-transparent px-3 pb-1.5 pt-6 text-[11px] leading-tight text-sand-50/80">
              {image.credit}
            </span>
          ) : null}
        </>
      ) : (
        <RidgelinePlaceholder />
      )}
    </div>
  );
}

/**
 * Decorative only, so it is hidden from assistive technology. There is no alt
 * text because there is nothing here to describe.
 */
function RidgelinePlaceholder() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
    >
      <rect width="400" height="300" fill="var(--color-ink-800)" />
      <path
        d="M0 300 L0 214 L58 158 L104 196 L163 128 L214 178 L268 118 L322 168 L400 104 L400 300 Z"
        fill="var(--color-ink-700)"
      />
      <path
        d="M0 300 L0 250 L74 208 L138 244 L196 200 L262 240 L330 198 L400 236 L400 300 Z"
        fill="var(--color-ink-600)"
      />
      <line
        x1="0"
        y1="300"
        x2="400"
        y2="300"
        stroke="var(--color-gold-600)"
        strokeWidth="3"
        opacity="0.55"
      />
    </svg>
  );
}
