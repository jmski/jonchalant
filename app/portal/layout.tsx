import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/auth-context';

// Auth-gated portal: prevent search engines from indexing lesson content
export const metadata: Metadata = {
  title: {
    default: 'Learning Portal | The Kinetic Leader',
    template: '%s | Kinetic Leader Portal',
  },
  description: 'Access your Kinetic Leader learning portal. Complete lessons, track your progress, and develop executive presence through body-aware leadership training.',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

interface PortalLayoutProps {
  children: React.ReactNode;
}

/**
 * Portal Layout
 * Simple layout wrapper for portal pages
 */
export default function PortalLayout({ children }: PortalLayoutProps) {
  return (
    <AuthProvider>
      <main className="main-content" id="main-content">
        {children}
      </main>
    </AuthProvider>
  );
}
