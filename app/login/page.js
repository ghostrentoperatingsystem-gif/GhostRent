"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-browser";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/explore");
    router.refresh();
  }

  async function handleGoogleLogin() {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-4">
      <div className="w-full max-w-sm bg-white rounded-card border border-line p-6">
        <h1 className="font-display text-2xl text-ink mb-6">Log in to GhostRent</h1>

        {error && (
          <p className="text-sm text-rust bg-rust/10 rounded-card px-3 py-2 mb-4">{error}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-3">
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-line rounded-card px-4 py-3 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-signal text-white rounded-card py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-3 border border-line rounded-card py-3 font-medium"
        >
          Continue with Google
        </button>

        <div className="flex justify-between text-sm mt-4">
          <a href="/reset-password" className="text-signal">Forgot password?</a>
          <a href="/signup" className="text-signal">Create account</a>
        </div>
      </div>
    </div>
  );
}