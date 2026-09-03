import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ImageFrame } from "@/components/ui/image-frame";
import type { Destination } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Destination tile.
 *
 * The whole card is clickable, but there is only ONE link in the markup - the
 * heading anchor is stretched over the card with an absolute overlay. Wrapping
 * the entire card in an anchor instead would make a screen reader read the
 * image, heading and body as a single unwieldy link name.
 */
export function DestinationCard({
  destination,
  size = "default",
  className,
}: {
  destination: Destination;
  /** "feature" gets a taller frame and larger heading in mixed grids. */
  size?: "default" | "feature";
  className?: string;
}) {
  const isFeature = size === "feature";

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-gold-600/50",
        className,
      )}
    >
      <ImageFrame
        image={destination.heroImage}
        aspect={isFeature ? "wide" : "landscape"}
        sizes={
          isFeature
            ? "(min-width: 1024px) 66vw, 100vw"
            : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        }
        className="rounded-none"
      />

      <div className={cn("flex flex-1 flex-col p-5", isFeature && "sm:p-7")}>
        <p className="text-overline uppercase text-gold-400">
          {destination.region}
        </p>

        <h3 className={cn("mt-2", isFeature ? "text-h2" : "text-h3")}>
          <Link href={`/destinations/${destination.slug}`}>
            {/* Stretches the link over the whole card without adding a second
                tab stop or a second announced link. */}
            <span className="absolute inset-0" aria-hidden="true" />
            {destination.name}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {isFeature ? destination.summary : destination.tagline}
        </p>

        <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold-400">
          Explore
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </p>
      </div>
    </article>
  );
}
