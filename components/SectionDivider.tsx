export default function SectionDivider({ variant = 'wave' }: { variant?: 'wave' | 'diagonal' | 'gradient' }) {
  if (variant === 'wave') {
    return (
      <div className="w-full h-20 overflow-hidden" style={{ background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }}>
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-full"
          style={{ color: 'var(--text-secondary)' }}
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q300,0 600,50 T1200,50 L1200,120 L0,120 Z"
            fill="currentColor"
            opacity="0.5"
          />
          <path
            d="M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z"
            fill="currentColor"
            opacity="0.3"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'diagonal') {
    return (
      <div className="w-full h-16 overflow-hidden" style={{ background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }}>
        <svg
          viewBox="0 0 1200 100"
          className="w-full h-full"
          style={{ color: 'var(--text-secondary)' }}
          preserveAspectRatio="none"
        >
          <polygon points="0,0 1200,0 1200,100 0,80" fill="currentColor" opacity="0.4" />
        </svg>
      </div>
    );
  }

  // gradient variant
  return (
    <div className="w-full h-1" style={{ background: 'linear-gradient(to right, transparent, var(--border-accent), transparent)', opacity: '0.5' }}></div>
  );
}
