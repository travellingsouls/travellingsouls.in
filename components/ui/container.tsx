import { cn } from "@/lib/utils";

/**
 * The site's horizontal rhythm. One place decides page width and gutters, so
 * sections cannot drift out of alignment with each other.
 */
export function Container({
  className,
  children,
  width = "default",
}: {
  className?: string;
  children: React.ReactNode;
  /** "narrow" for long-form reading, "wide" for image-led grids. */
  width?: "narrow" | "default" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        width === "narrow" && "max-w-3xl",
        width === "default" && "max-w-6xl",
        width === "wide" && "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
