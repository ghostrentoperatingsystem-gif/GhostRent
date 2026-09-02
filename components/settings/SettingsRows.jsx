'use client'
import { useState } from 'react'
import Link from 'next/link'
import Toggle from './Toggle'

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

// New: a self-contained editable field. Handles its own inline edit state,
// so pages don't need to track "which field is being edited" themselves.
export function SettingsEditableRow({ label, value, placeholder = 'Not provided', onSave }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value || '')
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    await onSave(draft)
    setSaving(false)
    setEditing(false)
  }

  if (!editing) {
    return (
      <SettingsInfoRow
        label={label}
        value={value}
        onEdit={() => {
          setDraft(value || '')
          setEditing(true)
        }}
      />
    )
  }

  return (
    <div className="flex flex-col gap-2 px-4 py-4 border-b bg-white">
      <div className="text-[15px]">{label}</div>
      <div className="flex items-center gap-2">
        <input
          autoFocus
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          className="flex-1 text-[15px] border border-gray-200 rounded-md px-3 py-2 outline-none focus:border-blue-900"
        />
        <button
          type="button"
          disabled={saving}
          onClick={save}
          className="text-blue-900 font-medium text-sm shrink-0 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="text-gray-400 text-sm shrink-0"
        >
          Cancel
        </button>
      </div>
    </div>
  )
          }
