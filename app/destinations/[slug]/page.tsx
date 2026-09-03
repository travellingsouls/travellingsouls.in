import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarRange } from "lucide-react";

import { CtaSection } from "@/components/cta-section";
import { TourCard } from "@/components/tours/tour-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { ImageFrame } from "@/components/ui/image-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  getDestinationBySlug,
  getDestinations,
  getNextDepartureForTour,
  getToursByDestination,
} from "@/lib/data";
import { destinationEnquiryMessage } from "@/lib/whatsapp";

type Params = { params: Promise<{ slug: string }> };

/** Prerenders every destination at build time. */
export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    return { title: "Destination not found" };
  }

  return {
    title: `${destination.name} Tours`,
    description: destination.summary,
    alternates: { canonical: `/destinations/${destination.slug}` },
    openGraph: {
      title: `${destination.name} Tours | TravellingSouls`,
      description: destination.summary,
      type: "website",
    },
  };
}

export default async function DestinationPage({ params }: Params) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  // A slug that does not exist must 404, not render an empty page.
  if (!destination) notFound();

  const tours = await getToursByDestination(destination.slug);
  const departures = await Promise.all(
    tours.map((t) => getNextDepartureForTour(t.slug)),
  );

  return (
    <>
      <section className="py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Destinations", href: "/destinations" },
              { label: destination.name },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-overline uppercase text-gold-700">
                {destination.region}
              </p>
              <h1 className="mt-3 text-h1">{destination.name}</h1>
              <p className="mt-5 text-lead text-muted-foreground">
                {destination.tagline}
              </p>

              <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
                <p>{destination.summary}</p>
                <p>{destination.description}</p>
              </div>

              <div className="mt-8 flex gap-3 rounded-sm border border-border bg-card p-5">
                <CalendarRange
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-gold-700"
                />
                <div>
                  <h2 className="text-sm font-medium">When to go</h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {destination.bestSeason}
                  </p>
                </div>
              </div>
            </div>

            <ImageFrame
              image={destination.heroImage}
              aspect="portrait"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              showCredit
            />
          </div>
        </Container>
      </section>

      <section className="bg-sand-100 py-20 sm:py-24">
        <Container>
          <SectionHeading
            overline="Trips"
            title={`Journeys in ${destination.name}`}
            description={
              tours.length > 0
                ? undefined
                : "No trips are listed for this destination yet. Get in touch and we will tell you what is being planned."
            }
          />

          {tours.length > 0 ? (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour, index) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  nextDeparture={departures[index]}
                />
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      <CtaSection
        title={`Planning a trip to ${destination.name}?`}
        description="Tell us your dates and group size and we will send you the options."
        message={destinationEnquiryMessage(destination)}
      />
    </>
  );
}
