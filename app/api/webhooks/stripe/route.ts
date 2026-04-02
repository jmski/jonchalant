import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServiceClient } from '@/utils/supabase/service'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('[stripe-webhook] signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const { user_id, course_slug, tier } = session.metadata ?? {}

    if (!user_id || !course_slug || !tier) {
      console.error('[stripe-webhook] missing metadata on session:', session.id)
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    const supabase = createServiceClient()
    const { error } = await supabase.from('enrollments').insert({
      user_id,
      course_slug,
      stripe_session_id: session.id,
      tier,
      enrolled_at: new Date().toISOString(),
    })

    if (error) {
      console.error('[stripe-webhook] failed to write enrollment:', error.message)
      return NextResponse.json({ error: 'Database write failed' }, { status: 500 })
    }

    console.log(`[stripe-webhook] enrolled user ${user_id} in ${course_slug} (${tier})`)
  }

  return NextResponse.json({ received: true })
}
