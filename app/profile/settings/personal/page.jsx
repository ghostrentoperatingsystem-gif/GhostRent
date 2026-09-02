'use client'
import SettingsHeader from '@/components/settings/SettingsHeader'
import { SettingsEditableRow } from '@/components/settings/SettingsRows'
import { useProfileSettings } from '@/lib/useProfileSettings'

export default function PersonalInfoPage() {
  const { settings, updateField, loading } = useProfileSettings()

  if (loading) return <div className="p-6 text-gray-400 text-sm">Loading…</div>

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-white">
      <SettingsHeader title="Personal information" backHref="/profile/settings" />
      <div>
        <SettingsEditableRow
          label="Legal name"
          value={settings.legal_name}
          onSave={(v) => updateField('legal_name', v)}
        />
        <SettingsEditableRow
          label="Preferred first name"
          value={settings.preferred_first_name}
          onSave={(v) => updateField('preferred_first_name', v)}
        />
        <SettingsEditableRow
          label="Phone number"
          value={settings.phone_number}
          onSave={(v) => updateField('phone_number', v)}
        />
        <SettingsEditableRow
          label="Email"
          value={settings.email}
          onSave={(v) => updateField('email', v)}
        />
        <SettingsEditableRow
          label="Residential address"
          value={settings.residential_address}
          onSave={(v) => updateField('residential_address', v)}
        />
        <SettingsEditableRow
          label="Postal address"
          value={settings.postal_address}
          onSave={(v) => updateField('postal_address', v)}
        />
      </div>
    </div>
  )
}
