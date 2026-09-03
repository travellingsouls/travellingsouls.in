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
 * Each tour has its OWN photograph, deliberately picking a different
 * subject from its destination page - a monastery where the destination
 * shows a road, and so on - so the same picture never appears twice on a
 * page. They are pictures of the region, not of this specific departure.
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
      src: "/images/tours/spiti-valley-expedition.jpg",
      alt: "Key Monastery stepped up the hillside above the Spiti valley",
      width: 1920,
      height: 1440,
      credit: "Ksuryawanshi / Wikimedia Commons (CC BY-SA 4.0)",
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
      src: "/images/tours/ladakh-circuit.jpg",
      alt: "Diskit monastery standing above the Nubra valley in Ladakh",
      width: 1752,
      height: 1122,
      credit: "Hynek Moravec / Wikimedia Commons (CC BY 2.5)",
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
      src: "/images/tours/valley-of-flowers-trek.jpg",
      alt: "The view from Hemkund Sahib, high above Ghangaria in the Garhwal Himalaya",
      width: 1920,
      height: 1440,
      credit: "John Muir Fan 86 / Wikimedia Commons (CC BY-SA 4.0)",
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
