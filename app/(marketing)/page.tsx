import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { ScrollFade } from "@/components/animations";
import {
  Hero,
  CredibilityStrip,
  WhyItWorks,
  FourPillars,
  MeetJon,
  Testimonials,
  BlogCards,
  EmailCapture,
  HomeCTA,
} from '@/components/sections';
import type { Metadata } from 'next';
import Script from 'next/script';
import { getHomePageContent, getTestimonials, getRecentBlogPosts } from "@/lib/sanity";
import type { HomePageContent } from "@/lib/types";
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
  let homeContent: HomePageContent | null = null;
  let testimonials = [];
  let recentPosts = [];

  try {
    const [sanityHome, sanityTestimonials, sanityPosts] = await Promise.all([
      getHomePageContent(),
      getTestimonials(),
      getRecentBlogPosts(),
    ]);

    if (sanityHome) homeContent = sanityHome;
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
              />
            </ScrollFade>
          </SectionContent>
        </SectionWrapper>

        {/* 5. FOUR PILLARS */}
        {homeContent?.pillars && homeContent.pillars.length > 0 && (
          <SectionWrapper variant="primary">
            <SectionContent>
              <ScrollFade>
                <FourPillars
                  headline={homeContent.pillarsHeadline}
                  pillars={homeContent.pillars}
                />
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 7. MEET JON */}
        <SectionWrapper variant="tertiary" style={{ background: 'var(--bg-warm)' }}>
          <SectionContent>
            <ScrollFade>
              <MeetJon
                heading={homeContent?.meetJonHeading}
                body={homeContent?.meetJonBody}
                image={homeContent?.meetJonImage}
              />
            </ScrollFade>
          </SectionContent>
        </SectionWrapper>

        {/* 8. TESTIMONIALS */}
        {testimonials.length > 0 && (
          <SectionWrapper variant="dark">
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

        {/* 9. BLOG PREVIEW */}
        {recentPosts.length > 0 && (
          <SectionWrapper variant="primary" className="blog-preview-wrapper">
            <SectionContent>
              <ScrollFade>
                <BlogCards
                  posts={recentPosts}
                  heading={recentPosts.length <= 2 ? "Recent writing" : "From the Blog"}
                  description="Insights on purpose, presence, and the work you were meant for."
                />
              </ScrollFade>
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 10. EMAIL CAPTURE */}
        <SectionWrapper variant="dark" className="section-wrapper--flush">
          <EmailCapture />
        </SectionWrapper>

        {/* 11. FINAL CTA */}
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
