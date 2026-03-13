import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
import { 
  Hero,
  Stats,
  Services,
  Testimonials,
  CTA,
} from '@/components/sections';
import type { Metadata } from 'next';
import Script from 'next/script';
import { getHomePageContent, getServices, getTestimonials } from "@/lib/sanity";
import { AggregateRatingSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Executive Presence Coaching for Introverts | 8-Week Program",
  description: "Build executive presence and quiet command in 8-12 weeks. Leadership coaching for introverts using evidence-based, body-aware techniques. Master confident communication.",
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

export default async function Home() {
  let homeContent = null;
  let services = [];
  let testimonials = [];

  try {
    const [sanityHome, sanityServices, sanityTestimonials] = await Promise.all([
      getHomePageContent(),
      getServices(),
      getTestimonials() // Fetch all testimonials
    ]);
    
    if (sanityHome) {
      homeContent = sanityHome;
    }
    
    if (sanityServices && sanityServices.length > 0) {
      services = sanityServices;
    }
    
    if (sanityTestimonials && sanityTestimonials.length > 0) {
      testimonials = sanityTestimonials;
    }
  } catch (error) {
    console.warn('Failed to fetch home content from Sanity, using fallback data:', error);
  }

  return (
    <div className="bg-white">
      {/* Aggregate Rating Schema - Coach reviews */}
      <Script
        id="coach-rating-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(AggregateRatingSchema({
            name: "Jonchalant Leadership Coaching",
            ratingValue: 4.9,
            ratingCount: testimonials?.length || 25,
            reviewCount: testimonials?.length || 25
          })),
        }}
      />
      
      <PageTransition animation="fade" className="-mt-6 lg:-mt-16">
        {/* HERO SECTION */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <Hero />
          </SectionContent>
        </SectionWrapper>

        {/* KEY STATS SECTION - Impact at a Glance */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <Stats 
              stats={homeContent?.stats || []} 
              heading="Proven Results"
              description="Real outcomes from real coaching. These numbers represent transformations in confidence, presence, and professional impact."
              columns={3}
            />
          </SectionContent>
        </SectionWrapper>

        {/* SERVICES OVERVIEW */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <Services 
              services={services || []} 
              heading={homeContent?.servicesHeadline}
              description={homeContent?.servicesDescription}
            />
          </SectionContent>
        </SectionWrapper>

        {/* CLIENT TESTIMONIALS SECTION */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            {testimonials && testimonials.length > 0 && (
              <Testimonials testimonials={testimonials.slice(0, 3)} />
            )}
          </SectionContent>
        </SectionWrapper>

        {/* FINAL CTA */}
        <SectionWrapper variant="tertiary">
          <SectionContent>
            <CTA 
              title="Ready to Transform Your Executive Presence?"
              description="Whether you're looking to command more authority, speak up confidently, or lead from a place of authenticity—coaching is the path forward. Let's start with your Presence Audit."
              buttonText="Schedule Your Free Audit"
              buttonLink="/contact"
            />
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </div>
  );
}
