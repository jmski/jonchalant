// ─────────────── NEW COMPONENTS (Preferred) ────────────────
export { TestimonialSection } from './testimonial-section';
export { CaseStudySection } from './case-study-section';
export { LessonCategorySection } from './lesson-section';
export { StatsSection } from './stats-section';
export { BlogCardsSection } from './blog-cards-section';
export { ServicesSection } from './services-section';
export { FeaturedAreasSection } from './featured-areas-section';
export { HomeHeroSection } from './home-hero-section';

// ─────────────── SHARED COMPONENTS ────────────────
export { Badge } from '@/components/shared/badges';
export { TestimonialCard, CaseStudyCard, LessonCard, BlogCard, ServiceCard } from '@/components/shared/cards';
export { StatsGrid, CardGrid } from '@/components/shared/grids';

// ─────────────── LEGACY COMPONENTS (To be removed) ────────────────
// NOTE: These components are deprecated. Use the new refactored versions above.
export { default as CTASection } from './CTASection';
export { default as ProgramCardsSection } from './ProgramCardsSection';
export { default as ThreePillars } from './ThreePillars';
export { default as FeaturedVideoHero } from './FeaturedVideoHero';
export { FeaturedBlogSection } from './FeaturedBlogSection';
export { default as HeroSection } from './HeroSection';
export { default as PageHeroSection } from './PageHeroSection';
export { FAQSection } from './FAQSection';
export { TestimonialCarousel } from './TestimonialCarousel'; // DEPRECATED: Use TestimonialSection
export { CaseStudiesSection } from './CaseStudiesSection'; // DEPRECATED: Use CaseStudySection
