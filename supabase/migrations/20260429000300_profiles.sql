-- Profiles table (2026-04-29)
--
-- Adds a `profiles` row alongside every `auth.users` row. Stores:
--   - stripe_customer_id (so we can open the Stripe Customer Portal for users
--     who have purchased, even though we use one-time payments)
--   - deletion_requested_at + deletion_scheduled_for (soft delete with a
--     30-day grace period before the row is hard-deleted)
--
-- Strategy: we never put PII like Stripe ids in `auth.users.raw_user_meta_data`
-- because that table is owned by gotrue. A dedicated `public.profiles` table
-- is the standard Supabase pattern.
--
-- Auto-create trigger on `auth.users` insert ensures every account has a
-- matching profile row from day one.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  stripe_customer_id text unique,
  deletion_requested_at timestamptz,
  deletion_scheduled_for timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_deletion_scheduled_for_idx
  on public.profiles (deletion_scheduled_for)
  where deletion_scheduled_for is not null;

-- Trigger: bump updated_at on row modification.
create or replace function public.touch_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_profiles_updated_at();

-- Trigger: auto-create profile row whenever a new auth.users row is inserted.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update
    set email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill: create profile rows for any pre-existing users.
insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do nothing;

-- ── Row-level security ──────────────────────────────────────────────────────
alter table public.profiles enable row level security;

-- Users can read their own profile.
create policy "Users can read own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

-- Users can update their own profile (limited columns enforced at API layer).
create policy "Users can update own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- MFA gate (matches the pattern used on other portal tables).
create policy "MFA required (aal2)"
  on public.profiles
  as restrictive
  for all
  to authenticated
  using ((select auth.jwt() ->> 'aal') = 'aal2')
  with check ((select auth.jwt() ->> 'aal') = 'aal2');

-- ── Hard-delete worker function ─────────────────────────────────────────────
-- Designed to be called from a scheduled job (pg_cron, Vercel Cron, or a
-- manual admin script). Deletes auth.users rows whose profile.deletion_scheduled_for
-- has passed; cascade removes the profile row + downstream data via FK.
create or replace function public.purge_scheduled_account_deletions()
returns integer
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  deleted_count integer;
begin
  with doomed as (
    select id from public.profiles
    where deletion_scheduled_for is not null
      and deletion_scheduled_for <= now()
  ),
  removed as (
    delete from auth.users
    where id in (select id from doomed)
    returning id
  )
  select count(*) into deleted_count from removed;

  return deleted_count;
end;
$$;

revoke all on function public.purge_scheduled_account_deletions() from public;
revoke all on function public.purge_scheduled_account_deletions() from authenticated;
revoke all on function public.purge_scheduled_account_deletions() from anon;
-- Service role can execute (used by scheduled job / admin script).
