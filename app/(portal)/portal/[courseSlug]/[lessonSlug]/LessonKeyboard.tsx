'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  prevHref: string | null
  nextHref: string | null
}

export default function LessonKeyboard({ prevHref, nextHref }: Props) {
  const router = useRouter()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) return
      if (e.ctrlKey || e.metaKey || e.altKey) return

      if (e.key === 'ArrowRight' && nextHref) {
        e.preventDefault()
        router.push(nextHref)
      } else if (e.key === 'ArrowLeft' && prevHref) {
        e.preventDefault()
        router.push(prevHref)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [router, prevHref, nextHref])

  return null
}
