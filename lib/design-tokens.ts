/**
 * Design Tokens
 * ─────────────────────────────────────────────────────────────
 * Centralized configuration for spacing, sizing, timing, and other
 * design values. Prevents magic numbers scattered throughout the codebase.
 *
 * Usage:
 *   import { DESIGN_TOKENS } from '@/lib/design-tokens';
 *   const sizes = DESIGN_TOKENS.SIZES.SVG.STAGE_LIGHTING;
 */

export const DESIGN_TOKENS = {
  /* ========== SPACING ========== */
  SPACING: {
    XS: '0.25rem',     // 4px
    SM: '0.5rem',      // 8px
    MD: '1rem',        // 16px
    LG: '1.5rem',      // 24px
    XL: '2rem',        // 32px
    XXL: '3rem',       // 48px
    XXXL: '4rem',      // 64px

    /* Specific spacing values */
    GAP_SMALL: '0.75rem',   // 12px - gap between small items
    GAP_MEDIUM: '2rem',     // 32px - standard gap
    GAP_LARGE: '3rem',      // 48px - large section gaps
    GUTTER: '1.5rem',       // 24px - page margins
    COLUMN_GAP: '2rem',     // 32px - multi-column layouts
  },

  /* ========== SIZING - SVG & Elements ========== */
  SIZES: {
    SVG: {
      STAGE_BODY: 400,        // Main stage lighting body
      STAGE_GLOW_LG: 600,     // Large glow effect
      STAGE_GLOW_MD: 500,     // Medium glow effect
      STAGE_GLOW_SM: 300,     // Small glow effect
      STAGE_CURSOR: 100,      // Cursor glow indicator
      DECORATION_CIRCLE: 200, // Hero decoration circles
      VISUALIZATION: 400,     // Generic visualization (collaboration diagram)
    },

    /* Image dimensions */
    IMAGE: {
      PLACEHOLDER_SQUARE: { width: 400, height: 400 },
      PLACEHOLDER_LANDSCAPE: { width: 400, height: 300 },
      PLACEHOLDER_DEFAULT: '/api/placeholder/400/300',
      
      // Responsive image widths for next/image
      GALLERY_CARD: { width: 800, height: 600 },
      HERO_IMAGE: { width: 1200, height: 800 },
    },

    /* Grid sizes */
    GRID_PATTERN: {
      SMALL: '50px',     // Hero section grid
      MEDIUM: '60px',    // Standard grid background
      LARGE: '80px',     // Large decorative pattern
    },
  },

  /* ========== TIMING & TRANSITIONS ========== */
  TIMING: {
    /* Transition durations */
    DURATION_FAST: 150,     // ms - quick ui feedback
    DURATION_BASE: 250,     // ms - standard transitions
    DURATION_SLOW: 400,     // ms - emphasis transitions
    DURATION_SLOWEST: 600,  // ms - gallery/modals

    /* Easing functions */
    EASING_FAST: 'ease-in-out',
    EASING_SMOOTH: 'cubic-bezier(0.4, 0, 0.2, 1)',
    EASING_BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    EASING_ELASTIC: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',

    /* Animation durations */
    ANIMATION: {
      PULSE: 3000,          // ms - subtle pulse effect
      FLOAT: 6000,          // ms - floating animation
      SHIMMER: 2000,        // ms - shimmer effect
      STAGGER_INITIAL: 0,   // ms - first item (no delay)
      STAGGER_INCREMENT: 100, // ms - delay between items
    },

    /* CSS transition strings (for use in inline styles) */
    CSS: {
      FAST: '150ms ease-in-out',
      BASE: '250ms ease-in-out',
      SLOW: '400ms ease-in-out',
    },
  },

  /* ========== BORDERS & STROKES ========== */
  BORDERS: {
    WIDTH: {
      THIN: 1,      // px - subtle borders
      SM: 2,        // px - standard borders
      MD: 3,        // px - prominent borders
      LG: 4,        // px - strong borders
      BOLD: 5,      // px - very bold borders
    },
    RADIUS: {
      NONE: '0',
      SM: '0.25rem',   // 4px
      MD: '0.5rem',    // 8px
      LG: '1rem',      // 16px
      FULL: '9999px',
    },
  },

  /* ========== Z-INDEX STACKING ========== */
  Z_INDEX: {
    BASE: 1,
    DROPDOWN: 10,
    STICKY: 20,
    FIXED: 30,
    MODAL_BACKDROP: 40,
    MODAL: 50,
    TOOLTIP: 60,
    NOTIFICATION: 70,
    CURSOR_GLOW: 100,  // Effects that follow cursor
  },

  /* ========== COLORS - Theme Variables ========== */
  COLORS: {
    /* Light theme (default) */
    LIGHT: {
      PRIMARY_BG: '#fcfcfa',
      SECONDARY_BG: '#ffffff',
      TERTIARY_BG: '#f5f5f3',
      PRIMARY_TEXT: '#111111',
      SECONDARY_TEXT: '#333333',
      TERTIARY_TEXT: '#666666',
      BORDER: '#e5e5e5',
      BORDER_ACCENT: '#d0d0d0',
    },

    /* Dark theme */
    DARK: {
      PRIMARY_BG: '#0a0a0a',
      SECONDARY_BG: '#1a1a1a',
      TERTIARY_BG: '#2a2a2a',
      PRIMARY_TEXT: '#f2f2f2',
      SECONDARY_TEXT: '#d0d0d0',
      TERTIARY_TEXT: '#999999',
      BORDER: '#333333',
      BORDER_ACCENT: '#444444',
    },

    /* Accent colors (consistent across themes) */
    ACCENT: {
      VIBRANT: '#ff5f1f',
      VIBRANT_HOVER: '#e55419',
      NEON: '#00ffff',
      NEON_LIGHT: '#64ffff',
      MAGENTA: '#ff00ff',
      DARK: '#0a0a0a',
    },
  },

  /* ========== TYPOGRAPHY ========== */
  TYPOGRAPHY: {
    FONT_FAMILIES: {
      DISPLAY: "'Space Grotesk', sans-serif",
      BODY: "'IBM Plex Sans', sans-serif",
      MONO: "'JetBrains Mono', monospace",
      RETRO: "'VT323', monospace",
      SERIF: "'Georgia', 'Garamond', serif",
    },
    FONT_WEIGHTS: {
      LIGHT: 300,
      REGULAR: 400,
      MEDIUM: 500,
      SEMIBOLD: 600,
      BOLD: 700,
      BLACK: 900,
    },
    FONT_SIZES: {
      XS: '0.75rem',     // 12px
      SM: '0.875rem',    // 14px
      BASE: '1rem',      // 16px
      LG: '1.125rem',    // 18px
      XL: '1.25rem',     // 20px
      '2XL': '1.5rem',   // 24px
      '3XL': '1.875rem', // 30px
      '4XL': '2.25rem',  // 36px
      '5XL': '3rem',     // 48px
      '6XL': '3.75rem',  // 60px
      '7XL': '4.5rem',   // 72px
      '8XL': '6rem',     // 96px
    },
    LINE_HEIGHT: {
      TIGHT: 1.2,
      NORMAL: 1.5,
      RELAXED: 1.75,
      LOOSE: 2,
    },
  },

  /* ========== CONTAINER SIZES ========== */
  CONTAINER: {
    SM: '640px',      // max-w-sm
    MD: '768px',      // max-w-md
    LG: '1024px',     // max-w-lg
    XL: '1280px',     // max-w-xl
    '2XL': '1536px',  // max-w-2xl
    MAIN: '1536px',   // Primary content container
    NARROW: '768px',  // Form/text containers
  },

  /* ========== BREAKPOINTS ========== */
  BREAKPOINT: {
    MOBILE: 480,      // px - small phones
    TABLET: 768,      // px - tablets
    DESKTOP: 1024,    // px - large screens
    WIDE: 1280,       // px - wide screens
  },

  /* ========== SHADOWS ========== */
  SHADOW: {
    NONE: 'none',
    SM: '0 1px 2px rgba(0,0,0,0.05)',
    MD: '0 4px 6px rgba(0,0,0,0.07)',
    LG: '0 10px 15px rgba(0,0,0,0.1)',
    XL: '0 20px 25px rgba(0,0,0,0.15)',
    '2XL': '0 25px 50px rgba(0,0,0,0.25)',
    GLOW: '0 0 30px rgba(0,255,255,0.3)',    // Neon glow
    GLOW_MAGENTA: '0 0 30px rgba(255,0,255,0.3)', // Magenta glow
  },

  /* ========== POINTER/CURSOR OFFSETS ========== */
  POINTER: {
    BOUNDS_MIN: 100,     // Minimum distance from viewport edge
    OFFSET_X: 150,       // Horizontal offset from cursor
    OFFSET_Y: -150,      // Vertical offset from cursor (negative = above)
    CONSTRAINTS: {
      MIN_BOUNDS: 100,   // Don't let element get within 100px of edge
    },
  },

  /* ========== BADGE & LABEL STYLES ========== */
  BADGE: {
    PADDING: '0.25rem 0.75rem',  // py-1 px-3
    PADDING_LG: '0.5rem 1rem',   // py-2 px-4
    FONT_SIZE: '0.75rem',        // text-xs
    BORDER_RADIUS: '0.25rem',    // rounded
  },

  /* ========== FORM ELEMENTS ========== */
  FORM: {
    INPUT_HEIGHT: '2.5rem',       // 40px
    INPUT_PADDING: '0.75rem 1rem', // py-3 px-4
    BORDER_WIDTH: 2,              // px
    FOCUS_OUTLINE_WIDTH: 2,       // px
    TRANSITION: 'all 200ms ease-in-out',
  },

  /* ========== CARD STYLES ========== */
  CARD: {
    PADDING: '1.5rem',       // 24px
    PADDING_LG: '2rem',      // 32px
    BORDER_WIDTH: 2,         // px
    BORDER_RADIUS: '0.5rem', // 8px
    SHADOW: 'md',
  },

  /* ========== SECTION SPACING ========== */
  SECTION: {
    PADDING_Y_MOBILE: '2rem',    // py-8
    PADDING_Y_DESKTOP: '4rem',   // py-16
    PADDING_Y_LARGE: '6rem',     // py-24
    PADDING_X: '1rem',           // px-4 mobile
    PADDING_X_DESKTOP: '1.5rem', // px-6+ desktop
  },

  /* ========== PADDING & MARGIN SCALES ========== */
  PADDING: {
    XS: '0.25rem',  // 4px
    SM: '0.5rem',   // 8px
    MD: '1rem',     // 16px
    LG: '1.5rem',   // 24px
    XL: '2rem',     // 32px
    XXL: '3rem',    // 48px
  },
  
  MARGIN: {
    XS: '0.25rem',  // 4px
    SM: '0.5rem',   // 8px
    MD: '1rem',     // 16px
    LG: '1.5rem',   // 24px
    XL: '2rem',     // 32px
    XXL: '3rem',    // 48px
    AUTO: 'auto',   // auto
  },

  /* ========== OPACITY VALUES ========== */
  OPACITY: {
    FAINT: 0.05,      // 5% - very subtle
    SUBTLE: 0.1,      // 10% - light
    MEDIUM: 0.3,      // 30% - visible
    STRONG: 0.5,      // 50% - prominent
    FULL: 1,          // 100% - opaque
    DISABLED: 0.5,    // 50% - disabled state
    HOVER: 0.08,      // 8% - hover overlay
    FOCUS: 0.1,       // 10% - focus indicator
  },

  /* ========== TEXT DECORATION & STYLING ========== */
  TEXT: {
    LETTER_SPACING: {
      TIGHT: '-0.02em',
      NORMAL: '0em',
      WIDE: '0.05em',
      WIDER: '0.1em',
      WIDEST: '0.2em',
    },
    TEXT_DECORATION: {
      NONE: 'none',
      UNDERLINE: 'underline',
      OVERLINE: 'overline',
      LINE_THROUGH: 'line-through',
    },
  },

  /* ========== GALLERY & GRID ========== */
  GALLERY: {
    COLUMNS_MOBILE: 1,
    COLUMNS_TABLET: 2,
    COLUMNS_DESKTOP: 3,
    GAP: '2rem',
    MODAL_MAX_HEIGHT: '90vh',
    MODAL_MAX_WIDTH: '95vw',
  },

  /* ========== ANIMATION KEYFRAMES ========== */
  KEYFRAME: {
    PULSE: { // Used for StageLighting pulse
      DURATION: '3s',
      FROM: 'opacity: 0.3',
      TO: 'opacity: 0.6',
    },
    FLOAT: { // Used for SVG floating decorations
      DURATION: '6s',
      FROM: 'translateY(0px) rotate(0deg)',
      TO: 'translateY(-20px) rotate(2deg)',
    },
    SHIMMER: { // Loading skeleton shimmer
      FROM: '-100% 0',
      TO: '100% 0',
      DURATION: '2s',
    },
  },
} as const;

