import React from 'react';
import Link from 'next/link';

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

/**
 * TextLink component - Uses CSS variables for colors instead of Tailwind utilities.
 * Ensures consistent link styling across the site.
 */
export default function TextLink({
  href,
  children,
  className = '',
  external = false,
}: TextLinkProps) {
  const baseClass = 'text-link';

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseClass} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${baseClass} ${className}`}>
      {children}
    </Link>
  );
}
