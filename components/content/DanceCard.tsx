'use client';
import Image from 'next/image';
import { getOptimizedImageProps } from '@/lib/imageConfig';

interface DanceCardProps {
  title: string;
  description: string;
  image?: string;
  category?: string;
  link?: string;
}

/**
 * DanceCard Component
 * ─────────────────────────────────────────────
 * Portfolio card for dance portfolio items with image, title, description.
 * All hover effects and animations handled by CSS classes in dance-card.css
 * 
 * CSS Classes Used:
 * - .card-enhanced: Main card container with flex layout
 * - .card-enhanced-image: Image container with aspect ratio
 * - .card-enhanced-overlay: Gradient overlay on hover
 * - .card-badge: Category badge with position animation
 * - .card-arrow-icon: Arrow reveal on image hover
 * - .card-content: Content section with gradient background
 * - .card-learn-more: "Learn more" link reveal on hover
 * - .card-link: Link wrapper when card is clickable
 * 
 * Props:
 *   title: Card title
 *   description: Card description text
 *   image: Image URL
 *   category: Category badge text
 *   link: Href for clickable card
 */
export default function DanceCard({
  title,
  description,
  image,
  category,
  link,
}: DanceCardProps) {
  const content = (
    <div className="card-enhanced">
      {/* Shine effect */}
      <div className="card-enhanced-shine" />

      {/* Image */}
      {image && (
        <div className="card-enhanced-image">
          <Image
            src={image}
            alt={title}
            {...getOptimizedImageProps('PORTFOLIO_CARD')}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="card-enhanced-overlay" />
          
          {/* Category badge */}
          {category && (
            <div className="card-badge">
              <span className="badge">{category}</span>
            </div>
          )}

          {/* Arrow icon reveal */}
          <div className="card-arrow-icon">→</div>
        </div>
      )}

      {/* Content */}
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        {link && (
          <div className="card-learn-more">
            Learn more <span className="card-learn-more-arrow">→</span>
          </div>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} className="card-link">
        {content}
      </a>
    );
  }

  return content;
}
