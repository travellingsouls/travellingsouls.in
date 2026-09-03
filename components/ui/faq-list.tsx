import { Plus } from "lucide-react";

import type { Faq } from "@/lib/types";

/**
 * FAQ accordion.
 *
 * Built on native <details>/<summary>, so it needs no JavaScript and no client
 * component. Keyboard support, screen reader semantics and open/close state
 * all come from the browser, and it still works if the page's JS never loads.
 */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  return (
    <div className="divide-y divide-border border-y border-border">
      {faqs.map((faq) => (
        <details key={faq.id} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left font-medium [&::-webkit-details-marker]:hidden">
            {faq.question}
            <Plus
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-gold-400 transition-transform group-open:rotate-45"
            />
          </summary>
          <p className="mt-3 pr-9 leading-relaxed text-muted-foreground">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
