import { Bed, Route } from "lucide-react";

import type { ItineraryDay } from "@/lib/types";

const MEAL_LABEL: Record<string, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

/**
 * Day-by-day itinerary.
 *
 * Renders an honest empty state rather than filler. An itinerary is the thing
 * a traveller decides on, so "being finalised" is the only acceptable message
 * when there is no real content - never a plausible-looking sample.
 */
export function Itinerary({ days }: { days: ItineraryDay[] }) {
  if (days.length === 0) {
    return (
      <p className="rounded-sm border border-dashed border-border bg-muted/50 p-6 text-sm leading-relaxed text-muted-foreground">
        The detailed day-by-day itinerary for this trip is being finalised. Get
        in touch and we will send it across as soon as it is confirmed.
      </p>
    );
  }

  return (
    <ol className="space-y-8">
      {days.map((day) => (
        <li key={day.day} className="relative border-l border-border pl-6">
          {/* Marker sits on the timeline rule. Decorative, so it is hidden. */}
          <span
            aria-hidden="true"
            className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-gold-600"
          />

          <p className="text-overline uppercase text-gold-400">
            Day {day.day}
          </p>
          <h3 className="mt-2 text-h3">{day.title}</h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {day.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {day.overnightAt ? (
              <span className="inline-flex items-center gap-2">
                <Bed aria-hidden="true" className="size-4 shrink-0" />
                Overnight at {day.overnightAt}
              </span>
            ) : null}

            {typeof day.approxDistanceKm === "number" ? (
              <span className="inline-flex items-center gap-2">
                <Route aria-hidden="true" className="size-4 shrink-0" />
                Approx. {day.approxDistanceKm} km
              </span>
            ) : null}

            {day.meals && day.meals.length > 0 ? (
              <span>
                Meals: {day.meals.map((m) => MEAL_LABEL[m] ?? m).join(", ")}
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
