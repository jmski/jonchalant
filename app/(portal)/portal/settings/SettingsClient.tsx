'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/utils/supabase/client'

interface Profile {
  email: string | null
  stripe_customer_id: string | null
  deletion_requested_at: string | null
  deletion_scheduled_for: string | null
}

interface SettingsClientProps {
  userEmail: string
  profile: Profile | null
}

interface MfaFactor {
  id: string
  factor_type: 'totp' | 'phone'
  status: 'verified' | 'unverified'
  friendly_name?: string
}

type Status =
  | { kind: 'idle' }
  | { kind: 'success'; message: string }
  | { kind: 'error'; message: string }

function formatDate(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function SettingsClient({ userEmail, profile }: SettingsClientProps) {
  const router = useRouter()
  const supabase = createClient()

  return (
    <div className="portal-settings">
      <header className="portal-settings-header">
        <p className="portal-settings-eyebrow">Account</p>
        <h1 className="portal-settings-title">Settings</h1>
      </header>

      {profile?.deletion_scheduled_for && (
        <DeletionPendingBanner
          scheduledFor={profile.deletion_scheduled_for}
          onCancelled={() => router.refresh()}
        />
      )}

      <AccountSection currentEmail={userEmail} supabase={supabase} />
      <SecuritySection supabase={supabase} />
      <BillingSection hasBilling={Boolean(profile?.stripe_customer_id)} />
      <PrivacySection />
      <DangerZoneSection
        hasPendingDeletion={Boolean(profile?.deletion_scheduled_for)}
        onDeleted={() => {
          // Server signed us out — bounce to login.
          window.location.href = '/login?account=deleted'
        }}
      />
    </div>
  )
}

// ── Deletion pending banner ─────────────────────────────────────────────────

function DeletionPendingBanner({
  scheduledFor,
  onCancelled,
}: {
  scheduledFor: string
  onCancelled: () => void
}) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cancel = async () => {
    setBusy(true)
    setError(null)
    const res = await fetch('/api/account/delete', { method: 'DELETE' })
    setBusy(false)
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      setError(body.error ?? 'Failed to cancel deletion.')
      return
    }
    onCancelled()
  }

  return (
    <div className="portal-settings-banner portal-settings-banner--warning" role="alert">
      <div>
        <strong>Account deletion scheduled.</strong> Your account will be permanently
        removed on <strong>{formatDate(scheduledFor)}</strong>. Sign in any time
        before that date to cancel.
      </div>
      <Button onClick={cancel} disabled={busy} variant="secondary" size="sm">
        {busy ? 'Cancelling…' : 'Cancel deletion'}
      </Button>
      {error && <p className="portal-settings-error">{error}</p>}
    </div>
  )
}

// ── Account section: email + password ───────────────────────────────────────

