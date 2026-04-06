import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { isEnrolled } from '@/utils/supabase/enrollments'
import { getMovementPlans } from '@/lib/movement-plans'
import { MovementPlanClient } from './MovementPlanClient'

export const metadata = {
  title: 'Movement Plan Generator | Jonchalant Portal',
}

export default async function MovementPlanPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/portal/movement-plan')
  }

  const enrolled = await isEnrolled(user.id, 'the-foundation')
  if (!enrolled) {
    redirect('/foundation')
  }

  const savedPlans = await getMovementPlans(supabase, user.id)

  return <MovementPlanClient userId={user.id} initialPlans={savedPlans} />
}
