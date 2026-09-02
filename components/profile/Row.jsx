"use client";

import Toggle from "./Toggle";

export default function Row({ title, sub, action, toggle, chevron, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-start justify-between gap-3 px-5 py-[18px] border-b border-line ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex flex-col gap-1 min-w-0">
        <span className="font-body text-[17px] font-medium text-ink">{title}</span>
        {sub && <span className="font-body text-sm text-muted leading-snug">{sub}</span>}
      </div>
      {toggle && <Toggle defaultChecked />}
      {action && (
        <button className="font-body text-[15px] text-signal underline flex-shrink-0">
          {action}
        </button>
      )}
      {chevron && <span className="text-muted text-xl flex-shrink-0">›</span>}
    </div>
  );
}
