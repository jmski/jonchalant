import { Suspense } from 'react'
import type { Metadata } from 'next'
import CheckEmailClient from './CheckEmailClient'

export const metadata: Metadata = {
  title: 'Check your email',
  robots: { index: false, follow: false },
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={null}>
      <CheckEmailClient />
    </Suspense>
  )
}
