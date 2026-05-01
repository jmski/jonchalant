import type { Metadata } from 'next'
import Script from 'next/script'
import { PageHero } from '@/components/sections'
import { PageTransition, SectionWrapper, SectionContent } from '@/components/layout'
import { ScrollFade } from '@/components/animations'
import { Button } from '@/components/ui/Button'
import FAQ from '@/components/shared/faq/FAQ'
import { CurriculumBento } from '@/components/sections/programs/CurriculumBento'
import { CaseStudyCard } from '@/components/utilities/cards'
import { StarterGuideForm } from '@/components/forms/StarterGuideForm'
import { getPagePrograms, getCaseStudies, getCurriculumWeeks, getSiteConfig } from '@/lib/sanity'
import { CourseSchema } from '@/lib/schema'
import type { CurriculumWeek, CaseStudy } from '@/lib/types'
import type { FAQItem } from '@/components/shared/faq/FAQ'

export const metadata: Metadata = {
  title: 'Coaching Programs | Jonchalant',
  description: 'Three ways to build presence with Jon. Self-paced course, guided program, or 1-on-1 coaching — all rooted in physical presence and body-aware leadership.',
  alternates: { canonical: 'https://jonchalant.com/programs' },
  openGraph: {
    title: 'Coaching Programs | Jonchalant',
    description: 'Three ways to build executive presence. Find the format that fits.',
    type: 'website',
    url: 'https://jonchalant.com/programs',
    siteName: 'Jonchalant',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coaching Programs | Jonchalant',
    description: 'Three ways to build executive presence. Find the format that fits.',
    creator: '@jonchalant',
  },
}

