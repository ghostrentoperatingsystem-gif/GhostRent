"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleReset(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
    setMessage("Check your email for a password reset link.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm bg-white rounded-card border border-line p-6">
        <h1 className="font-display text-2xl text-ink mb-6">Reset your password</h1>

        {error && <p className="text-sm text-rust bg-rust/10 rounded-card px-3 py-2 mb-4">{error}</p>}
        {message && <p className="text-sm text-signal bg-signal/10 rounded-card px-3 py-2 mb-4">{message}</p>}

        <form onSubmit={handleReset} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-line rounded-card px-4 py-3 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-signal text-white rounded-card py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>
      </div>
    </div>
  );
}