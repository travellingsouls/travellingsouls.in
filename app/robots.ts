import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/config/site";

/**
 * robots.txt.
 *
 * /styleguide is an internal design reference and carries its own noindex;
 * disallowing it as well keeps it out of crawl budget entirely.
 *
 * Note that robots.txt does not control indexing on its own - a disallowed URL
 * can still be indexed if something links to it. The per-page robots metadata
 * is what actually keeps a page out of the index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/styleguide"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
