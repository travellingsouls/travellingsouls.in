import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/config/site";
import { getDestinations, getTours } from "@/lib/data";

/**
 * Sitemap, served at /sitemap.xml.
 *
 * Generated from the data layer, so a new destination or tour appears here
 * automatically rather than being hand-added and forgotten.
 *
 * Two deliberate exclusions:
 *   - /styleguide is an internal reference page and is noindex
 *   - individual tour pages are left out while their itineraries, prices and
 *     dates are still unpublished. Submitting thin pages to Google invites a
 *     "crawled - currently not indexed" verdict that is slower to recover from
 *     than simply waiting until the content is real. The /tours index is
 *     included, so the section is still discoverable.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const [destinations] = await Promise.all([getDestinations(), getTours()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/destinations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/tours`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${base}/credits`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ];

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${base}/destinations/${d.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...destinationRoutes];
}
