import { useState, useCallback, useMemo } from 'react'

interface UseMultiStepOptions {
  steps: string[]
  initialStep?: string
}

export function useMultiStep({ steps, initialStep }: UseMultiStepOptions) {
  const [currentStep, setCurrentStep] = useState(initialStep ?? steps[0])

  const stepIndex = steps.indexOf(currentStep)
  const totalSteps = steps.length
  const isFirst = stepIndex === 0
  const isLast = stepIndex === totalSteps - 1
  const progress = useMemo(
    () => totalSteps > 1 ? Math.round((stepIndex / (totalSteps - 1)) * 100) : 100,
    [stepIndex, totalSteps]
  )

  const next = useCallback(() => {
    if (!isLast) setCurrentStep(steps[stepIndex + 1])
  }, [isLast, steps, stepIndex])

  const back = useCallback(() => {
    if (!isFirst) setCurrentStep(steps[stepIndex - 1])
  }, [isFirst, steps, stepIndex])

  const goTo = useCallback((step: string) => {
    if (steps.includes(step)) setCurrentStep(step)
  }, [steps])

  return {
    currentStep,
    stepIndex,
    totalSteps,
    isFirst,
    isLast,
    next,
    back,
    goTo,
    progress,
  }
}
