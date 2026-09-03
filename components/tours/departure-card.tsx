import { CalendarDays, MapPin, Clock } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { ImageFrame } from "@/components/ui/image-frame";
import { StatusBadge } from "@/components/ui/status-badge";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import {
  formatDateRange,
  formatDuration,
  formatPriceFrom,
  formatSeatsRemaining,
} from "@/lib/format";
import type { Tour, TourDeparture } from "@/lib/types";
import { tourEnquiryMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * A dated group departure.
 *
 * Carries two actions, so unlike TourCard it does not stretch a link over the
 * whole card - two overlapping click targets would be ambiguous for both mouse
 * and screen reader users.
 *
 * Seat counts appear only when genuinely published. Nothing here invents
 * scarcity: if seatsRemaining is null, the line is simply absent.
 */
export function DepartureCard({
  tour,
  departure,
  className,
}: {
  tour: Tour;
  departure: TourDeparture;
  className?: string;
}) {
  const price = formatPriceFrom(departure.price ?? tour.priceFrom);
  const seats = formatSeatsRemaining(departure.seatsRemaining);
  const soldOut = departure.status === "sold_out";

  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-sm border border-border bg-card sm:flex-row",
        className,
      )}
    >
      <ImageFrame
        image={tour.heroImage}
        aspect="landscape"
        sizes="(min-width: 640px) 33vw, 100vw"
        className="rounded-none sm:w-2/5 sm:shrink-0"
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-overline uppercase text-gold-400">
            {tour.routeSummary.split(" - ")[0]}
          </p>
          <StatusBadge status={departure.status} />
        </div>

        <h3 className="mt-3 text-h3">{tour.title}</h3>

        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {tour.shortDescription}
        </p>

        <dl className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
          <div className="flex gap-2.5">
            <dt className="sr-only">Dates</dt>
            <CalendarDays aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <dd>{formatDateRange(departure.startDate, departure.endDate)}</dd>
          </div>
          <div className="flex gap-2.5">
            <dt className="sr-only">Duration</dt>
            <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <dd>{formatDuration(tour.durationNights, tour.durationDays)}</dd>
          </div>
          <div className="flex gap-2.5 sm:col-span-2">
            <dt className="sr-only">Boarding point</dt>
            <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
            <dd>Boarding at {departure.boardingPoint}</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-5">
          <div>
            {price ? (
              <p className="font-medium">{price}</p>
            ) : (
              <p className="text-sm text-muted-foreground">Price on enquiry</p>
            )}
            {seats ? (
              <p className="mt-1 text-xs text-muted-foreground">{seats}</p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            <ButtonLink href={`/tours/${tour.slug}`} size="sm" variant="outline">
              View Trip
            </ButtonLink>
            {!soldOut ? (
              <WhatsAppButton
                message={tourEnquiryMessage(tour, departure)}
                label="Enquire Now"
                size="sm"
              />
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
