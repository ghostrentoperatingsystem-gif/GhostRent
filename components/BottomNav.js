"use client";

import { Compass, Heart, Bell, User } from "lucide-react";

export default function BottomNav({ active, onNavigate }) {
  const tabs = [
    { key: "explore", label: "Explore", icon: Compass },
    { key: "favourites", label: "Favourites", icon: Heart },
    { key: "alerts", label: "Alerts", icon: Bell },
    { key: "profile", label: "Profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-line">
      <div className="flex items-center justify-around relative py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onNavigate(tab.key)}
              className="flex flex-col items-center gap-1 px-4 py-1"
            >
              <Icon size={22} className={isActive ? "text-signal" : "text-muted"} />
              <span className={`text-xs ${isActive ? "text-signal font-medium" : "text-muted"}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}