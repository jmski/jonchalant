'use client';
import VideoEmbed from '@/components/VideoEmbed';
import CursorGlow from '@/components/CursorGlow';
import StageLighting from '@/components/StageLighting';
import MagneticButton from '@/components/MagneticButton';
import AnimatedHeadline from '@/components/AnimatedHeadline';

interface HeroProps {
  videoUrl?: string;
  headline: string;
  subheadline: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function Hero({
  videoUrl,
  headline,
  subheadline,
  ctaText = "Let's Collaborate",
  ctaLink = '/collaborations',
  secondaryCtaText = 'Explore Work',
  secondaryCtaLink = '/dance',
}: HeroProps) {

  return (
    <>
      <CursorGlow />
      <section className="relative min-h-[600px] sm:min-h-[700px] lg:min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--bg-primary), var(--bg-tertiary), var(--bg-primary))' }}>
        {/* Stage Lighting Effect */}
        <StageLighting />

        {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 opacity-5 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: 'var(--accent-secondary)' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 opacity-5 rounded-full blur-3xl animate-pulse animation-delay-2000" style={{ backgroundColor: 'var(--accent-secondary)' }}></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 opacity-5 rounded-full blur-3xl animate-pulse animation-delay-4000" style={{ backgroundColor: 'var(--accent-primary)' }}></div>
      </div>

      {/* Background video (optional) */}
      {videoUrl && (
        <div className="absolute inset-0 z-0 opacity-20">
          <VideoEmbed
            src={videoUrl}
            title="Hero Video"
            lazy={false}
          />
          <div style={{ background: `linear-gradient(to bottom, var(--overlay-dark), var(--overlay-dark-medium), var(--overlay-dark))`, position: 'absolute', inset: 0 }}></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16 sm:py-24 lg:py-32">
        {/* Accent badge */}
        <div className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm" style={{ backgroundColor: 'var(--badge-gold-bg)', border: '1px solid var(--badge-gold-border)', color: 'var(--badge-gold-text)' }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-primary)' }}></span>
            Creative Professional
          </span>
        </div>

        {/* Headline with gradient - animated */}
        <AnimatedHeadline
          text={headline}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight"
          delay={200}
          duration={0.03}
        />

        {/* Subheadline */}
        <p className="text-lg sm:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-light" style={{ color: 'var(--text-secondary)' }}>
          {subheadline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <MagneticButton
            href={ctaLink}
            className="px-8 py-4 font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            magneticRange={60}
          >
            <span style={{ background: 'var(--cta-gradient)', display: 'block', padding: '16px 32px', borderRadius: '0px', color: 'var(--btn-primary-text)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              {ctaText} <span className="text-xl">→</span>
            </span>
          </MagneticButton>
          <a
            href={secondaryCtaLink}
            className="px-8 py-4 border font-semibold transition-all duration-300 focus:outline-none"
            style={{ 
              borderColor: 'var(--border-accent)', 
              color: 'var(--text-primary)',
              borderRadius: '0px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              fontWeight: '600',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
            }}
          >
            {secondaryCtaText}
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" style={{ color: 'var(--text-muted)' }}>
          <span className="text-sm font-medium">Scroll to explore</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
    </>
  );
}
