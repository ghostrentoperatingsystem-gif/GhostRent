'use client'
import SettingsHeader from '@/components/settings/SettingsHeader'
import { SettingsToggleRow } from '@/components/settings/SettingsRows'
import { useProfileSettings } from '@/lib/useProfileSettings'

export default function PrivacyPage() {
  const { settings, updateField, loading } = useProfileSettings()

  if (loading) return <div className="p-6 text-gray-400 text-sm">Loading…</div>

  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-white">
      <SettingsHeader title="Privacy" backHref="/profile/settings" />
      <div>
        <SettingsToggleRow
          label="Share phone number after unlock"
          description="Let tenants who pay the R99 unlock fee see your number"
          checked={settings.share_phone_after_unlock}
          onChange={(v) => updateField('share_phone_after_unlock', v)}
        />
        <SettingsToggleRow
          label="Show listings in search engines"
          description="Allow Google and other search engines to index your listings"
          checked={settings.show_listings_search_engines}
          onChange={(v) => updateField('show_listings_search_engines', v)}
        />
        <SettingsToggleRow
          label="Allow WhatsApp contact"
          description="Show a WhatsApp button to tenants who've unlocked your contact"
          checked={settings.allow_whatsapp_contact}
          onChange={(v) => updateField('allow_whatsapp_contact', v)}
        />
      </div>
      <div className="mx-4 my-4 bg-gray-50 rounded-lg p-4">
        <h3 className="text-[15px] font-semibold mb-2">Privacy Notice</h3>
        <p className="text-sm leading-relaxed text-gray-500 mb-3">
          GhostRent OS collects the information you provide when creating a listing or
          account — your name, contact number, email, and property details — to connect
          landlords with prospective tenants and to process the R99 contact-unlock fee via
          Paystack. We don&apos;t sell your personal information to third parties.
        </p>
        <p className="text-sm leading-relaxed text-gray-500">
          Under the Protection of Personal Information Act (POPIA), you have the right to
          access, correct, or request deletion of your personal information at any time.
        </p>
      </div>
    </div>
  )
}
