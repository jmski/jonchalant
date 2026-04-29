-- Stripe webhook event log for idempotency.
-- Every Stripe webhook event id is recorded here before we act on it.
-- If an event id already exists, the handler returns 200 immediately
-- so Stripe stops retrying without us double-processing.

create table if not exists public.stripe_events (
  id text primary key,                     -- Stripe event.id (evt_...)
  type text not null,                      -- e.g. checkout.session.completed
  payload jsonb not null,                  -- full event for forensics / replay
  processed_at timestamptz not null default now()
);

create index if not exists stripe_events_type_idx
  on public.stripe_events (type);

create index if not exists stripe_events_processed_at_idx
  on public.stripe_events (processed_at desc);

-- Service-role only. No RLS policies for end users.
-- Service-role key bypasses RLS, so enabling RLS with no policies = lockout
-- for everyone except the webhook handler.
alter table public.stripe_events enable row level security;

comment on table public.stripe_events is
  'Idempotency log for Stripe webhooks. Insert event.id before processing; skip if duplicate.';
