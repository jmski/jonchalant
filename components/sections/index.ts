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
export { Testimonials as TestimonialSection } from '@/components/shared/testimonials';
export { CaseStudy as CaseStudySection } from '@/components/shared/case-study';
import { Services as SharedServicesList } from '@/components/shared/services';
export { SharedServicesList as ServicesSection };
export { Stats as StatsSection } from '@/components/shared/stats';

// ─────────────── SHARED GENERIC COMPONENTS ────────────────
export { CTA } from '@/components/shared/cta';
export { CTA as CTASection } from '@/components/shared/cta'; // BACKWARD COMPATIBILITY
export { FAQ } from '@/components/shared/faq';
export { FAQ as FAQSection } from '@/components/shared/faq'; // BACKWARD COMPATIBILITY
export { PageHero } from '@/components/shared/page-hero';
export { PageHero as PageHeroSection } from '@/components/shared/page-hero'; // BACKWARD COMPATIBILITY
export { Hero } from '@/components/shared/hero';
export { Hero as HeroSection } from '@/components/shared/hero'; // BACKWARD COMPATIBILITY
export { FeaturedBlog } from '@/components/shared/featured-blog';
export { FeaturedBlog as FeaturedBlogSection }; // BACKWARD COMPATIBILITY
export { ThreePillars } from '@/components/shared/three-pillars';
export { Programs } from '@/components/shared/programs';
export { Programs as ProgramCardsSection } from '@/components/shared/programs'; // BACKWARD COMPATIBILITY
export { Collaboration } from '@/components/shared/collaboration';
export { Collaboration as CollaborationPackagesSection } from '@/components/shared/collaboration'; // BACKWARD COMPATIBILITY
export { Carousel } from '@/components/shared/carousel';
export { Carousel as TestimonialCarousel }; // BACKWARD COMPATIBILITY
export { CaseStudies } from '@/components/shared/case-studies';
export { CaseStudies as CaseStudiesSection }; // BACKWARD COMPATIBILITY

// ─────────────── DANCE SECTIONS ────────────────
export { FeaturedVideo } from './dance/featured-video';
export { FeaturedVideo as FeaturedVideoHero }; // BACKWARD COMPATIBILITY

// ─────────────── OTHER SECTIONS ────────────────
export { LessonCategorySection } from './lesson-section';

// ─────────────── SHARED UTILITY COMPONENTS ────────────────
export { Badge } from '@/components/utilities/badges';
export { TestimonialCard, CaseStudyCard, LessonCard, BlogCard, ServiceCard } from '@/components/utilities/cards';
export { StatsGrid, CardGrid } from '@/components/utilities/grids';
