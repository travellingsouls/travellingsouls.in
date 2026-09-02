/**
 * Domain types for TravellingSouls.
 *
 * These mirror the Supabase schema planned for PHASE 8 and are the single
 * definition of what a tour, destination or enquiry is. Components consume
 * these types; they never define their own shape for business data.
 *
 * Naming is camelCase here and snake_case in Postgres. The mapping happens in
 * the data layer (lib/data), so nothing above it deals with database naming.
 */

/** A URL-safe identifier used in routes, e.g. /tours/spiti-valley-expedition. */
export type Slug = string;

/** ISO 8601 date, date-only: "2027-05-14". */
export type IsoDate = string;

/** ISO 8601 timestamp with timezone. */
export type IsoDateTime = string;

/**
 * Money is never a bare number. Carrying the currency prevents a rupee amount
 * being rendered with the wrong symbol, and the explicit type makes it obvious
 * at call sites that formatting is required.
 */
export type Money = {
  /** Whole rupees. Not paise, and not a float. */
  amount: number;
  currency: "INR";
};

/**
 * Alt text is required, not optional. An image without a description is an
 * accessibility failure, so the type system refuses to let one be created.
 * Decorative images pass an empty string deliberately.
 */
export type ImageRef = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Photographer or source, where attribution is owed. */
  credit?: string;
};

/* -------------------------------------------------------------------------- */
/* Destinations                                                               */
/* -------------------------------------------------------------------------- */

export type Destination = {
  id: string;
  slug: Slug;
  name: string;
  /** State or union territory, e.g. "Himachal Pradesh". */
  region: string;
  /** One line, used on cards and in the destination grid. */
  tagline: string;
  /** Two or three sentences for listing pages. */
  summary: string;
  /** Long-form copy for the destination page itself. */
  description: string;
  bestSeason: string;
  /** Null until real photography is supplied. Never a stock placeholder. */
  heroImage: ImageRef | null;
  featured: boolean;
  /** Manual ordering. Lower sorts first. */
  sortOrder: number;
};

/* -------------------------------------------------------------------------- */
/* Tours                                                                      */
/* -------------------------------------------------------------------------- */

export type TourType = "group" | "private" | "customized";

export type Meal = "breakfast" | "lunch" | "dinner";

export type ItineraryDay = {
  /** 1-indexed. Day 1 is the first day of travel. */
  day: number;
  title: string;
  description: string;
  overnightAt?: string;
  meals?: Meal[];
  approxDistanceKm?: number;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
};

export type Tour = {
  id: string;
  slug: Slug;
  title: string;
  /** Foreign key to Destination.slug. */
  destinationSlug: Slug;
  tourType: TourType;

  durationNights: number;
  durationDays: number;
  startPoint: string;
  endPoint: string;
  /** Human-readable route, e.g. "Delhi - Shimla - Spiti - Manali - Delhi". */
  routeSummary: string;

  /**
   * Null means no price has been published yet, which is different from free.
   * The UI must render an enquiry prompt rather than a zero. Prices are never
   * inferred or estimated.
   */
  priceFrom: Money | null;

  /** Null until real photography is supplied. Never a stock placeholder. */
  heroImage: ImageRef | null;
  images: ImageRef[];

  shortDescription: string;
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  thingsToKnow: string[];
  faqs: Faq[];

  featured: boolean;
  /** Unpublished tours are excluded from every public query. */
  published: boolean;
};

/* -------------------------------------------------------------------------- */
/* Departures                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Availability of a dated group departure.
 *
 * Set deliberately by an administrator and never derived from seat counts or
 * elapsed time. Manufactured scarcity is explicitly out of scope: if a trip is
 * not genuinely filling, it is not marked "filling_fast".
 */
export type DepartureStatus =
  | "open"
  | "filling_fast"
  | "sold_out"
  | "coming_soon";

export type TourDeparture = {
  id: string;
  /** Foreign key to Tour.slug. */
  tourSlug: Slug;
  startDate: IsoDate;
  endDate: IsoDate;
  status: DepartureStatus;
  /** Null where seat counts are not published. */
  seatsTotal: number | null;
  seatsRemaining: number | null;
  /** Overrides Tour.priceFrom for this specific departure when set. */
  price: Money | null;
  boardingPoint: string;
  notes?: string;
};

/* -------------------------------------------------------------------------- */
/* Enquiries                                                                  */
/* -------------------------------------------------------------------------- */

export type TravelType =
  | "group_tour"
  | "private_tour"
  | "customized_tour"
  | "family_trip"
  | "adventure_trip"
  | "spiritual_trip"
  | "other";

export type EnquiryStatus =
  | "new"
  | "contacted"
  | "follow_up"
  | "confirmed"
  | "cancelled"
  | "closed";

/** What the public form submits. Never includes id, status or timestamps. */
export type EnquiryInput = {
  name: string;
  phone: string;
  email: string | null;
  destination: string | null;
  travelDate: IsoDate | null;
  travellers: number | null;
  travelType: TravelType;
  budget: string | null;
  message: string | null;
  /** Set when the enquiry came from a specific tour page. */
  tourSlug: Slug | null;
};

/** What is stored and shown in the admin dashboard. */
export type Enquiry = EnquiryInput & {
  id: string;
  status: EnquiryStatus;
  createdAt: IsoDateTime;
  updatedAt: IsoDateTime;
};

/* -------------------------------------------------------------------------- */
/* Reviews and gallery                                                        */
/* -------------------------------------------------------------------------- */

/**
 * A real review from a real traveller. There is no code path that generates
 * these, and the mock data set is intentionally empty - inventing testimonials
 * or ratings is prohibited by the brief and would also be unlawful advertising.
 */
export type Review = {
  id: string;
  authorName: string;
  authorLocation: string | null;
  tourSlug: Slug | null;
  /** 1-5, or null where the traveller gave prose without a score. */
  rating: number | null;
  quote: string;
  travelledOn: IsoDate | null;
  published: boolean;
};

export type GalleryItem = {
  id: string;
  image: ImageRef;
  destinationSlug: Slug | null;
  caption: string | null;
  sortOrder: number;
};
