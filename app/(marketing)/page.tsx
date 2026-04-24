import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { ScrollFade } from "@/components/animations";
import {
  Hero,
  CredibilityStrip,
  WhyItWorks,
  Services,
  MeetJon,
  Testimonials,
  BlogCards,
  EmailCapture,
  HomeCTA,
} from '@/components/sections';
import type { Metadata } from 'next';
import Script from 'next/script';
import { getHomePageContent, getServices, getTestimonials, getRecentBlogPosts } from "@/lib/sanity";
import type { HomePageContent } from "@/lib/types";
import { AggregateRatingSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Quiet Command | Executive Presence Coaching for Introverts",
  description: "Quiet Command — executive presence coaching for introverts. Build commanding leadership presence in 8-12 weeks using evidence-based, body-aware techniques.",
  keywords: "executive presence coaching, leadership coaching for introverts, quiet command, confidence coaching, introvert leadership, professional presence",
  alternates: {
    canonical: 'https://jonchalant.com',
  },
  openGraph: {
    title: "Executive Presence Coaching for Introverts | Jonchalant",
    description: "Transform your professional presence in 8-12 weeks. Body-aware leadership for shy professionals and introverts.",
    type: "website",
    url: "https://jonchalant.com",
    siteName: "Jonchalant",
    images: {
      url: "https://jonchalant.com/social/og-home-1200x630.png",
      width: 1200,
      height: 630,
      alt: "Executive Presence Coaching for Introverts",
      type: "image/png",
    },
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Presence Coaching for Introverts | Jonchalant",
    description: "Transform your professional presence in 8-12 weeks. Body-aware leadership for introverts.",
    images: ["https://jonchalant.com/social/og-home-1200x630.png"],
    creator: "@jonchalant",
  },
};

export default async function Home() {
  let homeContent: HomePageContent | null = null;
  let services = [];
  let testimonials = [];
  let recentPosts = [];

  try {
    const [sanityHome, sanityServices, sanityTestimonials, sanityPosts] = await Promise.all([
      getHomePageContent(),
      getServices(),
      getTestimonials(),
      getRecentBlogPosts(),
    ]);

    if (sanityHome) homeContent = sanityHome;
    if (sanityServices?.length > 0) services = sanityServices;
    if (sanityTestimonials?.length > 0) testimonials = sanityTestimonials;
    if (sanityPosts?.length > 0) recentPosts = sanityPosts;
  } catch (error) {
    console.warn('Failed to fetch home content from Sanity:', error);
  }

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
            eyebrow={homeContent?.heroEyebrow}
            headline={homeContent?.heroHeadline}
            subhead={homeContent?.heroSubhead}
            primaryCtaLabel={homeContent?.heroPrimaryCtaLabel}
            primaryCtaHref={homeContent?.heroPrimaryCtaHref}
            secondaryCtaLabel={homeContent?.heroSecondaryCtaLabel}
            secondaryCtaHref={homeContent?.heroSecondaryCtaHref}
          />
        </SectionWrapper>

        {/* 2. CREDIBILITY STRIP */}
        {homeContent?.heroStats?.length > 0 && (
          <SectionWrapper variant="primary" className="section-wrapper--compact">
            <CredibilityStrip stats={homeContent.heroStats} />
          </SectionWrapper>
        )}

        {/* 4. WHY IT WORKS / PHILOSOPHY (moved up) */}
        <SectionWrapper variant="dark">
          <SectionContent>
            <ScrollFade>
              <WhyItWorks
                label={homeContent?.whyItWorksLabel}
                highlight={homeContent?.whyItWorksHighlight}
                paragraph1={homeContent?.whyItWorksParagraph1}
                paragraph2={homeContent?.whyItWorksParagraph2}
                paragraph3={homeContent?.whyItWorksParagraph3}
                bentoHeadline={homeContent?.whyItWorksBentoHeadline}
                cells={homeContent?.whyItWorksCells}
              />
            </ScrollFade>
          </SectionContent>
        </SectionWrapper>

        {/* 5. SERVICES */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <ScrollFade>
              <Services
                services={services}
                heading={homeContent?.servicesHeadline}
                description={homeContent?.servicesDescription}
              />
            </ScrollFade>
          </SectionContent>
        </SectionWrapper>

        {/* 6. MEET JON */}
        <SectionWrapper variant="tertiary" style={{ background: 'var(--bg-warm)' }}>
          <SectionContent>
            <ScrollFade>
              <MeetJon image={homeContent?.meetJonImage} />
            </ScrollFade>
          </SectionContent>
        </SectionWrapper>

        {/* 7. TESTIMONIALS */}
        {testimonials.length > 0 && (
          <SectionWrapper variant="dark" className="jc-section jc-section--dark">
            <SectionContent>
              <ScrollFade>
                <Testimonials
                  testimonials={testimonials}
                  eyebrow={homeContent?.testimonialsEyebrow}
                  heading={homeContent?.testimonialsHeading}
                />
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 8. BLOG PREVIEW */}
        {recentPosts.length > 0 && (
          <SectionWrapper variant="primary" className="blog-preview-wrapper">
            <SectionContent>
              <ScrollFade>
                <BlogCards
                  posts={recentPosts}
                  heading="From the Blog"
                  description="Insights on purpose, presence, and the work you were meant for."
                />
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 9. EMAIL CAPTURE */}
        <SectionWrapper variant="dark" className="section-wrapper--flush">
          <EmailCapture />
        </SectionWrapper>

        {/* 10. FINAL CTA */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <HomeCTA
              title={homeContent?.ctaTitle ?? "Find the work you were meant for."}
              description={homeContent?.ctaDescription ?? "Start with the assessment. It's free. It takes ten minutes. If it tells you something useful, keep going."}
              buttonText={homeContent?.ctaButtonText ?? "Discover Your Ikigai"}
              buttonLink={homeContent?.ctaButtonHref ?? "/ikigai"}
            />
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </div>
  );
}
