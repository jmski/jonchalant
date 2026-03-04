'use client';
import { ScrollFade } from "@/components/animations";

interface CTASectionProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

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
          <h2 className="text-3xl sm:text-4xl font-bold cta-section-title">
            {title}
          </h2>
          <div className="cta-section-description text-lg leading-relaxed">
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
