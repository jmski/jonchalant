import { useState, useCallback, useRef, useEffect } from 'react'

interface FormSubmissionState {
  isSubmitting: boolean
  submitted: boolean
  error: string | null
}

interface UseFormSubmissionOptions<TData> {
  endpoint: string
  onSuccess?: (result: unknown) => void
  onError?: (error: string) => void
  resetDelay?: number
  transform?: (data: TData) => Record<string, unknown>
}

const INITIAL_STATE: FormSubmissionState = {
  isSubmitting: false,
  submitted: false,
  error: null,
}

export function useFormSubmission<TData = Record<string, unknown>>(
  options: UseFormSubmissionOptions<TData>
) {
  const [state, setState] = useState<FormSubmissionState>(INITIAL_STATE)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const submit = useCallback(async (data: TData) => {
    setState({ isSubmitting: true, submitted: false, error: null })

    try {
      const body = options.transform ? options.transform(data) : data
      const response = await fetch(options.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Request failed')
      }

      setState({ isSubmitting: false, submitted: true, error: null })
      options.onSuccess?.(result)

      if (options.resetDelay && options.resetDelay > 0) {
        timerRef.current = setTimeout(() => {
          setState(prev => ({ ...prev, submitted: false }))
        }, options.resetDelay)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setState({ isSubmitting: false, submitted: false, error: message })
      options.onError?.(message)
    }
  }, [options])

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setState(INITIAL_STATE)
  }, [])

  return { state, submit, reset }
}
