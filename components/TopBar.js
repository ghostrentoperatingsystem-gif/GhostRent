"use client";

import { Menu, ChevronLeft } from "lucide-react";

export default function TopBar({ title, onMenu, onBack }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-white">
      {onBack ? (
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-paper">
          <ChevronLeft size={22} />
        </button>
      ) : (
        <button onClick={onMenu} className="p-2 -ml-2 rounded-full hover:bg-paper">
          <Menu size={22} />
        </button>
      )}
      <h1 className="font-display text-lg text-ink">{title}</h1>
      <div className="w-8" />
    </div>
  );
}