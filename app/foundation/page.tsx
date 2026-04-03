import Link from 'next/link'
import type { Metadata } from 'next'
import { PageTransition, SectionWrapper, SectionContent } from '@/components/layout'
import EnrollButton from '@/components/foundation/EnrollButton'
import { getFoundationPageContent } from '@/lib/sanity'

export const metadata: Metadata = {
  title: 'The Foundation | Jonchalant',
  description: 'An 8-week course that teaches introverts and quiet professionals to command a room without changing who they are. Body-aware leadership built on movement principles.',
  openGraph: {
    title: 'The Foundation | Jonchalant',
    description: 'An 8-week course that teaches introverts and quiet professionals to command a room without changing who they are.',
    type: 'website',
    url: 'https://jonchalant.com/foundation',
    siteName: 'Jonchalant',
  },
}

const FALLBACK_MODULES = [
  { week: 1, title: 'Body Audit', description: 'Understand what you\'re already communicating without knowing it.' },
  { week: 2, title: 'Posture & Grounding', description: 'Learn how you take up space — and why it changes how others read you.' },
  { week: 3, title: 'Movement Fundamentals', description: 'Isolation, weight, and rhythm as tools for deliberate physical expression.' },
  { week: 4, title: 'Stillness & Timing', description: 'The power of not moving. Mastering silence and the pause.' },
  { week: 5, title: 'Eye Contact, Breath & Voice', description: 'Your physical instruments — used as leadership tools, not performance.' },
  { week: 6, title: 'High-Stakes Situations', description: 'Presentations, interviews, difficult conversations. Practise under pressure.' },
  { week: 7, title: 'Building Your Style', description: 'Freestyle principles. Presence that is distinctly yours, not borrowed.' },
  { week: 8, title: 'Integration', description: 'Putting it all together — and mapping what comes next for you.' },
]

const FALLBACK_WHO_FOR = [
  'You know your material but lose it when the room is watching.',
  'You\'re seen as "quiet" or "reserved" — not leadership material.',
  'You speak clearly in 1:1s but freeze in groups or big meetings.',
  'You overprepare and still feel shaky when it counts.',
  'You want to project confidence without becoming someone else.',
]

const FALLBACK_HOW_IT_WORKS = [
  { label: 'Self-paced video lessons', body: 'Watch at your own pace. Every lesson is a direct concept — no fluff, no filler.' },
  { label: 'Movement-grounded principles', body: 'Each week draws from professional dance training and translates it into leadership behaviour you can practise immediately.' },
  { label: 'Personal follow-up from Jon', body: 'This isn\'t automated. Jon reads your notes and responds personally — not with a drip sequence.' },
]

const FALLBACK_PRICING = [
  {
    tier: 'Self-Paced',
    tierKey: 'self_paced' as const,
    price: '$197',
    description: 'Full course access. All 8 weeks, all lessons, at your own pace.',
    features: [
      '8 weeks of video lessons',
      'Movement-to-leadership frameworks',
      'Lifetime access',
      'Personal follow-up from Jon',
    ],
    cta: 'Enroll — $197',
    primary: false,
  },
  {
    tier: 'With Weekly Check-ins',
    tierKey: 'with_checkins' as const,
    price: '$497',
    description: 'Everything in self-paced, plus a weekly 1:1 call with Jon to work through what\'s coming up for you.',
    features: [
      'Everything in Self-Paced',
      '8 weekly 1:1 calls with Jon',
      'Real-time feedback on your specific situations',
      'Prioritised scheduling',
    ],
    cta: 'Enroll — $497',
    primary: true,
  },
]

