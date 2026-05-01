import type { Metadata } from 'next'
import Link from 'next/link'
import { PageTransition } from '@/components/layout'
import { getPageAudit, getSiteConfig } from '@/lib/sanity'
import type { PageAudit, SiteConfig } from '@/lib/types'
import AuditClient from './AuditClient'

export const metadata: Metadata = {
  title: 'Presence Audit | Jonchalant',
  description: 'A 7-question self-assessment to find out exactly where your presence stands — and what to do about it.',
}

export default async function AuditPage() {
  let pageAudit: PageAudit | null = null
  let siteConfig: SiteConfig | null = null

  try {
    const [audit, config] = await Promise.all([getPageAudit(), getSiteConfig()])
    pageAudit = audit
    siteConfig = config
  } catch {
    // Renders with hardcoded fallbacks below
  }

  const starterGuideSuccess = siteConfig?.successStates?.find((s) => s.key === 'starterGuide')?.message

  return (
    <PageTransition animation="fade">
      <main className="audit-page audit-page--immersive">
        <div className="audit-immersive-shell">
          <AuditClient content={pageAudit} starterGuideSuccess={starterGuideSuccess} />
        </div>

        <Link href="/" className="audit-textmark" aria-label="Back to home">
          Jonchalant
        </Link>
      </main>
    </PageTransition>
  )
}
