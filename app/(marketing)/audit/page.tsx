import type { Metadata } from 'next'
import { PageTransition } from '@/components/layout'
import { getAuditPageContent } from '@/lib/sanity'
import type { AuditPageContent } from '@/lib/types'
import AuditClient from './AuditClient'

export const metadata: Metadata = {
  title: 'Presence Audit | Jonchalant',
  description: 'A 7-question self-assessment to find out exactly where your executive presence stands — and what to do about it.',
}

export default async function AuditPage() {
  let auditContent: AuditPageContent | null = null

  try {
    auditContent = await getAuditPageContent()
  } catch {
    // Renders with hardcoded fallbacks below
  }

  return (
    <PageTransition animation="fade">
      <main className="audit-page">
        {/* Header */}
        <div className="audit-header">
          <div className="audit-header-inner">
            <span className="audit-header-badge">
              {auditContent?.pageHeaderBadge ?? '3 minutes'}
            </span>
            <h1 className="audit-header-title">
              {auditContent?.pageHeaderHeadline ?? 'Find out where your presence actually stands.'}
            </h1>
            <p className="audit-header-body">
              {auditContent?.pageHeaderBody ?? "Seven honest questions. No account needed. I'll review your answers and follow up personally — not with an automated email, with an actual response."}
            </p>
          </div>
        </div>

        {/* Quiz container */}
        <div className="audit-container">
          <AuditClient content={auditContent} />
        </div>

        {/* Footer note */}
        <div className="audit-footer-note">
          <p>
            {auditContent?.pageFooterNote ?? 'Already know what you need?'}{' '}
            <a href="/contact" className="audit-footer-link">
              Skip this and book a call directly.
            </a>
          </p>
        </div>
      </main>
    </PageTransition>
  )
}
