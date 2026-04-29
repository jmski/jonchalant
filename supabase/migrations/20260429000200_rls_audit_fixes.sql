-- RLS audit fixes (2026-04-29)
--
-- Fixes two issues found while auditing pg_policies:
--
-- 1. `inquiries` had two over-permissive legacy policies that granted ALL
--    authenticated users read/update access to EVERY row, shadowing the
--    correct `auth_select_inquiries` / `auth_update_inquiries` policies
--    which scope by `created_by = auth.uid()`. Because PERMISSIVE policies
--    OR together, any logged-in user could read every contact-form
--    submission in the database. Drop the broken policies.
--
-- 2. `movement_plans.Users can update own movement plans` had no WITH CHECK
--    clause, so a user could UPDATE their own row and re-assign `user_id`
--    to another account. Replace the policy so WITH CHECK enforces the
--    same scoping as USING.
--
-- Note: All `MFA required (aal2)` policies are correctly RESTRICTIVE — they
-- gate (not bypass) the user-scoped policies. No change needed there.

-- 1. Drop the over-permissive inquiries policies.
drop policy if exists "Enable select for authenticated users only" on public.inquiries;
drop policy if exists "Enable update for authenticated users only" on public.inquiries;

-- 2. Re-create movement_plans UPDATE with WITH CHECK.
drop policy if exists "Users can update own movement plans" on public.movement_plans;

create policy "Users can update own movement plans"
  on public.movement_plans
  for update
  to public
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
