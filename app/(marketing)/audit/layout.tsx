import type { ReactNode } from 'react'
import AuditImmersiveMode from './AuditImmersiveMode'

export default function AuditLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AuditImmersiveMode />
      {children}
    </>
  )
}