function AccountSection({
  currentEmail,
  supabase,
}: {
  currentEmail: string
  supabase: ReturnType<typeof createClient>
}) {
  const [email, setEmail] = useState(currentEmail)
  const [emailStatus, setEmailStatus] = useState<Status>({ kind: 'idle' })
  const [emailBusy, setEmailBusy] = useState(false)

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [pwStatus, setPwStatus] = useState<Status>({ kind: 'idle' })
  const [pwBusy, setPwBusy] = useState(false)

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setEmailStatus({ kind: 'idle' })
    if (email.trim() === currentEmail) {
      setEmailStatus({ kind: 'error', message: 'Enter a new email address.' })
      return
    }
    setEmailBusy(true)
    const { error } = await supabase.auth.updateUser({ email: email.trim() })
    setEmailBusy(false)
    if (error) {
      setEmailStatus({ kind: 'error', message: error.message })
      return
    }
    setEmailStatus({
      kind: 'success',
      message: `Confirmation email sent to ${email.trim()}. Click the link in that email to finish the change.`,
    })
  }

  const submitPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setPwStatus({ kind: 'idle' })
    if (password.length < 8) {
      setPwStatus({ kind: 'error', message: 'Password must be at least 8 characters.' })
      return
    }
    if (password !== confirm) {
      setPwStatus({ kind: 'error', message: "Passwords don't match." })
      return
    }
    setPwBusy(true)
    const { error } = await supabase.auth.updateUser({ password })
    setPwBusy(false)
    if (error) {
      setPwStatus({ kind: 'error', message: error.message })
      return
    }
    setPassword('')
    setConfirm('')
    setPwStatus({ kind: 'success', message: 'Password updated.' })
  }

  return (
    <section className="portal-settings-section" aria-labelledby="account-heading">
      <h2 id="account-heading" className="portal-settings-section-title">Account</h2>

      <form className="portal-settings-form" onSubmit={submitEmail}>
        <div className="portal-settings-field">
          <label htmlFor="settings-email" className="portal-settings-label">Email</label>
          <input
            id="settings-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="portal-settings-input"
            disabled={emailBusy}
            required
          />
          <p className="portal-settings-hint">
            Changing your email sends a confirmation to the new address.
          </p>
        </div>
        <div className="portal-settings-form-actions">
          <Button type="submit" disabled={emailBusy}>
            {emailBusy ? 'Saving…' : 'Update email'}
          </Button>
        </div>
        <StatusMessage status={emailStatus} />
      </form>

      <form className="portal-settings-form" onSubmit={submitPassword}>
        <div className="portal-settings-field">
          <label htmlFor="settings-password" className="portal-settings-label">New password</label>
          <input
            id="settings-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="portal-settings-input"
            autoComplete="new-password"
            disabled={pwBusy}
            minLength={8}
          />
        </div>
        <div className="portal-settings-field">
          <label htmlFor="settings-password-confirm" className="portal-settings-label">
            Confirm new password
          </label>
          <input
            id="settings-password-confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="portal-settings-input"
            autoComplete="new-password"
            disabled={pwBusy}
            minLength={8}
          />
        </div>
        <div className="portal-settings-form-actions">
          <Button type="submit" disabled={pwBusy || !password}>
            {pwBusy ? 'Saving…' : 'Update password'}
          </Button>
        </div>
        <StatusMessage status={pwStatus} />
      </form>
    </section>
  )
}

// ── Security section: MFA enroll/disable ────────────────────────────────────

