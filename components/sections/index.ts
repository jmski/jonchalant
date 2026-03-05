// ─────────────── HOME PAGE SECTIONS ────────────────
export { Hero as HomeHeroSection } from './home/hero';
export { FeaturedAreas as FeaturedAreasSection } from './home/featured-areas';
export { BlogCards as BlogCardsSection } from './home/blog-cards';

// ─────────────── ABOUT PAGE SECTIONS ────────────────
export { Hero as AboutHeroSection } from './about/hero';
export { Origin as AboutOriginSection } from './about/origin';
import { Services as AboutServicesList } from './about/services';
export { AboutServicesList as AboutServicesSection };
export { Philosophy as AboutPhilosophySection } from './about/philosophy';
export { Introvert as AboutIntrovertSection } from './about/introvert';

// ─────────────── SHARED SECTIONS (Reusable across pages) ────────────────
export { Testimonials as TestimonialSection } from './shared/testimonials';
export { CaseStudy as CaseStudySection } from './shared/case-study';
import { Services as SharedServicesList } from './shared/services';
export { SharedServicesList as ServicesSection };
export { Stats as StatsSection } from './shared/stats';

// ─────────────── SHARED GENERIC COMPONENTS ────────────────
export { default as CTA } from './shared/cta';
export { default as CTASection } from './shared/cta'; // BACKWARD COMPATIBILITY
export { default as FAQ } from './shared/faq';
export { default as FAQSection } from './shared/faq'; // BACKWARD COMPATIBILITY
export { default as PageHero } from './shared/page-hero';
export { default as PageHeroSection } from './shared/page-hero'; // BACKWARD COMPATIBILITY
export { default as Hero } from './shared/hero';
export { default as HeroSection } from './shared/hero'; // BACKWARD COMPATIBILITY
export { FeaturedBlog } from './shared/featured-blog';
export { FeaturedBlog as FeaturedBlogSection }; // BACKWARD COMPATIBILITY
export { default as ThreePillars } from './shared/three-pillars';
export { default as Programs } from './shared/programs';
export { default as ProgramCardsSection } from './shared/programs'; // BACKWARD COMPATIBILITY
export { default as Collaboration } from './shared/collaboration';
export { Carousel } from './shared/carousel';
export { Carousel as TestimonialCarousel }; // BACKWARD COMPATIBILITY
export { CaseStudies } from './shared/case-studies';
export { CaseStudies as CaseStudiesSection }; // BACKWARD COMPATIBILITY

// ─────────────── DANCE SECTIONS ────────────────
export { FeaturedVideo } from './dance/featured-video';
export { FeaturedVideo as FeaturedVideoHero }; // BACKWARD COMPATIBILITY

// ─────────────── OTHER SECTIONS ────────────────
export { LessonCategorySection } from './lesson-section';

// ─────────────── SHARED UTILITY COMPONENTS ────────────────
export { Badge } from '@/components/shared/badges';
export { TestimonialCard, CaseStudyCard, LessonCard, BlogCard, ServiceCard } from '@/components/shared/cards';
export { StatsGrid, CardGrid } from '@/components/shared/grids';
