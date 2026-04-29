import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { Resend } from 'resend'
import { createServiceClient } from '@/utils/supabase/service'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

const ENROLLMENT_EMAIL_FROM = 'Jonchalant <no-reply@jonchalant.com>'
const ADMIN_NOTIFY_TO = process.env.ADMIN_EMAIL ?? 'contact@jonchalant.com'

function getResend() {
  return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
}

/**
 * POST /api/webhooks/stripe
 *
 * Idempotent Stripe webhook handler.
 *
 * Flow:
 *   1. Verify signature.
 *   2. Insert event.id into `stripe_events` — duplicate inserts return 200
 *      so Stripe stops retrying without re-processing.
 *   3. Dispatch on event.type. New event types must be added explicitly;
 *      anything unknown is logged and acknowledged.
 *
 * Handled events:
 *   - checkout.session.completed   → write enrollment + send confirmation email
 *   - charge.refunded              → soft-revoke enrollment + email customer
 *   - charge.dispute.created       → soft-revoke enrollment + notify admin
 */
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

  const supabase = createServiceClient()

  // Idempotency: insert event id; if it already exists, skip processing.
  const { error: insertEventError } = await supabase.from('stripe_events').insert({
    id: event.id,
    type: event.type,
    payload: event as unknown as Record<string, unknown>,
  })

  if (insertEventError) {
    // Postgres unique_violation = duplicate event we've already processed.
    if (insertEventError.code === '23505') {
      console.log(`[stripe-webhook] duplicate event ${event.id} (${event.type}) — skipping`)
      return NextResponse.json({ received: true, duplicate: true })
    }
    console.error('[stripe-webhook] failed to log event:', insertEventError.message)
    // Don't ack — let Stripe retry so we don't drop the event.
    return NextResponse.json({ error: 'Event log write failed' }, { status: 500 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session, supabase)
        break
      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge, supabase)
        break
      case 'charge.dispute.created':
        await handleDisputeCreated(event.data.object as Stripe.Dispute, supabase)
        break
      default:
        console.log(`[stripe-webhook] unhandled event type: ${event.type}`)
    }
  } catch (err) {
    console.error(`[stripe-webhook] handler error for ${event.type}:`, err)
    // Roll back the idempotency record so Stripe retries successfully.
    await supabase.from('stripe_events').delete().eq('id', event.id)
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

type ServiceClient = ReturnType<typeof createServiceClient>

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  supabase: ServiceClient,
) {
  const { user_id, course_slug, tier } = session.metadata ?? {}

  if (!user_id || !course_slug || !tier) {
    console.error('[stripe-webhook] missing metadata on session:', session.id)
    throw new Error('Missing required metadata on checkout session')
  }

  // Persist the Stripe customer id on the user's profile so the Customer
  // Portal can be opened for them later. Best-effort: don't block enrollment
  // if this fails.
  const customerId =
    typeof session.customer === 'string' ? session.customer : session.customer?.id ?? null
  if (customerId) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ stripe_customer_id: customerId })
      .eq('id', user_id)
    if (profileError) {
      console.error(
        '[stripe-webhook] failed to store stripe_customer_id on profile:',
        profileError.message,
      )
    }
  }

  const { error } = await supabase.from('enrollments').insert({
    user_id,
    course_slug,
    stripe_session_id: session.id,
    tier,
    enrolled_at: new Date().toISOString(),
  })

  if (error) {
    // If we already have an enrollment for this session id (e.g. a manual replay),
    // treat that as success — the user is already enrolled.
    if (error.code === '23505') {
      console.log(`[stripe-webhook] enrollment already exists for ${session.id}`)
      return
    }
    throw new Error(`Database write failed: ${error.message}`)
  }

  console.log(`[stripe-webhook] enrolled user ${user_id} in ${course_slug} (${tier})`)

  const customerEmail = session.customer_email
  const resend = getResend()
  if (!resend || !customerEmail) return

  const tierLabel = tier === 'with_checkins' ? 'With Weekly Check-ins' : 'Self-Paced'
  try {
    await resend.emails.send({
      from: ENROLLMENT_EMAIL_FROM,
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
    // Email failure should not block enrollment. Log only.
    console.error('[stripe-webhook] failed to send enrollment email:', emailErr)
  }
}

/**
 * Maps a Stripe charge back to a checkout session so we can find the
 * enrollment row to revoke. Charges don't carry the session id directly,
 * but they reference a payment_intent which we can query.
 */
async function findSessionIdForCharge(charge: Stripe.Charge): Promise<string | null> {
  const paymentIntent =
    typeof charge.payment_intent === 'string' ? charge.payment_intent : charge.payment_intent?.id
  if (!paymentIntent) return null

  const sessions = await stripe.checkout.sessions.list({
    payment_intent: paymentIntent,
    limit: 1,
  })
  return sessions.data[0]?.id ?? null
}

async function revokeEnrollmentBySession(
  supabase: ServiceClient,
  sessionId: string,
  reason: string,
): Promise<{ user_id: string; course_slug: string } | null> {
  const { data, error } = await supabase
    .from('enrollments')
    .update({
      revoked_at: new Date().toISOString(),
      revoked_reason: reason,
    })
    .eq('stripe_session_id', sessionId)
    .is('revoked_at', null)
    .select('user_id, course_slug')
    .maybeSingle()

  if (error) {
    console.error('[stripe-webhook] revoke failed:', error.message)
    throw new Error(`Failed to revoke enrollment: ${error.message}`)
  }

  return data
}

async function handleChargeRefunded(charge: Stripe.Charge, supabase: ServiceClient) {
  const sessionId = await findSessionIdForCharge(charge)
  if (!sessionId) {
    console.warn('[stripe-webhook] refund: no session found for charge', charge.id)
    return
  }

  const revoked = await revokeEnrollmentBySession(supabase, sessionId, 'refund')
  if (!revoked) {
    console.log(`[stripe-webhook] refund: no active enrollment for session ${sessionId}`)
    return
  }

  console.log(
    `[stripe-webhook] refund: revoked enrollment for user ${revoked.user_id} (${revoked.course_slug})`,
  )

  const resend = getResend()
  const customerEmail = charge.billing_details?.email ?? charge.receipt_email
  if (resend && customerEmail) {
    try {
      await resend.emails.send({
        from: ENROLLMENT_EMAIL_FROM,
        to: customerEmail,
        subject: 'Your refund has been processed',
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; background: #f8f8f5; padding: 40px 32px; border-radius: 8px;">
            <h1 style="font-size: 22px; font-weight: 700; margin: 0 0 16px;">Refund processed</h1>
            <p style="font-size: 16px; line-height: 1.7; color: #4a4a4a; margin: 0 0 16px;">
              Your refund has been issued and your course access has been removed. The refund typically takes 5–10 business days to appear on your statement.
            </p>
            <p style="font-size: 16px; line-height: 1.7; color: #4a4a4a; margin: 0 0 16px;">
              If you have questions or this was issued in error, reply to this email.
            </p>
            <p style="font-size: 14px; color: #888; margin: 24px 0 0;">— Jon</p>
          </div>
        `,
      })
    } catch (emailErr) {
      console.error('[stripe-webhook] failed to send refund email:', emailErr)
    }
  }
}

async function handleDisputeCreated(dispute: Stripe.Dispute, supabase: ServiceClient) {
  const chargeId = typeof dispute.charge === 'string' ? dispute.charge : dispute.charge.id
  const charge = await stripe.charges.retrieve(chargeId)
  const sessionId = await findSessionIdForCharge(charge)
  if (!sessionId) {
    console.warn('[stripe-webhook] dispute: no session found for charge', chargeId)
    return
  }

  const revoked = await revokeEnrollmentBySession(supabase, sessionId, `dispute:${dispute.reason}`)

  console.log(
    `[stripe-webhook] dispute opened (${dispute.reason}) — session ${sessionId}, revoked: ${revoked !== null}`,
  )

  const resend = getResend()
  if (resend) {
    try {
      await resend.emails.send({
        from: ENROLLMENT_EMAIL_FROM,
        to: ADMIN_NOTIFY_TO,
        subject: `[Jonchalant] Stripe dispute opened — ${dispute.reason}`,
        html: `
          <div style="font-family: monospace; max-width: 640px; margin: 0 auto; color: #1a1a1a;">
            <h2>Stripe dispute opened</h2>
            <p><strong>Dispute id:</strong> ${dispute.id}</p>
            <p><strong>Reason:</strong> ${dispute.reason}</p>
            <p><strong>Status:</strong> ${dispute.status}</p>
            <p><strong>Amount:</strong> ${(dispute.amount / 100).toFixed(2)} ${dispute.currency.toUpperCase()}</p>
            <p><strong>Charge:</strong> ${chargeId}</p>
            <p><strong>Session:</strong> ${sessionId}</p>
            <p><strong>Customer email:</strong> ${charge.billing_details?.email ?? charge.receipt_email ?? 'unknown'}</p>
            <p><strong>Enrollment revoked:</strong> ${revoked ? 'yes' : 'no (none active)'}</p>
            <p>Respond in the Stripe dashboard before the evidence deadline.</p>
          </div>
        `,
      })
    } catch (emailErr) {
      console.error('[stripe-webhook] failed to send dispute email:', emailErr)
    }
  }
}
