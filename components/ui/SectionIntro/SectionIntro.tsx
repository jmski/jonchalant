import type { ReactNode } from 'react'
import { SectionHeader } from '@/components/ui/SectionHeader'

interface SectionIntroProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  children?: ReactNode
  className?: string
}

export default function SectionIntro({
  eyebrow,
  title,
  description,
  align = 'left',
  children,
  className = '',
}: SectionIntroProps) {
  return (
    <div className={`section-intro ${className}`.trim()}>
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        align={align}
      />
      {children}
    </div>
  )
}
