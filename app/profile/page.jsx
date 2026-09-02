"use client";

import { useState } from "react";
import ProfileHome from "@/components/profile/ProfileHome";
import {
  AccountSettingsView,
  PersonalInfoView,
  LoginSecurityView,
  PaymentsView,
  NotificationsView,
  PrivacyView,
  AccessibilityView,
  HelpView,
} from "@/components/profile/AccountSettingsViews";

export default function ProfileSettingsPage() {
  const [view, setView] = useState("profile");
  const go = (v) => setView(v);

  return (
    <div className="max-w-[480px] mx-auto min-h-screen flex flex-col bg-paper text-ink">
      {view === "profile" && <ProfileHome go={go} />}
      {view === "account" && <AccountSettingsView go={go} />}
      {view === "personal" && <PersonalInfoView go={go} />}
      {view === "login-security" && <LoginSecurityView go={go} />}
      {view === "payments" && <PaymentsView go={go} />}
      {view === "notifications" && <NotificationsView go={go} />}
      {view === "privacy" && <PrivacyView go={go} />}
      {view === "accessibility" && <AccessibilityView go={go} />}
      {view === "help" && <HelpView go={go} />}
    </div>
  );
}
