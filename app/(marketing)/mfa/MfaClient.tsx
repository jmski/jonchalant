'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type MfaStep = 'loading' | 'enroll' | 'verify' | 'error'

/** Only allow relative paths — block protocol-relative and absolute URLs */
function sanitizeRedirect(raw: string | null): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/portal'
  return raw
}

export default function MfaClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = sanitizeRedirect(searchParams.get('redirect'))

  const [step, setStep] = useState<MfaStep>('loading')
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [factorId, setFactorId] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  const supabase = createClient()

  // Determine MFA state on mount
  const checkMfaStatus = useCallback(async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) {
        router.replace('/login')
        return
      }

      // Check current AAL — if already aal2, skip straight to destination
      const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
      if (aalData?.currentLevel === 'aal2') {
        window.location.href = redirectTo
        return
      }

      // Check if user has an enrolled TOTP factor
      const { data: factorsData } = await supabase.auth.mfa.listFactors()
      const totpFactor = factorsData?.totp?.find(f => f.status === 'verified')

      if (totpFactor) {
        // Factor exists — go straight to verify
        setFactorId(totpFactor.id)
        setStep('verify')
      } else {
        // No factor — need to enroll
        await startEnrollment()
      }
    } catch (err) {
      console.error('MFA status check failed:', err)
      setError('Authentication error. Please sign in again.')
      setStep('error')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const startEnrollment = async () => {
    setError(null)
    const { data, error: enrollError } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: 'Jonchalant Portal',
    })

    if (enrollError || !data) {
      setError(enrollError?.message || 'Failed to start MFA enrollment.')
      setStep('error')
      return
    }

    setFactorId(data.id)
    setQrCode(data.totp.qr_code)
    setSecret(data.totp.secret)
    setStep('enroll')
  }

  // Verify the TOTP code (works for both enroll and subsequent logins)
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!factorId || code.length !== 6) return

    setError(null)
    setIsVerifying(true)

    try {
      const { data: challengeData, error: challengeError } =
        await supabase.auth.mfa.challenge({ factorId })

      if (challengeError || !challengeData) {
        setError(challengeError?.message || 'Failed to create MFA challenge.')
        return
      }

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challengeData.id,
        code,
      })

      if (verifyError) {
        setError(verifyError.message)
        setCode('')
        return
      }

      // Success — session is now aal2.
      // Use hard navigation so middleware sees the fresh aal2 cookie
      // (router.replace can race ahead of cookie writes).
      window.location.href = redirectTo
    } catch (err) {
      console.error('MFA verification failed:', err)
      setError('Verification failed. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  useEffect(() => {
    checkMfaStatus()
  }, [checkMfaStatus])

  if (step === 'loading') {
    return (
      <div className="portal-login-page">
        <div className="portal-login-container">
          <div className="portal-login-header">
            <h1 className="portal-login-title">Checking authentication…</h1>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'error') {
    return (
      <div className="portal-login-page">
        <div className="portal-login-container">
          <div className="portal-login-header">
            <Link href="/" className="portal-login-back">&larr; Back to site</Link>
            <h1 className="portal-login-title">Two-Factor Authentication</h1>
          </div>
          <div className="portal-login-form">
            <div className="portal-login-error" role="alert">
              {error || 'MFA setup failed. Make sure TOTP is enabled in your Supabase project.'}
            </div>
            <button onClick={() => startEnrollment()} className="portal-login-submit">
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="portal-login-page">
      <div className="portal-login-container">
        <div className="portal-login-header">
          <Link href="/" className="portal-login-back">&larr; Back to site</Link>
          <h1 className="portal-login-title">Two-Factor Authentication</h1>
        </div>

        <form onSubmit={handleVerify} className="portal-login-form">
          {step === 'enroll' && (
            <>
              <div className="portal-login-form-header">
                <h2>Set Up Authenticator</h2>
                <p className="portal-login-form-meta">
                  Scan this QR code with your authenticator app (Google Authenticator, Authy, 1Password, etc.), then enter the 6-digit code below.
                </p>
              </div>

              {qrCode && (
                <div className="mfa-qr-container">
                  <Image
                    src={qrCode}
                    alt="Scan this QR code with your authenticator app"
                    width={200}
                    height={200}
                    unoptimized
                  />
                </div>
              )}

              {secret && (
                <p className="portal-login-form-meta mfa-manual-key">
                  Manual key: {secret}
                </p>
              )}
            </>
          )}

          {step === 'verify' && (
            <div className="portal-login-form-header">
              <h2>Enter Verification Code</h2>
              <p className="portal-login-form-meta">
                Open your authenticator app and enter the 6-digit code.
              </p>
            </div>
          )}

          <fieldset className="portal-login-fieldset">
            <label htmlFor="totp-code" className="portal-login-label">Verification Code</label>
            <input
              id="totp-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              required
              className="portal-login-input"
              disabled={isVerifying}
              autoFocus
            />
          </fieldset>

          {error && <div className="portal-login-error" role="alert">{error}</div>}

          <button type="submit" disabled={isVerifying || code.length !== 6} className="portal-login-submit">
            {isVerifying ? 'Verifying…' : 'Verify'}
          </button>
        </form>
      </div>
    </div>
  )
}
