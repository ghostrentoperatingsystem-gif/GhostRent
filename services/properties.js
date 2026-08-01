'use client'

import { supabase } from '@/lib/supabase-browser'

/**
 * Get public properties (approved + published)
 * @param {string} listingType - 'rent' or 'sell'
 * @param {object} filters - city, minPrice, maxPrice, bedrooms, bathrooms
 */
export async function getPublicProperties(listingType, filters = {}) {
  let query = supabase
    .from('properties')
    .select(`
      *,
      profiles!owner_id (
        id,
        full_name,
        role,
        avatar_url
      )
    `)
    .eq('status', 'approved')
    .eq('published', true)
    .eq('listing_type', listingType)
    .order('created_at', { ascending: false })

  // Apply filters
  if (filters.city) {
    query = query.ilike('city', `%${filters.city}%`)
  }
  if (filters.area) {
    query = query.ilike('area', `%${filters.area}%`)
  }
  if (filters.minPrice) {
    query = query.gte('price', parseFloat(filters.minPrice))
  }
  if (filters.maxPrice) {
    query = query.lte('price', parseFloat(filters.maxPrice))
  }
  if (filters.bedrooms) {
    query = query.eq('bedrooms', parseInt(filters.bedrooms))
  }
  if (filters.bathrooms) {
    query = query.eq('bathrooms', parseInt(filters.bathrooms))
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

/**
 * Get properties owned by a specific landlord
 */
export async function getMyProperties(ownerId) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * Get a single property by ID
 */
export async function getPropertyById(propertyId) {
  const { data, error } = await supabase
    .from('properties')
    .select(`
      *,
      profiles!owner_id (
        id,
        full_name,
        role,
        avatar_url
      )
    `)
    .eq('id', propertyId)
    .single()

  if (error) throw error
  return data
}

/**
 * Create a new property
 */
export async function createProperty(payload) {
  const { data, error } = await supabase
    .from('properties')
    .insert([{
      ...payload,
      status: 'draft',
      published: false
    }])
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Update an existing property
 */
export async function updateProperty(propertyId, updates) {
  const { data, error } = await supabase
    .from('properties')
    .update(updates)
    .eq('id', propertyId)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Delete a property (soft delete - set status to 'expired')
 */
export async function deleteProperty(propertyId) {
  const { error } = await supabase
    .from('properties')
    .update({ status: 'expired', published: false })
    .eq('id', propertyId)

  if (error) throw error
}

/**
 * Upload multiple images for a property
 */
export async function uploadPropertyImages(propertyId, files) {
  const uploadedUrls = []

  for (const file of files) {
    const fileExt = file.name.split('.').pop()
    const fileName = `${propertyId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from('property-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    const { data: urlData } = supabase.storage
      .from('property-images')
      .getPublicUrl(fileName)

    uploadedUrls.push(urlData.publicUrl)
  }

  return uploadedUrls
}

/**
 * Toggle saved/favorite property for a user
 */
export async function toggleSavedProperty(userId, propertyId) {
  // Check if already saved
  const { data: existing } = await supabase
    .from('saved_properties')
    .select('id')
    .eq('user_id', userId)
    .eq('property_id', propertyId)
    .single()

  if (existing) {
    // Unsave
    const { error } = await supabase
      .from('saved_properties')
      .delete()
      .eq('user_id', userId)
      .eq('property_id', propertyId)
    if (error) throw error
    return { saved: false }
  } else {
    // Save
    const { error } = await supabase
      .from('saved_properties')
      .insert([{ user_id: userId, property_id: propertyId }])
    if (error) throw error
    return { saved: true }
  }
}

/**
 * Get user's saved properties
 */
export async function getSavedProperties(userId) {
  const { data, error } = await supabase
    .from('saved_properties')
    .select(`
      property_id,
      properties (*)
    `)
    .eq('user_id', userId)

  if (error) throw error
  return data.map(item => item.properties)
}

/**
 * Track property view (increments view count)
 */
export async function trackPropertyView(propertyId, userId = null) {
  const { error } = await supabase
    .from('property_views')
    .insert([{
      property_id: propertyId,
      user_id: userId,
      viewed_at: new Date().toISOString()
    }])

  if (error) throw error
}