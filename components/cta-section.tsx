import { Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { siteConfig } from "@/lib/config/site";
import { formatPhone } from "@/lib/format";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Closing call to action.
 *
 * One job per page: give the visitor a way to start a conversation. Both
 * actions hide themselves when the underlying detail is not configured, so
 * this never renders a dead button.
 */
export function CtaSection({
  title = "Planning a trip?",
  description = "Tell us where you want to go and how long you have. We will put together the options and send them across.",
  message,
}: {
  title?: string;
  description?: string;
  /** Pre-filled WhatsApp text, from the helpers in lib/whatsapp. */
  message: string;
}) {
  const phone = formatPhone(siteConfig.business.phone);

  return (
    <section className="dark bg-background py-20 text-foreground">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-h1">{title}</h2>
          <p className="mt-5 text-lead text-muted-foreground">{description}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton message={message} size="lg" />

            {phone ? (
              <a
                href={`tel:${siteConfig.business.phone}`}
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                <Phone aria-hidden="true" />
                {phone}
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
