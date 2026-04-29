'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

/**
 * Root error boundary for the entire app, including layout-level failures
 * that the route-group error.tsx files can't catch.
 *
 * MUST render its own <html> and <body> because it replaces the root layout.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[global-error]', error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          background: '#f8f8f5',
          color: '#1a1a1a',
        }}
      >
        <main className="error-state">
          <p className="error-state-eyebrow">Something went sideways</p>
          <h1 className="error-state-title">The site hit an error.</h1>
          <p className="error-state-body">
            We&rsquo;ve logged it. Try reloading, and if the issue continues, get in touch.
          </p>
          <div className="error-state-actions">
            <Button onClick={reset}>Reload</Button>
            <Button as="a" href="/" variant="secondary">
              Back to home
            </Button>
          </div>
          {error.digest && (
            <p className="error-state-detail">
              Reference: <code>{error.digest}</code>
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
