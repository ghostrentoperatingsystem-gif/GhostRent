'use client'
import BackHeader from '../../../components/BackHeader'
import { SettingsLinkRow } from '../../../components/SettingsRow'
import ProtectedRoute from '../../../components/ProtectedRoute'

const ROWS = [
  { href: '/profile/settings/personal', label: 'Personal information' },
  { href: '/profile/settings/security', label: 'Login & security' },
  { href: '/profile/settings/privacy', label: 'Privacy' },
  { href: '/profile/settings/notifications', label: 'Notifications' },
  { href: '/profile/settings/payments', label: 'Payments' },
  { href: '/profile/settings/accessibility', label: 'Accessibility' },
]

export default function AccountSettings() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <BackHeader title="Account Settings" />
        <div className="border-t">
          {ROWS.map((r) => (
            <SettingsLinkRow key={r.href} href={r.href} label={r.label} />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  )
}