import Link from "next/link";
import { Badge } from "@/components/utilities/badges";

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

        <ul className="program-track-card-includes" aria-label="What's included">
          {includes.map((item, i) => (
            <li key={i} className="program-track-card-includes-item">
              <span className="program-track-card-includes-check" aria-hidden="true">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="program-track-card-cta">
        {ctaHref.startsWith('http') ? (
          <a href={ctaHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            {ctaText}
          </a>
        ) : (
          <Link href={ctaHref} className="btn btn-primary">
            {ctaText}
          </Link>
        )}
      </div>
    </article>
  );
}
