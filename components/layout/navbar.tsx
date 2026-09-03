"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { liveItems, primaryNav } from "@/lib/config/navigation";
import { siteConfig } from "@/lib/config/site";
import { cn } from "@/lib/utils";

/**
 * Site header.
 *
 * A Client Component only because the mobile menu holds open/closed state.
 * Everything it renders is static, so the JavaScript cost is one small bundle
 * rather than the whole header.
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = liveItems(primaryNav);

  // Close on navigation. Without this the panel stays open behind the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes the panel, and the page behind it must not scroll while it
  // is open - otherwise the background moves under the user's finger.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-black/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
          {/* The logo exactly as supplied. Its black background is invisible
              because the header is pure black. The file carries generous
              padding of its own, so it is set larger than the visible artwork
              suggests in order to read at header size. */}
          <Link href="/" className="-my-2 flex items-center">
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.name}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              priority
              className="h-16 w-auto sm:h-20"
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "text-sm transition-colors hover:text-foreground",
                      isActive(item.href)
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink href="/tours" size="sm" className="hidden sm:inline-flex">
              Explore Trips
            </ButtonLink>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-11 items-center justify-center rounded-sm text-foreground lg:hidden"
            >
              {open ? (
                <X aria-hidden="true" className="size-5" />
              ) : (
                <Menu aria-hidden="true" className="size-5" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Kept mounted and hidden rather than unmounted, so the toggle button
          keeps a stable element to point aria-controls at. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-border bg-black lg:hidden"
      >
        <Container>
          <nav aria-label="Mobile" className="py-4">
            <ul className="flex flex-col">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "block border-b border-border/60 py-4 text-base",
                      isActive(item.href)
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ButtonLink href="/tours" className="mt-5 w-full">
              Explore Trips
            </ButtonLink>
          </nav>
        </Container>
      </div>
    </header>
  );
}
