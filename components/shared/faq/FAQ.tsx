'use client'

import { useState } from 'react'

export interface FAQItem {
  question: string
  answer: string
}

const FALLBACK_ITEMS: FAQItem[] = [
  {
    question: 'How long does a typical coaching engagement last?',
    answer: 'Most clients work with me for 8-12 weeks in intensive programs, though I also offer ongoing monthly coaching for sustained development. Some choose a single intensive session to start.',
  },
  {
    question: "What's included in a corporate leadership workshop?",
    answer: 'Workshops include movement fundamentals, interactive presence exercises, group feedback, resource materials, and follow-up resources. Custom workshops can include pre/post assessments.',
  },
  {
    question: 'How do I know if coaching is working?',
    answer: 'Clients typically report increased confidence in meeting rooms (83%), better emotional regulation (76%), and improved influence perception (89%) within 8 weeks. We track specific metrics aligned to your goals.',
  },
  {
    question: 'Can I do coaching remotely?',
    answer: 'Yes, all coaching is available remotely via Zoom. Many clients prefer this for flexibility, though in-person options are available in NYC.',
  },
]

interface FAQProps {
  items?: FAQItem[]
}

export default function FAQ({ items = FALLBACK_ITEMS }: FAQProps) {
  const [expanded, setExpanded] = useState<number | null>(null)

  return (
    <div className="faq-list">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`faq-item${expanded === idx ? ' faq-item--open' : ''}`}
        >
          <button
            onClick={() => setExpanded(expanded === idx ? null : idx)}
            className="faq-item-trigger"
          >
            <span className="faq-item-question">{item.question}</span>
            <span className="faq-item-icon" aria-hidden="true">
              {expanded === idx ? '−' : '+'}
            </span>
          </button>
          {expanded === idx && (
            <div className="faq-item-answer">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
