'use client'
import { useAuth } from '../../../../context/AuthContext'
import { updateSetting } from '../../../../services/profileSettings'
import BackHeader from '../../../../components/BackHeader'
import { SettingsToggleRow } from '../../../../components/SettingsRow'
import ProtectedRoute from '../../../../components/ProtectedRoute'

export default function LoginSecurity() {
  const { user, profile, refreshProfile } = useAuth()
  const settings = profile?.settings || {}

  async function toggle(key, value) {
    await updateSetting(user.id, key, value)
    await refreshProfile(user)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <BackHeader title="Login & security" />
        <div className="border-t">
          <SettingsToggleRow
            label="Two-factor authentication"
            description="Require a code by SMS when logging in from a new device"
            checked={!!settings.two_factor}
            onChange={(v) => toggle('two_factor', v)}
          />
          <SettingsToggleRow
            label="Biometric login"
            description="Use fingerprint or face unlock on this device"
            checked={!!settings.biometric}
            onChange={(v) => toggle('biometric', v)}
          />
          <SettingsToggleRow
            label="Log out of inactive sessions"
            description="Automatically sign out devices inactive for 30+ days"
            checked={!!settings.logout_inactive}
            onChange={(v) => toggle('logout_inactive', v)}
          />
        </div>
      </div>
    </ProtectedRoute>
  )
}