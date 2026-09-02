"use client";

export default function ProfileHome({ go }) {
  return (
    <>
      <div className="flex flex-col items-center px-5 pt-8 pb-6">
        <div className="w-[88px] h-[88px] rounded-full bg-signal text-paper flex items-center justify-center font-display text-3xl font-semibold">
          MM
        </div>
        <h2 className="font-display mt-3.5 mb-0.5 text-xl font-semibold text-ink">
          Mosa Mahlangu
        </h2>
        <p className="font-body m-0 text-sm text-muted">Landlord · Johannesburg</p>
      </div>

      <div className="flex gap-3 px-5 pb-4">
        <div className="flex-1 bg-ink/5 rounded-card py-4 text-center">
          <div className="font-display text-xl font-semibold text-signal">109</div>
          <div className="font-body text-xs text-muted mt-0.5">Views</div>
        </div>
        <div className="flex-1 bg-ink/5 rounded-card py-4 text-center">
          <div className="font-display text-xl font-semibold text-signal">35</div>
          <div className="font-body text-xs text-muted mt-0.5">Likes</div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 px-5 pb-5">
        <button
          onClick={() => go("account")}
          className="flex items-center justify-between bg-ink/5 rounded-card px-4 py-4"
        >
          <span className="font-body text-base font-medium text-ink">Account Settings</span>
          <span className="text-muted text-xl">›</span>
        </button>
        <button
          onClick={() => go("help")}
          className="flex items-center justify-between bg-ink/5 rounded-card px-4 py-4"
        >
          <span className="font-body text-base font-medium text-ink">Get help</span>
          <span className="text-muted text-xl">›</span>
        </button>
        <button className="flex items-center justify-between bg-ink/5 rounded-card px-4 py-4">
          <span className="font-body text-base font-medium text-rust">Log out</span>
        </button>
      </div>

      <div className="mt-auto flex justify-around items-center py-2.5 border-t border-line">
        <button className="font-body flex flex-col items-center gap-0.5 text-[11px] text-muted">
          Explore
        </button>
        <button className="font-body flex flex-col items-center gap-0.5 text-[11px] text-muted">
          Favourites
        </button>
        <div className="w-[52px] h-[52px] rounded-full bg-signal text-paper flex items-center justify-center text-2xl -mt-5">
          +
        </div>
        <button className="font-body flex flex-col items-center gap-0.5 text-[11px] text-muted">
          Alerts
        </button>
        <button className="font-body flex flex-col items-center gap-0.5 text-[11px] text-signal font-semibold">
          Profile
        </button>
      </div>
    </>
  );
}
