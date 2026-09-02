import { MessageCircle } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * WhatsApp call to action.
 *
 * Renders nothing when no number is configured. That is the point: a WhatsApp
 * button that opens an empty chat is worse than no button, so the component
 * removes itself rather than degrading.
 */
export function WhatsAppButton({
  message,
  label = "WhatsApp Us",
  variant = "default",
  size = "default",
  className,
}: {
  /** Pre-filled text. Build it with the helpers in lib/whatsapp. */
  message: string;
  label?: string;
  variant?: React.ComponentProps<typeof ButtonLink>["variant"];
  size?: React.ComponentProps<typeof ButtonLink>["size"];
  className?: string;
}) {
  const href = whatsappUrl(message);
  if (!href) return null;

  return (
    <ButtonLink href={href} variant={variant} size={size} className={className}>
      <MessageCircle aria-hidden="true" />
      {label}
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </ButtonLink>
  );
}
