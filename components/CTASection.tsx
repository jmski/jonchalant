'use client';
import ScrollFade from "@/components/ScrollFade";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function CTASection({
  title,
  description,
  buttonText = "Get Started",
  buttonLink = "#"
}: CTASectionProps) {
  return (
    <div className="py-16 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
      <ScrollFade>
        <div className="p-12 text-center border" style={{ background: 'linear-gradient(135deg, var(--bg-tertiary), var(--bg-muted))', borderColor: 'var(--border-accent)', borderRadius: '0px' }}>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-display" style={{ color: 'var(--accent-vibrant)' }}>
            {title}
          </h2>
          <div className="mb-8 max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-body)' }}>
            {description}
          </div>
          <a
            href={buttonLink}
            className="inline-block px-8 py-3 font-bold"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              borderRadius: '0px',
              backgroundColor: 'var(--accent-vibrant)',
              color: 'var(--btn-primary-text)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              fontWeight: '600',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              textDecoration: 'none'
            }}
          >
            {buttonText}
          </a>
        </div>
      </ScrollFade>
    </div>
  );
}