function SecuritySection({ supabase }: { supabase: ReturnType<typeof createClient> }) {
  const [factors, setFactors] = useState<MfaFactor[] | null>(null)
  const [aal, setAal] = useState<'aal1' | 'aal2' | null>(null)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  // Enrollment state
  const [enrolling, setEnrolling] = useState(false)
  const [pendingFactorId, setPendingFactorId] = useState<string | null>(null)
  const [qr, setQr] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const [verifying, setVerifying] = useState(false)

  const refresh = async () => {
    const [factorsRes, aalRes] = await Promise.all([
      supabase.auth.mfa.listFactors(),
      supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
    ])
    const totp = factorsRes.data?.totp ?? []
    setFactors(totp as MfaFactor[])
    setAal((aalRes.data?.currentLevel as 'aal1' | 'aal2' | null) ?? null)
  }

  useEffect(() => {
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const verifiedFactor = factors?.find((f) => f.status === 'verified')

  const startEnroll = async () => {
    setStatus({ kind: 'idle' })
    setEnrolling(true)
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: 'Jonchalant Portal',
    })
    if (error || !data) {
      setEnrolling(false)
      setStatus({ kind: 'error', message: error?.message ?? 'Failed to start enrollment.' })
      return
    }
    setPendingFactorId(data.id)
    setQr(data.totp.qr_code)
    setSecret(data.totp.secret)
  }

  const cancelEnroll = async () => {
    if (pendingFactorId) {
      // Best-effort cleanup of the unverified factor.
      await supabase.auth.mfa.unenroll({ factorId: pendingFactorId })
    }
    setEnrolling(false)
    setPendingFactorId(null)
    setQr(null)
    setSecret(null)
    setCode('')
  }

  const verifyEnroll = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pendingFactorId || code.length !== 6) return
    setVerifying(true)
    setStatus({ kind: 'idle' })
    const { data: challenge, error: challengeErr } = await supabase.auth.mfa.challenge({
      factorId: pendingFactorId,
    })
    if (challengeErr || !challenge) {
      setVerifying(false)
      setStatus({ kind: 'error', message: challengeErr?.message ?? 'Challenge failed.' })
      return
    }
    const { error: verifyErr } = await supabase.auth.mfa.verify({
      factorId: pendingFactorId,
      challengeId: challenge.id,
      code,
    })
    setVerifying(false)
    if (verifyErr) {
      setStatus({ kind: 'error', message: verifyErr.message })
      setCode('')
      return
    }
    setEnrolling(false)
    setPendingFactorId(null)
    setQr(null)
    setSecret(null)
    setCode('')
    setStatus({ kind: 'success', message: 'Two-factor authentication is now active.' })
    await refresh()
  }

  const disableFactor = async (factorId: string) => {
    if (!confirm('Disable two-factor authentication? You can re-enable it any time.')) return
    setStatus({ kind: 'idle' })
    const { error } = await supabase.auth.mfa.unenroll({ factorId })
    if (error) {
      setStatus({ kind: 'error', message: error.message })
      return
    }
    setStatus({ kind: 'success', message: 'Two-factor authentication disabled.' })
    await refresh()
  }

  return (
    <section className="portal-settings-section" aria-labelledby="security-heading">
      <h2 id="security-heading" className="portal-settings-section-title">Security</h2>

      <div className="portal-settings-row">
        <div>
          <p className="portal-settings-row-label">Two-factor authentication</p>
          <p className="portal-settings-row-meta">
            {factors === null
              ? 'Loading…'
              : verifiedFactor
                ? `Active${aal === 'aal2' ? '' : ' — verified at next sign-in'}`
                : 'Not enabled'}
          </p>
        </div>
        <div className="portal-settings-row-actions">
          {verifiedFactor ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => disableFactor(verifiedFactor.id)}
            >
              Disable
            </Button>
          ) : enrolling ? (
            <Button variant="secondary" size="sm" onClick={cancelEnroll}>
              Cancel
            </Button>
          ) : (
            <Button size="sm" onClick={startEnroll}>
              Enable
            </Button>
          )}
        </div>
      </div>

      {enrolling && qr && (
        <form className="portal-settings-mfa" onSubmit={verifyEnroll}>
          <p className="portal-settings-hint">
            Scan this QR code with an authenticator app (1Password, Authy, Google
            Authenticator), then enter the 6-digit code to confirm.
          </p>
          <div className="portal-settings-mfa-qr">
            <Image
              src={qr}
              alt="MFA QR code"
              width={180}
              height={180}
              unoptimized
            />
          </div>
          {secret && (
            <p className="portal-settings-mfa-secret">
              Or enter manually: <code>{secret}</code>
            </p>
          )}
          <div className="portal-settings-field">
            <label htmlFor="mfa-code" className="portal-settings-label">6-digit code</label>
            <input
              id="mfa-code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              className="portal-settings-input portal-settings-input--otp"
              autoComplete="one-time-code"
              required
            />
          </div>
          <div className="portal-settings-form-actions">
            <Button type="submit" disabled={verifying || code.length !== 6}>
              {verifying ? 'Verifying…' : 'Confirm'}
            </Button>
          </div>
        </form>
      )}

      <StatusMessage status={status} />
    </section>
  )
}

// ── Billing section ─────────────────────────────────────────────────────────

