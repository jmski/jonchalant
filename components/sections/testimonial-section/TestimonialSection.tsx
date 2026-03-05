'use client'

import { useState, useEffect } from 'react'
import { TestimonialCard } from '@/components/shared/cards'

interface Testimonial {
  _id?: string
  quote: string
  clientName: string
  role: string
  company: string
  result?: string
}

interface TestimonialSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const itemsPerPage = 1

  const goToSlide = (index: number) => {
    setCurrentIndex(index * itemsPerPage)
    setIsAutoPlay(false)
  }

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlay || testimonials.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + itemsPerPage >= testimonials.length ? 0 : prevIndex + itemsPerPage
      )
    }, 6000)

    return () => clearInterval(timer)
  }, [isAutoPlay, testimonials.length, itemsPerPage])

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const numSlides = Math.ceil(testimonials.length / itemsPerPage)
  const currentSlide = Math.floor(currentIndex / itemsPerPage)

  return (
    <section className="testimonial-section">
      <div className="testimonial-section-container">
        {/* Section Header */}
        <div className="testimonial-section-header">
          <span className="testimonial-section-badge">
            Transformation Stories
          </span>
          <h2 className="testimonial-section-title">
            See Real Results from Real Clients
          </h2>
          <p className="testimonial-section-description">
            These leaders transformed how they show up. From speaking up in meetings to commanding rooms with quiet confidence—see what they achieved.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="testimonial-carousel">
          {/* Slides */}
          <div
            className="testimonial-carousel-track"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonials.map((testimonial, idx) => (
              <div
                key={testimonial._id || idx}
                className="testimonial-carousel-slide"
              >
                <TestimonialCard
                  quote={testimonial.quote}
                  clientName={testimonial.clientName}
                  role={testimonial.role}
                  company={testimonial.company}
                  result={testimonial.result}
                />
              </div>
            ))}
          </div>

          {/* Dot Indicators */}
          {testimonials.length > 1 && (
            <div className="testimonial-carousel-indicators">
              {Array.from({ length: numSlides }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className="testimonial-carousel-dot"
                  data-active={idx === currentSlide}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
