"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-browser";

export default function ChooseHubPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function selectRole(role) {
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Not logged in.");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, email: user.email, role }, { onConflict: "id" });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/explore");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-paper px-4">
      <h1 className="font-display text-2xl text-ink mb-2">Who are you?</h1>

      {error && (
        <p className="text-sm text-rust bg-rust/10 rounded-card px-3 py-2 mb-2 w-full max-w-sm text-center">
          {error}
        </p>
      )}

      <button
        onClick={() => selectRole("tenant")}
        disabled={loading}
        className="w-full max-w-sm bg-signal text-white rounded-card py-4 font-semibold disabled:opacity-50"
      >
        I'm looking for a place (Tenant)
      </button>
      <button
        onClick={() => selectRole("landlord")}
        disabled={loading}
        className="w-full max-w-sm border border-line rounded-card py-4 font-semibold disabled:opacity-50"
      >
        I'm listing a property (Landlord)
      </button>
      <button
        onClick={() => selectRole("buyer")}
        disabled={loading}
        className="w-full max-w-sm border border-line rounded-card py-4 font-semibold disabled:opacity-50"
      >
        I'm looking to buy (Buyer)
      </button>
    </div>
  );
}