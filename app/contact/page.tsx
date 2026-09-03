import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { formattedAddress, siteConfig } from "@/lib/config/site";
import { formatPhone } from "@/lib/format";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire about group departures and customized trips across North India and Goa. Based in Rohtak, Haryana.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { business } = siteConfig;
  const phoneDisplay = formatPhone(business.phone);

  return (
    <>
      <section className="py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
          />
          <SectionHeading
            as="h1"
            overline="Get in touch"
            title="Plan your journey"
            description="Tell us your dates, your group size and roughly what you have in mind. You will get a reply with real options, not a brochure."
            className="mt-8"
          />
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
            <div>
              <h2 className="sr-only">Enquiry form</h2>
              <EnquiryForm source="contact-page" />
            </div>

            <aside className="space-y-8">
              <div>
                <h2 className="text-h3">Reach us directly</h2>
                <ul className="mt-4 space-y-4 text-sm">
                  {phoneDisplay ? (
                    <li className="flex gap-3">
                      <Phone
                        className="mt-0.5 size-4 shrink-0 text-gold-400"
                        aria-hidden="true"
                      />
                      <a
                        href={`tel:${business.phone}`}
                        className="underline-offset-4 hover:underline"
                      >
                        {phoneDisplay}
                      </a>
                    </li>
                  ) : null}

                  {business.email ? (
                    <li className="flex gap-3">
                      <Mail
                        className="mt-0.5 size-4 shrink-0 text-gold-400"
                        aria-hidden="true"
                      />
                      <a
                        href={`mailto:${business.email}`}
                        className="break-all underline-offset-4 hover:underline"
                      >
                        {business.email}
                      </a>
                    </li>
                  ) : null}

                  <li className="flex gap-3">
                    <MapPin
                      className="mt-0.5 size-4 shrink-0 text-gold-400"
                      aria-hidden="true"
                    />
                    <address className="not-italic text-muted-foreground">
                      {formattedAddress()}
                    </address>
                  </li>
                </ul>

                <div className="mt-6">
                  <WhatsAppButton
                    message={generalEnquiryMessage()}
                    variant="outline"
                  />
                </div>
              </div>

              <div className="rounded-sm border border-border bg-muted p-5">
                <h2 className="text-sm font-medium">Response time</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enquiries are answered personally, so a reply may take a few
                  hours rather than seconds. WhatsApp is usually quickest.
                </p>
              </div>

              {business.googleBusinessProfile ? (
                <a
                  href={business.googleBusinessProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-gold-400 underline underline-offset-4"
                >
                  Find us on Google
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : null}
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
