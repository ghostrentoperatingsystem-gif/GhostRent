import { createBrowserClient } from "@supabase/ssr";

/**
 * Factory: get a fresh browser Supabase client
 * Use this where you want a new/explicit instance:
 *   import { createClient } from '@/lib/supabase-browser'
 *   const supabase = createClient()
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * Backwards-compatible named export used by many files in the repo:
 *   import { supabase } from '@/lib/supabase-browser'
 *
 * We lazily initialise it only in the browser to avoid `window` / SSR issues.
 */
let supabase;
if (typeof window !== "undefined") {
  supabase = createClient();
}
export { supabase };
