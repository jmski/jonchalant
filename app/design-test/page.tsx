import SectionWrapper from '@/components/layout/SectionWrapper';
import SectionContent from '@/components/layout/SectionContent';

const phrases: { key: string; content: React.ReactNode }[] = [
  {
    key: 'room',
    content: 'Are you in the right room, playing the wrong role?',
  },
  {
    key: 'medium',
    content: (
      <>
        The medium changes. The <em>fundamentals</em> don&apos;t.
      </>
    ),
  },
  {
    key: 'lost',
    content: "Most professionals aren’t lost. They’re close.",
  },
];

export const metadata = {
  robots: { index: false, follow: false },
  title: 'Design Test — jc-kinetic primitive',
};

export default function DesignTestPage() {
  return (
    <>
      {/* Label */}
      <div style={{ padding: '1rem 2rem', fontFamily: 'monospace', fontSize: '0.75rem', background: '#ffe', borderBottom: '1px solid #ccc' }}>
        /design-test — .jc-kinetic primitive isolation. Not linked from nav or sitemap.
      </div>

      {/* ── CREAM (primary) ─────────────────────────────────── */}
      <SectionWrapper variant="primary">
        <SectionContent>
          <p style={{ fontFamily: 'monospace', fontSize: '0.7rem', marginBottom: '2rem', opacity: 0.5 }}>
            variant=&quot;primary&quot; — cream background, --mocha-deep text. em → --mocha-mousse + WONK 1
          </p>
          {phrases.map(({ key, content }) => (
            <div key={key} className="jc-kinetic-frame">
              <p className="jc-kinetic">{content}</p>
            </div>
          ))}
        </SectionContent>
      </SectionWrapper>

      {/* ── DARK ────────────────────────────────────────────── */}
      <SectionWrapper variant="dark">
        <SectionContent>
          <p style={{ fontFamily: 'monospace', fontSize: '0.7rem', marginBottom: '2rem', opacity: 0.5, color: 'var(--text-white)' }}>
            variant=&quot;dark&quot; — mocha-deep background, --text-white + #E8C8B0 em
          </p>
          {phrases.map(({ key, content }) => (
            <div key={key} className="jc-kinetic-frame">
              <p className="jc-kinetic">{content}</p>
            </div>
          ))}
        </SectionContent>
      </SectionWrapper>
    </>
  );
}
