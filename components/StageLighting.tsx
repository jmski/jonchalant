'use client';

import { useRef, RefObject } from 'react';
import { usePointerPosition } from '@/lib/hooks/usePointerPosition';
import { DESIGN_TOKENS, constrainPosition } from '@/lib/design-tokens';

export default function StageLighting() {
  const containerRef = useRef<HTMLDivElement>(null);
  const position = usePointerPosition(containerRef as RefObject<HTMLElement>, false);

  // Get tokens for reusability
  const { STAGE_BODY, STAGE_GLOW_SM, STAGE_GLOW_MD, STAGE_GLOW_LG, STAGE_CURSOR } = DESIGN_TOKENS.SIZES.SVG;
  const { DURATION_FAST } = DESIGN_TOKENS.TIMING;
  const { OFFSET_X, OFFSET_Y } = DESIGN_TOKENS.POINTER;

  // Calculate secondary light position with constraints
  const secondaryX = constrainPosition(
    position.x + OFFSET_X,
    STAGE_GLOW_SM,
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const secondaryY = constrainPosition(
    position.y + OFFSET_Y,
    STAGE_GLOW_SM,
    typeof window !== 'undefined' ? window.innerHeight : 768
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ perspective: '1000px' }}
    >
      {/* Main Spotlight */}
      <div
        className="absolute"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${STAGE_BODY}px`,
          height: `${STAGE_BODY}px`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          transition: `all ${DURATION_FAST}`,
        }}
      >
        {/* Primary spotlight glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at center, var(--light-cyan) 0%, var(--light-cyan-medium) 30%, transparent 70%)`,
            filter: 'blur(40px)',
            boxShadow: '0 0 60px var(--light-cyan-glow)',
          }}
        />

        {/* Inner bright core */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            top: '50%',
            left: '50%',
            width: `${STAGE_CURSOR}px`,
            height: `${STAGE_CURSOR}px`,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle at center, var(--light-gold) 0%, var(--light-gold-medium) 50%, transparent 100%)`,
            filter: 'blur(20px)',
          }}
        />
      </div>

      {/* Secondary Rim Light (opposite side) */}
      <div
        className="absolute"
        style={{
          left: `${secondaryX}px`,
          top: `${secondaryY}px`,
          width: `${STAGE_GLOW_SM}px`,
          height: `${STAGE_GLOW_SM}px`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          transition: `all ${DURATION_FAST * 0.67}ms`,
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at center, var(--light-pink) 0%, var(--light-pink-subtle) 40%, transparent 70%)',
            filter: 'blur(35px)',
          }}
        />
      </div>

      {/* Vignette overlay (darken edges) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, var(--overlay-dark-medium) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Spotlight cone effect */}
      <div
        className="absolute"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${STAGE_GLOW_MD}px`,
          height: `${STAGE_GLOW_MD}px`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          background: `conic-gradient(
            from 0deg,
            rgba(0, 217, 255, 0) 0deg,
            rgba(0, 217, 255, 0.1) 45deg,
            rgba(0, 217, 255, 0.15) 90deg,
            rgba(0, 217, 255, 0.1) 135deg,
            rgba(0, 217, 255, 0) 180deg
          )`,
          filter: 'blur(30px)',
          clipPath: 'polygon(50% 50%, 0% 0%, 100% 0%)',
          opacity: 0.5,
          transition: `all ${DURATION_FAST}`,
        }}
      />

      {/* Bloom effect layer */}
      <div
        className="absolute"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${STAGE_GLOW_LG}px`,
          height: `${STAGE_GLOW_LG}px`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          background: 'radial-gradient(circle at center, rgba(0, 217, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animation: `pulse ${DESIGN_TOKENS.TIMING.ANIMATION.PULSE}ms ease-in-out infinite`,
          transition: `all ${DURATION_FAST * 0.67}ms`,
        }}
      />
    </div>
  );
}
