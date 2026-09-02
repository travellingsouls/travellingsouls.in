import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  DATA_SOURCE,
  getTours,
  getUpcomingDepartures,
} from "@/lib/data";
import {
  formatDateRange,
  formatDuration,
  formatPriceFrom,
} from "@/lib/format";

/**
 * Internal reference page for the design system (PHASE 2).
 *
 * Kept out of search results permanently, independently of the site-wide
 * noindex that gets removed at launch. Delete this route before going live,
 * or leave it - it costs one static page and is useful when adding components.
 */
export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

const INK = [
  { token: "ink-950", hex: "#05090f", cls: "bg-ink-950" },
  { token: "ink-900", hex: "#0a1220", cls: "bg-ink-900" },
  { token: "ink-800", hex: "#111c2e", cls: "bg-ink-800" },
  { token: "ink-700", hex: "#1a283d", cls: "bg-ink-700" },
  { token: "ink-600", hex: "#27374f", cls: "bg-ink-600" },
  { token: "ink-500", hex: "#3a4c67", cls: "bg-ink-500" },
  { token: "ink-400", hex: "#5c6f8a", cls: "bg-ink-400" },
  { token: "ink-300", hex: "#8798ae", cls: "bg-ink-300" },
  { token: "ink-200", hex: "#b7c2d0", cls: "bg-ink-200" },
  { token: "ink-100", hex: "#dce2ea", cls: "bg-ink-100" },
];

const GOLD = [
  { token: "gold-800", hex: "#5e4a21", cls: "bg-gold-800" },
  { token: "gold-700", hex: "#7a6230", cls: "bg-gold-700" },
  { token: "gold-600", hex: "#987c3e", cls: "bg-gold-600" },
  { token: "gold-500", hex: "#b99a55", cls: "bg-gold-500" },
  { token: "gold-400", hex: "#cdb073", cls: "bg-gold-400" },
  { token: "gold-300", hex: "#e0c894", cls: "bg-gold-300" },
  { token: "gold-200", hex: "#eedfbb", cls: "bg-gold-200" },
  { token: "gold-100", hex: "#f7eeda", cls: "bg-gold-100" },
];

const SAND = [
  { token: "sand-50", hex: "#fbf9f5", cls: "bg-sand-50" },
  { token: "sand-100", hex: "#f5f1ea", cls: "bg-sand-100" },
  { token: "sand-200", hex: "#eae4d9", cls: "bg-sand-200" },
  { token: "sand-300", hex: "#d9d1c3", cls: "bg-sand-300" },
];

