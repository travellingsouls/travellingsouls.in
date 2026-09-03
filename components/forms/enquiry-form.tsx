"use client";

import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2 } from "lucide-react";

import { submitEnquiry } from "@/app/actions/enquiry";
import { Button } from "@/components/ui/button";
import {
  initialEnquiryState,
  TRAVEL_TYPE_LABELS,
  type EnquiryFormState,
} from "@/lib/validation/enquiry";
import type { TravelType } from "@/lib/types";
import { cn } from "@/lib/utils";

const TRAVEL_TYPE_ORDER: TravelType[] = [
  "group_tour",
  "private_tour",
  "customized_tour",
  "family_trip",
  "adventure_trip",
  "spiritual_trip",
  "other",
];

const fieldClass =
  "mt-1.5 w-full rounded-sm border border-input bg-card px-3 py-2.5 text-base " +
  "text-foreground placeholder:text-muted-foreground/70 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

function Field({
  label,
  htmlFor,
  error,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
        {required ? (
          <span className="text-destructive" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="text-muted-foreground"> (optional)</span>
        )}
      </label>
      {children}
      {hint && !error ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
      {error ? (
        <p id={`${htmlFor}-error`} className="mt-1 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Submit button lives in its own component because useFormStatus only reports
 * the status of a form ABOVE it in the tree.
 *
 * Disabling while pending is what prevents the duplicate submissions the brief
 * asks about - a double-click cannot produce two enquiries.
 */
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Sending…" : "Send Enquiry"}
    </Button>
  );
}

export function EnquiryForm({
  source,
  tourSlug,
  defaultDestination,
  className,
}: {
  /** Where this form lives, e.g. "contact-page". Stored for lead attribution. */
  source: string;
  tourSlug?: string;
  defaultDestination?: string;
  className?: string;
}) {
  const [state, formAction] = useActionState<EnquiryFormState, FormData>(
    submitEnquiry,
    initialEnquiryState,
  );

  const id = useId();
  const f = (name: string) => `${id}-${name}`;
  const errors = state.errors;
  const v = state.values ?? {};

  if (state.status === "success") {
    return (
      <div
        className={cn(
          "rounded-sm border border-border bg-card p-8 text-center",
          className,
        )}
        role="status"
      >
        <CheckCircle2
          className="mx-auto size-8 text-gold-400"
          aria-hidden="true"
        />
        <h3 className="mt-4 text-h3">Enquiry received</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
          Thank you. We have your details and will get back to you shortly with
          the options. If it is urgent, WhatsApp is the fastest way to reach us.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className={cn("space-y-5", className)} noValidate>
      <input type="hidden" name="source" value={source} />
      {tourSlug ? <input type="hidden" name="tourSlug" value={tourSlug} /> : null}

      {/* Honeypot. Hidden from people, offered to bots. Never shown, never
          focusable, and excluded from the accessibility tree. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={f("company")}>Company</label>
        <input
          id={f("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {errors.form ? (
        <p
          role="alert"
          className="rounded-sm border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {errors.form}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor={f("name")} error={errors.name} required>
          <input
            id={f("name")}
            name="name"
            type="text"
            autoComplete="name"
            defaultValue={v.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${f("name")}-error` : undefined}
            className={fieldClass}
          />
        </Field>

        <Field label="Phone" htmlFor={f("phone")} error={errors.phone} required>
          <input
            id={f("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            defaultValue={v.phone}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${f("phone")}-error` : undefined}
            className={fieldClass}
          />
        </Field>
      </div>

      <Field label="Email" htmlFor={f("email")} error={errors.email}>
        <input
          id={f("email")}
          name="email"
          type="email"
          autoComplete="email"
          defaultValue={v.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${f("email")}-error` : undefined}
          className={fieldClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Destination"
          htmlFor={f("destination")}
          error={errors.destination}
        >
          <input
            id={f("destination")}
            name="destination"
            type="text"
            placeholder="Spiti, Ladakh, Goa…"
            defaultValue={v.destination ?? defaultDestination}
            aria-invalid={Boolean(errors.destination)}
            className={fieldClass}
          />
        </Field>

        <Field
          label="Travel date"
          htmlFor={f("travelDate")}
          error={errors.travelDate}
        >
          <input
            id={f("travelDate")}
            name="travelDate"
            type="date"
            defaultValue={v.travelDate}
            aria-invalid={Boolean(errors.travelDate)}
            aria-describedby={
              errors.travelDate ? `${f("travelDate")}-error` : undefined
            }
            className={fieldClass}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Number of travellers"
          htmlFor={f("travellers")}
          error={errors.travellers}
        >
          <input
            id={f("travellers")}
            name="travellers"
            type="number"
            inputMode="numeric"
            min={1}
            max={100}
            defaultValue={v.travellers}
            aria-invalid={Boolean(errors.travellers)}
            aria-describedby={
              errors.travellers ? `${f("travellers")}-error` : undefined
            }
            className={fieldClass}
          />
        </Field>

        <Field label="Type of trip" htmlFor={f("travelType")}>
          <select
            id={f("travelType")}
            name="travelType"
            defaultValue={v.travelType ?? "group_tour"}
            className={fieldClass}
          >
            {TRAVEL_TYPE_ORDER.map((t) => (
              <option key={t} value={t}>
                {TRAVEL_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        label="Budget per person"
        htmlFor={f("budget")}
        error={errors.budget}
        hint="Roughly is fine. It helps shape the options sensibly."
      >
        <input
          id={f("budget")}
          name="budget"
          type="text"
          defaultValue={v.budget}
          aria-invalid={Boolean(errors.budget)}
          className={fieldClass}
        />
      </Field>

      <Field label="Message" htmlFor={f("message")} error={errors.message}>
        <textarea
          id={f("message")}
          name="message"
          rows={4}
          defaultValue={v.message}
          placeholder="Anything that would help — how you want to travel, what you want to see, who is coming."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${f("message")}-error` : undefined}
          className={cn(fieldClass, "resize-y")}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <SubmitButton />
        <p className="text-xs text-muted-foreground">
          Fields marked <span aria-hidden="true">*</span>
          <span className="sr-only">star</span> are required.
        </p>
      </div>
    </form>
  );
}
