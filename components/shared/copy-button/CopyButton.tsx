'use client';

import { useState } from 'react';

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — fail silently
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`copy-button${copied ? ' copy-button--copied' : ''}`}
      aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
    >
      {copied ? 'Copied ✓' : 'Copy'}
    </button>
  );
}
