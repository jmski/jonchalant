export default function FontTest() {
  return (
    <main style={{ padding: '4rem', background: '#F4EBE0' }}>
      <h1 style={{
        fontFamily: 'Fraunces, serif',
        fontSize: '5rem',
        fontWeight: 400,
        lineHeight: 1,
        color: '#2A1F1A',
        margin: 0,
        fontVariationSettings: '"opsz" 144, "SOFT" 100',
      }}>
        Find the{' '}
        <em style={{
          fontStyle: 'italic',
          color: '#A47864',
          fontVariationSettings: '"opsz" 144, "SOFT" 100, "WONK" 1',
        }}>
          work
        </em>{' '}
        you were meant for.
      </h1>
      <p style={{
        marginTop: '2rem',
        fontFamily: 'Fraunces, serif',
        fontSize: '5rem',
        fontWeight: 400,
        lineHeight: 1,
        color: '#2A1F1A',
      }}>
        Find the{' '}
        <em style={{ fontStyle: 'italic', color: '#A47864' }}>
          work
        </em>{' '}
        you were meant for.
      </p>
      <p style={{ fontFamily: 'DM Sans', marginTop: '3rem', color: '#5C4A3F' }}>
        Top line uses opsz 144 + SOFT 100 + WONK 1 on the italic.
        Bottom line is plain italic for comparison.
        If the top italic &ldquo;work&rdquo; looks noticeably more asymmetric,
        flared, or informal than the bottom one, WONK is working.
        If they look identical, WONK is not loading.
      </p>
    </main>
  );
}
