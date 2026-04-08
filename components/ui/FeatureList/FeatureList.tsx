interface FeatureListProps {
  items: string[]
  icon?: 'check' | 'dash' | 'arrow'
  limit?: number
  className?: string
}

const ICONS = {
  check: '✓',
  dash: '—',
  arrow: '→',
} as const

export default function FeatureList({
  items,
  icon = 'check',
  limit,
  className = '',
}: FeatureListProps) {
  const visible = limit ? items.slice(0, limit) : items
  const remaining = limit ? items.length - limit : 0

  return (
    <ul className={`feature-list ${className}`.trim()}>
      {visible.map((item, idx) => (
        <li key={idx} className="feature-list-item">
          <span className="feature-list-icon">{ICONS[icon]}</span>
          <span className="feature-list-text">{item}</span>
        </li>
      ))}
      {remaining > 0 && (
        <li className="feature-list-item feature-list-more">
          +{remaining} more
        </li>
      )}
    </ul>
  )
}
