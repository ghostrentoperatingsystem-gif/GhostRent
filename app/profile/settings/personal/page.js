'use client'
import { useState } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import { updateProfileField } from '../../../../services/profileSettings'
import BackHeader from '../../../../components/BackHeader'
import { SettingsInfoRow } from '../../../../components/SettingsRow'
import ProtectedRoute from '../../../../components/ProtectedRoute'

function maskEmail(email) {
  if (!email) return ''
  const [name, domain] = email.split('@')
  return `${name[0]}***${name.slice(-1)}@${domain}`
}

export default function PersonalInformation() {
  const { user, profile, refreshProfile } = useAuth()
  const [saving, setSaving] = useState(null)

  async function edit(field, currentValue, promptLabel) {
    const next = window.prompt(promptLabel, currentValue || '')
    if (next === null) return
    setSaving(field)
    try {
      await updateProfileField(user.id, field, next)
      await refreshProfile(user)
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(null)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <BackHeader title="Personal information" />
        <div className="border-t">
          <SettingsInfoRow
            label="Legal name"
            value={profile?.legal_name}
            onEdit={() => edit('legal_name', profile?.legal_name, 'Legal name')}
          />
          <SettingsInfoRow
            label="Preferred first name"
            value={profile?.preferred_name}
            onEdit={() => edit('preferred_name', profile?.preferred_name, 'Preferred first name')}
          />
          <SettingsInfoRow
            label="Phone number"
            value={profile?.phone}
            onEdit={() => edit('phone', profile?.phone, 'Phone number')}
          />
          <SettingsInfoRow
            label="Email"
            value={maskEmail(user?.email)}
            onEdit={() => alert('Contact support to change your email.')}
          />
          <SettingsInfoRow
            label="Residential address"
            value={profile?.residential_address}
            onEdit={() => edit('residential_address', profile?.residential_address, 'Residential address')}
          />
          <SettingsInfoRow
            label="Postal address"
            value={profile?.postal_address}
            onEdit={() => edit('postal_address', profile?.postal_address, 'Postal address')}
          />
        </div>
        {saving && <p className="text-center text-sm text-gray-400 mt-3">Saving...</p>}
      </div>
    </ProtectedRoute>
  )
}