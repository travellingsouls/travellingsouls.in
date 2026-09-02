import type { Faq } from "@/lib/types";

/**
 * Site-wide FAQs, separate from the per-tour FAQs held on each Tour record.
 *
 * INTENTIONALLY EMPTY. Every honest answer here is a statement of business
 * policy - how booking works, what the advance is, when a refund applies -
 * and none of that has been supplied. Guessing at policy would create terms
 * the business has not agreed to and may be held to.
 *
 * TODO(content): booking process, advance payment, cancellation window, group
 * sizes, age limits, what happens if a trip is called off for weather.
 *
 * FAQPage structured data is only emitted once these are real (see PHASE 13).
 */
export const faqsMock: Faq[] = [];