function BillingSection({ hasBilling }: { hasBilling: boolean }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const open = async () => {
    setBusy(true)
    setError(null)
    const res = await fetch('/api/billing-portal', { method: 'POST' })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      setBusy(false)
      setError(body.error ?? 'Failed to open billing portal.')
      return
    }
    const { url } = await res.json()
    window.location.href = url
  }

  return (
    <section className="portal-settings-section" aria-labelledby="billing-heading">
      <h2 id="billing-heading" className="portal-settings-section-title">Billing</h2>
      <div className="portal-settings-row">
        <div>
          <p className="portal-settings-row-label">Invoices &amp; payment methods</p>
          <p className="portal-settings-row-meta">
            {hasBilling
              ? 'Manage receipts and saved payment methods through Stripe.'
              : 'No purchases on file yet.'}
          </p>
        </div>
        <div className="portal-settings-row-actions">
          <Button
            size="sm"
            variant="secondary"
            onClick={open}
            disabled={!hasBilling || busy}
          >
            {busy ? 'Opening…' : 'Open billing portal'}
          </Button>
        </div>
      </div>
      {error && <p className="portal-settings-error">{error}</p>}
    </section>
  )
}

// ── Privacy section: data export ────────────────────────────────────────────

function PrivacySection() {
  return (
    <section className="portal-settings-section" aria-labelledby="privacy-heading">
      <h2 id="privacy-heading" className="portal-settings-section-title">Privacy</h2>
      <div className="portal-settings-row">
        <div>
          <p className="portal-settings-row-label">Download your data</p>
          <p className="portal-settings-row-meta">
            Export everything we store about you as a JSON file: profile, enrollments,
            lesson progress, and any forms you submitted.
          </p>
        </div>
        <div className="portal-settings-row-actions">
          <Button as="a" href="/api/account/data-export" size="sm" variant="secondary">
            Download export
          </Button>
        </div>
      </div>
    </section>
  )
}

// ── Danger zone: delete account ─────────────────────────────────────────────

function DangerZoneSection({
  hasPendingDeletion,
  onDeleted,
}: {
  hasPendingDeletion: boolean
  onDeleted: () => void
}) {
  const [confirmText, setConfirmText] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (confirmText !== 'DELETE') {
      setError("Type DELETE in the box to confirm.")
      return
    }
    setBusy(true)
    setError(null)
    const res = await fetch('/api/account/delete', { method: 'POST' })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      setBusy(false)
      setError(body.error ?? 'Failed to schedule deletion.')
      return
    }
    onDeleted()
  }

  return (
    <section
      className="portal-settings-section portal-settings-section--danger"
      aria-labelledby="danger-heading"
    >
      <h2 id="danger-heading" className="portal-settings-section-title">Delete account</h2>
      <p className="portal-settings-row-meta">
        Schedules a permanent deletion 30 days from now. Sign in any time before
        that date to cancel. After deletion, your enrollments, lesson progress,
        and profile data will be removed permanently.
      </p>

      {hasPendingDeletion ? (
        <p className="portal-settings-row-meta">
          A deletion is already scheduled. Use the banner above to cancel it.
        </p>
      ) : (
        <form className="portal-settings-form" onSubmit={submit}>
          <div className="portal-settings-field">
            <label htmlFor="delete-confirm" className="portal-settings-label">
              Type <code>DELETE</code> to confirm
            </label>
            <input
              id="delete-confirm"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="portal-settings-input"
              autoComplete="off"
              disabled={busy}
            />
          </div>
          <div className="portal-settings-form-actions">
            <Button
              type="submit"
              variant="secondary"
              disabled={busy || confirmText !== 'DELETE'}
            >
              {busy ? 'Scheduling…' : 'Schedule deletion'}
            </Button>
          </div>
          {error && <p className="portal-settings-error">{error}</p>}
        </form>
      )}
    </section>
  )
}

// ── Shared message component ────────────────────────────────────────────────

function StatusMessage({ status }: { status: Status }) {
  if (status.kind === 'idle') return null
  return (
    <p
      className={
        status.kind === 'success'
          ? 'portal-settings-success'
          : 'portal-settings-error'
      }
      role={status.kind === 'error' ? 'alert' : 'status'}
    >
      {status.message}
    </p>
  )
}
