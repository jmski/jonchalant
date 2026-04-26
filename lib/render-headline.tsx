/**
 * Converts the first {{word}} marker in a headline string into <em>word</em>.
 * Additional {{...}} markers are stripped of braces and rendered as plain text.
 *
 * Used by the shared Hero component and any page that renders a
 * kinetic-anchor headline (e.g. Foundation page hero).
 *
 * Example:
 *   renderHeadline('Most people are in the right industry. {{Wrong}} role.')
 *   → <>Most people are in the right industry. <em>Wrong</em> role.</>
 */
export function renderHeadline(headline: string): React.ReactNode {
  const anchorPattern = /\{\{(.+?)\}\}/
  const firstMatch = anchorPattern.exec(headline)

  if (!firstMatch) {
    return headline
  }

  const [fullMatch, anchorWord] = firstMatch
  const splitIndex = headline.indexOf(fullMatch)
  const before = headline.slice(0, splitIndex)
  const after = headline.slice(splitIndex + fullMatch.length).replace(/\{\{(.+?)\}\}/g, '$1')

  return (
    <>
      {before}
      <em>{anchorWord}</em>
      {after}
    </>
  )
}
