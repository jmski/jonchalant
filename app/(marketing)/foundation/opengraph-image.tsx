import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'The Foundation — 8-week executive presence course for introverts';
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
          background: '#4a3a5c',
          display: 'flex',
        }}
      />

      {/* Brand label */}
      <div
        style={{
          color: '#6b8e63',
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

      {/* Course label */}
      <div
        style={{
          color: '#6b8e63',
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginBottom: 16,
          display: 'flex',
        }}
      >
        8-Week Course
      </div>

      {/* Main headline */}
      <div
        style={{
          color: '#4a3a5c',
          fontSize: 88,
          fontWeight: 700,
          lineHeight: 1.0,
          marginBottom: 24,
          display: 'flex',
        }}
      >
        The Foundation
      </div>

      {/* Subtitle */}
      <div
        style={{
          color: '#1a1a1a',
          fontSize: 28,
          lineHeight: 1.4,
          maxWidth: 720,
          display: 'flex',
        }}
      >
        Command a room without changing who you are.
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
            background: '#4a3a5c',
            color: '#f8f8f5',
            fontSize: 16,
            fontWeight: 600,
            padding: '8px 20px',
            letterSpacing: 1,
            display: 'flex',
          }}
        >
          jonchalant.com/foundation
        </div>
      </div>
    </div>,
    { ...size },
  );
}
