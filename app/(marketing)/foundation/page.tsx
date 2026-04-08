import type { Metadata } from 'next'
import Script from 'next/script'
import { PageTransition, SectionWrapper, SectionContent } from '@/components/layout'
import { ScrollFade } from '@/components/animations'
import { Button } from '@/components/ui/Button'
import EnrollButton from '@/components/foundation/EnrollButton'
import FAQ from '@/components/shared/faq/FAQ'
import { getFoundationPageContent } from '@/lib/sanity'
import { CourseSchema } from '@/lib/schema'
import type { FAQItem } from '@/components/shared/faq/FAQ'

export const metadata: Metadata = {
  title: 'The Foundation | Jonchalant',
  description: 'A self-paced video course teaching executive presence through dance. 8 modules, 200+ hours. Built for introverts who want to command a room without performing.',
  alternates: {
    canonical: 'https://jonchalant.com/foundation',
  },
  openGraph: {
    title: 'The Foundation | Jonchalant',
    description: 'A self-paced video course teaching executive presence through dance. 8 modules, 200+ hours. Built for introverts.',
    type: 'website',
    url: 'https://jonchalant.com/foundation',
    siteName: 'Jonchalant',
  },
}

const FALLBACK_MODULES = [
  { moduleNumber: 1, title: 'Why Soft Skills Matter', description: 'Problem framing — why traditional leadership training fails and what dance reveals about real human connection.', estimatedHours: '15–20 hours', lessonCount: 12 },
  { moduleNumber: 2, title: 'The Body as Instrument', description: 'Body control — posture, gesture, spatial awareness, and physical intentionality.', estimatedHours: '25–30 hours', lessonCount: 17 },
  { moduleNumber: 3, title: 'Active Listening & Attunement', description: 'Listening with the whole body — reading rooms, mirroring, presence in conversation.', estimatedHours: '25–30 hours', lessonCount: 18 },
  { moduleNumber: 4, title: 'Improvisation & Adaptability', description: 'Thinking on your feet — managing uncertainty, creative problem-solving, spontaneous expression.', estimatedHours: '25–30 hours', lessonCount: 18 },
  { moduleNumber: 5, title: 'Reciprocation & Influence', description: 'Give-and-take dynamics — building rapport, reciprocal communication, authentic influence.', estimatedHours: '25–30 hours', lessonCount: 18 },
  { moduleNumber: 6, title: 'Tonality & Vocal Presence', description: 'Voice modulation, pacing, emotion in speech, commanding attention through sound.', estimatedHours: '25–30 hours', lessonCount: 19 },
  { moduleNumber: 7, title: 'Presence in Practice', description: 'Integrating all concepts — high-stakes scenarios, presentations, performance under pressure.', estimatedHours: '25–30 hours', lessonCount: 18 },
  { moduleNumber: 8, title: 'The Integrated Leader', description: 'Personal brand, sustaining growth, building a presence practice that lasts.', estimatedHours: '20–25 hours', lessonCount: 14 },
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

const FOUNDATION_FAQS: FAQItem[] = [
  {
    question: 'Is this course right for me if I\'m not a dancer?',
    answer: 'Absolutely. No dance background needed — or wanted. The movement principles here are used as tools for self-awareness, not performance. If you\'ve ever felt nervous in a high-stakes meeting or unsure how to command attention without raising your voice, this course was built for you.',
  },
  {
    question: 'How much time does each week require?',
    answer: 'Each week\'s material takes around 60–90 minutes to complete — the video lessons plus a short practice component. The course is self-paced, so you can go faster or slower depending on your schedule. Most students find a rhythm of 2–3 sessions per week.',
  },
  {
    question: 'What makes this different from other confidence or leadership courses?',
    answer: 'Most courses focus on mindset or communication strategy. The Foundation starts earlier — with the physical signals you\'re already sending. Posture, stillness, eye contact, breath. These are the cues that shape how others perceive authority before a single word is spoken. We address the body first, then build outward from there.',
  },
  {
    question: 'What does "personal follow-up from Jon" mean in practice?',
    answer: 'After each module, you\'ll have the option to share a brief reflection or question. Jon reads these and responds personally — not with an automated sequence. This isn\'t a guarantee of unlimited 1:1 time, but it means a real person is paying attention to where you are in the process.',
  },
  {
    question: 'Is there a refund policy?',
    answer: 'Yes. If you complete the first two weeks and feel the course isn\'t right for you, reach out within 14 days of purchase and you\'ll receive a full refund. The only ask is that you actually engage with the material before deciding.',
  },
  {
    question: 'What\'s the difference between the Self-Paced and With Check-ins tiers?',
    answer: 'Both include full access to all 8 weeks of lessons and materials. The With Check-ins tier adds a weekly 1:1 call with Jon to work through what\'s coming up for you in real time — especially useful for people in high-pressure roles or navigating a specific situation (a promotion, a difficult team, a speaking engagement).',
  },
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

  const startingPrice = pricingTiers[0]?.price?.replace(/[^0-9.]/g, '') ?? '197'

  return (
    <>
      <Script
        id="foundation-course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(CourseSchema({
            name: content?.heroHeadline ?? 'The Foundation',
            description: content?.heroSubheadline ?? 'An 8-week course teaching executive presence for introverts through body-aware leadership principles.',
            price: startingPrice,
            duration: 'PT213H',
            level: 'Beginner',
          })),
        }}
      />
    <PageTransition animation="fade">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <SectionWrapper variant="primary">
        <SectionContent>
          <section className="foundation-hero">
            <div className="foundation-hero-left">
              <p className="foundation-hero-eyebrow">{content?.heroEyebrow ?? 'Self-Paced Course · 8 Modules'}</p>
              <h1 className="foundation-hero-headline">{content?.heroHeadline ?? 'The Foundation'}</h1>
              <p className="foundation-hero-subheadline">
                {content?.heroSubheadline ?? 'Executive presence for people who think before they speak.'}
              </p>
              <p className="foundation-hero-body">
                {content?.heroBody ?? 'A decade of professional choreography taught me that presence isn\'t about being loud. It\'s about being intentional. The Foundation is where that insight becomes a skill.'}
              </p>
              <div className="foundation-hero-actions">
                <Button as="link" href="#pricing">
                  {content?.heroPrimaryCtaLabel ?? 'Enroll — starting at $197'}
                </Button>
                <Button as="link" href="#inside" variant="secondary">
                  {content?.heroSecondaryCtaLabel ?? 'See what\'s inside'}
                </Button>
              </div>
              <p className="foundation-hero-note">{content?.heroNote ?? 'No pressure. No pitch. Enroll when you\'re ready.'}</p>
            </div>
            <div className="foundation-hero-right">
              <p className="foundation-section-eyebrow">{content?.whoEyebrow ?? 'Who this is for'}</p>
              <h2 className="foundation-hero-who-title">{content?.whoTitle ?? 'You already have the substance. This is about the signal.'}</h2>
              <ul className="foundation-who-list">
                {whoItems.map((item: string, i: number) => (
                  <li key={i} className="foundation-who-item">
                    <span className="foundation-who-marker" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </SectionContent>
      </SectionWrapper>

      {/* ── What's Inside ─────────────────────────────────────────────────────── */}
      <SectionWrapper variant="secondary">
        <SectionContent>
          <ScrollFade>
          <section className="foundation-inside" id="inside">
            <div className="foundation-section-header">
              <p className="foundation-section-eyebrow">{content?.insideEyebrow ?? 'The curriculum'}</p>
              <h2 className="foundation-section-title">{content?.insideTitle ?? '8 weeks. One week at a time.'}</h2>
              <p className="foundation-section-body">
                {content?.insideBody ?? 'Each module builds on the last. You can go faster — but the material is sequenced deliberately. Physical groundedness before vocal command. Fundamentals before high-stakes application.'}
              </p>
            </div>
            <ol className="foundation-module-list">
              {modules.map(({ moduleNumber, title, description, estimatedHours, lessonCount }: { moduleNumber: number; title: string; description: string; estimatedHours?: string; lessonCount?: number }) => (
                <li key={moduleNumber} className="foundation-module-item">
                  <span className="foundation-module-week">Module {moduleNumber}</span>
                  <div className="foundation-module-content">
                    <h3 className="foundation-module-title">{title}</h3>
                    <p className="foundation-module-description">{description}</p>
                    {(lessonCount || estimatedHours) && (
                      <p className="foundation-module-meta">
                        {lessonCount ? `${lessonCount} lessons` : ''}{lessonCount && estimatedHours ? ' · ' : ''}{estimatedHours ?? ''}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
          </ScrollFade>
        </SectionContent>
      </SectionWrapper>

      {/* ── How It Works ──────────────────────────────────────────────────────── */}
      <SectionWrapper variant="secondary">
        <SectionContent>
          <ScrollFade>
          <section className="foundation-how">
            <div className="foundation-section-header">
              <p className="foundation-section-eyebrow">{content?.howEyebrow ?? 'How it works'}</p>
              <h2 className="foundation-section-title">{content?.howTitle ?? 'Not a lecture series. A movement practice.'}</h2>
            </div>
            <div className="foundation-how-grid">
              {howCards.map(({ label, body }: { label: string; body: string }, idx: number) => (
                <div key={label} className="foundation-how-card">
                  <span className="foundation-how-card-step">{String(idx + 1).padStart(2, '0')}</span>
                  <h3 className="foundation-how-card-label">{label}</h3>
                  <p className="foundation-how-card-body">{body}</p>
                </div>
              ))}
            </div>
          </section>
          </ScrollFade>
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

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <SectionWrapper variant="secondary">
        <SectionContent>
          <section className="foundation-faq">
            <div className="foundation-section-header">
              <p className="foundation-section-eyebrow">Questions</p>
              <h2 className="foundation-section-title">Common questions</h2>
            </div>
            <FAQ items={FOUNDATION_FAQS} />
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
            <Button as="link" href="/audit">
              {content?.ctaButtonLabel ?? 'Take the Presence Audit'}
            </Button>
            <p className="foundation-cta-note">{content?.ctaNote ?? 'Free. No account needed.'}</p>
          </section>
        </SectionContent>
      </SectionWrapper>

    </PageTransition>
    </>
  )
}
