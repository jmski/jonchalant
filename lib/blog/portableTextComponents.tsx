/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Portable Text components configuration for blog content rendering
 * Used in both blog listing and individual post pages
 */

/** Converts a heading string to a URL-safe anchor id. */
function toAnchorId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export const portableTextComponents = {
  types: {
    block: ({ value }: any) => {
      const style = value._type === 'block' ? value.style : 'normal';
      const text: string = value.children?.map((c: any) => c.text).join('') ?? '';

      if (style === 'h2') {
        return (
          <h2 id={toAnchorId(text)} className="blog-content h2">
            {value.children.map((child: any) => child.text).join('')}
          </h2>
        );
      }
      if (style === 'h3') {
        return (
          <h3 id={toAnchorId(text)} className="blog-content h3">
            {value.children.map((child: any) => child.text).join('')}
          </h3>
        );
      }
      if (style === 'blockquote') {
        return (
          <blockquote className="blog-content blockquote">
            {value.children.map((child: any) => child.text).join('')}
          </blockquote>
        );
      }

      return (
        <p className="blog-content p">
          {value.children?.map((child: any) => (
            <span key={child._key || Math.random()}>
              {child.text}
            </span>
          ))}
        </p>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="blog-content ul">
        {children}
      </ul>
    ),
    number: ({ children }: any) => (
      <ol className="blog-content ol">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="blog-content code">
        {children}
      </code>
    ),
    link: ({ value, children }: any) => (
      <a href={value?.href} className="blog-content a link-underline-draw">
        {children}
      </a>
    ),
  },
};
