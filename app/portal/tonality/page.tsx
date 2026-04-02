import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { isEnrolled } from '@/utils/supabase/enrollments'
import { TonalityClient } from './TonalityClient'

export default async function TonalityPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/portal/tonality')
  }

  const enrolled = await isEnrolled(user.id, 'the-foundation')
  if (!enrolled) {
    redirect('/foundation')
  }

  return <TonalityClient userId={user.id} />
}
