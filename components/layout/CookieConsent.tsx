'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'jc-cookie-consent-v1'

type Choice = 'granted' | 'denied'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function applyConsent(choice: Choice) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', {
    analytics_storage: choice,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

/**
 * Lightweight Consent Mode v2 banner.
 *
 * Defaults to denied (matching the inline script in `app/layout.tsx`). On
 * user choice we persist to localStorage and call `gtag('consent', 'update')`.
 * Returning visitors with a stored choice are not shown the banner again
 * (their stored value is re-applied on mount).
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let stored: Choice | null = null
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw === 'granted' || raw === 'denied') stored = raw
    } catch {
      // localStorage blocked — show banner each visit, don't crash.
    }

    if (stored) {
      applyConsent(stored)
      return
    }
    setVisible(true)
  }, [])

  const choose = (choice: Choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice)
    } catch {
      /* ignore */
    }
    applyConsent(choice)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div role="dialog" aria-label="Cookie preferences" className="cookie-consent">
      <div className="cookie-consent-inner">
        <p className="cookie-consent-text">
          We use a privacy-respecting analytics cookie to understand which pages
          help people most. No ads, no cross-site tracking.{' '}
          <Link href="/privacy" className="cookie-consent-link">
            Privacy policy
          </Link>
          .
        </p>
        <div className="cookie-consent-actions">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="cookie-consent-btn cookie-consent-btn--secondary"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="cookie-consent-btn cookie-consent-btn--primary"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
