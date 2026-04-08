import { useState, useCallback, type KeyboardEvent } from 'react'

interface UseKeyboardNavigationOptions {
  itemCount: number
  onSelect?: (index: number) => void
  orientation?: 'vertical' | 'horizontal'
  loop?: boolean
}

export function useKeyboardNavigation({
  itemCount,
  onSelect,
  orientation = 'vertical',
  loop = true,
}: UseKeyboardNavigationOptions) {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const prevKey = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
      const nextKey = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'

      if (e.key === nextKey) {
        e.preventDefault()
        setActiveIndex(prev => {
          const next = prev + 1
          if (next >= itemCount) return loop ? 0 : prev
          return next
        })
      } else if (e.key === prevKey) {
        e.preventDefault()
        setActiveIndex(prev => {
          const next = prev - 1
          if (next < 0) return loop ? itemCount - 1 : prev
          return next
        })
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect?.(activeIndex)
      }
    },
    [itemCount, onSelect, orientation, loop, activeIndex]
  )

  const getItemProps = useCallback(
    (index: number) => ({
      tabIndex: index === activeIndex ? 0 : -1,
      onKeyDown: handleKeyDown,
      'aria-selected': index === activeIndex,
    }),
    [activeIndex, handleKeyDown]
  )

  return { activeIndex, setActiveIndex, getItemProps }
}
