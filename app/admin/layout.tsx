interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Admin Layout
 * Wrapper for admin pages
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <main className="main-content" id="main-content">
      {children}
    </main>
  );
}
