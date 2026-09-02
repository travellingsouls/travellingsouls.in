import { cn } from "@/lib/utils";

/**
 * The standard section opener: a gold overline, a serif heading and optional
 * supporting copy.
 *
 * `as` exists so heading level follows document structure rather than visual
 * size. A section heading inside a page that already has an h1 renders as an
 * h2 while keeping the same size, which keeps the outline valid for screen
 * readers.
 */
export function SectionHeading({
  overline,
  title,
  description,
  as: Tag = "h2",
  align = "left",
  className,
}: {
  overline?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {overline ? (
        <p className="text-overline uppercase text-gold-700 dark:text-gold-400">
          {overline}
        </p>
      ) : null}
      <Tag className={cn("text-h2", overline && "mt-3")}>{title}</Tag>
      {description ? (
        <p className="mt-4 text-lead text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
