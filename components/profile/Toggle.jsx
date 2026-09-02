"use client";

import { useState } from "react";

export default function Toggle({ defaultChecked = false }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <button
      type="button"
      onClick={() => setChecked((c) => !c)}
      className={`relative w-[46px] h-[27px] rounded-full flex-shrink-0 mt-0.5 transition-colors ${
        checked ? "bg-signal" : "bg-line"
      }`}
    >
      <span
        className={`absolute top-[3px] left-[3px] h-[21px] w-[21px] bg-paper rounded-full shadow transition-transform ${
          checked ? "translate-x-[19px]" : ""
        }`}
      />
    </button>
  );
}
