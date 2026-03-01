'use client';

interface SidebarToggleProps {
  onClick: () => void;
}

/**
 * Mobile sidebar toggle button
 * Only visible on mobile devices (see CSS: display: none on desktop)
 */
export default function SidebarToggle({ onClick }: SidebarToggleProps) {
  return (
    <button
      className="sidebar-toggle"
      onClick={onClick}
      aria-label="Toggle navigation menu"
    >
      ☰ MENU
    </button>
  );
}
