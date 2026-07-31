export default function Toggle({ checked, onChange, disabled = false }) {
  const handleClick = () => {
    if (!disabled) onChange(!checked);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleClick}
      className={`
        relative flex h-8 w-14 items-center rounded-full transition-colors
        ${checked ? "bg-blue-600" : "bg-gray-300"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <span
        className={`
          h-6 w-6 rounded-full bg-white shadow transform transition-transform
          ${checked ? "translate-x-7" : "translate-x-1"}
        `}
      />
    </button>
  );
}
