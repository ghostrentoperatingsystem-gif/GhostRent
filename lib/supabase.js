// lib/supabase.js - Backwards compatible wrapper
// Keep this file as a thin compatibility layer for any code that imports
// `lib/supabase.js`. Prefer using `lib/supabase-browser.js` on the client
// and `lib/supabase-server.js` on the server.

import { createBrowserClient } from "@supabase/ssr";
import { createServerSupabaseClient } from "./supabase-server";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export { createServerSupabaseClient };
