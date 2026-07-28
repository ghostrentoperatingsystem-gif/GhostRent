"use client";

import { useState } from "react";
import { Heart, Share2, MapPin } from "lucide-react";
import { createClient } from "../lib/supabase";

export default function PropertyCard({ property, distanceKm, initiallySaved, onRequestContact }) {
  const supabase = createClient();
  const [saved, setSaved] = useState(initiallySaved || false);
  const [saving, setSaving] = useState(false);
  const images = Object.values(property.images || {}).flat();
  const [imgIndex, setImgIndex] = useState(0);

  async function toggleSave() {
    setSaving(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      return;
    }

    if (saved) {
      await supabase
        .from("saved_properties")
        .delete()
        .eq("user_id", user.id)
        .eq("property_id", property.id);
      setSaved(false);
    } else {
      await supabase
        .from("saved_properties")
        .insert({ user_id: user.id, property_id: property.id });
      setSaved(true);
    }
    setSaving(false);
  }

  function handleShare() {
    const url = `${window.location.origin}/property/${property.id}`;
    if (navigator.share) {
      navigator.share({ title: property.area, url });
    } else {
      navigator.clipboard.writeText(url);
    }
  }

  return (
    <div className="rounded-card border border-line overflow-hidden bg-white">
      <div className="relative h-40 bg-line">
        {images.length > 0 ? (
          <img
            src={images[imgIndex]}
            alt={property.area}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted text-sm">
            No image
          </div>
        )}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`w-1.5 h-1.5 rounded-full ${i === imgIndex ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="font-display text-lg text-ink">{property.area}</p>
          <button onClick={toggleSave} disabled={saving}>
            <Heart size={20} className={saved ? "text-signal fill-signal" : "text-muted"} />
          </button>
        </div>

        <p className="text-sm text-muted flex items-center gap-1 mt-1">
          <MapPin size={14} /> {property.area}, {property.city}
          {distanceKm != null && ` · ${distanceKm.toFixed(1)} km away`}
        </p>

        <p className="text-sm text-muted mt-1">
          {property.bedrooms} bed · R{Number(property.price).toLocaleString()}
        </p>

        <div className="flex items-center gap-4 text-xs text-muted mt-2">
          <span>{property.bathrooms} baths · {property.parking} parking</span>
          <span>{property.availability_type === "now" ? "Available now" : property.availability_date}</span>
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={handleShare}
            className="flex-1 border border-line rounded-card py-3 text-sm font-medium flex items-center justify-center gap-1"
          >
            <Share2 size={16} /> Share
          </button>
          <button
            onClick={() => onRequestContact(property)}
            className="flex-[2] bg-signal text-white rounded-card py-3 text-sm font-semibold hover:bg-signalDark transition"
          >
            Request Contact · R99
          </button>
        </div>
      </div>
    </div>
  );
}