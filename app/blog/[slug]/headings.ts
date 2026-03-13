/** Converts a heading string to a URL-safe anchor id. */
export function toAnchorId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export interface ToCHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Derives the heading list from Sanity portable text blocks. Safe to call on the server. */
export function extractHeadings(content: any[]): ToCHeading[] {
  if (!Array.isArray(content)) return [];
  const headings: ToCHeading[] = [];

  for (const block of content) {
    if (block._type !== 'block') continue;
    if (block.style !== 'h2' && block.style !== 'h3') continue;
    const text: string = block.children?.map((c: any) => c.text ?? '').join('') ?? '';
    if (!text.trim()) continue;
    headings.push({ id: toAnchorId(text), text, level: block.style === 'h2' ? 2 : 3 });
  }

  return headings;
}