/* ========== TYPE EXPORTS ========== */
export type SpacingToken = keyof typeof DESIGN_TOKENS.SPACING;
export type SizeToken = keyof typeof DESIGN_TOKENS.SIZES;
export type TimingToken = keyof typeof DESIGN_TOKENS.TIMING;
export type ColorToken = keyof typeof DESIGN_TOKENS.COLORS.ACCENT;
export type ZIndexToken = keyof typeof DESIGN_TOKENS.Z_INDEX;
export type ContainerToken = keyof typeof DESIGN_TOKENS.CONTAINER;

/**
 * Helper function to get CSS variable name from token
 * @param category - Category of token (e.g., 'SPACING', 'COLORS')
 * @param key - Key within category
 * @returns CSS variable name (e.g., '--spacing-md')
 *
 * Usage:
 *   getCSSVar('SPACING', 'MD') // returns '--spacing-md'
 */
export function getCSSVar(category: keyof typeof DESIGN_TOKENS, key: string): string {
  return `--${category.toLowerCase()}-${key.toLowerCase().replace(/_/g, '-')}`;
}

/**
 * Helper to create transition string
 * @param duration - Duration in ms
 * @param property - CSS property to transition (default: 'all')
 * @returns Transition CSS string
 *
 * Usage:
 *   createTransition(DESIGN_TOKENS.TIMING.DURATION_BASE) 
 *   // returns '250ms ease-in-out all'
 */
