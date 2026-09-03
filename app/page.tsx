import type { Metadata } from "next";
import { CtaSection } from "@/components/cta-section";
import { DestinationCard } from "@/components/destinations/destination-card";
import { Hero } from "@/components/home/hero";
import { TripCaptainTeaser } from "@/components/home/trip-captain-teaser";
import { WhyTravellingSouls } from "@/components/home/why-travellingsouls";
import { DepartureCard } from "@/components/tours/departure-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getFeaturedDestinations,
  getTours,
  getUpcomingDepartures,
} from "@/lib/data";
import { generalEnquiryMessage } from "@/lib/whatsapp";

/**
 * Departure dates are filtered against "today", which on a statically
 * prerendered page would otherwise be frozen at build time. Revalidating
 * hourly keeps a passed departure from lingering on the homepage.
 */
export const revalidate = 3600;

export const metadata: Metadata = {
  // The homepage is the one route with no path segment, so its canonical
  // has to be declared explicitly rather than derived from a slug.
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [departures, tours, destinations] = await Promise.all([
    getUpcomingDepartures(3),
    getTours(),
    getFeaturedDestinations(),
  ]);

  const tourBySlug = new Map(tours.map((t) => [t.slug, t]));
  const [leadDestination, ...restDestinations] = destinations;

  return (
    <>
      <Hero />

      {departures.length > 0 ? (
        <section className="py-20 sm:py-24">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                overline="Fixed departures"
                title="Upcoming group journeys"
                description="Join a small group on a set date. Every trip travels with a trip captain."
              />
              <ButtonLink href="/tours" variant="outline">
                All trips
              </ButtonLink>
            </div>

            <div className="mt-12 space-y-5">
              {departures.map((departure) => {
                const tour = tourBySlug.get(departure.tourSlug);
                if (!tour) return null;
                return (
                  <DepartureCard
                    key={departure.id}
                    tour={tour}
                    departure={departure}
                  />
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

      {destinations.length > 0 ? (
        <section className="bg-ink-900 py-20 sm:py-24">
          <Container>
            <SectionHeading
              overline="Where we travel"
              title="Destinations"
              description="Mountain roads, desert cities and river valleys across North India."
            />

            {/* Deliberately asymmetric: the lead destination gets a wide frame
                so the grid does not read as six identical boxes. */}
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {leadDestination ? (
                <DestinationCard
                  destination={leadDestination}
                  size="feature"
                  className="lg:col-span-2"
                />
              ) : null}
              {restDestinations.slice(0, 1).map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
              {restDestinations.slice(1, 4).map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>

            <div className="mt-10">
              <ButtonLink href="/destinations" variant="outline">
                All destinations
              </ButtonLink>
            </div>
          </Container>
        </section>
      ) : null}

      <WhyTravellingSouls />

      <TripCaptainTeaser />

      <CtaSection message={generalEnquiryMessage()} />
    </>
  );
}
