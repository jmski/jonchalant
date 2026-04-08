'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Mode = 'signin' | 'signup' | 'forgot'

/** Only allow relative paths — block protocol-relative and absolute URLs */
function sanitizeRedirect(raw: string | null): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/portal'
  return raw
}

function getContextualCopy(redirectTo: string) {
  if (redirectTo.includes('/foundation')) {
    return {
      intent: 'Create an account to complete your enrollment.',
      defaultMode: 'signup' as Mode,
    }
  }
  if (redirectTo.includes('/portal')) {
    return {
      intent: 'Sign in to access your course.',
      defaultMode: 'signin' as Mode,
    }
  }
  return { intent: null, defaultMode: 'signin' as Mode }
}

export default function LoginClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = sanitizeRedirect(searchParams.get('redirect'))
  const callbackError = searchParams.get('error')

  const { intent, defaultMode } = getContextualCopy(redirectTo)

  const [mode, setMode] = useState<Mode>(defaultMode)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [error, setError] = useState<string | null>(
    callbackError === 'auth_callback_failed'
      ? 'Authentication failed. Please try again.'
      : null
  )
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const supabase = createClient()

  // Already-logged-in guard: bounce to MFA or destination
  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
        if (aal?.currentLevel === 'aal2') {
          router.replace(redirectTo)
        } else {
          router.replace(`/mfa?redirect=${encodeURIComponent(redirectTo)}`)
        }
      } else {
        setIsCheckingSession(false)
      }
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setIsLoading(true)

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
          },
        })
        if (signUpError) { setError(signUpError.message); return }
        setSuccessMessage('Check your email to confirm your account.')
        return
      }

      if (mode === 'forgot') {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?next=/portal`,
        })
        if (resetError) { setError(resetError.message); return }
        setSuccessMessage('Password reset email sent — check your inbox.')
        return
      }

      // Sign in — then route through MFA challenge before reaching destination
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) { setError(signInError.message); return }
      router.push(`/mfa?redirect=${encodeURIComponent(redirectTo)}`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    setIsLoading(true)
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    })
    if (oauthError) {
      setError(oauthError.message)
      setIsLoading(false)
    }
  }

  const switchMode = (next: Mode) => {
    setMode(next)
    setError(null)
    setSuccessMessage(null)
  }

  if (isCheckingSession) return null

  const isForgot = mode === 'forgot'
  const isSignUp = mode === 'signup'

  return (
    <div className="portal-login-page">
      <div className="portal-login-container">
        {/* Header */}
        <div className="portal-login-header">
          <Link href="/" className="portal-login-back">← Back to site</Link>
          <h1 className="portal-login-title">Jonchalant Portal</h1>
          {intent && (
            <p className="portal-login-intent">{intent}</p>
          )}
        </div>

        {/* Form Card */}
        <form onSubmit={handleEmailAuth} className="portal-login-form">
          <div className="portal-login-form-header">
            <h2>
              {isForgot ? 'Reset Password' : isSignUp ? 'Create Account' : 'Sign In'}
            </h2>
            <p className="portal-login-form-meta">
              {isForgot
                ? "Enter your email and we'll send a reset link."
                : isSignUp
                  ? 'Create an account to get started.'
                  : 'Enter your credentials to continue.'}
            </p>
          </div>

          {/* Google OAuth — only shown on sign-in and sign-up */}
          {!isForgot && (
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="portal-login-google"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"/>
                <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58Z"/>
              </svg>
              Continue with Google
            </button>
          )}

          {!isForgot && (
            <div className="portal-login-divider"><span>or</span></div>
          )}

          {/* Email */}
          <fieldset className="portal-login-fieldset">
            <label htmlFor="email" className="portal-login-label">Email</label>
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

          {/* Password */}
          {!isForgot && (
            <fieldset className="portal-login-fieldset">
              <div className="portal-login-label-row">
                <label htmlFor="password" className="portal-login-label">Password</label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="portal-login-forgot"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
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
          )}

          {/* Feedback */}
          {error && <div className="portal-login-error" role="alert">{error}</div>}
          {successMessage && <div className="portal-login-success" role="status">{successMessage}</div>}

          {/* Submit */}
          <button type="submit" disabled={isLoading} className="portal-login-submit">
            {isLoading
              ? (isSignUp ? 'Creating account…' : isForgot ? 'Sending…' : 'Signing in…')
              : isForgot
                ? 'Send Reset Link'
                : isSignUp
                  ? 'Create Account'
                  : 'Sign In'}
          </button>

          {/* Mode toggles */}
          <div className="portal-login-toggle">
            {isForgot ? (
              <>
                <p className="portal-login-toggle-text">Remember your password?</p>
                <button type="button" onClick={() => switchMode('signin')} className="portal-login-toggle-button">
                  Back to Sign In
                </button>
              </>
            ) : (
              <>
                <p className="portal-login-toggle-text">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                </p>
                <button
                  type="button"
                  onClick={() => switchMode(isSignUp ? 'signin' : 'signup')}
                  disabled={isLoading}
                  className="portal-login-toggle-button"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </>
            )}
          </div>
        </form>

        <div className="portal-login-footer">
          <p className="portal-login-footer-text">
            Portal access is granted to enrolled students only.
            Not enrolled? <Link href="/foundation" className="portal-login-footer-link">See The Foundation →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
