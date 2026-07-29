"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase-browser";
import PropertyCard from "../../components/PropertyCard";
import TopBar from "../../components/TopBar";
import BottomNav from "../../components/BottomNav";
import { useRouter } from "next/navigation";

export default function ExplorePage() {
  const supabase = createClient();
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [requesting, setRequesting] = useState(null);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    setLoading(true);
    setError(null);

    const { data: props, error: propsError } = await supabase
      .from("properties")
      .select("*")
      .eq("status", "approved")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (propsError) {
      setError(propsError.message);
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: saved } = await supabase
        .from("saved_properties")
        .select("property_id")
        .eq("user_id", user.id);
      setSavedIds(new Set((saved || []).map((s) => s.property_id)));
    }

    setProperties(props || []);
    setLoading(false);
  }

  async function handleRequestContact(property) {
    setRequesting(property.id);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error: reqError } = await supabase.from("contact_requests").insert({
      tenant_id: user.id,
      landlord_id: property.landlord_id,
      property_id: property.id,
    });

    setRequesting(null);

    if (reqError) {
      if (reqError.code === "23505") {
        alert("You've already requested contact for this property.");
      } else {
        alert(reqError.message);
      }
      return;
    }

    alert("Contact request sent. You'll be notified once the landlord responds.");
  }

  return (
    <div className="min-h-screen bg-paper">
      <TopBar title="Explore" onMenu={() => {}} />

      <div className="px-4 pt-4 pb-24 space-y-4">
        {loading && <p className="text-center text-muted text-sm py-16">Loading properties...</p>}
        {error && <p className="text-center text-rust text-sm py-16">{error}</p>}

        {!loading && !error && properties.length === 0 && (
          <p className="text-center text-muted text-sm py-16">No properties available yet.</p>
        )}

        {!loading &&
          properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              initiallySaved={savedIds.has(property.id)}
              onRequestContact={handleRequestContact}
            />
          ))}
      </div>

      <BottomNav active="explore" onNavigate={(tab) => router.push(`/${tab}`)} />
    </div>
  );
}