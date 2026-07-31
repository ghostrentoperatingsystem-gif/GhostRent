'use client'
import { useAuth } from '../../../../context/AuthContext'
import { updateSetting } from '../../../../services/profileSettings'
import BackHeader from '../../../../components/BackHeader'
import { SettingsToggleRow } from '../../../../components/SettingsRow'
import ProtectedRoute from '../../../../components/ProtectedRoute'

export default function Privacy() {
  const { user, profile, refreshProfile } = useAuth()
  const settings = profile?.settings || {}

  async function toggle(key, value) {
    await updateSetting(user.id, key, value)
    await refreshProfile(user)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <BackHeader title="Privacy" />
        <div className="border-t">
          <SettingsToggleRow
            label="Share phone number after unlock"
            description="Let tenants who pay the R99 unlock fee see your number"
            checked={!!settings.share_phone}
            onChange={(v) => toggle('share_phone', v)}
          />
          <SettingsToggleRow
            label="Show listings in search engines"
            description="Allow Google and other search engines to index your listings"
            checked={!!settings.show_in_search}
            onChange={(v) => toggle('show_in_search', v)}
          />
          <SettingsToggleRow
            label="Allow WhatsApp contact"
            description="Show a WhatsApp button to tenants who've unlocked your contact"
            checked={!!settings.allow_whatsapp}
            onChange={(v) => toggle('allow_whatsapp', v)}
          />
        </div>
        <div className="bg-white mt-4 p-4">
          <h2 className="font-bold mb-2">Privacy Notice</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            GhostRent OS collects the information you provide when creating a listing or
            account — your name, contact number, email, and property details — to connect
            landlords with prospective tenants and to process the R99 contact-unlock fee via
            Paystack. We don't sell your personal information to third parties.
          </p>
        </div>
      </div>
    </ProtectedRoute>
  )
}