'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (isSignUp) {
        // Sign up
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/api/auth/callback`,
          },
        })

        if (signUpError) {
          setError(signUpError.message)
          return
        }

        setError(null)
        alert('Check your email to confirm your account!')
      } else {
        // Sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (signInError) {
          setError(signInError.message)
          return
        }

        // Redirect to portal
        router.push('/portal')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="portal-login-page">
      <div className="portal-login-container">
        {/* Header */}
        <div className="portal-login-header">
          <Link href="/" className="portal-login-back">
            ← Back to site
          </Link>
          <h1 className="portal-login-title">The Kinetic Leader Portal</h1>
          <p className="portal-login-subtitle">
            Technical Manual for Social Fluency
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleAuth} className="portal-login-form">
          <div className="portal-login-form-header">
            <h2>{isSignUp ? 'Create Account' : 'Sign In'}</h2>
            <p className="portal-login-form-meta">
              {isSignUp
                ? 'New to the portal? Create an account below.'
                : 'Enter your credentials to access the learning portal.'}
            </p>
          </div>

          {/* Email Field */}
          <fieldset className="portal-login-fieldset">
            <label htmlFor="email" className="portal-login-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="portal-login-input"
              disabled={isLoading}
            />
          </fieldset>

          {/* Password Field */}
          <fieldset className="portal-login-fieldset">
            <label htmlFor="password" className="portal-login-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="portal-login-input"
              disabled={isLoading}
            />
          </fieldset>

          {/* Error Message */}
          {error && <div className="portal-login-error">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="portal-login-submit"
          >
            {isLoading
              ? 'Loading...'
              : isSignUp
                ? 'Create Account'
                : 'Sign In'}
          </button>

          {/* Toggle Sign Up / Sign In */}
          <div className="portal-login-toggle">
            <p className="portal-login-toggle-text">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError(null)
              }}
              disabled={isLoading}
              className="portal-login-toggle-button"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>

        {/* Footer Info */}
        <div className="portal-login-footer">
          <p className="portal-login-footer-text">
            This is a gated learning portal. Access is granted to enrolled
            students only.
          </p>
        </div>
      </div>
    </div>
  )
}
