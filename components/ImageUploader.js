"use client";

import { useState, useCallback } from "react";
import { createClient } from "../lib/supabase";

export default function ImageUploader({ label, folder, onUploaded, existingUrl }) {
  const supabase = createClient();
  const [preview, setPreview] = useState(existingUrl || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = useCallback(
    async (file) => {
      if (!file) return;
      setError(null);
      setPreview(URL.createObjectURL(file));
      setUploading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must be logged in to upload images.");
        setUploading(false);
        return;
      }

      const ext = file.name.split(".").pop();
      const path = `${user.id}/${folder}/${crypto.randomUUID()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("property-images")
        .upload(path, file, { upsert: true });

      if (uploadError) {
        setError(uploadError.message);
        setUploading(false);
        return;
      }

      const { data } = supabase.storage.from("property-images").getPublicUrl(path);
      setUploading(false);
      onUploaded(data.publicUrl);
    },
    [supabase, folder, onUploaded]
  );

  return (
    <div className="border border-dashed border-line rounded-card p-4 text-center">
      <p className="text-sm font-medium text-ink mb-2">{label}</p>
      {preview ? (
        <img src={preview} alt={label} className="h-32 w-full object-cover rounded-card mb-2" />
      ) : (
        <div className="h-32 w-full bg-paper rounded-card mb-2 flex items-center justify-center text-muted text-xs">
          No image
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files?.[0])}
        className="text-xs"
      />
      {uploading && <p className="text-xs text-muted mt-1">Uploading...</p>}
      {error && <p className="text-xs text-rust mt-1">{error}</p>}
    </div>
  );
}