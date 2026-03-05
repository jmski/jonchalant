'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
  category: 'coaching' | 'timeline' | 'pricing' | 'results'
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'How long does a typical coaching engagement last?',
    answer: 'Most clients work with me for 8-12 weeks in intensive programs, though I also offer ongoing monthly coaching for sustained development. Some choose a single intensive session to start.',
    category: 'timeline',
  },
  {
    question: "What's included in a corporate leadership workshop?",
    answer: 'Workshops include movement fundamentals, interactive presence exercises, group feedback, resource materials, and follow-up resources. Custom workshops can include pre/post assessments.',
    category: 'pricing',
  },
  {
    question: 'How do I know if coaching is working?',
    answer: 'Clients typically report increased confidence in meeting rooms (83%), better emotional regulation (76%), and improved influence perception (89%) within 8 weeks. We track specific metrics aligned to your goals.',
    category: 'results',
  },
  {
    question: 'Can I do coaching remotely?',
    answer: 'Yes, all coaching is available remotely via Zoom. Many clients prefer this for flexibility, though in-person options are available in NYC.',
    category: 'coaching',
  },
]

export function FAQ() {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      {FAQ_ITEMS.map((item, idx) => (
        <div
          key={idx}
          className="border rounded-lg transition-colors"
          style={{
            borderColor: expanded === idx ? 'var(--accent-primary)' : '#d4cfc7',
          }}
        >
          <button
            onClick={() => setExpanded(expanded === idx ? null : idx)}
            className="w-full p-6 text-left font-semibold text-slate-900 hover:bg-slate-50 flex items-center justify-between"
          >
            {item.question}
            <span style={{ color: 'var(--accent-primary)' }}>
              {expanded === idx ? '−' : '+'}
            </span>
          </button>
          {expanded === idx && (
            <div className="px-6 pb-6 text-slate-700" style={{ borderTop: '1px solid #d4cfc7' }}>
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
