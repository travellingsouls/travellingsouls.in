import type { Tour } from "@/lib/types";

/**
 * PLACEHOLDER DATA - replaced by Supabase in PHASE 8.
 *
 * Read this before adding anything here.
 *
 * Itineraries, inclusions, exclusions, highlights, FAQs and prices are
 * deliberately EMPTY rather than filled with invented content. An empty
 * itinerary renders as "to be published", which is true. A fabricated one
 * renders as a promise the business has not made, and would be the single
 * most damaging thing this codebase could do - a traveller could book on it.
 *
 * Structural facts (duration, route, start and end points) follow the example
 * in the project brief and are marked TODO(content) for confirmation.
 *
 * Images are the destination photographs, standing in until there are
 * photographs from actual departures. They are labelled as destination
 * imagery, not presented as pictures of this trip.
 *
 * Nothing in this file may go to production unreviewed.
 */
export const toursMock: Tour[] = [
  {
    id: "tour-spiti-expedition",
    slug: "spiti-valley-expedition",
    title: "Spiti Valley Expedition",
    destinationSlug: "spiti",
    tourType: "group",

    // TODO(content): confirm duration and route with the trip captain.
    durationNights: 6,
    durationDays: 7,
    startPoint: "Delhi",
    endPoint: "Delhi",
    routeSummary: "Delhi - Shimla - Kinnaur - Spiti - Manali - Delhi",

    priceFrom: null,

    heroImage: {
      src: "/images/destinations/spiti.jpg",
      alt: "The bare, high-altitude road through the Spiti valley below rock ridges",
      width: 1920,
      height: 1280,
      credit: "Timothy Gonsalves / Wikimedia Commons (CC BY-SA 4.0)",
    },
    images: [],

    shortDescription:
      "A group road trip across the Spiti valley, gaining height gradually through Kinnaur and returning over Kunzum Pass.",
    overview:
      "The full itinerary, inclusions and pricing for this departure are being finalised. Get in touch and we will send the details as soon as they are confirmed.",

    // Empty by design. See the file header.
    highlights: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    thingsToKnow: [],
    faqs: [],

    featured: true,
    published: true,
  },
  {
    id: "tour-ladakh-circuit",
    slug: "ladakh-circuit",
    title: "Ladakh Circuit",
    destinationSlug: "ladakh",
    tourType: "group",

    // TODO(content): confirm duration and route with the trip captain.
    durationNights: 7,
    durationDays: 8,
    startPoint: "Leh",
    endPoint: "Leh",
    routeSummary: "Leh - Nubra - Pangong - Leh",

    priceFrom: null,

    heroImage: {
      src: "/images/destinations/ladakh.jpg",
      alt: "A stream running down from bare mountains in Ladakh",
      width: 1920,
      height: 1440,
      credit: "Ssandrathomas / Wikimedia Commons (CC BY-SA 4.0)",
    },
    images: [],

    shortDescription:
      "A group trip through Leh, the Nubra valley and Pangong, with acclimatisation days built in at the start.",
    overview:
      "The full itinerary, inclusions and pricing for this departure are being finalised. Get in touch and we will send the details as soon as they are confirmed.",

    highlights: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    thingsToKnow: [],
    faqs: [],

    featured: true,
    published: true,
  },
  {
    id: "tour-uttarakhand-valley-of-flowers",
    slug: "valley-of-flowers-trek",
    title: "Valley of Flowers Trek",
    destinationSlug: "uttarakhand",
    tourType: "group",

    // TODO(content): confirm duration and route with the trip captain.
    durationNights: 5,
    durationDays: 6,
    startPoint: "Rishikesh",
    endPoint: "Rishikesh",
    routeSummary: "Rishikesh - Joshimath - Ghangaria - Valley of Flowers",

    priceFrom: null,

    heroImage: {
      src: "/images/destinations/uttarakhand.jpg",
      alt: "Alpine meadow in flower below peaks in the Valley of Flowers, Uttarakhand",
      width: 1920,
      height: 1080,
      credit: "Anshusk / Wikimedia Commons (CC BY-SA 4.0)",
    },
    images: [],

    shortDescription:
      "A monsoon-season trek to the flower meadows above Ghangaria, in the Garhwal Himalaya.",
    overview:
      "The full itinerary, inclusions and pricing for this departure are being finalised. Get in touch and we will send the details as soon as they are confirmed.",

    highlights: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    thingsToKnow: [],
    faqs: [],

    featured: false,
    published: true,
  },
];
