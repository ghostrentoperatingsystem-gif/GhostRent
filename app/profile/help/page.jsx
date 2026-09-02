import { HelpCircle, Shield, Flag, MessageSquare } from 'lucide-react'
import SettingsHeader from '@/components/settings/SettingsHeader'
import { SettingsLinkRow } from '@/components/settings/SettingsRows'

export default function HelpPage() {
  return (
    <div className="max-w-[480px] mx-auto min-h-screen bg-white">
      <SettingsHeader title="Get help" backHref="/profile" />
      <div>
        <SettingsLinkRow href="#" icon={HelpCircle} label="Visit the Help Centre" />
        <SettingsLinkRow href="#" icon={Shield} label="Report a listing issue" />
        <SettingsLinkRow href="#" icon={Flag} label="Report a scam or fraud concern" />
        <SettingsLinkRow href="#" icon={MessageSquare} label="Give us feedback" />
      </div>
    </div>
  )
}
