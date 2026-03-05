import { ReactNode } from 'react';
import { BlueprintGrid } from '@/components/decorative';

interface CTAButton {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

interface PageHeroSectionProps {
  eyebrow: string;
  headline: string | string[];
  subheading: string;
  description: string;
  ctaButtons: CTAButton[];
  rightColumn?: ReactNode;
}

export default function PageHeroSection({
  eyebrow,
  headline,
  subheading,
  description,
  ctaButtons,
  rightColumn,
}: PageHeroSectionProps) {
  // Convert headline to array if it's a string
  const headlineLines = Array.isArray(headline) ? headline : [headline];
  const accentLineIndex = headlineLines.length - 1;

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background decorative elements */}
      <BlueprintGrid
        size={500}
        spacing={40}
        opacity={0.05}
        variant="dots"
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-150px',
          color: 'var(--accent-primary)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Column - Content */}
        <div className="space-y-8">
          {/* Eyebrow */}
          <div>
            <span
              className="inline-block text-xs uppercase tracking-widest font-bold px-3 py-1.5 rounded"
              style={{
                backgroundColor: 'var(--accent-primary)',
                color: 'white',
                letterSpacing: '0.15em',
              }}
            >
              {eyebrow}
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="font-headline font-bold leading-tight space-y-0"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              letterSpacing: '-0.01em',
            }}
          >
            {headlineLines.map((line, idx) => (
              <div
                key={idx}
                style={{
                  color:
                    idx === accentLineIndex
                      ? 'var(--accent-primary)'
                      : 'var(--text-primary)',
                }}
              >
                {line}
              </div>
            ))}
          </h1>

          {/* Accent underline */}
          <div
            className="w-20 h-1"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          />

          {/* Subheading */}
          <p
            className="text-lg sm:text-xl font-body leading-relaxed"
            style={{
              color: 'var(--text-secondary)',
              maxWidth: '32rem',
            }}
          >
            {subheading}
          </p>

          {/* Description */}
          <p
            className="text-base sm:text-lg font-body leading-relaxed"
            style={{
              color: 'var(--text-tertiary)',
              maxWidth: '34rem',
              lineHeight: '1.8',
            }}
          >
            {description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <style>{`
              .page-hero-btn-primary:hover {
                box-shadow: 0 4px 12px rgba(var(--accent-primary-rgb), 0.2);
                opacity: 0.95;
              }
              .page-hero-btn-secondary:hover {
                border-color: var(--accent-primary);
                color: var(--accent-primary);
              }
            `}</style>
            {ctaButtons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.href}
                className={`${
                  btn.variant === 'secondary'
                    ? 'page-hero-btn-secondary'
                    : 'page-hero-btn-primary'
                } px-8 py-4 font-body font-semibold uppercase text-sm tracking-wider transition-all duration-300 text-center`}
                style={{
                  backgroundColor:
                    btn.variant === 'secondary'
                      ? 'transparent'
                      : 'var(--accent-primary)',
                  color:
                    btn.variant === 'secondary'
                      ? 'var(--text-primary)'
                      : 'white',
                  borderRadius: '0px',
                  border:
                    btn.variant === 'secondary'
                      ? '1px solid var(--border-color)'
                      : '1px solid var(--accent-primary)',
                }}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right Column - Flexible Content */}
        {rightColumn && <div>{rightColumn}</div>}
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundColor: 'var(--border-color)' }}
      />
    </section>
  );
}
