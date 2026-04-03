import Link from 'next/link';

interface MeetJonProps {
  heading?: string;
  body?: string;
  linkText?: string;
}

export function MeetJon({
  heading = 'Meet Jon',
  body = 'Jon is an executive presence coach who spent years studying movement, embodiment, and communication to develop a body-aware approach to leadership. He works with introverts and quiet professionals who want to lead authentically — without performing confidence they don\'t feel.',
  linkText = 'Read the full story',
}: MeetJonProps) {
  return (
    <section className="meet-jon-section">
      <div className="meet-jon-inner">
        <div className="meet-jon-photo-col" aria-hidden="true">
          <div className="meet-jon-photo-placeholder" />
        </div>
        <div className="meet-jon-copy-col">
          <span className="section-eyebrow">About Jon</span>
          <h2 className="meet-jon-heading">{heading}</h2>
          <p className="meet-jon-body">{body}</p>
          <Link href="/about" className="meet-jon-link">
            {linkText} →
          </Link>
        </div>
      </div>
    </section>
  );
}
