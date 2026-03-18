import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { getMovementPlans } from '@/lib/movement-plans'
import { MovementPlanClient } from './MovementPlanClient'

export const metadata = {
  title: 'Movement Plan Generator | The Kinetic Leader Portal',
}

export default async function MovementPlanPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?redirect=/portal/movement-plan')
  }

  const savedPlans = await getMovementPlans(supabase, user.id)

  return <MovementPlanClient userId={user.id} initialPlans={savedPlans} />
}
