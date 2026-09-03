import type { EnquiryInput, TravelType } from "@/lib/types";

/**
 * Enquiry validation.
 *
 * Hand-written rather than pulled from a schema library, because the brief asks
 * for minimal dependencies and this is one form. The rules here mirror the
 * CHECK constraints in the enquiries migration, so a value that passes here
 * cannot be rejected by the database - and a value that somehow skips this
 * still cannot corrupt the table.
 *
 * Every message is written for the person filling the form, not for a
 * developer reading logs.
 */

export type FieldErrors = Partial<Record<keyof EnquiryInput | "form", string>>;

export type ValidationResult =
  | { ok: true; value: EnquiryInput }
  | { ok: false; errors: FieldErrors };

const TRAVEL_TYPES: TravelType[] = [
  "group_tour",
  "private_tour",
  "customized_tour",
  "family_trip",
  "adventure_trip",
  "spiritual_trip",
  "other",
];

export const TRAVEL_TYPE_LABELS: Record<TravelType, string> = {
  group_tour: "Group tour (fixed departure)",
  private_tour: "Private tour",
  customized_tour: "Customized tour",
  family_trip: "Family trip",
  adventure_trip: "Adventure trip",
  spiritual_trip: "Spiritual trip",
  other: "Something else",
};

/** Trims and collapses to null when empty, so blank fields never store "". */
function clean(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Indian mobile numbers are ten digits starting 6-9, but visitors may include
 * a country code, spaces or dashes. Digits are counted rather than pattern
 * matched, so a valid number is never rejected for its formatting.
 */
function isPlausiblePhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function isPlausibleEmail(value: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value) && value.length <= 254;
}

/** Rejects a date in the past, and anything absurdly far ahead. */
function isPlausibleTravelDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return false;

  const today = new Date();
  const startOfToday = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  );
  const threeYears = new Date(startOfToday);
  threeYears.setUTCFullYear(threeYears.getUTCFullYear() + 3);

  return date >= startOfToday && date <= threeYears;
}

export function validateEnquiry(formData: FormData): ValidationResult {
  const errors: FieldErrors = {};

  const name = clean(formData.get("name"));
  if (!name) {
    errors.name = "Please tell us your name.";
  } else if (name.length < 2 || name.length > 100) {
    errors.name = "Please enter a name between 2 and 100 characters.";
  }

  const phone = clean(formData.get("phone"));
  if (!phone) {
    errors.phone = "Please add a phone number so we can reach you.";
  } else if (!isPlausiblePhone(phone)) {
    errors.phone = "Please enter a valid phone number with at least 10 digits.";
  }

  const email = clean(formData.get("email"));
  if (email && !isPlausibleEmail(email)) {
    errors.email = "That email address does not look right.";
  }

  const travelDate = clean(formData.get("travelDate"));
  if (travelDate && !isPlausibleTravelDate(travelDate)) {
    errors.travelDate = "Please choose a travel date in the future.";
  }

  const travellersRaw = clean(formData.get("travellers"));
  let travellers: number | null = null;
  if (travellersRaw) {
    const parsed = Number(travellersRaw);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > 100) {
      errors.travellers = "Please enter a number of travellers between 1 and 100.";
    } else {
      travellers = parsed;
    }
  }

  const travelTypeRaw = clean(formData.get("travelType"));
  const travelType: TravelType =
    travelTypeRaw && (TRAVEL_TYPES as string[]).includes(travelTypeRaw)
      ? (travelTypeRaw as TravelType)
      : "other";

  const message = clean(formData.get("message"));
  if (message && message.length > 2000) {
    errors.message = "Please keep your message under 2000 characters.";
  }

  const destination = clean(formData.get("destination"));
  if (destination && destination.length > 120) {
    errors.destination = "Please keep the destination under 120 characters.";
  }

  const budget = clean(formData.get("budget"));
  if (budget && budget.length > 60) {
    errors.budget = "Please keep the budget under 60 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      // Non-null assertions are safe here: the checks above guarantee both.
      name: name as string,
      phone: phone as string,
      email,
      destination,
      travelDate,
      travellers,
      travelType,
      budget,
      message,
      tourSlug: clean(formData.get("tourSlug")),
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Form state                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Shape returned by the submit action to useActionState.
 *
 * This lives here rather than beside the Server Action because a "use server"
 * module may only export async functions - exporting a plain object or a const
 * from one is a build error. Types are erased so they would be fine, but
 * keeping both together avoids the trap being re-introduced later.
 */
export type EnquiryFormState = {
  status: "idle" | "success" | "error";
  errors: FieldErrors;
  /** Echoed back so a rejected form can repopulate without losing input. */
  values?: Record<string, string>;
};

export const initialEnquiryState: EnquiryFormState = {
  status: "idle",
  errors: {},
};
