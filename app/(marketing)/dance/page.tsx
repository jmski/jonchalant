import type { Metadata } from 'next'
import { PageTransition, SectionWrapper, SectionContent } from '@/components/layout'
import { Button } from '@/components/ui/Button'
import { VideoEmbed } from '@/components/shared/VideoEmbed'
import { InstagramEmbed } from '@/components/shared/InstagramEmbed'
import { getDanceCategories, getInstagramReels, getDancePageContent } from '@/lib/sanity'
import type { DanceCategory, DanceVideo, InstagramReel } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Dance Curriculum | Movement as Leadership',
  description:
    'Explore the physical foundations of executive presence. A curriculum connecting movement principles to leadership, presence, and authority.',
  openGraph: {
    title: 'Dance Curriculum | Jonchalant',
    description:
      'A curriculum connecting movement principles to leadership, presence, and authority.',
    type: 'website',
    url: 'https://jonchalant.com/dance',
    siteName: 'Jonchalant',
    images: {
      url: 'https://jonchalant.com/social/og-dance-1200x630.png',
      width: 1200,
      height: 630,
      alt: 'Dance Curriculum',
      type: 'image/png',
    },
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dance Curriculum | Jonchalant',
    description:
      'A curriculum connecting movement principles to leadership, presence, and authority.',
    images: ['https://jonchalant.com/social/og-dance-1200x630.png'],
    creator: '@jonchalant',
  },
}

export default async function Dance() {
  const [categories, reels, pageContent] = await Promise.all([
    getDanceCategories().catch(() => [] as DanceCategory[]),
    getInstagramReels().catch(() => [] as InstagramReel[]),
    getDancePageContent().catch(() => null),
  ])

  return (
    <PageTransition animation="fade">

        {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <section className="dance-page-hero">
              <p className="dance-page-hero-eyebrow">
                {pageContent?.heroEyebrow ?? 'Movement & Leadership'}
              </p>
              <h1 className="dance-page-hero-headline">
                {pageContent?.heroHeadline ?? 'The Body Leads First'}
              </h1>
              <p className="dance-page-hero-subheadline">
                {pageContent?.heroSubheadline ?? 'Every principle of executive presence has a physical root. Before the words, before the strategy — there is movement. This curriculum teaches leadership through the body.'}
              </p>
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* ── SECTION 2: CURRICULUM ───────────────────────────────────────── */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <section className="dance-curriculum">
              {categories.length === 0 ? (
                <p className="dance-curriculum-empty">Curriculum coming soon.</p>
              ) : (
                categories.map((category: DanceCategory, idx: number) => (
                  <div key={category._id} className="dance-curriculum-category">
                    {idx > 0 && <hr className="dance-curriculum-divider" />}

                    <p className="dance-curriculum-eyebrow">{category.leadershipPrinciple}</p>
                    <h2 className="dance-curriculum-title">
                      {category.icon && (
                        <span className="dance-curriculum-icon" aria-hidden="true">
                          {category.icon}{' '}
                        </span>
                      )}
                      {category.title}
                    </h2>
                    <p className="dance-curriculum-description">{category.description}</p>

                    {category.videos && category.videos.length > 0 && (
                      <div className="dance-curriculum-video-grid">
                        {category.videos.map((video: DanceVideo, vIdx: number) => (
                          <div key={vIdx} className="dance-curriculum-video-item">
                            <VideoEmbed url={video.videoUrl} title={video.title} />
                            <p className="dance-curriculum-video-title">{video.title}</p>
                            {video.duration && (
                              <span className="dance-curriculum-video-duration">
                                {video.duration}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* ── SECTION 3: ON INSTAGRAM ─────────────────────────────────────── */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <section className="dance-instagram">
              <h2 className="dance-instagram-headline">
                {pageContent?.instagramHeadline ?? 'On Instagram'}
              </h2>

              {reels.length === 0 ? (
                <p className="dance-instagram-empty">Check back soon for new content.</p>
              ) : (
                <div className="dance-instagram-grid">
                  {reels.map((reel: InstagramReel) => (
                    <InstagramEmbed key={reel._id} reelUrl={reel.reelUrl} />
                  ))}
                </div>
              )}
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* ── SECTION 4: BRIDGE ───────────────────────────────────────────── */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <section className="dance-bridge">
              <p className="dance-bridge-eyebrow">
                {pageContent?.bridgeEyebrow ?? 'From the Studio to the Room'}
              </p>
              <h2 className="dance-bridge-headline">
                {pageContent?.bridgeHeadline ?? 'What you just watched applies to every room that matters.'}
              </h2>
              <div className="dance-bridge-items">
                <div className="dance-bridge-item">
                  <p className="dance-bridge-item-context">The boardroom presentation.</p>
                  <p className="dance-bridge-item-translation">
                    Grounding your weight before you begin. Holding the pause before your first point. Letting your stillness signal that you don't need the room's permission to take up space.
                  </p>
                </div>
                <div className="dance-bridge-item">
                  <p className="dance-bridge-item-context">The difficult conversation.</p>
                  <p className="dance-bridge-item-translation">
                    Staying physically open when the instinct is to close. Using breath to slow the room. Letting your body communicate calm before your words have to.
                  </p>
                </div>
                <div className="dance-bridge-item">
                  <p className="dance-bridge-item-context">The performance review.</p>
                  <p className="dance-bridge-item-translation">
                    Entering a room with intention, not apology. Eye contact that doesn't waver under pressure. The kind of physical authority that makes people assume competence before you've said a word.
                  </p>
                </div>
              </div>
              <p className="dance-bridge-close">
                {pageContent?.bridgeClose ?? 'This is the coaching. The movement is where it starts.'}
              </p>
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* ── SECTION 5: CTA ──────────────────────────────────────────────── */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <section className="dance-cta">
              <h2 className="dance-cta-headline">
                {pageContent?.ctaHeadline ?? 'Your Presence Is Built in the Body'}
              </h2>
              <p className="dance-cta-body">
                {pageContent?.ctaBody ?? 'These movement principles are the physical foundation of every coaching program. If you are ready to embody your leadership presence, explore the full curriculum.'}
              </p>
              <Button as="link" href={pageContent?.ctaButtonHref ?? '/programs'}>
                {pageContent?.ctaButtonLabel ?? 'Take What You Just Learned Into a Room That Matters'}
              </Button>
            </section>
          </SectionContent>
        </SectionWrapper>

    </PageTransition>
  )
}