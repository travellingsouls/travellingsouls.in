import Script from "next/script";

/**
 * Google Analytics 4.
 *
 * The measurement ID comes from the environment rather than being hard-coded,
 * so analytics only runs where it is configured. Local development and preview
 * deployments have no ID set and therefore send nothing, which keeps test
 * traffic and the trip captain's own browsing out of the real numbers.
 *
 * Loaded with `afterInteractive` so the tag never competes with page content
 * for the main thread. Analytics must not cost Core Web Vitals on a site whose
 * visitors are largely on Indian mobile networks.
 *
 * GA4 tracks client-side route changes on its own through the History API, so
 * there is no manual pageview call on navigation. That behaviour depends on
 * "Page changes based on browser history events" staying enabled under
 * Enhanced Measurement in the GA property, which is the default.
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
