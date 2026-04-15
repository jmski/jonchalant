interface WhyExistsProps {
  headline: string;
  body: string;
  highlight?: string;
}

const CALLOUT_PREFIXES = ['The kid ', 'The teenager ', 'The adult '];

export function WhyExists({ headline, body, highlight }: WhyExistsProps) {
  const paragraphs = body.split('\n\n').filter(Boolean);

  const introParagraphs: string[] = [];
  const calloutItems: string[] = [];
  const remainingParagraphs: string[] = [];

  let phase: 'intro' | 'callout' | 'after' = 'intro';
  for (const para of paragraphs) {
    const isCallout = CALLOUT_PREFIXES.some((prefix) => para.startsWith(prefix));
    if (phase === 'intro' && isCallout) phase = 'callout';
    if (phase === 'callout' && !isCallout) phase = 'after';
    if (phase === 'intro') introParagraphs.push(para);
    else if (phase === 'callout') calloutItems.push(para);
    else remainingParagraphs.push(para);
  }

  return (
    <section className="about-why-exists-section">
      <span className="about-why-exists-label">{headline}</span>
      {highlight && <span className="about-highlight">{highlight}</span>}

      {introParagraphs.length > 0 && (
        <div className="about-why-exists-body">
          {introParagraphs.map((para, idx) => (
            <p key={idx} className="about-why-exists-paragraph">{para}</p>
          ))}
        </div>
      )}

      {calloutItems.length > 0 && (
        <ul className="about-callout-list">
          {calloutItems.map((item, idx) => (
            <li key={idx} className="about-callout-item">{item}</li>
          ))}
        </ul>
      )}

      {remainingParagraphs.length > 0 && (
        <div className="about-why-exists-body">
          {remainingParagraphs.map((para, idx) => (
            <p key={idx} className="about-why-exists-paragraph">{para}</p>
          ))}
        </div>
      )}
    </section>
  );
}
