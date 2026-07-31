'use client'
import Link from 'next/link'

export function SettingsLinkRow({ href, icon: Icon, label }) {
  return (
    <Link href={href} className="flex items-center justify-between px-4 py-4 border-b bg-white">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-gray-700" />}
        <span className="text-[15px]">{label}</span>
      </div>
      <span className="text-gray-300">{'>'}</span>
    </Link>
  )
}

export function SettingsInfoRow({ label, value, editLabel = 'Edit', onEdit }) {
  return (
    <div className="flex items-start justify-between px-4 py-4 border-b bg-white">
      <div>
        <div className="text-[15px]">{label}</div>
        <div className="text-sm text-gray-400 mt-0.5">{value || 'Not provided'}</div>
      </div>
      <button onClick={onEdit} className="text-blue-900 font-medium text-sm underline shrink-0">
        {value ? editLabel : 'Add'}
      </button>
    </div>
  )
}

export function SettingsToggleRow({ label, description, checked, onChange, disabled }) {
  const Toggle = require('./Toggle').default
  return (
    <div className="flex items-center justify-between px-4 py-4 border-b bg-white gap-4">
      <div>
        <div className="text-[15px]">{label}</div>
        {description && <div className="text-sm text-gray-400 mt-0.5">{description}</div>}
      </div>
      <Toggle checked={checked} onChange={onChange} disabled={disabled} />
    </div>
  )
}