'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function CheckEmailClient() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email') ?? ''

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const resend = async () => {
    if (!email) {
      setError('Email address missing — return to sign-up to retry.')
      setStatus('error')
      return
    }
    setStatus('sending')
    setError(null)
    const res = await fetch('/api/auth/resend-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      setError(body.error ?? 'Failed to resend.')
      setStatus('error')
      return
    }
    setStatus('sent')
  }

  return (
    <main className="auth-confirm">
      <div className="auth-confirm-card">
        <p className="auth-confirm-eyebrow">One more step</p>
        <h1 className="auth-confirm-title">Check your inbox.</h1>
        <p className="auth-confirm-body">
          We sent a confirmation link to{' '}
          <strong>{email || 'your email address'}</strong>. Click it to activate
          your account, then return here to sign in.
        </p>
        <p className="auth-confirm-meta">
          The link expires in 24 hours. Check your spam folder if you don&rsquo;t
          see it.
        </p>

        <div className="auth-confirm-actions">
          <Button onClick={resend} disabled={status === 'sending' || status === 'sent'}>
            {status === 'sending'
              ? 'Sending…'
              : status === 'sent'
                ? 'Email sent'
                : 'Resend confirmation'}
          </Button>
          <Button as="link" href="/login" variant="secondary">
            Back to sign in
          </Button>
        </div>

        {status === 'sent' && (
          <p className="auth-confirm-success">
            Done. Give it a minute, then check your inbox again.
          </p>
        )}
        {status === 'error' && error && (
          <p className="auth-confirm-error" role="alert">{error}</p>
        )}

        <p className="auth-confirm-help">
          Used the wrong email? <Link href="/login">Sign up again</Link>.
        </p>
      </div>
    </main>
  )
}
