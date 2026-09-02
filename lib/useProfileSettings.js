'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

const DEFAULT_SETTINGS = {
  legal_name: '',
  preferred_first_name: '',
  phone_number: '',
  email: '',
  residential_address: '',
  postal_address: '',
  payout_account: '',
  two_factor_enabled: false,
  biometric_login: false,
  auto_logout_inactive: false,
  save_card: false,
  push_notifications: false,
  email_notifications: false,
  sms_alerts: false,
  share_phone_after_unlock: false,
  show_listings_search_engines: false,
  allow_whatsapp_contact: false,
  larger_text: false,
  reduce_motion: false,
  high_contrast: false,
}

export function useProfileSettings() {
  const [userId, setUserId] = useState(null)
  const [settings, setSettings] = useState(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }
      setUserId(user.id)

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        setSettings({ ...DEFAULT_SETTINGS, ...data })
      } else if (error && error.code === 'PGRST116') {
        await supabase.from('profiles').insert({ user_id: user.id })
      }
      setLoading(false)
    }
    load()
  }, [])

  const updateField = async (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
    if (!userId) return
    const { error } = await supabase
      .from('profiles')
      .update({ [field]: value })
      .eq('user_id', userId)
    if (error) console.error('Failed to save', field, error)
  }

  return { settings, updateField, loading }
          }
