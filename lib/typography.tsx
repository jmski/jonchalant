import type { ReactNode } from 'react';
import { AnchorWord } from '@/components/typography/AnchorWord';

/**
 * Splits a string and wraps any matching anchor words in <AnchorWord>.
 * This is a presentational-only helper — it does not modify Sanity content,
 * only the rendered output.
 *
 * @param text - The source string from Sanity (headline or pull-quote)
 * @param words - Array of words to highlight (case-insensitive match)
 * @returns Array of strings and ReactNodes ready for JSX rendering
 *
 * @example
 * withAnchorWords("The quiet path to presence", ["presence"])
 * // → ["The quiet path to ", <AnchorWord>presence</AnchorWord>]
 */
export function withAnchorWords(text: string, words: string[]): ReactNode[] {
  if (!words.length) return [text];

  // Build a regex that matches any of the anchor words (whole-word, case-insensitive)
  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(`(\\b(?:${escaped.join('|')})\\b)`, 'gi');

  const parts = text.split(pattern);

  return parts.map((part, i) => {
    const isMatch = words.some(
      (w) => w.toLowerCase() === part.toLowerCase()
    );
    if (isMatch) {
      return (
        <AnchorWord key={i}>{part}</AnchorWord>
      );
    }
    return part;
  });
}
