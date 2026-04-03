import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import {
  Hero,
  CredibilityStrip,
  WhyItWorks,
  Services,
  MeetJon,
  Testimonials,
  BlogCards,
  EmailCapture,
  CTA,
} from '@/components/sections';
import type { Metadata } from 'next';
import Script from 'next/script';
import { client, getHomePageContent, getServices, getTestimonials } from "@/lib/sanity";
import { AggregateRatingSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Quiet Command | Executive Presence Coaching for Introverts",
  description: "Quiet Command — executive presence coaching for introverts. Build commanding leadership presence in 8-12 weeks using evidence-based, body-aware techniques.",
  keywords: "executive presence coaching, leadership coaching for introverts, quiet command, confidence coaching, introvert leadership, professional presence",
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

async function getRecentBlogPosts() {
  try {
    return await client.fetch(
      `*[_type == "blogPost"] | order(publishedAt desc) [0...3] { _id, title, slug, excerpt, publishedAt }`
    );
  } catch {
    return [];
  }
}

export default async function Home() {
  let homeContent = null;
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
    console.warn('Failed to fetch home content from Sanity, using fallback data:', error);
  }

  return (
    <div className="bg-white">
      {testimonials.length > 0 && (
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
            heroHeadline={homeContent?.heroHeadline}
            ctaText={homeContent?.heroCtaText}
            ctaLink={homeContent?.heroCtaLink}
            auditMicrocopy={homeContent?.heroMicrocopy}
          />
        </SectionWrapper>

        {/* 2. CREDIBILITY STRIP */}
        {homeContent?.heroStats?.length > 0 && (
          <SectionWrapper variant="primary">
            <CredibilityStrip stats={homeContent.heroStats} />
          </SectionWrapper>
        )}

        {/* 3. WHY IT WORKS / PHILOSOPHY (moved up) */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <WhyItWorks
              label={homeContent?.whyItWorksLabel}
              highlight={homeContent?.whyItWorksHighlight}
              paragraph1={homeContent?.whyItWorksParagraph1}
              paragraph2={homeContent?.whyItWorksParagraph2}
              paragraph3={homeContent?.whyItWorksParagraph3}
            />
          </SectionContent>
        </SectionWrapper>

        {/* 4. SERVICES */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <Services
              services={services}
              heading={homeContent?.servicesHeadline}
              description={homeContent?.servicesDescription}
            />
          </SectionContent>
        </SectionWrapper>

        {/* 5. MEET JON */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <MeetJon />
          </SectionContent>
        </SectionWrapper>

        {/* 6. TESTIMONIALS */}
        {testimonials.length > 0 && (
          <SectionWrapper variant="secondary" className="section-wrapper--moss">
            <SectionContent>
              <Testimonials
                testimonials={testimonials}
                eyebrow={homeContent?.testimonialsEyebrow}
                heading={homeContent?.testimonialsHeading}
              />
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 7. BLOG PREVIEW */}
        {recentPosts.length > 0 && (
          <SectionWrapper variant="primary">
            <SectionContent>
              <BlogCards
                posts={recentPosts}
                heading="From the Blog"
                description="Insights on quiet leadership, executive presence, and authentic communication."
              />
            </SectionContent>
          </SectionWrapper>
        )}

        {/* 8. EMAIL CAPTURE */}
        <SectionWrapper variant="dark" className="section-wrapper--flush">
          <EmailCapture />
        </SectionWrapper>

        {/* 9. FINAL CTA */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <CTA
              title={homeContent?.ctaTitle ?? "Ready to Transform Your Executive Presence?"}
              description={homeContent?.ctaDescription ?? "Whether you're looking to command more authority, speak up confidently, or lead from a place of authenticity—coaching is the path forward. Let's start with your Presence Audit."}
              buttonText={homeContent?.ctaButtonText ?? "Schedule Your Free Audit"}
              buttonLink={homeContent?.ctaButtonHref ?? "/contact"}
            />
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </div>
  );
}
