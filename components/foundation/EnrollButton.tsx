'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

interface EnrollButtonProps {
  tier: 'self_paced' | 'with_checkins'
  label: string
  primary?: boolean
}

export default function EnrollButton({ tier, label, primary = false }: EnrollButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleEnroll() {
    setLoading(true)

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
      setLoading(false)
      return
    }

    const { url } = await res.json()
    if (url) {
      window.location.href = url
    } else {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleEnroll}
      disabled={loading}
      className={primary ? 'btn btn-primary' : 'btn btn-secondary'}
    >
      {loading ? 'Redirecting…' : label}
    </button>
  )
}
