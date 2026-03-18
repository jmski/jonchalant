-- ============================================================
-- Migration: create_movement_plans
-- Created: 2026-03-17
-- ============================================================

create table if not exists movement_plans (
  id           uuid        primary key default gen_random_uuid(),
  user_id      uuid        references auth.users not null,
  title        text        not null,
  goals        text,
  limitations  text,
  plan_data    jsonb       not null,
  created_at   timestamptz default now()
);

-- Enable Row Level Security
alter table movement_plans enable row level security;

-- Policy: users can read their own rows
create policy "Users can read own movement plans"
  on movement_plans
  for select
  using (auth.uid() = user_id);

-- Policy: users can insert their own rows
create policy "Users can insert own movement plans"
  on movement_plans
  for insert
  with check (auth.uid() = user_id);

-- Policy: users can update their own rows
create policy "Users can update own movement plans"
  on movement_plans
  for update
  using (auth.uid() = user_id);

-- Policy: users can delete their own rows
create policy "Users can delete own movement plans"
  on movement_plans
  for delete
  using (auth.uid() = user_id);
