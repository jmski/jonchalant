import type { Metadata } from 'next';
import { PageTransition, SectionWrapper, SectionContent } from '@/components/layout';
import { CopyButton } from '@/components/shared/copy-button';
import { getMediaKitData } from '@/lib/sanity';

export const metadata: Metadata = {
  title: 'Media Kit | Jon — Speaker, Coach & Executive Presence Educator',
  description: 'Press resources, bio copy, and partnership information for Jon. Approved assets for event programs, editorial use, and brand collaborations.',
  keywords: 'media kit, press kit, speaker bio, executive presence, leadership coach, brand collaboration, booking information',
  openGraph: {
    title: 'Media Kit | Jonchalant',
    description: 'Press resources, bio copy, and partnership information.',
    type: 'website',
    url: 'https://jonchalant.com/media-kit',
    siteName: 'Jonchalant',
    images: {
      url: 'https://jonchalant.com/social/og-media-kit-1200x630.png',
      width: 1200,
      height: 630,
      alt: 'Media Kit — Jonchalant',
      type: 'image/png',
    },
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media Kit | Jonchalant',
    description: 'Press resources, bio copy, and partnership information.',
    images: ['https://jonchalant.com/social/og-media-kit-1200x630.png'],
    creator: '@jonchalant',
  },
};

interface MediaKitStat {
  value: string;
  label: string;
  order?: number;
}

interface MediaKitExpertiseArea {
  title: string;
  description: string;
  order?: number;
}

interface MediaKitData {
  _id?: string;
  heroBadge?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  shortBio?: string;
  longBio?: string;
  stats?: MediaKitStat[];
  expertiseAreas?: MediaKitExpertiseArea[];
  pressAssetsPdfUrl?: string;
  pressAssetsLabel?: string;
  contactHeadline?: string;
  contactSubheadline?: string;
}

