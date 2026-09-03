"use server";

import { createServiceRoleClient } from "@/lib/supabase/server";
import {
  validateEnquiry,
  type EnquiryFormState,
} from "@/lib/validation/enquiry";

/**
 * Enquiry submission.
 *
 * Runs on the server only. The browser sends a FormData and receives a plain
 * object back - the Supabase client, the service role key and the table shape
 * never cross the boundary.
 */

/** Fields safe to echo back into the form after a validation failure. */
const ECHO_FIELDS = [
  "name",
  "phone",
  "email",
  "destination",
  "travelDate",
  "travellers",
  "travelType",
  "budget",
  "message",
] as const;

function echo(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const field of ECHO_FIELDS) {
    const value = formData.get(field);
    if (typeof value === "string") out[field] = value;
  }
  return out;
}

export async function submitEnquiry(
  _prev: EnquiryFormState,
  formData: FormData,
): Promise<EnquiryFormState> {
  /**
   * Honeypot. A field hidden from people but visible to naive bots; anything
   * that fills it is discarded. The response is a normal success so the bot
   * has no signal to adapt to, but nothing is written.
   */
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return { status: "success", errors: {} };
  }

  const result = validateEnquiry(formData);
  if (!result.ok) {
    return { status: "error", errors: result.errors, values: echo(formData) };
  }

  const enquiry = result.value;
  const sourceRaw = formData.get("source");
  const source = typeof sourceRaw === "string" ? sourceRaw.slice(0, 120) : null;

  try {
    const supabase = createServiceRoleClient();

    const { error } = await supabase.from("enquiries").insert({
      name: enquiry.name,
      phone: enquiry.phone,
      email: enquiry.email,
      destination: enquiry.destination,
      travel_date: enquiry.travelDate,
      travellers: enquiry.travellers,
      travel_type: enquiry.travelType,
      budget: enquiry.budget,
      message: enquiry.message,
      tour_slug: enquiry.tourSlug,
      source,
    });

    if (error) {
      // Log server-side with detail; return something a visitor can act on.
      console.error("[enquiry] insert failed", {
        code: error.code,
        message: error.message,
      });
      return {
        status: "error",
        errors: {
          form:
            "Something went wrong saving your enquiry. Please try again, or message us on WhatsApp.",
        },
        values: echo(formData),
      };
    }

    return { status: "success", errors: {} };
  } catch (cause) {
    console.error("[enquiry] unexpected failure", cause);
    return {
      status: "error",
      errors: {
        form:
          "We could not send your enquiry just now. Please try again, or message us on WhatsApp.",
      },
      values: echo(formData),
    };
  }
}
