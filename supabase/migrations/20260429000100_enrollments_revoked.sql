-- Add soft-revoke columns to enrollments so refunds and disputes
-- can remove user access without losing the audit trail.
--
-- After this migration:
--   * isEnrolled() must filter `revoked_at is null`
--   * Refund/dispute webhook handlers set revoked_at + revoked_reason
--   * Manual re-enrollment can clear these columns

alter table public.enrollments
  add column if not exists revoked_at timestamptz,
  add column if not exists revoked_reason text;

create index if not exists enrollments_active_idx
  on public.enrollments (user_id, course_slug)
  where revoked_at is null;

comment on column public.enrollments.revoked_at is
  'Set when access is revoked (refund, dispute, manual). Null = active enrollment.';

comment on column public.enrollments.revoked_reason is
  'Free-text reason: refund, dispute, admin_manual, etc.';