export function createTransition(
  duration: number = DESIGN_TOKENS.TIMING.DURATION_BASE,
  property: string = 'all',
  easing: string = DESIGN_TOKENS.TIMING.EASING_FAST
): string {
  return `${property} ${duration}ms ${easing}`;
}

/**
 * Helper to create staggered animation delays
 * @param index - Item index (0-based)
 * @param increment - Delay increment in ms (default: 100ms)
 * @returns Delay in ms
 *
 * Usage:
 *   Array.from({ length: 5 }).map((_, idx) => ({
 *     style: { transitionDelay: getStaggerDelay(idx) + 'ms' }
 *   }))
 */
export function getStaggerDelay(index: number, increment: number = DESIGN_TOKENS.TIMING.ANIMATION.STAGGER_INCREMENT): number {
  return index * increment;
}

/**
 * Helper to constrain element position within bounds
 * @param position - Current position (x or y)
 * @param dimension - Element dimension (width or height)
 * @param viewport - Viewport dimension (window width or height)
 * @returns Constrained position
 *
 * Usage:
 *   const constrainedX = constrainPosition(cursorX, elementWidth, window.innerWidth);
 */
export function constrainPosition(position: number, dimension: number, viewport: number): number {
  const { BOUNDS_MIN } = DESIGN_TOKENS.POINTER;
  return Math.max(BOUNDS_MIN, Math.min(viewport - dimension - BOUNDS_MIN, position));
}

