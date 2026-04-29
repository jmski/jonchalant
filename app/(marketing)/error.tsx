'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

/**
 * Marketing route group error boundary.
 * Catches render + data-fetch errors in any (marketing) page.
 */
export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[marketing-error]', error);
  }, [error]);

  return (
    <main className="error-state">
      <p className="error-state-eyebrow">Something went sideways</p>
      <h1 className="error-state-title">This page hit a snag.</h1>
      <p className="error-state-body">
        We&rsquo;ve logged the error and will look into it. Try again, or head back home.
      </p>
      <div className="error-state-actions">
        <Button onClick={reset}>Try again</Button>
        <Button as="link" href="/" variant="secondary">
          Back to home
        </Button>
      </div>
      {error.digest && (
        <p className="error-state-detail">
          Reference: <code>{error.digest}</code>
        </p>
      )}
      <p className="error-state-detail" style={{ marginTop: '0.5rem' }}>
        Still stuck?{' '}
        <Link href="/contact" style={{ color: 'var(--accent-primary)' }}>
          Get in touch
        </Link>
        .
      </p>
    </main>
  );
}
