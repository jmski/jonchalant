'use client';
import { ScrollFade } from "@/components/animations";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

/**
 * CTASection Component
 * ─────────────────────────────────────────────
 * Reusable call-to-action section component.
 * 
 * CSS Classes Used:
 * - .cta-section: Main container
 * - .cta-section-content: Flex centered layout
 * - .cta-section-title: Responsive h2 title
 * - .cta-section-description: Description text with max-width
 * - .cta-section-button: Styled button link with hover effects
 * 
 * Props:
 *   title: Section heading text
 *   description: Description/subtitle text
 *   buttonText: Button label (default: "Get Started")
 *   buttonLink: Button href (default: "#")
 */
export default function CTASection({
  title,
  description,
  buttonText = "Get Started",
  buttonLink = "#"
}: CTASectionProps) {
  return (
    <div className="cta-section">
      <ScrollFade>
        <div className="cta-section-content">
          <h2 className="cta-section-title">
            {title}
          </h2>
          <div className="cta-section-description">
            {description}
          </div>
          <a
            href={buttonLink}
            className="cta-section-button"
          >
            {buttonText}
          </a>
        </div>
      </ScrollFade>
    </div>
  );
}
