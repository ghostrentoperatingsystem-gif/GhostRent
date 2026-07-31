export default function Toggle({ checked, onChange, disabled = false }) {

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`...`}
    >
      <span ... />
    </button>
  );
}
