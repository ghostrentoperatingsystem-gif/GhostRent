'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getMyProperties } from '../../services/properties'
import PropertyCard from '../../components/PropertyCard'
import BottomNav from '../../components/BottomNav'
import ProtectedRoute from '../../components/ProtectedRoute'

const NAV = [
  { path: '/landlord', label: 'Properties' },
  { path: '/landlord/messages', label: 'Messages' },
  { path: '/landlord/notifications', label: 'Notifications' },
  { path: '/profile', label: 'Profile' },
]
const TABS = ['active', 'draft', 'rejected', 'expired']

export default function LandlordHome() {
  const { user } = useAuth()
  const [properties, setProperties] = useState([])
  const [tab, setTab] = useState('active')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    getMyProperties(user.id)
      .then(setProperties)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [user])

  const filtered = properties.filter((p) => p.status === tab)

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">My Properties</h1>
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {TABS.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-3 py-1 rounded-full text-sm capitalize ${tab === t ? 'bg-blue-900 text-white' : 'bg-white border'}`}>{t}</button>
            ))}
          </div>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-600">{error}</p>}
          {!loading && !error && filtered.length === 0 && <p className="text-gray-500">No {tab} properties yet.</p>}
          {filtered.map((p) => <PropertyCard key={p.id} property={p} />)}
        </div>
        <BottomNav items={NAV} />
      </div>
    </ProtectedRoute>
  )
}