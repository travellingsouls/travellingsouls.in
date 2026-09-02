import type { NextConfig } from "next";

/**
 * Supabase Storage is the production image host (see PHASE 8).
 * The bucket hostname is derived from the project URL so that the allow-list
 * never has to be hard-coded per environment. Returns undefined when the env
 * var is absent or malformed, in which case no remote host is permitted.
 */
function supabaseImageHost(): string | undefined {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) return undefined;
  try {
    return new URL(url).hostname;
  } catch {
    return undefined;
  }
}

const host = supabaseImageHost();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: host
      ? [
          {
            protocol: "https",
            hostname: host,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
