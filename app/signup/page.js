"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase";

export default function SignupPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      router.push("/choose-hub");
      router.refresh();
    } else {
      setSent(true);
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper px-4">
        <p className="text-ink text-center">
          Check your email to confirm your account, then log in.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm bg-white rounded-card border border-line p-6">
        <h1 className="font-display text-2xl text-ink mb-6">Create your account</h1>

        {error && (
          <p className="text-sm text-rust bg-rust/10 rounded-card px-3 py-2 mb-4">{error}</p>
        )}

        <form onSubmit={handleSignup} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-line rounded-card px-4 py-3 text-sm"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-line rounded-card px-4 py-3 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-signal text-white rounded-card py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-sm mt-4">
          Already have an account? <a href="/login" className="text-signal">Log in</a>
        </p>
      </div>
    </div>
  );
}