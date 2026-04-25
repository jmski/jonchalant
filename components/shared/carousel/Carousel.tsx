'use client'

import { useState, useEffect } from 'react'

interface Testimonial {
  _id?: string
  quote: string
  clientName: string
  role: string
  company: string
  result?: string
}

interface CarouselProps {
  testimonials: Testimonial[]
}

export function Carousel({ testimonials }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const itemsPerPage = 1

  const goToSlide = (index: number) => {
    setCurrentIndex(index * itemsPerPage)
    setIsAutoPlay(false)
  }

  useEffect(() => {
    if (!isAutoPlay || testimonials.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + itemsPerPage >= testimonials.length ? 0 : prev + itemsPerPage
      )
    }, 6000)

    return () => clearInterval(timer)
  }, [isAutoPlay, testimonials.length, itemsPerPage])

  if (!testimonials || testimonials.length === 0) {
    return <div className="carousel-empty">Loading testimonials...</div>
  }

  const numSlides = Math.ceil(testimonials.length / itemsPerPage)
  const currentSlide = Math.floor(currentIndex / itemsPerPage)

  return (
    <div className="carousel">
      <div className="carousel-track-outer">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, idx) => (
            <div key={testimonial._id || idx} className="carousel-slide">
              <div className="carousel-card">
                <p className="carousel-card-quote">
                  &quot;{testimonial.quote}&quot;
                </p>

                {testimonial.result && (
                  <div className="carousel-card-result">
                    <p className="carousel-card-result-text">
                      Key Result: {testimonial.result}
                    </p>
                  </div>
                )}

                <div className="carousel-card-footer">
                  <p className="carousel-card-name">{testimonial.clientName}</p>
                  <p className="carousel-card-role">{testimonial.role}</p>
                  <p className="carousel-card-company">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {testimonials.length > 1 && (
        <div className="carousel-dots">
          {Array.from({ length: numSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`carousel-dot${idx === currentSlide ? ' carousel-dot--active' : ''}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
