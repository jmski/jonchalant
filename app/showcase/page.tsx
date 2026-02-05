
import Breadcrumb from "@/components/Breadcrumb";
import PortfolioCard from "@/components/PortfolioCard";
import ScrollFade from "@/components/ScrollFade";
import CTASection from "@/components/CTASection";
import { sanityClient } from "@/lib/sanityClient";
import { showcaseQuery } from "@/lib/sanityQueries";
import { PAGE_CONTENT } from "@/lib/pageContent";

export const metadata = {
  title: "Showcase | Jon",
  description: "Gunpla builds, model photography, and Pokémon collection"
};

const pageContent = PAGE_CONTENT.showcase;

export default async function Showcase() {
  let showcaseItems: any[] = [];

  try {
    showcaseItems = await sanityClient.fetch(showcaseQuery);
  } catch (error) {
    console.error('Error fetching showcase data:', error);
  }

  const gunplaShowcase = showcaseItems.filter((item: any) => item.category === "Gunpla");
  const pokemonShowcase = showcaseItems.filter((item: any) => item.category === "Pokémon");

  return (
    <div className="min-h-screen bg-primary">
      <Breadcrumb />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="py-20 sm:py-28">
          <ScrollFade>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent mb-6 font-display gradient-heading">
              {pageContent.headline}
            </h1>
            <p className="text-xl max-w-2xl leading-relaxed text-secondary">
              {pageContent.subheadline}
            </p>
          </ScrollFade>
        </div>

        {/* Gunpla Section */}
        <section className="mb-20">
          <ScrollFade>
            <div className="mb-8">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent mb-2 font-display gradient-heading">
                {pageContent.gunplaTitle}
              </h2>
              <p className="text-secondary">
                {pageContent.gunplaDescription}
              </p>
            </div>
          </ScrollFade>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gunplaShowcase.map((item: any, idx: number) => (
              <ScrollFade key={item._id} delay={idx * 100}>
                <PortfolioCard
                  title={item.title}
                  category={item.category}
                  description={item.description}
                  image={item.image}
                />
              </ScrollFade>
            ))}
          </div>
        </section>

        {/* Pokémon Section */}
        <section className="mb-20">
          <ScrollFade>
            <div className="mb-8">
              <h2 className="text-4xl font-bold bg-clip-text text-transparent mb-2 font-display gradient-heading">
                {pageContent.pokemonTitle}
              </h2>
              <p className="text-secondary">
                {pageContent.pokemonDescription}
              </p>
            </div>
          </ScrollFade>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pokemonShowcase.map((item: any, idx: number) => (
              <ScrollFade key={item._id} delay={idx * 100}>
                <PortfolioCard
                  title={item.title}
                  category={item.category}
                  description={item.description}
                  image={item.image}
                />
              </ScrollFade>
            ))}
          </div>
        </section>

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
