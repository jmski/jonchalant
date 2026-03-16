'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'

interface AuthContextType {
  session: Session | null
  isLoading: boolean
  user: User | null
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
  user: null,
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

  useEffect(() => {
    const supabase = createClient()

    // Check for existing session on mount
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user || null)
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
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user || null)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ session, isLoading, user }}>
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
