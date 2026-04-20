import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
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
  } catch (err) {
    console.error('[stripe-webhook] signature verification failed:', (err as Error).message)
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

    // Send enrollment confirmation email
    const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
    const customerEmail = session.customer_email
    if (resend && customerEmail) {
      const tierLabel = tier === 'with_checkins' ? 'With Weekly Check-ins' : 'Self-Paced'
      try {
        await resend.emails.send({
          from: 'Jonchalant <no-reply@jonchalant.com>',
          to: customerEmail,
          subject: "You're enrolled in The Foundation",
          html: `
            <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; background: #f8f8f5; padding: 40px 32px; border-radius: 8px;">
              <p style="font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: #A47864; margin: 0 0 24px;">The Foundation — Enrollment Confirmed</p>
              <h1 style="font-size: 28px; font-weight: 700; margin: 0 0 16px; line-height: 1.25;">You're in.</h1>
              <p style="font-size: 16px; line-height: 1.7; color: #4a4a4a; margin: 0 0 16px;">
                Your enrollment in <strong>The Foundation (${tierLabel})</strong> is confirmed. Your course access is ready.
              </p>
              <p style="font-size: 16px; line-height: 1.7; color: #4a4a4a; margin: 0 0 32px;">
                Start with Week 1 — Body Audit — and work through one week at a time. The material is sequenced deliberately. Let it land.
              </p>
              <a href="https://jonchalant.com/portal" style="display: inline-block; background: #A47864; color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-size: 15px; font-weight: 600; font-family: sans-serif;">
                Go to your portal →
              </a>
              <hr style="border: none; border-top: 1px solid #e0e0d8; margin: 40px 0 24px;" />
              <p style="font-size: 13px; color: #888; margin: 0; line-height: 1.6;">
                Questions? Reply to this email or reach out at <a href="mailto:contact@jonchalant.com" style="color: #A47864;">contact@jonchalant.com</a>.<br>
                — Jon
              </p>
            </div>
          `,
        })
      } catch (emailErr) {
        console.error('[stripe-webhook] failed to send enrollment email:', emailErr)
      }
    }
  }

  return NextResponse.json({ received: true })
}
