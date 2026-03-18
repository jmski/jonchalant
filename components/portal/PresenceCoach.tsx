'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export interface PresenceCoachProps {
  userId: string
  firstName: string
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function PresenceCoach({ userId, firstName }: PresenceCoachProps) {
  const greeting = `Hi ${firstName} — I'm your AI Presence Coach. What's on your mind today? A meeting coming up, a pattern you want to break, or something you want to work through?`

  const [messages, setMessages] = useState<Message[]>([
    { id: 'greeting', role: 'assistant', content: greeting },
  ])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [isLimited, setIsLimited] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [remaining, setRemaining] = useState(20)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  // Scroll to bottom whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Auto-resize textarea up to 4 lines
  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    // 24px line-height * 4 lines + 32px vertical padding
    const maxHeight = 24 * 4 + 32
    el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px'
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    resizeTextarea()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void handleSubmit()
    }
  }

  const handleSubmit = useCallback(async () => {
    const trimmed = input.trim()
    if (!trimmed || isStreaming || isLimited) return

    setError(null)
    setInput('')
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
    }
    const assistantMsg: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
    }

    // Snapshot for the API payload — includes user message, not the empty assistant placeholder
    const historyForApi = [...messages, userMsg].map(({ role, content }) => ({
      role,
      content,
    }))

    setMessages(prev => [...prev, userMsg, assistantMsg])
    setIsStreaming(true)

    abortRef.current = new AbortController()

    try {
      const res = await fetch('/api/presence-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyForApi, userId }),
        signal: abortRef.current.signal,
      })

      if (res.status === 429) {
        setIsLimited(true)
        // Remove the empty assistant placeholder
        setMessages(prev => prev.slice(0, -1))
        return
      }

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(
          (data as { error?: string }).error ?? 'Something went wrong. Please try again.',
        )
      }

      // Update remaining count from response header
      const remainingHeader = res.headers.get('X-RateLimit-Remaining')
      if (remainingHeader !== null) {
        setRemaining(Math.max(0, parseInt(remainingHeader, 10)))
      }

      if (!res.body) throw new Error('No response body')

      // Read SSE stream and update the assistant message token by token
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        // Keep any incomplete last line in the buffer
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data:')) continue
          const raw = line.slice(5).trim()
          if (!raw || raw === '[DONE]') continue

          let parsed: Record<string, unknown>
          try {
            parsed = JSON.parse(raw)
          } catch {
            continue
          }

          // Anthropic SSE: content_block_delta carries text tokens
          if (
            parsed.type === 'content_block_delta' &&
            parsed.delta != null &&
            typeof (parsed.delta as Record<string, unknown>).text === 'string'
          ) {
            const token = (parsed.delta as { text: string }).text
            setMessages(prev => {
              const next = [...prev]
              const last = next[next.length - 1]
              if (last?.role === 'assistant') {
                next[next.length - 1] = { ...last, content: last.content + token }
              }
              return next
            })
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return
      const msg =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(msg)
      // Remove empty assistant placeholder on error
      setMessages(prev => {
        const last = prev[prev.length - 1]
        return last?.role === 'assistant' && last.content === ''
          ? prev.slice(0, -1)
          : prev
      })
    } finally {
      setIsStreaming(false)
    }
  }, [input, isStreaming, isLimited, messages, userId])

  return (
    <div className="presence-coach">
      {/* ── Messages ── */}
      <div className="presence-coach-messages" role="log" aria-live="polite" aria-label="Coaching conversation">
        {messages.map((msg, i) => {
          const isLastAssistant =
            msg.role === 'assistant' && i === messages.length - 1
          const showTyping = isLastAssistant && msg.content === '' && isStreaming

          return (
            <div
              key={msg.id}
              className={
                msg.role === 'user'
                  ? 'presence-coach-row presence-coach-row--user'
                  : 'presence-coach-row presence-coach-row--assistant'
              }
            >
              {msg.role === 'assistant' && (
                <div className="presence-coach-avatar" aria-hidden="true">
                  J
                </div>
              )}

              <div className="presence-coach-bubble-col">
                {msg.role === 'assistant' && (
                  <span className="presence-coach-label">Jon AI</span>
                )}
                <div
                  className={
                    msg.role === 'user'
                      ? 'presence-coach-bubble presence-coach-bubble--user'
                      : 'presence-coach-bubble presence-coach-bubble--assistant'
                  }
                >
                  {showTyping ? (
                    <span className="presence-coach-typing" aria-label="Thinking">
                      <span />
                      <span />
                      <span />
                    </span>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {/* Inline error with retry */}
        {error && (
          <div className="presence-coach-error-row">
            <span className="presence-coach-error-text">{error}</span>
            <button
              className="presence-coach-retry"
              onClick={() => setError(null)}
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Input area ── */}
      <div className="presence-coach-footer">
        {isLimited ? (
          <p className="presence-coach-limit-msg">
            You&rsquo;ve reached your daily coaching limit. Come back tomorrow.
          </p>
        ) : (
          <>
            <div className="presence-coach-input-row">
              <textarea
                ref={textareaRef}
                className="presence-coach-textarea"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="What's on your mind? (Enter to send, Shift+Enter for new line)"
                rows={1}
                disabled={isStreaming}
                aria-label="Message input"
              />
              <button
                className="presence-coach-send"
                onClick={() => void handleSubmit()}
                disabled={isStreaming || !input.trim()}
                aria-label="Send message"
              >
                {/* Arrow icon */}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M14 8L2 2l3.5 6L2 14l12-6z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            <p className="presence-coach-counter">
              {remaining} message{remaining !== 1 ? 's' : ''} remaining today
            </p>
          </>
        )}
      </div>
    </div>
  )
}
