"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-browser";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Not logged in.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();

    if (error) {
      setError(error.message);
    } else {
      setProfile(data);
    }
    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  if (loading) return <p className="text-center text-muted text-sm py-16">Loading profile...</p>;
  if (error) return <p className="text-center text-rust text-sm py-16">{error}</p>;

  return (
    <div className="pb-20">
      <div className="flex flex-col items-center pt-6 pb-6">
        <div className="w-20 h-20 rounded-full bg-signal text-white flex items-center justify-center font-display text-2xl">
          {(profile.full_name || profile.email || "?").slice(0, 2).toUpperCase()}
        </div>
        <p className="font-display text-xl text-ink mt-3">{profile.full_name || "Unnamed user"}</p>
        <p className="text-sm text-muted">{profile.role} · {profile.city || "No city set"}</p>
      </div>

      <div className="px-4">
        <button
          onClick={handleLogout}
          className="w-full mt-4 rounded-card border border-rust/30 bg-white py-4 text-rust font-medium flex items-center justify-center gap-2"
        >
          <LogOut size={18} /> Log out
        </button>
      </div>
    </div>
  );
}