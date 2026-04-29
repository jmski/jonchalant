'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

/**
 * Portal route group error boundary. Renders inside PortalShell so the
 * sidebar + nav stay intact when a lesson page or dashboard fails.
 */
export default function PortalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[portal-error]', error);
  }, [error]);

  return (
    <div className="error-state">
      <p className="error-state-eyebrow">Portal error</p>
      <h1 className="error-state-title">This part of the portal failed to load.</h1>
      <p className="error-state-body">
        Your progress is safe. Try again, or head back to the dashboard.
      </p>
      <div className="error-state-actions">
        <Button onClick={reset}>Try again</Button>
        <Button as="link" href="/portal" variant="secondary">
          Dashboard
        </Button>
      </div>
      {error.digest && (
        <p className="error-state-detail">
          Reference: <code>{error.digest}</code>
        </p>
      )}
    </div>
  );
}
