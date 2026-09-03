import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";

import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { siteConfig } from "@/lib/config/site";
import "./globals.css";

/**
 * Fraunces is the editorial voice: headings, pull quotes, the hero. Its
 * optical-size axis keeps large display text tight without a second face.
 * Inter does all the reading work.
 *
 * Both variables are attached to <html> rather than <body> because the theme
 * tokens in globals.css reference them from :root, which resolves against the
 * root element.
 */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Resolved in siteConfig, which validates the environment variable rather
  // than trusting it. Reading process.env directly here is what broke the
  // build when the variable was present but empty.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "TravellingSouls — Curated journeys across India",
    template: "%s | TravellingSouls",
  },
  description:
    "Curated group tours and customized journeys across North India and Goa, led personally by an experienced trip captain.",

  // Defaults for every route. Pages override title, description and image;
  // siteName, locale and type stay the same throughout.
  openGraph: {
    type: "website",
    siteName: "TravellingSouls",
    locale: "en_IN",
    url: siteConfig.url,
    title: "TravellingSouls — Curated journeys across India",
    description:
      "Curated group tours and customized journeys across North India and Goa, led personally by an experienced trip captain.",
  },
  twitter: {
    card: "summary_large_image",
  },

  /**
   * Indexing is ON now that the domain is live and a Search Console property
   * exists.
   *
   * It is enabled site-wide rather than page-by-page because the destination
   * pages carry genuine, unique writing and the contact page carries real
   * business details - those deserve to be found. The thin pages opt OUT
   * individually instead: /styleguide and each tour detail page set their own
   * noindex until real itineraries and prices exist.
   *
   * Every page also declares a canonical on travellingsouls.in, which stops
   * the *.vercel.app host competing with the real domain.
   */
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        {/* First tab stop on every page. Keyboard users should not have to
            tab through the whole header to reach the content. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <Navbar />
        <div id="main" className="flex-1">
          {children}
        </div>
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