/**
 * Helper to create responsive spacing value
 * @param mobile - Mobile spacing (px or rem)
 * @param desktop - Desktop spacing (px or rem)
 * @returns Object with responsive values
 *
 * Usage:
 *   const spacing = getResponsiveSpacing('1rem', '2rem');
 *   // { mobile: '1rem', desktop: '2rem' }
 */
export function getResponsiveSpacing(mobile: string, desktop: string) {
  return { mobile, desktop };
}

/**
 * Helper to create shadow with color
 * @param intensity - Shadow intensity ('sm' | 'md' | 'lg' | 'xl')
 * @param color - Shadow color (in rgba format or color name)
 * @returns Shadow CSS string
 *
 * Usage:
 *   createShadow('md', 'rgba(255, 95, 31, 0.2)');
 *   // returns '0 4px 6px rgba(255, 95, 31, 0.2)'
 */
export function createShadow(
  intensity: keyof typeof DESIGN_TOKENS.SHADOW = 'md',
  color?: string
): string {
  const baseShadow = DESIGN_TOKENS.SHADOW[intensity] || DESIGN_TOKENS.SHADOW.md;
  if (!color) return baseShadow;
  
  // Extract shadow dimensions and replace alpha channel
  return baseShadow.replace(/rgba\([^)]+\)/, color);
}

