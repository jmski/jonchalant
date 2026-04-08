'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'

type AalLevel = 'aal1' | 'aal2' | null

interface AuthContextType {
  session: Session | null
  isLoading: boolean
  user: User | null
  aal: AalLevel
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  user: null,
  aal: null,
})

/**
 * Auth Provider Component
 * Use at the root level of your app (in layout.tsx or a wrapper component)
 * 
 * Example:
 * <AuthProvider>
 *   <YourApp />
 * </AuthProvider>
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [aal, setAal] = useState<AalLevel>(null)

  useEffect(() => {
    const supabase = createClient()

    const updateAal = async () => {
      const { data } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
      setAal((data?.currentLevel as AalLevel) ?? null)
    }

    // Check for existing session on mount
    const getSession = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        // If the refresh token is stale, clear it so the next load starts fresh
        if (sessionError) {
          console.error('Session error (clearing stale token):', sessionError.message)
          await supabase.auth.signOut()
          return
        }

        setSession(session)
        setUser(session?.user || null)
        if (session) await updateAal()
      } catch (error) {
        console.error('Error getting session:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user || null)
      if (session) {
        try { await updateAal() } catch { setAal(null) }
      } else {
        setAal(null)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ session, isLoading, user, aal }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * useAuth Hook
 * Use in any client component to access auth state
 * 
 * Example:
 * const { session, isLoading, user } = useAuth()
 * if (isLoading) return <div>Loading...</div>
 * if (!session) return <Navigate to="/login" />
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
