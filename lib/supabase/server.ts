import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the SERVICE ROLE key.
 *
 * This key bypasses Row Level Security entirely. It must never reach the
 * browser. Three things keep that true:
 *
 *   1. `import "server-only"` above - importing this file from a Client
 *      Component is a build error, not a runtime surprise.
 *   2. The env var has no NEXT_PUBLIC_ prefix, so Next will not inline it.
 *   3. The client is created lazily inside a function rather than at module
 *      scope, so merely importing the module never touches the key.
 *
 * Session persistence is disabled because there is no user session here - this
 * client acts as the backend, not as a signed-in person.
 */
export function createServiceRoleClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceKey) {
    // Deliberately vague: this message can surface in logs, and naming which
    // variable is missing tells an attacker more than it tells an operator.
    throw new Error("Supabase is not configured on the server.");
  }

  return createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
