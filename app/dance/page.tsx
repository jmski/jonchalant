import type { Metadata } from 'next'
import { PageTransition, SectionWrapper, SectionContent } from '@/components/layout'
import { VideoEmbed } from '@/components/shared/VideoEmbed'
import { InstagramEmbed } from '@/components/shared/InstagramEmbed'
import { getDanceCategories, getInstagramReels } from '@/lib/sanity'
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
  const [categories, reels] = await Promise.all([
    getDanceCategories().catch(() => [] as DanceCategory[]),
    getInstagramReels().catch(() => [] as InstagramReel[]),
  ])

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)' }}>
      <PageTransition animation="fade">

        {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <section className="dance-page-hero">
              {/* COPYWRITER: Refine the eyebrow label */}
              <p className="dance-page-hero-eyebrow">Movement &amp; Leadership</p>
              {/* COPYWRITER: Craft the primary headline */}
              <h1 className="dance-page-hero-headline">The Body Leads First</h1>
              {/* COPYWRITER: Write the subheadline — 2–3 sentences, editorial tone */}
              <p className="dance-page-hero-subheadline">
                Every principle of executive presence has a physical root. Before the words, before
                the strategy — there is movement. This curriculum teaches leadership through the
                body.
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
              {/* COPYWRITER: Refine the section headline */}
              <h2 className="dance-instagram-headline">On Instagram</h2>

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

        {/* ── SECTION 4: CTA ──────────────────────────────────────────────── */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <section className="dance-cta">
              {/* COPYWRITER: Write a compelling headline — connect movement to coaching transformation */}
              <h2 className="dance-cta-headline">Your Presence Is Built in the Body</h2>
              {/* COPYWRITER: 1–2 sentences. Bridge the curriculum to the coaching offer. */}
              <p className="dance-cta-body">
                These movement principles are the physical foundation of every coaching program.
                If you are ready to embody your leadership presence, explore the full curriculum.
              </p>
              <a href="/programs" className="dance-cta-button">
                {/* COPYWRITER: Confirm or refine button text */}
                Explore Coaching Programs
              </a>
            </section>
          </SectionContent>
        </SectionWrapper>

      </PageTransition>
    </div>
  )
}