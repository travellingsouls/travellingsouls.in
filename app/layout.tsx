import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://travellingsouls.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TravellingSouls — Curated journeys across India",
    template: "%s | TravellingSouls",
  },
  description:
    "Curated group tours and customized journeys across North India, led by experienced trip captains.",
  // TODO(launch): remove when real content is live and travellingsouls.in is
  // connected. Until then the placeholder must not be indexed, and the
  // *.vercel.app host must never compete with the real domain in search.
  robots: { index: false, follow: false },
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
      </body>
    </html>
  );
}
