// lib/supabase.js - Server-only
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * createServerSupabaseClient - use in Server Components and Route Handlers
 * Provides a small cookie adapter that maps the interface expected by
 * @supabase/ssr to Next's cookie store.
 */
export function createServerSupabaseClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            // Next's cookieStore.set can accept (name, value, options) or an object
            cookieStore.set(name, value, options);
          } catch {
            // ignore in environments where cookies are read-only
          }
        },
        delete(name, options) {
          try {
            // There's no explicit remove; set an empty value (or adjust per runtime)
            cookieStore.set(name, "", options);
          } catch {}
        },
      },
    }
  );
}
