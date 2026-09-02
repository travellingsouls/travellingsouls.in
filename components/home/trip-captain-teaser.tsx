import { Container } from "@/components/ui/container";
import { ImageFrame } from "@/components/ui/image-frame";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { siteConfig } from "@/lib/config/site";
import { generalEnquiryMessage } from "@/lib/whatsapp";

/**
 * Trip captain introduction.
 *
 * Describes the ROLE, not the person. The founder's name, photograph and
 * background have not been supplied, and the brief prohibits inventing
 * experience, study or credentials.
 *
 * TODO(content): founder name, portrait and biography. Once /trip-captain
 * exists, flip it to "live" in lib/config/navigation and add the
 * "Meet Your Trip Captain" link the brief asks for.
 */
export function TripCaptainTeaser() {
  return (
    <section className="bg-sand-100 py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ImageFrame
            image={null}
            aspect="portrait"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="mx-auto w-full max-w-sm lg:max-w-none"
          />

          <div>
            <p className="text-overline uppercase text-gold-700">
              Your trip captain
            </p>
            <h2 className="mt-3 text-h1">
              Travel with someone who knows the road
            </h2>

            <div className="mt-6 space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Every group trip travels with a trip captain. They handle the
                route, the stays and the timings, deal with whatever the day
                throws up, and keep the group moving without turning the trip
                into a schedule.
              </p>
              <p className="leading-relaxed">
                It means you are not following a printed itinerary on your own.
                There is someone with you who has driven the road before, knows
                where to stop, and can change the plan when the weather decides
                to.
              </p>
            </div>

            <WhatsAppButton
              message={generalEnquiryMessage()}
              label="Ask about our trips"
              variant="outline"
              className="mt-8"
            />

            {siteConfig.founder.name ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Led by {siteConfig.founder.name}.
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
