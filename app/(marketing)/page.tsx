import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { ScrollFade } from "@/components/animations";
import {
  Hero,
  Method,
  FourPillars,
  MeetJon,
  Testimonials,
  BlogCards,
  EmailCapture,
} from '@/components/sections';
import CTA from '@/components/shared/cta/CTA';
import { StarterGuideForm } from '@/components/forms/StarterGuideForm';
import type { Metadata } from 'next';
import Script from 'next/script';
import {
  getPageHome,
  getRecentBlogPosts,
  getSiteConfig,
  getTestimonials,
} from "@/lib/sanity";
import type { PageHome, SiteConfig } from "@/lib/types";
import { AggregateRatingSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Find the Work You Were Meant For | Jonchalant",
  description: "Ikigai assessment + embodiment practice for professionals who are competent, in-demand, and quietly misaligned. Find the work you were meant for — then learn to inhabit it.",
  keywords: "ikigai assessment, purpose finding, embodiment practice, corporate professionals, find your purpose, four circles, ikigai",
  alternates: {
    canonical: 'https://jonchalant.com',
  },
  openGraph: {
    title: "Find the Work You Were Meant For | Jonchalant",
    description: "Most people are in the right industry. Wrong role. The ikigai assessment takes ten minutes and names the gap.",
    type: "website",
    url: "https://jonchalant.com",
    siteName: "Jonchalant",
    images: {
      url: "https://jonchalant.com/social/og-home-1200x630.png",
      width: 1200,
      height: 630,
      alt: "Find the Work You Were Meant For — Jonchalant",
      type: "image/png",
    },
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find the Work You Were Meant For | Jonchalant",
    description: "Most people are in the right industry. Wrong role. The ikigai assessment takes ten minutes and names the gap.",
    images: ["https://jonchalant.com/social/og-home-1200x630.png"],
    creator: "@jonchalant",
  },
};

export default async function Home() {
  let pageHome: PageHome | null = null;
  let siteConfig: SiteConfig | null = null;
  let testimonials = [];
  let recentPosts = [];

  try {
    const [home, config, sanityTestimonials, sanityPosts] = await Promise.all([
      getPageHome(),
      getSiteConfig(),
      getTestimonials(),
      getRecentBlogPosts(),
    ]);

    pageHome = home ?? null;
    siteConfig = config ?? null;
    if (sanityTestimonials?.length > 0) testimonials = sanityTestimonials;
    if (sanityPosts?.length > 0) recentPosts = sanityPosts;
  } catch (error) {
    console.warn('Failed to fetch home content from Sanity:', error);
  }

  const newsletterSuccess = siteConfig?.successStates?.find((s) => s.key === 'newsletter')?.message;
  const starterGuideSuccess = siteConfig?.successStates?.find((s) => s.key === 'starterGuide')?.message;

  return (
    <div className="bg-white">
      {testimonials.length >= 5 && (
        <Script
          id="coach-rating-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(AggregateRatingSchema({
              name: "Jonchalant Leadership Coaching",
              ratingValue: 4.9,
              ratingCount: testimonials.length,
              reviewCount: testimonials.length,
            })),
          }}
        />
      )}

      <PageTransition animation="fade">
        {/* 1. HERO */}
        <SectionWrapper variant="primary" className="section-wrapper--flush">
          <Hero
            eyebrow={pageHome?.hero?.eyebrow}
            headline={pageHome?.hero?.headline}
            subhead={pageHome?.hero?.subhead}
            primaryCtaLabel={pageHome?.hero?.primaryCta?.label}
            primaryCtaHref={pageHome?.hero?.primaryCta?.href}
            secondaryCtaLabel={pageHome?.hero?.secondaryCta?.label}
            secondaryCtaHref={pageHome?.hero?.secondaryCta?.href}
          />
        </SectionWrapper>

        {/* 2. METHOD */}
        {pageHome?.methodSteps?.length > 0 && (
          <SectionWrapper variant="dark">
            <SectionContent>
              <ScrollFade>
                <Method
                  header={pageHome.methodHeader}
                  steps={pageHome.methodSteps}
                />
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 3. FOUR PILLARS */}
        {pageHome?.pillarSet?.pillars?.length > 0 && (
          <SectionWrapper variant="primary">
            <SectionContent>
              <ScrollFade>
                <FourPillars
                  header={pageHome.pillarsHeader}
                  pillars={pageHome.pillarSet.pillars}
                />
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 4. AUDIT CTA */}
        {pageHome?.auditCta && (
          <SectionWrapper variant="secondary">
            <SectionContent>
              <ScrollFade>
                <CTA
                  title={pageHome.auditCta.headline}
                  description={pageHome.auditCta.body}
                  buttonText={pageHome.auditCta.primaryCta?.label}
                  buttonLink={pageHome.auditCta.primaryCta?.href}
                  sub={pageHome.auditCta.microcopy}
                />
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 5. MEET JON */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <ScrollFade>
              <MeetJon
                header={pageHome?.meetJonHeader}
                image={pageHome?.meetJonImage}
                bodyParagraphs={pageHome?.meetJonBodyParagraphs}
                primaryLink={pageHome?.meetJonPrimaryLink}
                secondaryLink={pageHome?.meetJonSecondaryLink}
              />
            </ScrollFade>
          </SectionContent>
        </SectionWrapper>

        {/* 6. TESTIMONIALS */}
        {testimonials.length > 0 && (
          <SectionWrapper variant="dark">
            <SectionContent>
              <ScrollFade>
                <Testimonials
                  testimonials={testimonials}
                  eyebrow={pageHome?.testimonialsHeader?.eyebrow}
                  heading={pageHome?.testimonialsHeader?.headline}
                />
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 7. BLOG PREVIEW */}
        {recentPosts.length > 0 && (
          <SectionWrapper variant="primary" className="blog-preview-wrapper">
            <SectionContent>
              <ScrollFade>
                <BlogCards
                  posts={recentPosts}
                  heading={pageHome?.blogPreviewHeader?.headline}
                  description={pageHome?.blogPreviewHeader?.subhead}
                />
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 8. STARTER GUIDE */}
        {pageHome?.starterGuide && (
          <SectionWrapper variant="secondary" className="section-wrapper--flush">
            <StarterGuideForm
              guide={pageHome.starterGuide}
              successMessage={starterGuideSuccess}
            />
          </SectionWrapper>
        )}

        {/* 9. NEWSLETTER */}
        <SectionWrapper variant="dark" className="section-wrapper--flush">
          <EmailCapture
            newsletter={pageHome?.newsletter}
            successMessage={newsletterSuccess}
          />
        </SectionWrapper>
      </PageTransition>
    </div>
  );
}
