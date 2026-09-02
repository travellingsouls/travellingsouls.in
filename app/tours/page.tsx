import type { Metadata } from "next";

import { CtaSection } from "@/components/cta-section";
import { TourCard } from "@/components/tours/tour-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getNextDepartureForTour, getTours } from "@/lib/data";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Tours",
  description:
    "Group tours and customized journeys across Spiti, Ladakh, Himachal, Uttarakhand, Rajasthan and Kashmir.",
  alternates: { canonical: "/tours" },
};

/** Departure dates are compared against today; see lib/data/index.ts. */
export const revalidate = 3600;

export default async function ToursPage() {
  const tours = await getTours();
  const departures = await Promise.all(
    tours.map((t) => getNextDepartureForTour(t.slug)),
  );

  return (
    <>
      <section className="py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Tours" }]}
          />

          <SectionHeading
            as="h1"
            overline="Our trips"
            title="Tours"
            description="Small-group journeys across North India, each travelling with a trip captain. Private and customized versions of the same routes can be arranged."
            className="mt-8 max-w-3xl"
          />
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          {tours.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour, index) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  nextDeparture={departures[index]}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-sm border border-dashed border-border bg-muted/50 p-6 text-sm text-muted-foreground">
              No trips are published yet. Get in touch and we will tell you what
              is being planned.
            </p>
          )}
        </Container>
      </section>

      <CtaSection
        title="Want something different?"
        description="These routes can all be run privately, on your own dates, for a group of any size."
        message={generalEnquiryMessage()}
      />
    </>
  );
}
