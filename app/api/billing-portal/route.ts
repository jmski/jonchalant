import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

/**
 * POST /api/billing-portal
 *
 * Creates a Stripe Customer Portal session for the signed-in user. Even
 * though we use one-time payments, the portal gives users invoice/receipt
 * downloads and the ability to update payment methods on file.
 *
 * Returns 404 if the user has never purchased (no stripe_customer_id on
 * their profile).
 */
export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .maybeSingle()

  if (profileError) {
    console.error('[billing-portal] profile fetch failed:', profileError.message)
    return NextResponse.json({ error: 'Failed to load profile' }, { status: 500 })
  }

  if (!profile?.stripe_customer_id) {
    return NextResponse.json(
      { error: 'No billing history found for this account.' },
      { status: 404 },
    )
  }

  const origin =
    req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jonchalant.com'

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${origin}/portal/settings`,
    })
    return NextResponse.json({ url: portalSession.url })
  } catch (err) {
    console.error('[billing-portal] stripe error:', (err as Error).message)
    return NextResponse.json(
      { error: 'Failed to create billing portal session' },
      { status: 500 },
    )
  }
}