export default async function Programs() {
  const [page, caseStudies, curriculumWeeks, siteConfig] = await Promise.all([
    getPagePrograms().catch(() => null),
    getCaseStudies(true).catch(() => [] as CaseStudy[]),
    getCurriculumWeeks().catch(() => [] as CurriculumWeek[]),
    getSiteConfig().catch(() => null),
  ])

  const starterGuideSuccess = siteConfig?.successStates?.find((s) => s.key === 'starterGuide')?.message

  const faqItems: FAQItem[] = (page?.faqItems ?? []).map((item) => ({
    question: item.question,
    answer: item.answer,
  }))

  return (
    <>
      <Script
        id="programs-course-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(CourseSchema({
            name: page?.hero?.headline ?? 'Jonchalant Coaching Programs',
            description: page?.hero?.subhead ?? 'Coaching programs rooted in body-aware leadership.',
          })),
        }}
      />
      <PageTransition animation="fade">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <PageHero
              eyebrow={page?.hero?.eyebrow ?? ''}
              headline={page?.hero?.headline ?? ''}
              subheading={page?.hero?.subhead ?? ''}
              rightColumn={
                page?.heroWhoForColumn ? (
                  <div className="programs-hero-aside">
                    {page.heroWhoForColumn.header && (
                      <h2 className="programs-hero-aside-heading">{page.heroWhoForColumn.header}</h2>
                    )}
                    {page.heroWhoForColumn.bullets?.length > 0 && (
                      <ul className="programs-hero-aside-list">
                        {page.heroWhoForColumn.bullets.map((item, i) => (
                          <li key={i} className="programs-hero-aside-list-item">{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : undefined
              }
            />
          </SectionContent>
        </SectionWrapper>

        {/* ── Case Studies ─────────────────────────────────────────────────── */}
        {caseStudies.length > 0 && (
          <SectionWrapper variant="secondary">
            <SectionContent>
              <section className="programs-case-studies">
                <div className="programs-case-studies-header">
                  {page?.caseStudiesHeader?.eyebrow && (
                    <p className="programs-offers-eyebrow">{page.caseStudiesHeader.eyebrow}</p>
                  )}
                  {page?.caseStudiesHeader?.headline && (
                    <h2 className="programs-case-studies-title">{page.caseStudiesHeader.headline}</h2>
                  )}
                  {page?.caseStudiesHeader?.subhead && (
                    <p className="programs-case-studies-body">{page.caseStudiesHeader.subhead}</p>
                  )}
                </div>
                <div className="programs-case-studies-grid">
                  {caseStudies.map((cs: CaseStudy) => (
                    <CaseStudyCard
                      key={cs._id}
                      title={cs.title}
                      clientName={cs.clientName}
                      industry={cs.industry}
                      challenge={cs.challenge}
                      solution={cs.solution}
                      results={cs.results}
                      image={cs.image}
                      slug={cs.slug}
                    />
                  ))}
                </div>
              </section>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* ── Curriculum Bento ─────────────────────────────────────────────── */}
        {curriculumWeeks.length > 0 && (
          <SectionWrapper variant="tertiary">
            <SectionContent>
              <ScrollFade>
                <CurriculumBento
                  headline="8 weeks. One transformation."
                  weeks={curriculumWeeks}
                />
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* ── Program Cards ────────────────────────────────────────────────── */}
        {page?.programCards?.length ? (
          <SectionWrapper variant="secondary">
            <SectionContent>
              {page.programCardsHeader && (
                <ScrollFade>
                  <div className="programs-offers-header">
                    {page.programCardsHeader.eyebrow && (
                      <p className="programs-offers-eyebrow">{page.programCardsHeader.eyebrow}</p>
                    )}
                    {page.programCardsHeader.headline && (
                      <h2 className="programs-offers-heading">{page.programCardsHeader.headline}</h2>
                    )}
                    {page.programCardsHeader.subhead && (
                      <p className="programs-offers-subtext">{page.programCardsHeader.subhead}</p>
                    )}
                  </div>
                </ScrollFade>
              )}
              <div className="programs-tracks-grid">
                {page.programCards.map((card, idx) => (
                  <ScrollFade key={idx} delay={idx * 80}>
                    <article className={`program-track-card${card.badge ? ' program-track-card--featured' : ''}`}>
                      <div className="program-track-card-header">
                        {card.badge && <span className="program-track-card-badge">{card.badge}</span>}
                        {!card.badge && card.eyebrow && (
                          <p className="program-track-card-eyebrow">{card.eyebrow}</p>
                        )}
                      </div>
                      <div className="program-track-card-body">
                        {card.badge && card.eyebrow && (
                          <p className="program-track-card-eyebrow">{card.eyebrow}</p>
                        )}
                        <h3 className="program-track-card-title">{card.title}</h3>
                        <p className="program-track-card-price">{card.priceLine}</p>
                        <p className="program-track-card-description">{card.description}</p>
                        <ul className="program-track-card-includes">
                          {card.inclusions.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="program-track-card-cta">
                        {card.primaryCta.href.startsWith('http') ? (
                          <Button as="a" href={card.primaryCta.href} target="_blank" rel="noopener noreferrer">
                            {card.primaryCta.label}
                          </Button>
                        ) : (
                          <Button as="link" href={card.primaryCta.href}>
                            {card.primaryCta.label}
                          </Button>
                        )}
                      </div>
                    </article>
                  </ScrollFade>
                ))}
              </div>
            </SectionContent>
          </SectionWrapper>
        ) : null}

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        {faqItems.length > 0 && (
          <SectionWrapper variant="primary">
            <SectionContent>
              <section className="programs-faq">
                <div className="programs-faq-header">
                  <p className="programs-faq-eyebrow">Questions</p>
                  <h2 className="programs-faq-title">{page?.faqHeader ?? 'Common questions'}</h2>
                </div>
                <FAQ items={faqItems} />
              </section>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* ── Closing CTA ──────────────────────────────────────────────────── */}
        {page?.closingCta && (
          <SectionWrapper variant="tertiary">
            <SectionContent>
              <ScrollFade>
                <div className="cta-section">
                  <div className="cta-section-left">
                    <h2 className="cta-section-title">{page.closingCta.headline}</h2>
                    {page.closingCta.primaryCta && (
                      <Button as="a" href={page.closingCta.primaryCta.href}>
                        {page.closingCta.primaryCta.label}
                      </Button>
                    )}
                    {page.closingCta.microcopy && (
                      <p className="programs-cta-microcopy">{page.closingCta.microcopy}</p>
                    )}
                  </div>
                  {page.closingCta.body && (
                    <div className="cta-section-description">{page.closingCta.body}</div>
                  )}
                </div>
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* ── Foundation Starter Guide ─────────────────────────────────────── */}
        <SectionWrapper variant="secondary" className="section-wrapper--flush">
          <StarterGuideForm
            guide={page?.starterGuide ?? null}
            successMessage={starterGuideSuccess}
          />
        </SectionWrapper>

      </PageTransition>
    </>
  )
}
