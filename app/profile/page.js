
'use client'
import Link from 'next/link'
import { useAuth } from '../../context/AuthContext'
import BottomNav from '../../components/BottomNav'
import ProtectedRoute from '../../components/ProtectedRoute'

const NAV = [
  { path: '/tenant', label: 'Explore' },
  { path: '/tenant/looking', label: 'Favourites' },
  { path: '/landlord/notifications', label: 'Alerts' },
  { path: '/profile', label: 'Profile' },
]

function initials(name) {
  if (!name) return '?'
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

export default function ProfilePage() {
  const { user, profile, signOut } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 pb-20 p-4">
        <div className="flex flex-col items-center pt-6 pb-8">
          <div className="w-24 h-24 rounded-full bg-blue-900 text-white flex items-center justify-center text-3xl font-bold mb-4">
            {initials(profile?.legal_name)}
          </div>
          <div className="text-xl font-bold">{profile?.legal_name || user?.email}</div>
          <div className="text-gray-400 capitalize">
            {profile?.role} {profile?.city ? `· ${profile.city}` : ''}
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-white border rounded-xl py-4 text-center">
            <div className="text-2xl font-bold text-blue-900">{profile?.views ?? 0}</div>
            <div className="text-sm text-gray-500">Views</div>
          </div>
          <div className="flex-1 bg-white border rounded-xl py-4 text-center">
            <div className="text-2xl font-bold text-blue-900">{profile?.likes ?? 0}</div>
            <div className="text-sm text-gray-500">Likes</div>
          </div>
        </div>

        <div className="bg-white border rounded-xl overflow-hidden mb-4">
          <Link href="/profile/settings" className="flex items-center justify-between px-4 py-4 border-b">
            <span>Account Settings</span>
            <span className="text-gray-300">{'>'}</span>
          </Link>
          <Link href="/profile/help" className="flex items-center justify-between px-4 py-4">
            <span>Get help</span>
            <span className="text-gray-300">{'>'}</span>
          </Link>
        </div>

        <button
          onClick={signOut}
          className="w-full bg-white border rounded-xl py-4 text-red-600 font-semibold"
        >
          Log out
        </button>

        <BottomNav items={NAV} />
      </div>
    </ProtectedRoute>
  )
}