'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requireHub = true }) {
  const { user, profile, profileLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }
    if (requireHub && !profileLoading && profile && !profile.role) {
      router.push('/choose-hub')
    }
  }, [user, profile, profileLoading, router, requireHub])

  if (!user) return null
  if (requireHub && profileLoading) return null
  if (requireHub && profile && !profile.role) return null
  return children
}