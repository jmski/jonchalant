import React from 'react';
import '@/app/css/hero-section.css';

interface HeroSectionProps {
  heading: React.ReactNode;
  subheading?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

/**
 * HeroSection component - Provides consistent hero styling for pages.
 * Uses CSS variables for all colors and typography.
 */
export default function HeroSection({
  heading,
  subheading,
  description,
  className = '',
  children,
}: HeroSectionProps) {
  return (
    <div className={`hero-section ${className}`}>
      {subheading && (
        <div className="hero-subheading">
          {subheading}
        </div>
      )}
      
      <h1 className="hero-heading">
        {heading}
      </h1>

      {description && (
        <p className="hero-description">
          {description}
        </p>
      )}

      {children}
    </div>
  );
}
