'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

interface EnrollButtonProps {
  tier: 'self_paced' | 'with_checkins'
  label: string
  primary?: boolean
}

export default function EnrollButton({ tier, label, primary = false }: EnrollButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleEnroll() {
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push(`/login?redirect=/foundation`)
      return
    }

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier }),
    })

    if (!res.ok) {
      console.error('[EnrollButton] checkout error:', await res.text())
      setError('Something went wrong. Please try again or contact support.')
      setLoading(false)
      return
    }

    const { url } = await res.json()
    if (url) {
      window.location.href = url
    } else {
      setError('Unable to start checkout. Please try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        variant={primary ? 'primary' : 'secondary'}
        onClick={handleEnroll}
        disabled={loading}
      >
        {loading ? 'Redirecting…' : label}
      </Button>
      {error && <p className="foundation-enroll-error">{error}</p>}
    </>
  )
}
