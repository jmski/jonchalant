import React from 'react';

interface SectionContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * SectionContent provides the max-width container inside a SectionWrapper.
 * Handles responsive padding and ensures proper alignment within full-width sections.
 */
export default function SectionContent({
  children,
  className = '',
}: SectionContentProps) {
  return (
    <div className={`section-content ${className}`}>
      {children}
    </div>
  );
}
