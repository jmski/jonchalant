import type { Metadata } from 'next'
import Script from 'next/script'
import { PageTransition, SectionWrapper, SectionContent } from '@/components/layout'
import { ScrollFade } from '@/components/animations'
import { Button } from '@/components/ui/Button'
import EnrollButton from '@/components/foundation/EnrollButton'
import FAQ from '@/components/shared/faq/FAQ'
import { StarterGuideForm } from '@/components/forms/StarterGuideForm'
import { getPageFoundation, getSiteConfig } from '@/lib/sanity'
import { CourseSchema } from '@/lib/schema'
import { renderHeadline } from '@/lib/render-headline'
import type { FAQItem } from '@/components/shared/faq/FAQ'
import type { ProgramCard } from '@/lib/types'

export const metadata: Metadata = {
  title: 'The Foundation | Jonchalant',
  description: 'An 8-week embodiment course built through dance, transferable to any medium. For professionals who have named the work they were meant for and are ready to inhabit it.',
  alternates: { canonical: 'https://jonchalant.com/foundation' },
  openGraph: {
    title: 'The Foundation | Jonchalant',
    description: 'An 8-week embodiment course built through dance. Grounding, Energy, Flow, Command — medium-agnostic.',
    type: 'website',
    url: 'https://jonchalant.com/foundation',
    siteName: 'Jonchalant',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function deriveTierKey(card: ProgramCard): 'self_paced' | 'with_checkins' {
  return card.title.toLowerCase().includes('check') ? 'with_checkins' : 'self_paced'
}

function startingPriceFromCards(cards: ProgramCard[]): string {
  const first = cards[0]?.priceLine ?? '197'
  return first.replace(/[^0-9.]/g, '') || '197'
}

export default async function FoundationPage() {
  const [content, siteConfig] = await Promise.all([
    getPageFoundation().catch(() => null),
    getSiteConfig().catch(() => null),
  ])

  const starterGuideSuccess = siteConfig?.successStates?.find((s) => s.key === 'starterGuide')?.message

  const enrollmentCards = content?.enrollmentCards ?? []
  const faqItems: FAQItem[] = (content?.faqItems ?? []).map((item) => ({
    question: item.question,
    answer: item.answer,
  }))

  return (
    <>
      <Script
        id="foundation-course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(CourseSchema({
            name: content?.hero?.headline ?? 'The Foundation',
            description: content?.hero?.subhead ?? 'An 8-week embodiment course teaching presence through body-aware leadership principles.',
            price: startingPriceFromCards(enrollmentCards),
            duration: 'PT213H',
            level: 'Beginner',
          })),
        }}
      />
      <PageTransition animation="fade">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <section className="foundation-hero">
              <div className="foundation-hero-left">
                {content?.hero?.eyebrow && (
                  <p className="foundation-hero-eyebrow">{content.hero.eyebrow}</p>
                )}
                <h1 className="foundation-hero-headline">
                  {renderHeadline(content?.hero?.headline ?? "Knowing the work isn't the same as {{inhabiting}} it.")}
                </h1>
                {content?.hero?.subhead && (
                  <p className="foundation-hero-subheadline">{content.hero.subhead}</p>
                )}
                <div className="foundation-hero-actions">
                  {content?.hero?.primaryCta && (
                    <Button as="link" href={content.hero.primaryCta.href}>
                      {content.hero.primaryCta.label}
                    </Button>
                  )}
                  {content?.hero?.secondaryCta && (
                    <Button as="link" href={content.hero.secondaryCta.href} variant="secondary">
                      {content.hero.secondaryCta.label}
                    </Button>
                  )}
                </div>
                {content?.heroMicrocopyUnderCtas && (
                  <p className="foundation-hero-note">{content.heroMicrocopyUnderCtas}</p>
                )}
              </div>

              {(content?.whoForHeader || content?.whoForBullets?.length) && (
                <div className="foundation-hero-right">
                  {content?.whoForHeader && (
                    <p className="foundation-section-eyebrow">{content.whoForHeader}</p>
                  )}
                  {content?.whoForLede && (
                    <h2 className="foundation-hero-who-title">{content.whoForLede}</h2>
                  )}
                  {content?.whoForBullets && content.whoForBullets.length > 0 && (
                    <ul className="foundation-who-list">
                      {content.whoForBullets.map((item, i) => (
                        <li key={i} className="foundation-who-item">
                          <span className="foundation-who-marker" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </section>
            <p className="foundation-onramp">
              Haven&apos;t named the work yet?{' '}
              <a href="/ikigai">Start with the ikigai assessment.</a>
              {' →'}
            </p>
          </SectionContent>
        </SectionWrapper>

        {/* ── Why Dance ────────────────────────────────────────────────────── */}
        {(content?.whyDanceHeader || content?.whyDanceBodyParagraphs?.length) && (
          <SectionWrapper variant="secondary">
            <SectionContent>
              <ScrollFade>
                <section className="foundation-why-dance" id="why-dance">
                  <div className="foundation-section-header">
                    {content?.whyDanceHeader?.eyebrow && (
                      <p className="foundation-section-eyebrow">{content.whyDanceHeader.eyebrow}</p>
                    )}
                    {content?.whyDanceHeader?.headline && (
                      <h2 className="foundation-section-title">{content.whyDanceHeader.headline}</h2>
                    )}
                    {content?.whyDanceHeader?.subhead && (
                      <p className="foundation-section-body">{content.whyDanceHeader.subhead}</p>
                    )}
                  </div>
                  <div className="foundation-why-dance-prose">
                    {(content?.whyDanceBodyParagraphs ?? []).map((para, i) => (
                      <p key={i} className="foundation-why-dance-paragraph">{para}</p>
                    ))}
                  </div>
                </section>
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* ── Curriculum ────────────────────────────────────────────────────── */}
        {content?.curriculumModules?.length ? (
          <SectionWrapper variant="secondary">
            <SectionContent>
              <ScrollFade>
                <section className="foundation-inside" id="curriculum">
                  <div className="foundation-section-header">
                    {content.curriculumHeader?.eyebrow && (
                      <p className="foundation-section-eyebrow">{content.curriculumHeader.eyebrow}</p>
                    )}
                    {content.curriculumHeader?.headline && (
                      <h2 className="foundation-section-title">{content.curriculumHeader.headline}</h2>
                    )}
                    {content.curriculumHeader?.subhead && (
                      <p className="foundation-section-body">{content.curriculumHeader.subhead}</p>
                    )}
                  </div>
                  <ol className="foundation-module-list">
                    {content.curriculumModules.map((mod) => (
                      <li key={mod.number} className="foundation-module-item">
                        <span className="foundation-module-week">Module {mod.number}</span>
                        <div className="foundation-module-content">
                          <h3 className="foundation-module-title">{mod.title}</h3>
                          <p className="foundation-module-description">{mod.blurb}</p>
                          {mod.duration && (
                            <p className="foundation-module-meta">{mod.duration}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </section>
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        ) : null}

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        {content?.howItWorksColumns?.length ? (
          <SectionWrapper variant="secondary">
            <SectionContent>
              <ScrollFade>
                <section className="foundation-how">
                  <div className="foundation-section-header">
                    {content.howItWorksHeader?.eyebrow && (
                      <p className="foundation-section-eyebrow">{content.howItWorksHeader.eyebrow}</p>
                    )}
                    {content.howItWorksHeader?.headline && (
                      <h2 className="foundation-section-title">{content.howItWorksHeader.headline}</h2>
                    )}
                  </div>
                  <div className="foundation-how-grid">
                    {content.howItWorksColumns.map((col, idx) => (
                      <div key={idx} className="foundation-how-card">
                        <span className="foundation-how-card-step">{String(idx + 1).padStart(2, '0')}</span>
                        <h3 className="foundation-how-card-label">{col.title}</h3>
                        <p className="foundation-how-card-body">{col.body}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        ) : null}

        {/* ── Enrollment ───────────────────────────────────────────────────── */}
        {enrollmentCards.length > 0 && (
          <SectionWrapper variant="tertiary">
            <SectionContent>
              <section className="foundation-pricing" id="enrollment">
                <div className="foundation-section-header">
                  {content?.enrollmentHeader?.eyebrow && (
                    <p className="foundation-section-eyebrow">{content.enrollmentHeader.eyebrow}</p>
                  )}
                  {content?.enrollmentHeader?.headline && (
                    <h2 className="foundation-section-title">{content.enrollmentHeader.headline}</h2>
                  )}
                </div>
                <div className="foundation-pricing-grid">
                  {enrollmentCards.map((card) => {
                    const tierKey = deriveTierKey(card)
                    const isPrimary = Boolean(card.badge)
                    return (
                      <div
                        key={card.title}
                        className={`foundation-pricing-card${isPrimary ? ' foundation-pricing-card--primary' : ''}`}
                      >
                        {card.badge && <span className="foundation-pricing-badge">{card.badge}</span>}
                        {card.eyebrow && <p className="foundation-pricing-eyebrow">{card.eyebrow}</p>}
                        <p className="foundation-pricing-tier">{card.title}</p>
                        <p className="foundation-pricing-price">{card.priceLine}</p>
                        <p className="foundation-pricing-description">{card.description}</p>
                        <ul className="foundation-pricing-features">
                          {card.inclusions.map((f) => (
                            <li key={f} className="foundation-pricing-feature">{f}</li>
                          ))}
                        </ul>
                        <EnrollButton
                          tier={tierKey}
                          label={card.primaryCta.label}
                          primary={isPrimary}
                        />
                      </div>
                    )
                  })}
                </div>
                {content?.enrollmentFootnote && (
                  <p className="foundation-pricing-note">{content.enrollmentFootnote}</p>
                )}
              </section>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        {faqItems.length > 0 && (
          <SectionWrapper variant="primary">
            <SectionContent>
              <section className="foundation-faq">
                <div className="foundation-section-header">
                  <p className="foundation-section-eyebrow">Questions</p>
                  <h2 className="foundation-section-title">{content?.faqHeader ?? 'Common questions'}</h2>
                </div>
                <FAQ items={faqItems} />
              </section>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* ── Soft CTA ─────────────────────────────────────────────────────── */}
        {content?.softCta && (
          <SectionWrapper variant="secondary">
            <SectionContent>
              <section className="foundation-cta">
                <h2 className="foundation-cta-title">{content.softCta.headline}</h2>
                {content.softCta.body && (
                  <p className="foundation-cta-body">{content.softCta.body}</p>
                )}
                {content.softCta.primaryCta && (
                  <Button as="link" href={content.softCta.primaryCta.href}>
                    {content.softCta.primaryCta.label}
                  </Button>
                )}
                {content.softCta.microcopy && (
                  <p className="foundation-cta-note">{content.softCta.microcopy}</p>
                )}
              </section>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* ── Foundation Starter Guide ─────────────────────────────────────── */}
        <SectionWrapper variant="secondary" className="section-wrapper--flush">
          <StarterGuideForm
            guide={content?.starterGuide ?? null}
            successMessage={starterGuideSuccess}
          />
        </SectionWrapper>

      </PageTransition>
    </>
  )
}
