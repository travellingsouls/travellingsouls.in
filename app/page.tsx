import Link from "next/link";

/**
 * Temporary holding page.
 * Replaced by the real homepage in PHASE 4. Carries no business claims,
 * prices, dates or testimonials by design.
 */
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <p className="text-overline uppercase text-gold-700">Rohtak, Haryana</p>
      <h1 className="mt-4 text-display">TravellingSouls</h1>
      <p className="mt-5 text-lead text-muted-foreground">
        Curated journeys across India, led by people who know the road.
      </p>
      <p className="mt-10 text-sm text-muted-foreground">
        Site in development.{" "}
        <Link
          href="/styleguide"
          className="text-gold-700 underline underline-offset-4"
        >
          Design system
        </Link>
      </p>
    </main>
  );
}
