import Breadcrumb from "@/components/Breadcrumb";
import ScrollFade from "@/components/ScrollFade";
import DanceFilter from "@/components/DanceFilter";
import CTASection from "@/components/CTASection";
import { sanityClient } from "@/lib/sanityClient";
import { dancePortfolioQuery } from "@/lib/sanityQueries";
import { PAGE_CONTENT, DANCE_FILTER_CATEGORIES } from "@/lib/pageContent";

export const metadata = {
  title: "Dance Portfolio | Jon",
  description: "Dance choreography, freestyle performances, and movement artistry"
};

const pageContent = PAGE_CONTENT.dance;

export default async function Dance() {
  let dancePortfolio: any[] = [];

  try {
    dancePortfolio = await sanityClient.fetch(dancePortfolioQuery);
  } catch (error) {
    console.error('Error fetching dance data:', error);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Breadcrumb />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-20 sm:py-28">
          <ScrollFade>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent mb-6 font-display" style={{ background: 'var(--gradient-heading)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {pageContent.headline}
            </h1>
            <p className="text-xl max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {pageContent.subheadline}
            </p>
          </ScrollFade>
        </div>

        {/* Dynamic Filter and Portfolio */}
        <DanceFilter items={dancePortfolio} categories={DANCE_FILTER_CATEGORIES} />

        {/* CTA Section */}
        <CTASection
          title={pageContent.ctaTitle}
          description={pageContent.ctaDescription}
          buttonText={pageContent.ctaButtonText}
          buttonLink="/collaborations"
        />
      </main>
    </div>
  );
}
