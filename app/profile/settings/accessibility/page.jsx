'use client'
import SettingsHeader from '@/components/settings/SettingsHeader'
import { SettingsToggleRow } from '@/components/settings/SettingsRows'
import { useProfileSettings } from '@/lib/useProfileSettings'

export default function AccessibilityPage() {
  const { settings, updateField, loading } = useProfileSettings()

  if (loading) return <div className="p-6 text-gray-400 text-sm">Loading…</div>

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-white">
      <SettingsHeader title="Accessibility" backHref="/profile/settings" />
      <div>
        <SettingsToggleRow
          label="Larger text"
          description="Increase text size across the app"
          checked={settings.larger_text}
          onChange={(v) => updateField('larger_text', v)}
        />
        <SettingsToggleRow
          label="Reduce motion"
          description="Minimise animations and transitions"
          checked={settings.reduce_motion}
          onChange={(v) => updateField('reduce_motion', v)}
        />
        <SettingsToggleRow
          label="High contrast"
          description="Increase colour contrast for readability"
          checked={settings.high_contrast}
          onChange={(v) => updateField('high_contrast', v)}
        />
      </div>
    </div>
  )
}
