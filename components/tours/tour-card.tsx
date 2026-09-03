import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";

import { ImageFrame } from "@/components/ui/image-frame";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatDateRange, formatDuration, formatPriceFrom } from "@/lib/format";
import type { Tour, TourDeparture } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Tour listing card.
 *
 * Price falls back to "On enquiry" when none is published - never to zero.
 * The next departure is optional: a tour with no scheduled date still gets a
 * card, it simply does not claim one.
 */
export function TourCard({
  tour,
  nextDeparture,
  className,
}: {
  tour: Tour;
  nextDeparture?: TourDeparture | null;
  className?: string;
}) {
  const price = formatPriceFrom(nextDeparture?.price ?? tour.priceFrom);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors hover:border-gold-600/50",
        className,
      )}
    >
      <ImageFrame
        image={tour.heroImage}
        aspect="landscape"
        className="rounded-none"
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="text-overline uppercase text-gold-400">
            {formatDuration(tour.durationNights, tour.durationDays)}
          </p>
          {nextDeparture ? <StatusBadge status={nextDeparture.status} /> : null}
        </div>

        <h3 className="mt-3 text-h3">
          <Link href={`/tours/${tour.slug}`}>
            <span className="absolute inset-0" aria-hidden="true" />
            {tour.title}
          </Link>
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {tour.shortDescription}
        </p>

        <dl className="mt-5 space-y-2 text-sm text-muted-foreground">
          <div className="flex gap-2.5">
            <dt className="sr-only">Route</dt>
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <dd>{tour.routeSummary}</dd>
          </div>
          {nextDeparture ? (
            <div className="flex gap-2.5">
              <dt className="sr-only">Next departure</dt>
              <CalendarDays
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0"
              />
              <dd>
                {formatDateRange(nextDeparture.startDate, nextDeparture.endDate)}
              </dd>
            </div>
          ) : null}
        </dl>

        <p className="mt-auto pt-5 text-sm">
          {price ? (
            <span className="font-medium text-foreground">{price}</span>
          ) : (
            <span className="text-muted-foreground">Price on enquiry</span>
          )}
        </p>
      </div>
    </article>
  );
}
