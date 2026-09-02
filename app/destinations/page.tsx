import type { Metadata } from "next";

import { CtaSection } from "@/components/cta-section";
import { DestinationCard } from "@/components/destinations/destination-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDestinations } from "@/lib/data";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Spiti, Ladakh, Himachal, Uttarakhand, Rajasthan and Kashmir - the regions TravellingSouls travels, and when to go.",
  alternates: { canonical: "/destinations" },
};

export default async function DestinationsPage() {
  const destinations = await getDestinations();
  const [lead, ...rest] = destinations;

  return (
    <>
      <section className="py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Destinations" },
            ]}
          />

          <SectionHeading
            as="h1"
            overline="Where we travel"
            title="Destinations"
            description="We work across North India, from the cold desert of Spiti to the forts of Rajasthan. Each region has a season that suits it, and that is usually what decides when a trip runs."
            className="mt-8 max-w-3xl"
          />
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {lead ? (
              <DestinationCard
                destination={lead}
                size="feature"
                className="lg:col-span-2"
              />
            ) : null}
            {rest.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title="Not sure where to go?"
        description="Tell us when you are free and what kind of trip you want. We will suggest the regions that work for those dates."
        message={generalEnquiryMessage()}
      />
    </>
  );
}
