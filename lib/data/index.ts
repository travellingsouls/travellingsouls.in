import type {
  Destination,
  Faq,
  GalleryItem,
  Review,
  Slug,
  Tour,
  TourDeparture,
} from "@/lib/types";

import { departuresMock } from "./departures.mock";
import { destinationsMock } from "./destinations.mock";
import { faqsMock } from "./faqs.mock";
import { galleryMock } from "./gallery.mock";
import { reviewsMock } from "./reviews.mock";
import { toursMock } from "./tours.mock";

/**
 * The only way the rest of the application reads business data.
 *
 * Pages and components import from here and never from a .mock file or from
 * Supabase directly. That is what makes PHASE 8 a change to this one module
 * instead of a change to every page.
 *
 * Every function is async even though the mock implementation is synchronous.
 * This is deliberate: when these become database queries the signatures do not
 * change, so no caller has to be rewritten.
 */

/**
 * Which backing store is in use. Surfaces a development-only warning banner so
 * placeholder content is never mistaken for real business data during review.
 */
export const DATA_SOURCE: "mock" | "supabase" = "mock";

/* -------------------------------------------------------------------------- */
/* Destinations                                                               */
/* -------------------------------------------------------------------------- */

export async function getDestinations(): Promise<Destination[]> {
  return [...destinationsMock].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getFeaturedDestinations(): Promise<Destination[]> {
  const all = await getDestinations();
  return all.filter((d) => d.featured);
}

export async function getDestinationBySlug(
  slug: Slug,
): Promise<Destination | null> {
  return destinationsMock.find((d) => d.slug === slug) ?? null;
}

/* -------------------------------------------------------------------------- */
/* Tours                                                                      */
/* -------------------------------------------------------------------------- */

/** Published tours only. Unpublished records never reach a public page. */
export async function getTours(): Promise<Tour[]> {
  return toursMock.filter((t) => t.published);
}

export async function getFeaturedTours(limit?: number): Promise<Tour[]> {
  const featured = (await getTours()).filter((t) => t.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export async function getTourBySlug(slug: Slug): Promise<Tour | null> {
  return toursMock.find((t) => t.slug === slug && t.published) ?? null;
}

export async function getToursByDestination(
  destinationSlug: Slug,
): Promise<Tour[]> {
  const tours = await getTours();
  return tours.filter((t) => t.destinationSlug === destinationSlug);
}

/* -------------------------------------------------------------------------- */
/* Departures                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Today in UTC, as a date-only string.
 *
 * Compared as strings because ISO date-only values sort lexicographically.
 * UTC is used so a departure does not appear or vanish depending on the
 * timezone of the machine rendering the page - Vercel builds in UTC, a local
 * dev machine is in IST, and the boundary must not move between them.
 */
function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Departures that have not yet started, soonest first, published tours only.
 *
 * CAUTION: "upcoming" is evaluated when the page renders. On a statically
 * prerendered page that means build time, so a departure that has since passed
 * would keep showing until the next deploy. Any page calling this must opt into
 * revalidation:
 *
 *     export const revalidate = 3600;
 *
 * Handle this when the group departures page is built in PHASE 7.
 */
export async function getUpcomingDepartures(
  limit?: number,
): Promise<TourDeparture[]> {
  const publishedSlugs = new Set((await getTours()).map((t) => t.slug));
  const today = todayUtc();

  const upcoming = departuresMock
    .filter((d) => publishedSlugs.has(d.tourSlug) && d.startDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));

  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

export async function getDeparturesForTour(
  tourSlug: Slug,
): Promise<TourDeparture[]> {
  const today = todayUtc();
  return departuresMock
    .filter((d) => d.tourSlug === tourSlug && d.startDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

/** The soonest upcoming departure for a tour, or null when none is scheduled. */
export async function getNextDepartureForTour(
  tourSlug: Slug,
): Promise<TourDeparture | null> {
  const departures = await getDeparturesForTour(tourSlug);
  return departures[0] ?? null;
}

/* -------------------------------------------------------------------------- */
/* Reviews, gallery, FAQs                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Published reviews only. Returns an empty array until real travellers have
 * submitted reviews - callers must hide the section rather than show filler.
 */
export async function getReviews(): Promise<Review[]> {
  return reviewsMock.filter((r) => r.published);
}

export async function getGallery(): Promise<GalleryItem[]> {
  return [...galleryMock].sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getSiteFaqs(): Promise<Faq[]> {
  return faqsMock;
}
