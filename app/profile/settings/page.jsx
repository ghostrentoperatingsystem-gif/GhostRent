import { User, Shield, CreditCard, Bell, Lock, Accessibility } from 'lucide-react'
import SettingsHeader from '@/components/settings/SettingsHeader'
import { SettingsLinkRow } from '@/components/settings/SettingsRows'

export default function AccountSettingsPage() {
  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-white">
      <SettingsHeader title="Account Settings" backHref="/profile" />
      <div>
        <SettingsLinkRow href="/profile/settings/personal" icon={User} label="Personal information" />
        <SettingsLinkRow href="/profile/settings/login-security" icon={Lock} label="Login & security" />
        <SettingsLinkRow href="/profile/settings/payments" icon={CreditCard} label="Payments & payouts" />
        <SettingsLinkRow href="/profile/settings/notifications" icon={Bell} label="Notifications" />
        <SettingsLinkRow href="/profile/settings/privacy" icon={Shield} label="Privacy" />
        <SettingsLinkRow href="/profile/settings/accessibility" icon={Accessibility} label="Accessibility" />
      </div>
    </div>
  )
}
