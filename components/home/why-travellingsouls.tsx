import {
  Compass,
  HeartHandshake,
  Map,
  MessageSquare,
  Mountain,
  Route,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Reasons to travel with the company.
 *
 * Every statement here describes how the company works, not how good it is.
 * There are no superlatives, no counts of trips run and no claims about
 * prices - the brief rules those out, and none of it has been supplied.
 */
const REASONS = [
  {
    Icon: Route,
    title: "Real travel experience",
    body: "Trips are not just sold, they are travelled. Routes are planned by someone who has driven them, and who knows where the day actually ends.",
  },
  {
    Icon: Compass,
    title: "An experienced trip captain",
    body: "Trips are led on the ground, not run from an office. Someone travels with the group and handles the day as it comes.",
  },
  {
    Icon: Map,
    title: "Curated group journeys",
    body: "Itineraries are built around what is worth the time, with enough room in them that a long drive does not swallow the day.",
  },
  {
    Icon: Mountain,
    title: "North India specialists",
    body: "The Himalayan states are the ones known best here - the roads, the seasons, and when a pass is genuinely open. Goa covers the winter months.",
  },
  {
    Icon: MessageSquare,
    title: "Direct, personal support",
    body: "You talk to the person organising your trip, before you travel and while you are on the road.",
  },
  {
    Icon: HeartHandshake,
    title: "Flexible travel",
    body: "Prefer to travel privately or on your own dates? The same routes can be arranged as a customized trip.",
  },
];

export function WhyTravellingSouls() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          overline="Why travel with us"
          title="Trips run by people who travel"
          description="What that means in practice, rather than in adjectives."
        />

        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ Icon, title, body }) => (
            <li key={title}>
              <Icon
                aria-hidden="true"
                className="size-6 text-gold-400"
                strokeWidth={1.5}
              />
              <h3 className="mt-4 text-h3">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
