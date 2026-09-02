"use client";

export default function Header({ title, onBack }) {
  return (
    <div className="flex items-center gap-3.5 px-5 py-[22px] bg-paper">
      <button
        onClick={onBack}
        className="w-9 h-9 rounded-full bg-line/60 flex items-center justify-center text-lg text-ink flex-shrink-0"
      >
        ‹
      </button>
      <h1 className="font-display text-2xl font-semibold tracking-tight text-ink m-0">
        {title}
      </h1>
    </div>
  );
}
