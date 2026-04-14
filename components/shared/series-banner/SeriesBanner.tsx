import Link from 'next/link';
import type { BlogConfig } from '@/lib/types';

interface SeriesBannerProps {
  siteSettings: BlogConfig | null | undefined;
}

export function SeriesBanner({ siteSettings }: SeriesBannerProps) {
  if (!siteSettings?.seriesBannerEnabled) return null;

  return (
    <div className="series-banner">
      <div className="series-banner-inner">
        {/* seriesStatus: e.g. "THE LAB · ONGOING" — set in Sanity Studio > Blog Config */}
        {siteSettings.seriesStatus && (
          <p className="series-banner-eyebrow">{siteSettings.seriesStatus}</p>
        )}
        {/* seriesName: e.g. "Going First" — set in Sanity Studio > Blog Config */}
        {siteSettings.seriesName && (
          <h2 className="series-banner-title">{siteSettings.seriesName}</h2>
        )}
        {/* seriesDescription: e.g. "I'm putting myself through the Foundation program
            and documenting everything — what's working, what's hard, what's actually
            changing. Updated as I go." — set in Sanity Studio > Blog Config */}
        {siteSettings.seriesDescription && (
          <p className="series-banner-description">{siteSettings.seriesDescription}</p>
        )}
        {/* seriesCurrentPhase: e.g. "Phase 2 — Posture & Grounding" — set in Sanity Studio > Blog Config */}
        {siteSettings.seriesCurrentPhase && (
          <p className="series-banner-phase">Currently: {siteSettings.seriesCurrentPhase}</p>
        )}
        {/* seriesCTALabel: e.g. "Follow The Lab →" — set in Sanity Studio > Blog Config */}
        {siteSettings.seriesCTALabel && siteSettings.seriesSlug && (
          <Link
            href={`/blog?pillar=${siteSettings.seriesSlug}`}
            className="series-banner-cta"
          >
            {siteSettings.seriesCTALabel}
          </Link>
        )}
      </div>
    </div>
  );
}
