import type { Metadata } from 'next'
import { Suspense } from 'react'
import LoginClient from './LoginClient'

// Login pages must not be indexed — no value for search users
export const metadata: Metadata = {
  title: 'Sign In | Jonchalant Portal',
  description: 'Sign in to access The Foundation learning portal and your enrolled course content.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginClient />
    </Suspense>
  )
}
