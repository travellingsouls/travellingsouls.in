import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MapPin, Minus, Info, Clock } from "lucide-react";

import { CtaSection } from "@/components/cta-section";
import { DepartureCard } from "@/components/tours/departure-card";
import { Itinerary } from "@/components/tours/itinerary";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { FaqList } from "@/components/ui/faq-list";
import { ImageFrame } from "@/components/ui/image-frame";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import {
  getDeparturesForTour,
  getDestinationBySlug,
  getTourBySlug,
  getTours,
} from "@/lib/data";
import { formatDuration, formatPriceFrom } from "@/lib/format";
import { tourEnquiryMessage } from "@/lib/whatsapp";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const tours = await getTours();
  return tours.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) return { title: "Tour not found" };

  return {
    title: tour.title,
    description: tour.shortDescription,
    alternates: { canonical: `/tours/${tour.slug}` },
    openGraph: {
      title: `${tour.title} | TravellingSouls`,
      description: tour.shortDescription,
      type: "website",
    },
  };
}

/** Departure dates are compared against today; see lib/data/index.ts. */
export const revalidate = 3600;

export default async function TourPage({ params }: Params) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) notFound();

  const [departures, destination] = await Promise.all([
    getDeparturesForTour(tour.slug),
    getDestinationBySlug(tour.destinationSlug),
  ]);

  const price = formatPriceFrom(tour.priceFrom);
  const enquiry = tourEnquiryMessage(tour);
  const hasInclusions = tour.inclusions.length > 0 || tour.exclusions.length > 0;

  return (
    <>
      <section className="py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Tours", href: "/tours" },
              { label: tour.title },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              {destination ? (
                <p className="text-overline uppercase text-gold-700">
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="hover:text-gold-800"
                  >
                    {destination.name}
                  </Link>
                </p>
              ) : null}

              <h1 className="mt-3 text-h1">{tour.title}</h1>

              <p className="mt-5 text-lead text-muted-foreground">
                {tour.shortDescription}
              </p>

              <dl className="mt-8 space-y-3 text-sm">
                <div className="flex gap-3">
                  <dt className="sr-only">Duration</dt>
                  <Clock
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-gold-700"
                  />
                  <dd>
                    {formatDuration(tour.durationNights, tour.durationDays)}
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="sr-only">Route</dt>
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-gold-700"
                  />
                  <dd>{tour.routeSummary}</dd>
                </div>
              </dl>

              <div className="mt-8 rounded-sm border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground">
                  {price ? "Starting price" : "Pricing"}
                </p>
                <p className="mt-1 text-h3">
                  {price ?? "Available on enquiry"}
                </p>
                <WhatsAppButton
                  message={enquiry}
                  label="Enquire Now"
                  className="mt-4 w-full sm:w-auto"
                />
              </div>
            </div>

            <ImageFrame
              image={tour.heroImage}
              aspect="portrait"
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              showCredit
            />
          </div>
        </Container>
      </section>

      <section className="border-t border-border py-16">
        <Container width="narrow">
          <h2 className="text-h2">Overview</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            {tour.overview}
          </p>

          {tour.highlights.length > 0 ? (
            <>
              <h2 className="mt-14 text-h2">Highlights</h2>
              <ul className="mt-5 space-y-3">
                {tour.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <Check
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-gold-700"
                    />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <h2 className="mt-14 text-h2">Detailed itinerary</h2>
          <div className="mt-6">
            <Itinerary days={tour.itinerary} />
          </div>

          <h2 className="mt-14 text-h2">What is included</h2>
          {hasInclusions ? (
            <div className="mt-6 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-h3">Inclusions</h3>
                <ul className="mt-4 space-y-3">
                  {tour.inclusions.map((item) => (
                    <li key={item} className="flex gap-3 text-sm">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-emerald-700"
                      />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-h3">Exclusions</h3>
                <ul className="mt-4 space-y-3">
                  {tour.exclusions.map((item) => (
                    <li key={item} className="flex gap-3 text-sm">
                      <Minus
                        aria-hidden="true"
                        className="mt-0.5 size-4 shrink-0 text-ink-400"
                      />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="mt-6 rounded-sm border border-dashed border-border bg-muted/50 p-6 text-sm leading-relaxed text-muted-foreground">
              Inclusions and exclusions for this trip are being confirmed. We
              will send the full written breakdown before anything is booked, so
              there is nothing to guess at.
            </p>
          )}

          {tour.thingsToKnow.length > 0 ? (
            <>
              <h2 className="mt-14 text-h2">Things to know</h2>
              <ul className="mt-5 space-y-3">
                {tour.thingsToKnow.map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <Info
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-gold-700"
                    />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {tour.faqs.length > 0 ? (
            <>
              <h2 className="mt-14 text-h2">Questions</h2>
              <div className="mt-6">
                <FaqList faqs={tour.faqs} />
              </div>
            </>
          ) : null}
        </Container>
      </section>

      {departures.length > 0 ? (
        <section className="bg-sand-100 py-20">
          <Container>
            <h2 className="text-h2">Departure dates</h2>
            <div className="mt-8 space-y-5">
              {departures.map((departure) => (
                <DepartureCard
                  key={departure.id}
                  tour={tour}
                  departure={departure}
                />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaSection
        title={`Interested in ${tour.title}?`}
        description="Send us your dates and group size and we will come back with the details."
        message={enquiry}
      />
    </>
  );
}
