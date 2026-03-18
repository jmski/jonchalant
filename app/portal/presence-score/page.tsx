import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { PresenceScoreClient } from './PresenceScoreClient'

export default async function PresenceScorePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/portal/presence-score')
  }

  const fullName = user.user_metadata?.full_name as string | undefined
  const firstName = fullName
    ? fullName.split(' ')[0]
    : (user.email?.split('@')[0] ?? 'there')

  return <PresenceScoreClient userId={user.id} firstName={firstName} />
}
