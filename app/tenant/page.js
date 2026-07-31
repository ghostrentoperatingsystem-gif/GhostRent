'use client'
import { useEffect, useState } from 'react'
import { getPublicProperties } from '../../services/properties'
import PropertyCard from '../../components/PropertyCard'
import BottomNav from '../../components/BottomNav'
import ProtectedRoute from '../../components/ProtectedRoute'

const NAV = [
  { path: '/tenant', label: 'Explore' },
  { path: '/tenant/looking', label: 'Looking' },
  { path: '/tenant/messages', label: 'Messages' },
  { path: '/profile', label: 'Profile' },
]

export default function TenantExplore() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getPublicProperties('rent').then(setProperties).catch((err) => setError(err.message)).finally(() => setLoading(false))
  }, [])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 pb-20 p-4">
        <h1 className="text-xl font-bold mb-4">Explore Rentals</h1>
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && properties.length === 0 && <p className="text-gray-500">No approved listings yet.</p>}
        {properties.map((p) => <PropertyCard key={p.id} property={p} />)}
        <BottomNav items={NAV} />
      </div>
    </ProtectedRoute>
  )
}