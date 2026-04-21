'use client'

import { useEffect } from 'react'

export default function AuditImmersiveMode() {
  useEffect(() => {
    document.body.classList.add('audit-immersive-mode')

    return () => {
      document.body.classList.remove('audit-immersive-mode')
    }
  }, [])

  return null
}
