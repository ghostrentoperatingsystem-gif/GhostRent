"use client";

import Header from "./Header";
import Row from "./Row";

export function AccountSettingsView({ go }) {
  return (
    <>
      <Header title="Account Settings" onBack={() => go("profile")} />
      <div>
        <Row title="Personal information" chevron onClick={() => go("personal")} />
        <Row title="Login & security" chevron onClick={() => go("login-security")} />
        <Row title="Payments & payouts" chevron onClick={() => go("payments")} />
        <Row title="Notifications" chevron onClick={() => go("notifications")} />
        <Row title="Privacy" chevron onClick={() => go("privacy")} />
        <Row title="Accessibility" chevron onClick={() => go("accessibility")} />
      </div>
    </>
  );
}

export function PersonalInfoView({ go }) {
  return (
    <>
      <Header title="Personal information" onBack={() => go("account")} />
      <div>
        <Row title="Legal name" sub="Mosa Mahlangu" action="Edit" />
        <Row title="Preferred first name" sub="Not provided" action="Add" />
        <Row title="Phone number" sub="Not provided" action="Add" />
        <Row title="Email" sub="m***a@gmail.com" action="Edit" />
        <Row title="Residential address" sub="Not provided" action="Add" />
        <Row title="Postal address" sub="Not provided" action="Add" />
      </div>
    </>
  );
}

export function LoginSecurityView({ go }) {
  return (
    <>
      <Header title="Login & security" onBack={() => go("account")} />
      <div>
        <Row
          title="Two-factor authentication"
          sub="Require a code by SMS when logging in from a new device"
          toggle
        />
        <Row title="Biometric login" sub="Use fingerprint or face unlock on this device" toggle />
        <Row
          title="Log out of inactive sessions"
          sub="Automatically sign out devices inactive for 30+ days"
          toggle
        />
      </div>
    </>
  );
}

export function PaymentsView({ go }) {
  return (
    <>
      <Header title="Payments & payouts" onBack={() => go("account")} />
      <div>
        <Row
          title="Save card for faster unlocks"
          sub="Skip re-entering card details on your next R99 unlock"
        />
        <Row title="Payment method" sub="No card saved" action="Add" />
        <Row title="Payout account" sub="Not provided" action="Add" />
      </div>
    </>
  );
}

export function NotificationsView({ go }) {
  return (
    <>
      <Header title="Notifications" onBack={() => go("account")} />
      <div>
        <Row title="Push notifications" sub="New views, unlocks, and messages" toggle />
        <Row title="Email notifications" sub="Weekly summary of listing performance" toggle />
        <Row title="SMS alerts" sub="Only for contact unlocks" />
      </div>
    </>
  );
}

export function PrivacyView({ go }) {
  return (
    <>
      <Header title="Privacy" onBack={() => go("account")} />
      <div>
        <Row
          title="Share phone number after unlock"
          sub="Let tenants who pay the R99 unlock fee see your number"
          toggle
        />
        <Row
          title="Show listings in search engines"
          sub="Allow Google and other search engines to index your listings"
        />
        <Row
          title="Allow WhatsApp contact"
          sub="Show a WhatsApp button to tenants who've unlocked your contact"
          toggle
        />
      </div>
      <div className="mx-5 my-4 bg-ink/5 rounded-card p-[18px]">
        <h3 className="font-display text-[17px] font-semibold mb-2.5 text-ink">
          Privacy Notice
        </h3>
        <p className="font-body text-sm leading-relaxed text-muted mb-3">
          GhostRent OS collects the information you provide when creating a listing or account —
          your name, contact number, email, and property details — to connect landlords with
          prospective tenants and to process the R99 contact-unlock fee via Paystack. We don&apos;t
          sell your personal information to third parties.
        </p>
        <p className="font-body text-sm leading-relaxed text-muted">
          Under the Protection of Personal Information Act (POPIA), you have the right to access,
          correct, or request deletion of your personal information at any time.
        </p>
      </div>
    </>
  );
}

export function AccessibilityView({ go }) {
  return (
    <>
      <Header title="Accessibility" onBack={() => go("account")} />
      <div>
        <Row title="Larger text" sub="Increase text size across the app" />
        <Row title="Reduce motion" sub="Minimise animations and transitions" />
        <Row title="High contrast" sub="Increase colour contrast for readability" />
      </div>
    </>
  );
}

export function HelpView({ go }) {
  return (
    <>
      <Header title="Get help" onBack={() => go("profile")} />
      <div>
        <Row title="Visit the Help Centre" chevron />
        <Row title="Report a listing issue" chevron />
        <Row title="Report a scam or fraud concern" chevron />
        <Row title="Give us feedback" chevron />
      </div>
    </>
  );
}
