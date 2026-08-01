'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase-browser'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(true)
  const supabase = createClient()

  async function refreshProfile(userOverride) {
    setProfileLoading(true)
    const { data: { user: current } } = await supabase.auth.getUser()
    const activeUser = userOverride ?? current
    if (activeUser) {
      const { data } = await supabase.from('profiles').select('*').eq('id', activeUser.id).single()
      setProfile(data)
    } else {
      setProfile(null)
    }
    setProfileLoading(false)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) refreshProfile(session.user)
      else setProfileLoading(false)
      setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
      if (session?.user) refreshProfile(session.user)
      else {
        setProfile(null)
        setProfileLoading(false)
      }
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  const value = {
    user, profile, loading, profileLoading,
    signUpWithEmail: (email, password) => supabase.auth.signUp({ email, password }),
    signInWithEmail: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    signInWithGoogle: () => supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    }),
    resetPassword: (email) => supabase.auth.resetPasswordForEmail(email),
    signOut: () => supabase.auth.signOut(),
    refreshProfile
  }
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
