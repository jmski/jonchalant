import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import SettingsClient from './SettingsClient'

export const metadata: Metadata = {
  title: 'Account settings',
  robots: { index: false, follow: false },
}

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/portal/settings')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('email, stripe_customer_id, deletion_requested_at, deletion_scheduled_for')
    .eq('id', user.id)
    .maybeSingle()

  return (
    <SettingsClient
      userEmail={user.email ?? ''}
      profile={profile ?? null}
    />
  )
}