export default async function MediaKit() {
  let mediaKitData: MediaKitData | null = null;

  try {
    mediaKitData = await getMediaKitData() as MediaKitData | null;
  } catch (error) {
    console.warn('Failed to fetch media kit data from Sanity:', error);
  }

  // Coming soon fallback if no data
  if (!mediaKitData) {
    return (
      <div className="media-kit-page">
        <PageTransition animation="fade">
          <SectionWrapper variant="primary">
            <SectionContent>
              <div className="media-kit-coming-soon">
                {/* COPYWRITER: Coming soon headline */}
                <h1 className="media-kit-coming-soon-title">Media Kit</h1>
                {/* COPYWRITER: Coming soon body copy */}
                <p className="media-kit-coming-soon-text">
                  Our media kit is currently being updated. Please check back soon, or reach out directly for press inquiries.
                </p>
                <a href="/contact" className="media-kit-contact-btn">
                  {/* COPYWRITER: CTA button label */}
                  Contact Directly
                </a>
              </div>
            </SectionContent>
          </SectionWrapper>
        </PageTransition>
      </div>
    );
  }

  const hasStats = mediaKitData.stats && mediaKitData.stats.length > 0;
  const hasExpertise = mediaKitData.expertiseAreas && mediaKitData.expertiseAreas.length > 0;
  const hasBio = mediaKitData.shortBio || mediaKitData.longBio;

  return (
    <div className="media-kit-page">
      <PageTransition animation="fade">

        {/* ── Section 1: Hero ── */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <section className="media-kit-hero-section">
              {mediaKitData.heroBadge && (
                <span className="media-kit-hero-eyebrow">{mediaKitData.heroBadge}</span>
              )}
              <h1 className="media-kit-hero-headline">
                {/* COPYWRITER: Hero headline — from Sanity mediaKitData.heroHeadline */}
                {mediaKitData.heroHeadline || 'Media Kit'}
              </h1>
              {mediaKitData.heroSubheadline && (
                <p className="media-kit-hero-subheadline">{mediaKitData.heroSubheadline}</p>
              )}
              <div className="media-kit-hero-actions">
                {mediaKitData.pressAssetsPdfUrl && (
                  <a
                    href={mediaKitData.pressAssetsPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="media-kit-hero-btn-primary"
                  >
                    {/* COPYWRITER: Press kit button label — from Sanity mediaKitData.pressAssetsLabel */}
                    {mediaKitData.pressAssetsLabel || 'Download Press Kit'}
                  </a>
                )}
                <a href="/contact" className="media-kit-hero-btn-secondary">
                  {/* COPYWRITER: Secondary CTA label */}
                  Get in Touch
                </a>
              </div>
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* ── Section 2: Bio ── */}
        {hasBio && (
          <SectionWrapper variant="secondary">
            <SectionContent>
              <section className="media-kit-bio-section">
                {/* COPYWRITER: Bio section title — currently "About Jon" */}
                <h2 className="media-kit-section-title">About Jon</h2>
                <div className="media-kit-bio-blocks">
                  {mediaKitData.shortBio && (
                    <div className="media-kit-bio-block">
                      <div className="media-kit-bio-block-header">
                        <span className="media-kit-bio-block-label">
                          Short Bio — for event programs and social profiles
                        </span>
                        <CopyButton text={mediaKitData.shortBio} />
                      </div>
                      <p className="media-kit-bio-block-text">{mediaKitData.shortBio}</p>
                    </div>
                  )}
                  {mediaKitData.longBio && (
                    <div className="media-kit-bio-block">
                      <div className="media-kit-bio-block-header">
                        <span className="media-kit-bio-block-label">
                          Long Bio — for press and editorial use
                        </span>
                        <CopyButton text={mediaKitData.longBio} />
                      </div>
                      <p className="media-kit-bio-block-text">{mediaKitData.longBio}</p>
                    </div>
                  )}
                </div>
              </section>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* ── Section 3: Stats & Credentials ── */}
        {hasStats && (
          <SectionWrapper variant="primary">
            <SectionContent>
              <section className="media-kit-stats-section">
                {/* COPYWRITER: Stats section title — e.g. "By the Numbers" */}
                <h2 className="media-kit-section-title">By the Numbers</h2>
                <div className="media-kit-stats-grid">
                  {mediaKitData.stats!.map((stat, idx) => (
                    <div key={idx} className="media-kit-stat-card">
                      <p className="media-kit-stat-value">{stat.value}</p>
                      <p className="media-kit-stat-label">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* ── Section 4: Expertise Areas ── */}
        {hasExpertise && (
          <SectionWrapper variant="secondary">
            <SectionContent>
              <section className="media-kit-expertise-section">
                {/* COPYWRITER: Section title — currently "Areas of Expertise" */}
                <h2 className="media-kit-section-title">Areas of Expertise</h2>
                <div className="media-kit-expertise-grid">
                  {mediaKitData.expertiseAreas!.map((area, idx) => (
                    <div key={idx} className="media-kit-expertise-card">
                      <h3 className="media-kit-expertise-card-title">{area.title}</h3>
                      <p className="media-kit-expertise-card-description">{area.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* ── Section 5: Press Assets (only renders if PDF URL exists) ── */}
        {mediaKitData.pressAssetsPdfUrl && (
          <SectionWrapper variant="primary">
            <SectionContent>
              <section className="media-kit-press-section">
                <div className="media-kit-press-inner">
                  {/* COPYWRITER: Press assets section headline */}
                  <h2 className="media-kit-press-headline">Press Assets &amp; Resources</h2>
                  {/* COPYWRITER: Press assets section description */}
                  <p className="media-kit-press-description">
                    Approved photography, brand guidelines, and bio copy ready for publication. Download the full press kit for high-resolution assets.
                  </p>
                  <a
                    href={mediaKitData.pressAssetsPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="media-kit-press-download-btn"
                  >
                    {/* COPYWRITER: Download button label — from Sanity mediaKitData.pressAssetsLabel */}
                    {mediaKitData.pressAssetsLabel || 'Download Press Kit'}
                  </a>
                </div>
              </section>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* ── Section 6: Contact CTA ── */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <section className="media-kit-contact-section">
              <div className="media-kit-contact-inner">
                <h2 className="media-kit-contact-headline">
                  {/* COPYWRITER: Contact CTA headline — from Sanity mediaKitData.contactHeadline */}
                  {mediaKitData.contactHeadline || 'Work Together'}
                </h2>
                {mediaKitData.contactSubheadline && (
                  <p className="media-kit-contact-subheadline">{mediaKitData.contactSubheadline}</p>
                )}
                <a href="/contact" className="media-kit-contact-btn">
                  {/* COPYWRITER: Contact CTA button label */}
                  Get in Touch
                </a>
              </div>
            </section>
          </SectionContent>
        </SectionWrapper>

      </PageTransition>
    </div>
  );
}