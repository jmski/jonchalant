import React from 'react';
import '@/app/css/card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

/**
 * Card component - Provides consistent card styling.
 * Uses CSS variables for colors and shadows.
 */
export default function Card({
  children,
  className = '',
  hoverable = false,
}: CardProps) {
  const hoverClass = hoverable ? 'card-hoverable' : '';

  return (
    <div className={`card ${hoverClass} ${className}`}>
      {children}
    </div>
  );
}
