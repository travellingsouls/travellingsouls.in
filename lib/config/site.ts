/**
 * Every fact about the business lives here and nowhere else.
 *
 * Components must never hard-code a phone number, address, social URL or
 * brand string. When a detail changes, it changes once, in this file.
 *
 * Values that have not been supplied are `null` rather than invented. Callers
 * are expected to handle null by hiding the affected UI, never by rendering a
 * placeholder that looks real to a visitor.
 */

const DEFAULT_SITE_URL = "https://travellingsouls.in";

/**
 * Resolves the canonical origin from the environment.
 *
 * `??` is not enough here. It falls back only on null/undefined, so an env var
 * that exists but is EMPTY - which is exactly what a hosting dashboard
 * produces when someone adds the key and leaves the value blank - passes an
 * empty string straight through. `new URL("")` then throws ERR_INVALID_URL and
 * takes the whole production build down while collecting page data.
 *
 * So: trim, treat empty as absent, accept a bare domain by assuming https,
 * and fall back rather than throw if it still will not parse. A misconfigured
 * variable should cost a wrong canonical URL, never a failed deploy.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;

  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    // Normalise and drop any trailing slash, since paths are appended to this.
    return new URL(candidate).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

const siteUrl = resolveSiteUrl();

/**
 * International format, digits only, no "+" and no spaces (e.g. 919812345678).
 * Read from the environment so the number is not committed to a public repo.
 * Null when unset, which disables every WhatsApp call to action.
 */
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || null;

export const siteConfig = {
  /** Brand name, set as one word to match the logo wordmark and the domain. */
  name: "TravellingSouls",
  /**
   * Registered name, which carries the space. Used for structured data and
   * anywhere the legal entity is named rather than the brand.
   */
  legalName: "Travelling Souls",
  url: siteUrl,
  /** From the logo lockup. */
  tagline: "Where stories begin",
  description:
    "Curated group tours and customized journeys across North India and Goa, led personally by an experienced trip captain.",

  /**
   * Used exactly as supplied, black background included. The page ground is
   * pure black so the square blends invisibly - which is why the site palette
   * is dark rather than the logo being cut out.
   */
  logo: {
    src: "/logo/travellingsouls-logo.jpeg",
    alt: "TravellingSouls - where stories begin",
    width: 1024,
    height: 1024,
  },

  business: {
    /**
     * Supplied 2026-09-02. This is a working office address in Rohtak.
     * TODO(content): confirm whether visitors may call in person before
     * presenting this as a walk-in address on the contact page.
     */
    address: {
      line1: "Office No. 1738, Second Floor",
      line2: "Sector 30 Commercial",
      locality: "Rohtak",
      region: "Haryana",
      postalCode: "124021",
      country: "IN",
    },

    /** E.164. Display formatting is handled by formatPhone(). */
    phone: "+919653582634" as string | null,

    email: "travellingsouls1305@gmail.com" as string | null,

    whatsappNumber,

    /**
     * GST identification number. Displaying it is a genuine trust signal for
     * an Indian travel business - it is verifiable on the GST portal, which
     * is more than most freelance operators can offer.
     */
    gstin: "06GALPS2060H1ZI" as string | null,

    /**
     * Used for the `sameAs` field in structured data and the "find us on
     * Google" link.
     * TODO(content): replace with the canonical Google Maps place URL, which
     * is more stable than a share link.
     */
    googleBusinessProfile: "https://share.google/8qejYvyIYZ9y6EfPv" as
      | string
      | null,
  },

  /**
   * Real handles only. Never link to a profile that does not exist - a dead
   * social icon costs more trust than a missing one.
   */
  social: {
    instagram: "https://www.instagram.com/travellingsoul.in" as string | null,
    facebook: null as string | null,
    youtube: null as string | null,
  },

  /**
   * TODO(content): the founder's full name, photograph and biography for the
   * About and Trip Captain pages. Nothing about their experience, study or
   * credentials is to be written without being supplied first.
   */
  founder: {
    name: null as string | null,
    role: "Trip Captain",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Single-line address, for footers and meta descriptions. */
export function formattedAddress(): string {
  const a = siteConfig.business.address;
  return [a.line1, a.line2, a.locality, a.region, a.postalCode]
    .filter(Boolean)
    .join(", ");
}

/**
 * True only when there is at least one real way to reach the business.
 * Contact sections should check this rather than rendering an empty block.
 */
export function hasContactChannel(): boolean {
  const b = siteConfig.business;
  return Boolean(b.phone || b.email || b.whatsappNumber);
}
