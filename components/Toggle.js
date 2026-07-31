'use client'
export default function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`w-12 h-7 rounded-full flex items-center px-0.5 transition-colors shrink-0 ${
        checked ? 'bg-blue-900 justify-end' : 'bg-gray-200 justify-start'
      } ${disabled ? 'opacity-50' : ''}`}
    >
      <span className="w-6 h-6 bg-white rounded-full shadow" />
    </button>
  )
} 