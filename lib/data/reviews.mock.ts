import type { Review } from "@/lib/types";

/**
 * INTENTIONALLY EMPTY. Do not add entries to this array.
 *
 * Reviews may only ever come from real travellers, entered through the admin
 * dashboard in PHASE 14. There is no placeholder review, no sample review and
 * no "example" review, because any of those would be a fabricated testimonial
 * the moment the site goes live.
 *
 * The same applies to ratings: no aggregate rating is computed or published
 * until real reviews exist, and no review structured data is emitted for
 * invented content.
 *
 * Components that consume reviews must handle the empty case by hiding the
 * section entirely, not by showing filler.
 */
export const reviewsMock: Review[] = [];
