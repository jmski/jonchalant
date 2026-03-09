interface PortalLayoutProps {
  children: React.ReactNode;
}

/**
 * Portal Layout
 * Simple layout wrapper for portal pages
 */
export default function PortalLayout({ children }: PortalLayoutProps) {
  return (
    <main className="main-content" id="main-content">
      {children}
    </main>
  );
}
