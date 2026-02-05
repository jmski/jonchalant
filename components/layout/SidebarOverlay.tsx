'use client';

interface SidebarOverlayProps {
  isOpen: boolean;
  onClick: () => void;
}

/**
 * Mobile overlay backdrop for sidebar
 * Only visible when sidebar is open on mobile devices
 * Clicking overlay closes sidebar
 */
export default function SidebarOverlay({ isOpen, onClick }: SidebarOverlayProps) {
  return (
    <div
      className={`sidebar-overlay ${isOpen ? 'mobile-open' : ''}`}
      onClick={onClick}
      aria-hidden="true"
    />
  );
}
