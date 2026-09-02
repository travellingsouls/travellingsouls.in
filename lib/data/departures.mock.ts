import type { TourDeparture } from "@/lib/types";

/**
 * PLACEHOLDER DATA - replaced by Supabase in PHASE 8.
 *
 * Every entry below is demo data so that departure UI can be built and
 * reviewed. None of these dates has been confirmed with the trip captain.
 *
 * Three deliberate choices:
 *   - status is "coming_soon" throughout. Nothing is marked "filling_fast",
 *     because no seat has actually been sold. Manufactured urgency is the one
 *     dark pattern the brief rules out by name.
 *   - price is null. A wrong price is worse than no price.
 *   - seat counts are null rather than invented.
 *
 * The notes field carries the warning so it is visible in any admin view as
 * well as in this file.
 */
const PLACEHOLDER_NOTE = "Placeholder departure - dates not confirmed.";

export const departuresMock: TourDeparture[] = [
  {
    id: "dep-spiti-2027-05",
    tourSlug: "spiti-valley-expedition",
    startDate: "2027-05-15",
    endDate: "2027-05-21",
    status: "coming_soon",
    seatsTotal: null,
    seatsRemaining: null,
    price: null,
    boardingPoint: "Delhi",
    notes: PLACEHOLDER_NOTE,
  },
  {
    id: "dep-spiti-2027-06",
    tourSlug: "spiti-valley-expedition",
    startDate: "2027-06-12",
    endDate: "2027-06-18",
    status: "coming_soon",
    seatsTotal: null,
    seatsRemaining: null,
    price: null,
    boardingPoint: "Delhi",
    notes: PLACEHOLDER_NOTE,
  },
  {
    id: "dep-ladakh-2027-07",
    tourSlug: "ladakh-circuit",
    startDate: "2027-07-03",
    endDate: "2027-07-10",
    status: "coming_soon",
    seatsTotal: null,
    seatsRemaining: null,
    price: null,
    boardingPoint: "Leh",
    notes: PLACEHOLDER_NOTE,
  },
  {
    id: "dep-vof-2027-08",
    tourSlug: "valley-of-flowers-trek",
    startDate: "2027-08-07",
    endDate: "2027-08-12",
    status: "coming_soon",
    seatsTotal: null,
    seatsRemaining: null,
    price: null,
    boardingPoint: "Rishikesh",
    notes: PLACEHOLDER_NOTE,
  },
];
