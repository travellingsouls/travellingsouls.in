import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getDestinations, getTours } from "@/lib/data";
import type { ImageRef } from "@/lib/types";

export const metadata: Metadata = {
  title: "Photo Credits",
  description:
    "Attribution for the photography used on this site, with photographer and licence for each image.",
  alternates: { canonical: "/credits" },
};

/**
 * Attribution page.
 *
 * CC BY and CC BY-SA both require crediting the photographer. Small grid cards
 * cannot carry a readable caption without wrecking the layout, so the credit
 * lives here in full and the footer links to it. That is the normal way to
 * satisfy "attribution reasonable to the medium" on the web.
 *
 * The list is generated from the data layer rather than hand-maintained, so an
 * image cannot be added to the site without its credit appearing here.
 */
export default async function CreditsPage() {
  const [destinations, tours] = await Promise.all([getDestinations(), getTours()]);

  const seen = new Set<string>();
  const credited: { image: ImageRef; usedFor: string }[] = [];

  for (const d of destinations) {
    if (d.heroImage?.credit && !seen.has(d.heroImage.src)) {
      seen.add(d.heroImage.src);
      credited.push({ image: d.heroImage, usedFor: d.name });
    }
  }
  for (const t of tours) {
    if (t.heroImage?.credit && !seen.has(t.heroImage.src)) {
      seen.add(t.heroImage.src);
      credited.push({ image: t.heroImage, usedFor: t.title });
    }
  }

  return (
    <>
      <section className="py-12 sm:py-16">
        <Container width="narrow">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Photo Credits" }]}
          />
          <SectionHeading
            as="h1"
            overline="Attribution"
            title="Photo credits"
            description="The photography on this site is freely licensed for commercial use. Each image is credited to its photographer below, as those licences require."
            className="mt-8"
          />
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container width="narrow">
          {credited.length === 0 ? (
            <p className="text-muted-foreground">
              No credited photography is in use.
            </p>
          ) : (
            <ul className="divide-y divide-border border-y border-border">
              {credited.map(({ image, usedFor }) => (
                <li key={image.src} className="py-4">
                  <p className="font-medium">{usedFor}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {image.credit}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-8 text-sm text-muted-foreground">
            Images are used under Creative Commons licences that permit
            commercial use. They are being replaced with photographs from our
            own departures as those become available. If you are the copyright
            holder of an image here and something is wrong with the
            attribution, please get in touch and it will be corrected.
          </p>
        </Container>
      </section>
    </>
  );
}
