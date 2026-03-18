import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { TonalityClient } from './TonalityClient'

export default async function TonalityPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/portal/tonality')
  }

  return <TonalityClient userId={user.id} />
}
