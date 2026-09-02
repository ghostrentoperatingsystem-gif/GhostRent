'use client'

export default function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange && onChange(!checked)}
      className={`relative w-[46px] h-[27px] rounded-full flex-shrink-0 transition-colors disabled:opacity-50 ${
        checked ? 'bg-blue-900' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-[3px] left-[3px] h-[21px] w-[21px] bg-white rounded-full shadow transition-transform ${
          checked ? 'translate-x-[19px]' : ''
        }`}
      />
    </button>
  )
}
