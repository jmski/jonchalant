import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Page not found',
};

/**
 * Root not-found page. App router renders this when notFound() is called
 * from a server component or a route doesn't match.
 */
export default function NotFound() {
  return (
    <main className="error-state">
      <p className="error-state-eyebrow">404</p>
      <h1 className="error-state-title">We couldn&rsquo;t find that page.</h1>
      <p className="error-state-body">
        The link may be old, or you may have followed a typo. Try one of these instead.
      </p>
      <div className="error-state-actions">
        <Button as="link" href="/">Home</Button>
        <Button as="link" href="/ikigai" variant="secondary">
          Take the ikigai assessment
        </Button>
        <Button as="link" href="/blog" variant="tertiary">
          Read the blog
        </Button>
      </div>
      <p className="error-state-detail">
        Looking for something specific?{' '}
        <Link href="/contact" style={{ color: 'var(--accent-primary)' }}>
          Get in touch
        </Link>
        .
      </p>
    </main>
  );
}
