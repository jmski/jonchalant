import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Coaching Programs — Three paths to executive presence';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: '#f8f8f5',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: '64px 72px',
        position: 'relative',
        fontFamily: 'Georgia, serif',
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 8,
          background: '#6B4F3F',
          display: 'flex',
        }}
      />

      {/* Brand label */}
      <div
        style={{
          color: '#A47864',
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: 'uppercase',
          marginBottom: 48,
          display: 'flex',
        }}
      >
        Jonchalant
      </div>

      {/* Main headline */}
      <div
        style={{
          color: '#2A1F1A',
          fontSize: 80,
          fontWeight: 700,
          lineHeight: 1.05,
          marginBottom: 24,
          display: 'flex',
        }}
      >
        Coaching Programs
      </div>

      {/* Subtitle */}
      <div
        style={{
          color: '#1a1a1a',
          fontSize: 30,
          lineHeight: 1.4,
          maxWidth: 700,
          display: 'flex',
        }}
      >
        Three paths to executive presence — find the one that fits.
      </div>

      {/* Program tags */}
      <div
        style={{
          display: 'flex',
          gap: 16,
          marginTop: 40,
        }}
      >
        {['Self-Paced', 'Guided Program', '1-on-1 Coaching'].map((label) => (
          <div
            key={label}
            style={{
              border: '1.5px solid #6B4F3F',
              color: '#6B4F3F',
              fontSize: 16,
              fontWeight: 500,
              padding: '8px 18px',
              display: 'flex',
            }}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div
        style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            background: '#6B4F3F',
            color: '#F4EBE0',
            fontSize: 16,
            fontWeight: 600,
            padding: '8px 20px',
            letterSpacing: 1,
            display: 'flex',
          }}
        >
          jonchalant.com/programs
        </div>
      </div>
    </div>,
    { ...size },
  );
}
