import { siteConfig } from "@/lib/config/site";
import type { Tour, TourDeparture, Destination } from "@/lib/types";
import { formatDateRange } from "@/lib/format";

/**
 * WhatsApp deep links.
 *
 * The number itself comes from siteConfig and appears in exactly one place.
 * Every function returns null when no number is configured, so calling code
 * hides the button rather than rendering a link that goes nowhere.
 */

/** Builds a wa.me link with a pre-filled message. */
export function whatsappUrl(message: string): string | null {
  const number = siteConfig.business.whatsappNumber;
  if (!number) return null;

  // wa.me expects digits only. Strip anything a copy-paste may have added.
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Opening line shared by every generated message. */
function greeting(): string {
  return `Hello ${siteConfig.name},`;
}

/** Generic enquiry, used by the floating button and the footer. */
export function generalEnquiryMessage(): string {
  return `${greeting()} I would like to know more about your tours. Please share the details.`;
}

/**
 * Tour enquiry. Includes the departure dates when the visitor is looking at a
 * specific dated departure, so the reply does not have to start by asking
 * which trip they mean.
 */
export function tourEnquiryMessage(
  tour: Pick<Tour, "title">,
  departure?: Pick<TourDeparture, "startDate" | "endDate">,
): string {
  const dates = departure
    ? ` departing ${formatDateRange(departure.startDate, departure.endDate)}`
    : "";
  return `${greeting()} I am interested in the ${tour.title}${dates}. Please share the details.`;
}

/** Destination enquiry, from a destination page. */
export function destinationEnquiryMessage(
  destination: Pick<Destination, "name">,
): string {
  return `${greeting()} I am interested in travelling to ${destination.name}. Please share the available trips.`;
}
