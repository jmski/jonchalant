/**
 * StyledButton Component
 * 
 * Unified button styling for the Kinetic Leader brand.
 * Zen Sleek design: No shadows, minimal visual noise, purposeful accent color usage.
 * 
 * Variants:
 * - primary: Kinetic accent button (Muted Moss background)
 * - secondary: Ghost button (thin border, transparent background)
 * - tertiary: Text-only button (underline on hover)
 * 
 * Sizes: sm, md (default), lg
 */

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface StyledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--accent-primary)]
    text-white
    border border-[var(--accent-primary)]
    hover:bg-[var(--accent-hover)]
    hover:border-[var(--accent-hover)]
    active:bg-[var(--accent-primary)]
    disabled:opacity-50
    disabled:cursor-not-allowed
  `,
  secondary: `
    bg-transparent
    text-[var(--accent-primary)]
    border border-[var(--border-color)]
    hover:border-[var(--accent-primary)]
    hover:text-[var(--accent-primary)]
    hover:bg-transparent
    active:bg-transparent
    disabled:opacity-50
    disabled:cursor-not-allowed
  `,
  tertiary: `
    bg-transparent
    text-[var(--accent-primary)]
    border-none
    border-b border-transparent
    hover:border-b-[var(--accent-primary)]
    hover:bg-transparent
    active:bg-transparent
    disabled:opacity-50
    disabled:cursor-not-allowed
  `,
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 text-sm font-medium',
  md: 'px-6 py-3 text-base font-semibold',
  lg: 'px-8 py-4 text-lg font-semibold',
};

export default function StyledButton({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className = '',
  children,
  ...props
}: StyledButtonProps) {
  const baseClasses =
    'inline-block whitespace-nowrap text-center transition-all duration-200 ease-smooth outline-none cursor-pointer';

  const variantClass = variantClasses[variant];
  const sizeClass = sizeClasses[size];

  const combinedClassName = `
    ${baseClasses}
    ${variantClass}
    ${sizeClass}
    ${className}
  `
    .replace(/\s+/g, ' ')
    .trim();

  return (
    <button
      className={combinedClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="opacity-0">{children}</span>
          <span className="absolute animate-spin">⟳</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
