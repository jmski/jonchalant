import type { Metadata } from 'next'
import Link from 'next/link'
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
      <main className="audit-page audit-page--immersive">
        <div className="audit-immersive-shell">
          <AuditClient content={auditContent} />
        </div>

        <Link href="/" className="audit-textmark" aria-label="Back to home">
          Jonchalant
        </Link>
      </main>
    </PageTransition>
  )
}
