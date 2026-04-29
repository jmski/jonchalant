import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Lesson not found',
};

/**
 * Portal-scoped not-found. Triggered when notFound() is called from a
 * /portal/[courseSlug]/[lessonSlug] route or similar. Renders inside
 * PortalShell so the sidebar stays put.
 */
export default function PortalNotFound() {
  return (
    <div className="error-state">
      <p className="error-state-eyebrow">404</p>
      <h1 className="error-state-title">We couldn&rsquo;t find that lesson.</h1>
      <p className="error-state-body">
        It may have moved, or you may not have access yet. The sidebar shows everything you can open.
      </p>
      <div className="error-state-actions">
        <Button as="link" href="/portal">Dashboard</Button>
        <Button as="link" href="/portal/four-circles" variant="secondary">
          Four Circles course
        </Button>
      </div>
    </div>
  );
}
