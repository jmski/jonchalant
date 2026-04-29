import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/utils/supabase/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

const PRICE_IDS: Record<string, string> = {
  self_paced: process.env.STRIPE_PRICE_SELF_PACED!,
  with_checkins: process.env.STRIPE_PRICE_WITH_CHECKINS!,
}

const COURSE_SLUG = 'the-foundation'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { tier } = await req.json() as { tier: string }

  const priceId = PRICE_IDS[tier]
  if (!priceId) {
    return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
  }

  const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jonchalant.com'

  // Reuse existing Stripe customer if we've recorded one for this user. This
  // lets repeat purchasers see all their invoices in the Customer Portal.
  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .maybeSingle()

  const customerFields: Pick<
    Stripe.Checkout.SessionCreateParams,
    'customer' | 'customer_email' | 'customer_creation'
  > = profile?.stripe_customer_id
    ? { customer: profile.stripe_customer_id }
    : { customer_email: user.email, customer_creation: 'always' }

  let session
  try {
    session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      ...customerFields,
      metadata: {
        user_id: user.id,
        course_slug: COURSE_SLUG,
        tier,
      },
      success_url: `${origin}/portal?enrolled=true`,
      cancel_url: `${origin}/foundation?checkout=cancelled`,
    })
  } catch (err: any) {
    console.error('[checkout] stripe error:', err.message)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }

  return NextResponse.json({ url: session.url })
}
