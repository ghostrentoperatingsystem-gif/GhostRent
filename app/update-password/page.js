'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'
import { CheckCircle } from 'lucide-react'

export default function UpdatePassword() {
  const supabase = createClient()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated via recovery flow
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push('/login')
      }
    }
    checkSession()
  }, [router, supabase.auth])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setTimeout(() => {
        router.push('/profile')
      }, 3000)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-paper">
      <div className="max-w-md w-full bg-white rounded-card border border-line p-8 shadow-sm">
        <h1 className="font-display text-2xl font-bold text-center mb-2">Update Password</h1>
        <p className="text-center text-muted text-sm mb-6">Choose a new secure password</p>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-lg font-medium">Password updated!</p>
            <p className="text-sm text-muted mt-2">Redirecting to your profile...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-card text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="text-sm font-medium block mb-1">New password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-line rounded-card focus:outline-none focus:ring-2 focus:ring-signal"
                required
                minLength={6}
              />
              <p className="text-xs text-muted mt-1">Minimum 6 characters</p>
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Confirm password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-line rounded-card focus:outline-none focus:ring-2 focus:ring-signal"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-signal text-white py-3 rounded-card hover:bg-signalDark disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Updating...' : 'Update password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
