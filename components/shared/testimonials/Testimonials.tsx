'use client'

import { useState, useEffect } from 'react'
import { TestimonialCard } from '@/components/utilities/cards'

interface Testimonial {
  _id?: string
  quote: string
  clientName: string
  role: string
  company: string
  result?: string
}

interface TestimonialsProps {
  testimonials: Testimonial[]
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (testimonials.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  if (!testimonials?.length) return null

  return (
    <section className="testimonial-section">
      <header className="testimonial-section-header">
        <span className="testimonial-section-eyebrow">Client Stories</span>
        <h2 className="testimonial-section-title">Real Results. Real People.</h2>
      </header>

      {/* Mobile: autoplay carousel */}
      <div className="testimonial-carousel">
        <div
          className="testimonial-carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((t, idx) => (
            <div key={t._id || idx} className="testimonial-carousel-slide">
              <TestimonialCard
                quote={t.quote}
                clientName={t.clientName}
                role={t.role}
                company={t.company}
                result={t.result}
              />
            </div>
          ))}
        </div>
        {testimonials.length > 1 && (
          <div className="testimonial-carousel-indicators">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className="testimonial-carousel-dot"
                data-active={idx === currentIndex}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: full grid — all testimonials visible, scales with dataset */}
      <div className="testimonial-grid">
        {testimonials.map((t, idx) => (
          <TestimonialCard
            key={t._id || idx}
            quote={t.quote}
            clientName={t.clientName}
            role={t.role}
            company={t.company}
            result={t.result}
          />
        ))}
      </div>
    </section>
  )
}
