import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import {
  footerCompany,
  footerExplore,
  footerLegal,
  liveItems,
  type NavItem,
} from "@/lib/config/navigation";
import { formattedAddress, siteConfig } from "@/lib/config/site";
import { formatPhone } from "@/lib/format";
import { generalEnquiryMessage } from "@/lib/whatsapp";

/**
 * lucide-react v1 removed brand icons, so this is drawn inline rather than
 * pulling in a second icon package for one glyph.
 */
function InstagramMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Site footer.
 *
 * Uses the .dark class so every token flips to the dark palette without a
 * single hard-coded colour. Link columns render only routes that exist, and a
 * column with nothing live in it is omitted entirely rather than left as an
 * empty heading.
 */
export function Footer() {
  const { business, social } = siteConfig;
  const phone = formatPhone(business.phone);

  const columns: Array<{ title: string; items: NavItem[] }> = [
    { title: "Explore", items: liveItems(footerExplore) },
    { title: "Company", items: liveItems(footerCompany) },
    { title: "Policies", items: liveItems(footerLegal) },
  ].filter((c) => c.items.length > 0);

  return (
    <footer className="dark mt-24 bg-background text-foreground">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            {/* The full lockup goes here rather than in the header: its
                tagline is white artwork, which only reads on a dark ground. */}
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={648}
              height={498}
              className="h-auto w-48"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>

            <WhatsAppButton
              message={generalEnquiryMessage()}
              label="Enquire on WhatsApp"
              className="mt-6"
            />
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-overline uppercase text-gold-400">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-overline uppercase text-gold-400">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {phone ? (
                <li className="flex gap-3">
                  <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  <a
                    href={`tel:${business.phone}`}
                    className="transition-colors hover:text-foreground"
                  >
                    {phone}
                  </a>
                </li>
              ) : null}

              {business.email ? (
                <li className="flex gap-3">
                  <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  <a
                    href={`mailto:${business.email}`}
                    className="break-all transition-colors hover:text-foreground"
                  >
                    {business.email}
                  </a>
                </li>
              ) : null}

              <li className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <address className="not-italic">{formattedAddress()}</address>
              </li>
            </ul>

            {/* A GSTIN is checkable on the government portal, so publishing it
                is a verifiable trust signal rather than a claim. */}
            {business.gstin ? (
              <p className="mt-4 text-xs text-muted-foreground">
                GSTIN{" "}
                <span className="font-mono tracking-tight">
                  {business.gstin}
                </span>
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border py-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights
            reserved.
          </p>

          {social.instagram ? (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-11 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <InstagramMark />
              <span className="sr-only">
                {siteConfig.name} on Instagram (opens in a new tab)
              </span>
            </a>
          ) : null}
        </div>
      </Container>
    </footer>
  );
}