/**
 * Helper to create hover/focus styles object
 * @param scale - Scale factor (1.05 = 5% scale)
 * @param shadowIntensity - Shadow intensity
 * @returns Style object for hover state
 *
 * Usage:
 *   const hoverStyles = createInteractiveState(1.05, 'md');
 */
export function createInteractiveState(
  scale: number = 1.05,
  shadowIntensity: keyof typeof DESIGN_TOKENS.SHADOW = 'md'
) {
  return {
    transform: `scale(${scale})`,
    boxShadow: DESIGN_TOKENS.SHADOW[shadowIntensity],
    transition: createTransition(DESIGN_TOKENS.TIMING.DURATION_BASE),
  };
}

/**
 * Helper to get z-index value as string
 * @param layer - Layer name from Z_INDEX
 * @returns Z-index string
 *
 * Usage:
 *   zIndex={getZIndex('MODAL')} // returns '50'
 */
export function getZIndex(layer: keyof typeof DESIGN_TOKENS.Z_INDEX): string {
  return String(DESIGN_TOKENS.Z_INDEX[layer]);
}

/**
 * Helper to create media query for responsive design
 * @param breakpoint - Breakpoint name from BREAKPOINT
 * @returns Media query string
 *
 * Usage:
 *   const query = getMediaQuery('TABLET');
 *   // returns '(min-width: 768px)'
 */
export function getMediaQuery(breakpoint: keyof typeof DESIGN_TOKENS.BREAKPOINT): string {
  const px = DESIGN_TOKENS.BREAKPOINT[breakpoint];
  return `(min-width: ${px}px)`;
}

/**
 * Helper to calculate container padding based on breakpoint
 * @param breakpoint - Current breakpoint
 * @returns Padding value
 *
 * Usage:
 *   const padding = getContainerPadding('MOBILE');
 */
export function getContainerPadding(breakpoint: 'MOBILE' | 'TABLET' | 'DESKTOP'): string {
  const paddingMap = {
    MOBILE: DESIGN_TOKENS.SECTION.PADDING_X,
    TABLET: DESIGN_TOKENS.SECTION.PADDING_X,
    DESKTOP: DESIGN_TOKENS.SECTION.PADDING_X_DESKTOP,
  };
  return paddingMap[breakpoint];
}
