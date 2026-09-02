'use client'
import Link from 'next/link'

export default function SettingsHeader({ title, backHref }) {
  return (
    <div className="flex items-center gap-3 px-5 py-5 bg-white border-b">
      <Link
        href={backHref}
        className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-lg shrink-0"
        aria-label="Back"
      >
        ‹
      </Link>
      <h1 className="font-display text-2xl font-semibold text-gray-900 m-0">{title}</h1>
    </div>
  )
}
