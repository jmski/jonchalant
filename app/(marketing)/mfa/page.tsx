import type { Metadata } from 'next'
import { Suspense } from 'react'
import MfaClient from './MfaClient'

export const metadata: Metadata = {
  title: 'Verify Identity | Jonchalant Portal',
  description: 'Complete two-factor authentication to access your portal.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function MfaPage() {
  return (
    <Suspense>
      <MfaClient />
    </Suspense>
  )
}
