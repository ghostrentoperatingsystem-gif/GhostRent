'use client'
import Link from 'next/link'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/tenant', label: 'Tenant hub' },
  { href: '/landlord', label: 'Landlord hub' },
  { href: '/buyer', label: 'Buyer hub' },
  { href: '/profile/settings', label: 'Settings' },
  { href: '/profile/help', label: 'Help' },
]

export default function SideMenu({ open, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="w-[280px] bg-white h-full p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">GhostRent</h2>
        <nav className="flex flex-col">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className="py-3 border-b text-[15px]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <button
        className="flex-1 bg-black/30"
        onClick={onClose}
        aria-label="Close menu"
      />
    </div>
  )
}