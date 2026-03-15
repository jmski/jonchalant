-- ============================================================================
-- Migration: create lesson_progress table
-- Path: supabase/migrations/20260314000000_create_lesson_progress.sql
-- ============================================================================

-- Drop any incomplete previous run so the full column list is always applied.
-- WARNING: this discards existing rows — only acceptable during initial setup.
drop table if exists public.lesson_progress cascade;

create table public.lesson_progress (
  id            uuid        primary key default gen_random_uuid(),
  user_id       uuid        not null references auth.users(id) on delete cascade,
  lesson_slug   text        not null,
  course_slug   text        not null,
  completed     boolean     not null default false,
  completed_at  timestamptz,
  created_at    timestamptz not null default now(),

  constraint lesson_progress_user_lesson_unique unique (user_id, lesson_slug)
);

-- ── Indexes ──────────────────────────────────────────────────────────────────

-- Fast lookup: all lessons for a user in a course
create index if not exists lesson_progress_user_course_idx
  on public.lesson_progress (user_id, course_slug);

-- ── Row Level Security ────────────────────────────────────────────────────────

alter table public.lesson_progress enable row level security;

-- Users can only read their own progress rows
create policy "Users can view own progress"
  on public.lesson_progress
  for select
  using (auth.uid() = user_id);

-- Users can only insert their own progress rows
create policy "Users can insert own progress"
  on public.lesson_progress
  for insert
  with check (auth.uid() = user_id);

-- Users can only update their own progress rows
create policy "Users can update own progress"
  on public.lesson_progress
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Users can only delete their own progress rows
create policy "Users can delete own progress"
  on public.lesson_progress
  for delete
  using (auth.uid() = user_id);
