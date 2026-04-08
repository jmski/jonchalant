import Heading from '@/components/typography/Heading'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'section-header--center' : ''

  return (
    <header className={`section-header ${alignClass} ${className}`.trim()}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      <Heading level={2} className="section-title">{title}</Heading>
      {description && <p className="section-description">{description}</p>}
    </header>
  )
}
