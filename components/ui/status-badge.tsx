import { Ban, CircleDot, Clock, Flame } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import type { DepartureStatus } from "@/lib/types";

const statusBadge = cva(
  "inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 text-xs font-medium tracking-wide",
  {
    variants: {
      status: {
        open: "border-emerald-700/25 bg-emerald-50 text-emerald-900",
        filling_fast: "border-gold-700/30 bg-gold-100 text-gold-800",
        sold_out: "border-ink-300/40 bg-sand-100 text-ink-600",
        coming_soon: "border-ink-200 bg-transparent text-ink-500",
      },
    },
    defaultVariants: { status: "open" },
  },
);

const STATUS_META: Record<
  DepartureStatus,
  { label: string; Icon: typeof CircleDot }
> = {
  open: { label: "Open", Icon: CircleDot },
  filling_fast: { label: "Filling Fast", Icon: Flame },
  sold_out: { label: "Sold Out", Icon: Ban },
  coming_soon: { label: "Coming Soon", Icon: Clock },
};

type StatusBadgeProps = {
  status: DepartureStatus;
  className?: string;
} & Omit<VariantProps<typeof statusBadge>, "status">;

/**
 * Status is encoded three ways - icon shape, text label and colour - so it
 * survives colour blindness, greyscale printing and low-contrast screens.
 * Colour alone is never the signal.
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, Icon } = STATUS_META[status];

  return (
    <span className={cn(statusBadge({ status }), className)}>
      <Icon aria-hidden="true" className="size-3.5 shrink-0" />
      {label}
    </span>
  );
}
