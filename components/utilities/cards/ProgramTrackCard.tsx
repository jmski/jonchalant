import { Badge } from "@/components/utilities/badges";
import { Button } from '@/components/ui/Button';
import { FeatureList } from '@/components/ui/FeatureList';

interface ProgramTrackCardProps {
  title: string;
  eyebrow?: string;
  price: string;
  description: string;
  includes: string[];
  ctaText: string;
  ctaHref: string;
  isFeatured: boolean;
}

export function ProgramTrackCard({
  title,
  eyebrow,
  price,
  description,
  includes,
  ctaText,
  ctaHref,
  isFeatured,
}: ProgramTrackCardProps) {
  return (
    <article className={`program-track-card${isFeatured ? " program-track-card--featured" : ""}`}>
      <div className="program-track-card-header">
        {isFeatured ? (
          <Badge size="sm" variant="accent">Most Popular</Badge>
        ) : (
          eyebrow && <p className="program-track-card-eyebrow">{eyebrow}</p>
        )}
      </div>

      <div className="program-track-card-body">
        {isFeatured && eyebrow && (
          <p className="program-track-card-eyebrow">{eyebrow}</p>
        )}

        <h3 className="program-track-card-title">{title}</h3>

        <p className="program-track-card-price">{price}</p>

        <p className="program-track-card-description">{description}</p>

        <FeatureList items={includes} icon="check" className="program-track-card-includes" />
      </div>

      <div className="program-track-card-cta">
        {ctaHref.startsWith('http') ? (
          <Button as="a" href={ctaHref} target="_blank" rel="noopener noreferrer">
            {ctaText}
          </Button>
        ) : (
          <Button as="link" href={ctaHref}>
            {ctaText}
          </Button>
        )}
      </div>
    </article>
  );
}
