'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

interface SignOutButtonProps {
  className?: string
}

export default function SignOutButton({
  className = 'portal-topbar-signout',
}: SignOutButtonProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <button onClick={handleSignOut} className={className}>
      Sign out
    </button>
  )
}
