'use client';
import { ScrollFade } from "@/components/animations";
import { Button } from '@/components/ui/Button';

interface CTAProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function CTA({
  title,
  description,
  buttonText = "Get Started",
  buttonLink = "#"
}: CTAProps) {
  return (
    <ScrollFade>
      <div className="cta-section">
        <div className="cta-section-left">
          <h2 className="cta-section-title">{title}</h2>
          <Button as="link" href={buttonLink}>{buttonText}</Button>
        </div>
        <div className="cta-section-description">
          {description}
        </div>
      </div>
    </ScrollFade>
  );
}
