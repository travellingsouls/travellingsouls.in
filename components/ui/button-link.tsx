import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Variant = React.ComponentProps<typeof buttonVariants> extends never
  ? never
  : Parameters<typeof buttonVariants>[0];

/**
 * A link that looks like a button.
 *
 * Navigation must be an anchor, not a button: middle-click, open-in-new-tab
 * and "copy link address" all break on a <button> with an onClick handler, and
 * screen readers announce the wrong role.
 *
 * External URLs get target/rel automatically, so no call site has to remember
 * rel="noopener".
 */
export function ButtonLink({
  href,
  children,
  className,
  variant,
  size,
  external,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: NonNullable<Variant>["variant"];
  size?: NonNullable<Variant>["size"];
  /** Defaults to true for absolute http(s) URLs. */
  external?: boolean;
}) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  const classes = cn(buttonVariants({ variant, size }), className);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
