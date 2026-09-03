import type { IsoDate, Money } from "@/lib/types";

/**
 * Presentation helpers for domain values.
 *
 * Formatting lives here rather than in components so a rupee amount or a date
 * range looks identical on a card, a tour page and a WhatsApp message.
 *
 * The locale is fixed to en-IN: the audience is Indian, and prices must use
 * the Indian digit grouping (1,20,000) rather than the western one (120,000).
 */

const RUPEE_FORMAT = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/**
 * Formats a price. Returns null when no price is published, which callers
 * must render as an enquiry prompt - never as "₹0" or "Free".
 */
export function formatMoney(money: Money | null): string | null {
  if (!money) return null;
  return RUPEE_FORMAT.format(money.amount);
}

/** "Starting from ₹32,000" or null when no price is published. */
export function formatPriceFrom(money: Money | null): string | null {
  const value = formatMoney(money);
  return value ? `Starting from ${value}` : null;
}

/** "6 Nights / 7 Days" - the phrasing used across Indian tour listings. */
export function formatDuration(nights: number, days: number): string {
  const n = `${nights} ${nights === 1 ? "Night" : "Nights"}`;
  const d = `${days} ${days === 1 ? "Day" : "Days"}`;
  return `${n} / ${d}`;
}

const DAY_MONTH = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
});

const DAY_MONTH_YEAR = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/**
 * Parses a date-only string as UTC.
 *
 * "2027-05-14" parsed with `new Date()` is treated as UTC midnight, which in
 * IST (UTC+5:30) is still the 14th - but the reverse is not true for negative
 * offsets, and a departure date must never shift by a day depending on where
 * the page is rendered. Vercel builds run in UTC, so this is pinned explicitly.
 */
function parseIsoDate(value: IsoDate): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const [, y, m, d] = match;
  const date = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
  return Number.isNaN(date.getTime()) ? null : date;
}

/** "14 Jun 2027". Returns null for an unparseable date rather than "Invalid Date". */
export function formatDate(value: IsoDate | null): string | null {
  if (!value) return null;
  const date = parseIsoDate(value);
  return date ? DAY_MONTH_YEAR.format(date) : null;
}

/**
 * "14 - 20 Jun 2027", collapsing the repeated month and year.
 * Falls back to the full form when the range crosses a month or year.
 */
export function formatDateRange(
  start: IsoDate | null,
  end: IsoDate | null,
): string {
  const from = start ? parseIsoDate(start) : null;
  const to = end ? parseIsoDate(end) : null;

  if (!from && !to) return "Dates to be announced";
  if (from && !to) return DAY_MONTH_YEAR.format(from);
  if (!from && to) return DAY_MONTH_YEAR.format(to);
  if (!from || !to) return "Dates to be announced";

  const sameMonth =
    from.getUTCFullYear() === to.getUTCFullYear() &&
    from.getUTCMonth() === to.getUTCMonth();

  if (sameMonth) {
    return `${from.getUTCDate()} - ${DAY_MONTH_YEAR.format(to)}`;
  }

  const sameYear = from.getUTCFullYear() === to.getUTCFullYear();
  if (sameYear) {
    return `${DAY_MONTH.format(from)} - ${DAY_MONTH_YEAR.format(to)}`;
  }

  return `${DAY_MONTH_YEAR.format(from)} - ${DAY_MONTH_YEAR.format(to)}`;
}

/** Human label for a seat count, or null when seats are not published. */
export function formatSeatsRemaining(seats: number | null): string | null {
  if (seats === null) return null;
  if (seats <= 0) return "No seats remaining";
  return `${seats} ${seats === 1 ? "seat" : "seats"} remaining`;
}

/**
 * Formats an E.164 number for display: "+919653582634" -> "+91 96535 82634".
 *
 * Indian mobile numbers are conventionally grouped 5+5 after the country code.
 * Anything that does not match that shape is returned unchanged rather than
 * mangled - a phone number shown wrongly is a phone number that does not work.
 */
export function formatPhone(e164: string | null): string | null {
  if (!e164) return null;
  const match = /^\+91(\d{5})(\d{5})$/.exec(e164.replace(/[\s-]/g, ""));
  return match ? `+91 ${match[1]} ${match[2]}` : e164;
}
