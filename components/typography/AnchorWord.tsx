import type { ReactNode } from 'react';

interface AnchorWordProps {
  children: string;
  as?: 'span' | 'em' | 'strong';
  variant?: 'default' | 'large' | 'inline';
  noItalic?: boolean;
}

/**
 * AnchorWord — the signature italic mocha treatment for emphasis words.
 * Use on emphatic headings and pull-quotes only (presence, stillness, grounded, etc.).
 * Never use inside body paragraphs.
 */
export function AnchorWord({
  children,
  as: Tag = 'span',
  variant = 'inline',
  noItalic = false,
}: AnchorWordProps): ReactNode {
  const className = [
    'anchor-word',
    variant !== 'default' ? `anchor-word--${variant}` : '',
    noItalic ? 'anchor-word--no-italic' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return <Tag className={className}>{children}</Tag>;
}

export default AnchorWord;
