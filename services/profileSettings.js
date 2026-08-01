'use client'

import { supabase } from '@/lib/supabase-browser'

/**
 * Update a single profile field
 * @param {string} userId - The user's UUID
 * @param {string} field - Column name in profiles table
 * @param {any} value - New value
 */
export async function updateProfileField(userId, field, value) {
  const { data, error } = await supabase
    .from('profiles')
    .update({ [field]: value })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Update a nested setting inside profiles.settings jsonb
 * @param {string} userId - The user's UUID
 * @param {string} key - Dot notation path (e.g. 'notifications.email')
 * @param {any} value - New value
 */
export async function updateSetting(userId, key, value) {
  // First fetch current settings
  const { data: profile, error: fetchError } = await supabase
    .from('profiles')
    .select('settings')
    .eq('id', userId)
    .single()

  if (fetchError) throw fetchError

  const currentSettings = profile?.settings || {}
  
  // Deep merge using dot notation
  const newSettings = setNestedValue(currentSettings, key, value)

  const { data, error } = await supabase
    .from('profiles')
    .update({ settings: newSettings })
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Get full profile with settings
 */
export async function getSettings(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('settings')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data?.settings || {}
}

/**
 * Helper: Set nested value using dot notation
 */
function setNestedValue(obj, path, value) {
  const keys = path.split('.')
  const result = { ...obj }
  let current = result

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (!current[key]) {
      current[key] = {}
    }
    current = current[key]
  }

  current[keys[keys.length - 1]] = value
  return result
}

/**
 * Get a specific setting value
 */
export async function getSetting(userId, key) {
  const settings = await getSettings(userId)
  const keys = key.split('.')
  let current = settings
  for (const k of keys) {
    if (current === undefined || current === null) return undefined
    current = current[k]
  }
  return current
}