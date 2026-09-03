import { ChevronDown } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { generalEnquiryMessage } from "@/lib/whatsapp";

/**
 * Homepage hero.
 *
 * The brief calls for full-bleed destination photography here. None has been
 * supplied, and rather than fill the most prominent position on the site with
 * stock imagery of somewhere the company may never have been, this uses a
 * drawn ridgeline in brand colours.
 *
 * TODO(content): replace the ridgeline with a real photograph once supplied.
 * When that happens use next/image with priority so it does not become the
 * Largest Contentful Paint bottleneck.
 */
export function Hero() {
  return (
    <section className="dark relative isolate overflow-hidden bg-background text-foreground">
      <Ridgeline />

      <Container>
        <div className="relative flex min-h-[78vh] max-w-3xl flex-col justify-center py-24 sm:min-h-[85vh]">
          <p className="text-overline uppercase text-gold-400">
            Rohtak &middot; North India
          </p>

          <h1 className="mt-5 text-display">Travel. Explore. Feel.</h1>

          <p className="mt-6 max-w-xl text-lead text-muted-foreground">
            Curated journeys across North India and Goa, led personally by someone who knows the road.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/tours" size="lg">
              Explore Trips
            </ButtonLink>
            <WhatsAppButton
              message={generalEnquiryMessage()}
              label="Plan Your Journey"
              variant="outline"
              size="lg"
            />
          </div>
        </div>
      </Container>

      {/* Decorative, and animation is suppressed for anyone who has asked the
          operating system to reduce motion. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
      >
        <ChevronDown className="size-6 animate-bounce text-gold-400/70" />
      </div>
    </section>
  );
}

function Ridgeline() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      className="absolute inset-0 -z-10 size-full"
    >
      <rect width="1440" height="900" fill="var(--color-ink-950)" />
      <path
        d="M0 900 L0 604 L188 470 L322 556 L520 372 L688 500 L858 344 L1042 476 L1218 350 L1440 470 L1440 900 Z"
        fill="var(--color-ink-900)"
      />
      <path
        d="M0 900 L0 712 L226 606 L410 688 L596 588 L790 682 L978 578 L1180 676 L1440 588 L1440 900 Z"
        fill="var(--color-ink-800)"
      />
      <path
        d="M0 900 L0 808 L268 748 L512 800 L744 736 L1010 802 L1246 742 L1440 788 L1440 900 Z"
        fill="var(--color-ink-700)"
      />
    </svg>
  );
}
