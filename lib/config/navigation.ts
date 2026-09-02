/**
 * Site navigation.
 *
 * Every route in the project brief is listed here, including the ones not yet
 * built. `status` decides whether it is rendered: a "planned" item is invisible
 * until its page exists.
 *
 * This is the reason the site has no broken links. Building a page is a
 * two-line change - create the route, flip its status to "live".
 */

export type NavStatus = "live" | "planned";

export type NavItem = {
  label: string;
  href: string;
  status: NavStatus;
  /** Shown in the footer even before the page is live, e.g. legal pages. */
  description?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Destinations", href: "/destinations", status: "live" },
  { label: "Tours", href: "/tours", status: "live" },
  { label: "Group Tours", href: "/group-tours", status: "planned" },
  { label: "Customized Tours", href: "/customized-tours", status: "planned" },
  { label: "About", href: "/about", status: "planned" },
  { label: "Gallery", href: "/gallery", status: "planned" },
  { label: "Contact", href: "/contact", status: "planned" },
];

export const footerExplore: NavItem[] = [
  { label: "Destinations", href: "/destinations", status: "live" },
  { label: "All Tours", href: "/tours", status: "live" },
  { label: "Group Departures", href: "/group-tours", status: "planned" },
  { label: "Customized Tours", href: "/customized-tours", status: "planned" },
];

export const footerCompany: NavItem[] = [
  { label: "About Us", href: "/about", status: "planned" },
  { label: "Trip Captain", href: "/trip-captain", status: "planned" },
  { label: "Gallery", href: "/gallery", status: "planned" },
  { label: "Reviews", href: "/reviews", status: "planned" },
  { label: "Contact", href: "/contact", status: "planned" },
];

export const footerLegal: NavItem[] = [
  { label: "Terms & Conditions", href: "/terms", status: "planned" },
  { label: "Privacy Policy", href: "/privacy-policy", status: "planned" },
  { label: "Cancellation Policy", href: "/cancellation-policy", status: "planned" },
  { label: "Booking Policy", href: "/booking-policy", status: "planned" },
];

/** Filters a nav list down to routes that actually exist. */
export function liveItems(items: NavItem[]): NavItem[] {
  return items.filter((i) => i.status === "live");
}