function Swatch({ token, hex, cls }: { token: string; hex: string; cls: string }) {
  return (
    <div className="min-w-0">
      <div className={`h-16 rounded-sm border border-border ${cls}`} />
      <p className="mt-1.5 truncate font-mono text-[11px] text-foreground">{token}</p>
      <p className="truncate font-mono text-[11px] text-muted-foreground">{hex}</p>
    </div>
  );
}

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-12">
      <h2 className="text-h2">{title}</h2>
      {note ? (
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{note}</p>
      ) : null}
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default async function StyleguidePage() {
  // Read through the same façade the real pages will use, so this page fails
  // loudly if the data layer breaks rather than silently going stale.
  const [tours, departures] = await Promise.all([
    getTours(),
    getUpcomingDepartures(4),
  ]);
  const tourTitles = new Map(tours.map((t) => [t.slug, t.title]));

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <p className="text-overline uppercase text-gold-700">Internal reference</p>
      <h1 className="mt-3 text-display">Design System</h1>
      <p className="mt-4 max-w-2xl text-lead text-muted-foreground">
        The visual foundation for TravellingSouls. Every colour, size and
        component on the public site resolves back to a token defined here, so
        changing the brand means editing one file rather than hunting through
        components.
      </p>

      <Section
        title="Colour"
        note="Ink carries the weight, sand is the ground, gold is an accent used sparingly. Gold is never a surface colour - it appears as rules, small marks, and text on dark."
      >
        <h3 className="text-h3">Ink</h3>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {INK.map((c) => (
            <Swatch key={c.token} {...c} />
          ))}
        </div>

        <h3 className="mt-10 text-h3">Gold</h3>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {GOLD.map((c) => (
            <Swatch key={c.token} {...c} />
          ))}
        </div>

        <h3 className="mt-10 text-h3">Sand</h3>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {SAND.map((c) => (
            <Swatch key={c.token} {...c} />
          ))}
        </div>
      </Section>

      <Section
        title="Gold on which background?"
        note="Gold is the easiest way to make this site fail an accessibility audit. These are the two combinations that pass at body-text size."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-sm border border-border bg-sand-50 p-6">
            <p className="text-gold-700">
              gold-700 on sand-50 — 5.5:1, passes AA for body text.
            </p>
            <p className="mt-3 text-gold-600">
              gold-600 on sand-50 — 3.6:1, large text and borders only.
            </p>
          </div>
          <div className="rounded-sm border border-border bg-ink-900 p-6">
            <p className="text-gold-400">
              gold-400 on ink-900 — 9.5:1, comfortable for any size.
            </p>
            <p className="mt-3 text-sand-50">
              sand-50 on ink-900 — the standard pairing for dark sections.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="Typography"
        note="Fraunces for headings, Inter for reading. Heading sizes are fluid - they scale with the viewport, so there is no separate mobile scale to maintain."
      >
        <div className="space-y-6">
          <div>
            <p className="font-mono text-[11px] text-muted-foreground">text-display / Fraunces</p>
            <p className="text-display">Journeys beyond destinations</p>
          </div>
          <div>
            <p className="font-mono text-[11px] text-muted-foreground">text-h1 / Fraunces</p>
            <h2 className="text-h1">Spiti Valley Expedition</h2>
          </div>
          <div>
            <p className="font-mono text-[11px] text-muted-foreground">text-h2 / Fraunces</p>
            <h2 className="text-h2">Upcoming Group Departures</h2>
          </div>
          <div>
            <p className="font-mono text-[11px] text-muted-foreground">text-h3 / Fraunces</p>
            <h3 className="text-h3">What the trip includes</h3>
          </div>
          <div>
            <p className="font-mono text-[11px] text-muted-foreground">text-lead / Inter</p>
            <p className="text-lead max-w-2xl">
              Curated journeys across India, led by people who know the road.
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] text-muted-foreground">base / Inter</p>
            <p className="max-w-2xl">
              Body copy sits at the default size with generous line height. Long
              itinerary text and day-by-day descriptions are the most-read
              content on the site, so readability outranks density.
            </p>
          </div>
          <div>
            <p className="font-mono text-[11px] text-muted-foreground">text-overline / Inter</p>
            <p className="text-overline uppercase text-gold-700">6 Nights / 7 Days</p>
          </div>
        </div>
      </Section>

      <Section
        title="Buttons"
        note="One primary action per view. The brief warns against burying users in calls to action, so secondary and ghost carry the supporting choices."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button>Explore Trips</Button>
          <Button variant="secondary">Plan Your Journey</Button>
          <Button variant="outline">View Itinerary</Button>
          <Button variant="ghost">Read more</Button>
          <Button variant="link">Terms and conditions</Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Tab through these with the keyboard — every control shows a gold focus
          ring. That ring is deliberately not removed anywhere in the system.
        </p>
      </Section>

      <Section
        title="Departure status"
        note="Set manually in the database, never derived. Each status is encoded three ways - icon, label and colour - so it still reads in greyscale or with colour blindness."
      >
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status="open" />
          <StatusBadge status="filling_fast" />
          <StatusBadge status="sold_out" />
          <StatusBadge status="coming_soon" />
        </div>
      </Section>

      <Section
        title="Dark sections"
        note='Adding the "dark" class to a section re-points every semantic token, so a dark band on a light page needs no per-component colour overrides. This is how the hero and footer will be built.'
      >
        <div className="dark rounded-sm bg-background p-10 text-foreground">
          <p className="text-overline uppercase text-gold-400">Spiti Valley</p>
          <h3 className="mt-3 text-h1">Travel with someone who knows the road</h3>
          <p className="mt-4 max-w-xl text-lead text-muted-foreground">
            Trips are led by an experienced trip captain who handles the route,
            the stays and the group, so you can look out of the window.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button>Meet Your Trip Captain</Button>
            <Button variant="outline">View Departures</Button>
          </div>
        </div>
      </Section>

      <Section
        title="Radius and surfaces"
        note="A 4px radius throughout. The brief rules out heavily rounded cards, and the tighter corner reads as editorial rather than app-like."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-sm border border-border bg-card p-6">
            <p className="text-h3">Card</p>
            <p className="mt-2 text-sm text-muted-foreground">
              White on sand. Used for tour and destination cards.
            </p>
          </div>
          <div className="rounded-sm border border-border bg-muted p-6">
            <p className="text-h3">Muted</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Quiet band for alternating sections.
            </p>
          </div>
          <div className="rounded-sm border border-gold-600/40 bg-gold-100 p-6">
            <p className="text-h3">Accent</p>
            <p className="mt-2 text-sm text-gold-800">
              Reserved for genuine highlights only.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title="Data layer"
        note="Rendered live through lib/data, the same façade every real page will use. Swapping to Supabase in Phase 8 changes that one module and nothing here."
      >
        {DATA_SOURCE === "mock" ? (
          <p
            role="status"
            className="mb-6 rounded-sm border border-gold-600/40 bg-gold-100 px-4 py-3 text-sm text-gold-800"
          >
            <strong className="font-semibold">Placeholder content.</strong> These
            departures are demo data. No date, price or seat count below has been
            confirmed, and nothing is marked as filling or selling out.
          </p>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-2 pr-4 font-medium">Trip</th>
                <th scope="col" className="py-2 pr-4 font-medium">Dates</th>
                <th scope="col" className="py-2 pr-4 font-medium">Duration</th>
                <th scope="col" className="py-2 pr-4 font-medium">Price</th>
                <th scope="col" className="py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {departures.map((d) => {
                const tour = tours.find((t) => t.slug === d.tourSlug);
                const price = formatPriceFrom(d.price ?? tour?.priceFrom ?? null);
                return (
                  <tr key={d.id} className="border-b border-border/60">
                    <td className="py-3 pr-4">
                      {tourTitles.get(d.tourSlug) ?? d.tourSlug}
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {formatDateRange(d.startDate, d.endDate)}
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {tour
                        ? formatDuration(tour.durationNights, tour.durationDays)
                        : "—"}
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      {price ?? "On enquiry"}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={d.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Note the price column. When no price is published the type is{" "}
          <code className="font-mono text-xs">null</code>, and the UI is forced
          to say &ldquo;On enquiry&rdquo; rather than render a zero.
        </p>
      </Section>
    </main>
  );
}
