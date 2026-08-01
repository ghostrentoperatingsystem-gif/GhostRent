'use client'

export default function Toggle({ checked, onChange, disabled = false }) {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked)
    }
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label="Toggle switch"
      disabled={disabled}
      onClick={handleClick}
      className={`
        relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-200
        ${checked ? 'bg-signal' : 'bg-line'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'}
        focus:outline-none focus:ring-2 focus:ring-signal focus:ring-offset-2
      `}
    >
      <span
        className={`
          absolute h-6 w-6 rounded-full bg-white shadow-sm transform transition-transform duration-200
          ${checked ? 'translate-x-7' : 'translate-x-1'}
        `}
      />
    </button>
  )
}