export default async function FoundationPage() {
  let content: Awaited<ReturnType<typeof getFoundationPageContent>> = null
  try {
    content = await getFoundationPageContent()
  } catch {
    // fall through to fallbacks
  }

  const modules = content?.modules?.length ? content.modules : FALLBACK_MODULES
  const whoItems = content?.whoItems?.length ? content.whoItems : FALLBACK_WHO_FOR
  const howCards = content?.howCards?.length ? content.howCards : FALLBACK_HOW_IT_WORKS
  const pricingTiers = content?.pricingTiers?.length
    ? content.pricingTiers.map((t: { tier: string; tierKey: string; price: string; description: string; features: string[]; cta: string; primary: boolean }) => ({
        ...t,
        tierKey: t.tierKey as 'self_paced' | 'with_checkins',
      }))
    : FALLBACK_PRICING

  return (
    <PageTransition animation="fade">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <SectionWrapper variant="primary">
        <SectionContent>
          <section className="foundation-hero">
            <p className="foundation-hero-eyebrow">{content?.heroEyebrow ?? '8-Week Course'}</p>
            <h1 className="foundation-hero-headline">{content?.heroHeadline ?? 'The Foundation'}</h1>
            <p className="foundation-hero-subheadline">
              {content?.heroSubheadline ?? 'Executive presence for people who think before they speak.'}
            </p>
            <p className="foundation-hero-body">
              {content?.heroBody ?? 'A decade of professional choreography taught me that presence isn\'t about being loud. It\'s about being intentional. The Foundation is where that insight becomes a skill.'}
            </p>
            <div className="foundation-hero-actions">
              <Link href="#pricing" className="btn btn-primary">
                {content?.heroPrimaryCtaLabel ?? 'Enroll — starting at $197'}
              </Link>
              <Link href="#inside" className="btn btn-secondary">
                {content?.heroSecondaryCtaLabel ?? 'See what\'s inside'}
              </Link>
            </div>
            <p className="foundation-hero-note">{content?.heroNote ?? 'No pressure. No pitch. Enroll when you\'re ready.'}</p>
          </section>
        </SectionContent>
      </SectionWrapper>

      {/* ── What's Inside ─────────────────────────────────────────────────────── */}
      <SectionWrapper variant="secondary">
        <SectionContent>
          <section className="foundation-inside" id="inside">
            <div className="foundation-section-header">
              <p className="foundation-section-eyebrow">{content?.insideEyebrow ?? 'The curriculum'}</p>
              <h2 className="foundation-section-title">{content?.insideTitle ?? '8 weeks. One week at a time.'}</h2>
              <p className="foundation-section-body">
                {content?.insideBody ?? 'Each week builds on the last. You can go faster — but the material is sequenced deliberately. Physical groundedness before vocal command. Fundamentals before high-stakes application.'}
              </p>
            </div>
            <ol className="foundation-module-list">
              {modules.map(({ week, title, description }: { week: number; title: string; description: string }) => (
                <li key={week} className="foundation-module-item">
                  <span className="foundation-module-week">Week {week}</span>
                  <div className="foundation-module-content">
                    <h3 className="foundation-module-title">{title}</h3>
                    <p className="foundation-module-description">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </SectionContent>
      </SectionWrapper>

      {/* ── Who It's For ──────────────────────────────────────────────────────── */}
      <SectionWrapper variant="primary">
        <SectionContent>
          <section className="foundation-who">
            <div className="foundation-section-header">
              <p className="foundation-section-eyebrow">{content?.whoEyebrow ?? 'Who this is for'}</p>
              <h2 className="foundation-section-title">{content?.whoTitle ?? 'You already have the substance. This is about the signal.'}</h2>
            </div>
            <ul className="foundation-who-list">
              {whoItems.map((item: string, i: number) => (
                <li key={i} className="foundation-who-item">
                  <span className="foundation-who-marker" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </SectionContent>
      </SectionWrapper>

      {/* ── How It Works ──────────────────────────────────────────────────────── */}
      <SectionWrapper variant="secondary">
        <SectionContent>
          <section className="foundation-how">
            <div className="foundation-section-header">
              <p className="foundation-section-eyebrow">{content?.howEyebrow ?? 'How it works'}</p>
              <h2 className="foundation-section-title">{content?.howTitle ?? 'Not a lecture series. A movement practice.'}</h2>
            </div>
            <div className="foundation-how-grid">
              {howCards.map(({ label, body }: { label: string; body: string }) => (
                <div key={label} className="foundation-how-card">
                  <h3 className="foundation-how-card-label">{label}</h3>
                  <p className="foundation-how-card-body">{body}</p>
                </div>
              ))}
            </div>
          </section>
        </SectionContent>
      </SectionWrapper>

      {/* ── Pricing ───────────────────────────────────────────────────────────── */}
      <SectionWrapper variant="tertiary">
        <SectionContent>
          <section className="foundation-pricing" id="pricing">
            <div className="foundation-section-header">
              <p className="foundation-section-eyebrow">{content?.pricingEyebrow ?? 'Enrollment'}</p>
              <h2 className="foundation-section-title">{content?.pricingTitle ?? 'Two ways in.'}</h2>
            </div>
            <div className="foundation-pricing-grid">
              {pricingTiers.map(({ tier, tierKey, price, description, features, cta, primary }: { tier: string; tierKey: 'self_paced' | 'with_checkins'; price: string; description: string; features: string[]; cta: string; primary: boolean }) => (
                <div key={tier} className={`foundation-pricing-card${primary ? ' foundation-pricing-card--primary' : ''}`}>
                  {primary && <span className="foundation-pricing-badge">Most popular</span>}
                  <p className="foundation-pricing-tier">{tier}</p>
                  <p className="foundation-pricing-price">{price}</p>
                  <p className="foundation-pricing-description">{description}</p>
                  <ul className="foundation-pricing-features">
                    {features.map((f: string) => (
                      <li key={f} className="foundation-pricing-feature">{f}</li>
                    ))}
                  </ul>
                  <EnrollButton tier={tierKey} label={cta} primary={primary} />
                </div>
              ))}
            </div>
            <p className="foundation-pricing-note">
              {content?.pricingNote ?? "Spots for the With Check-ins tier are limited. If you're on the fence, sooner is better."}
            </p>
          </section>
        </SectionContent>
      </SectionWrapper>

      {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
      <SectionWrapper variant="primary">
        <SectionContent>
          <section className="foundation-cta">
            <h2 className="foundation-cta-title">{content?.ctaTitle ?? 'Not sure yet? Start with the free audit.'}</h2>
            <p className="foundation-cta-body">
              {content?.ctaBody ?? "Seven questions, three minutes. I'll review your answers and tell you exactly where your presence stands — and whether The Foundation is the right next step for you."}
            </p>
            <Link href="/audit" className="btn btn-primary">
              {content?.ctaButtonLabel ?? 'Take the Presence Audit'}
            </Link>
            <p className="foundation-cta-note">{content?.ctaNote ?? 'Free. No account needed.'}</p>
          </section>
        </SectionContent>
      </SectionWrapper>

    </PageTransition>
  )
}
