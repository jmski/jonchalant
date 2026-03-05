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

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlay || testimonials.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + itemsPerPage >= testimonials.length ? 0 : prevIndex + itemsPerPage
      )
    }, 6000) // Change slide every 6 seconds

    return () => clearInterval(timer)
  }, [isAutoPlay, testimonials.length, itemsPerPage])

  if (!testimonials || testimonials.length === 0) {
    return <div className="text-center py-12 text-slate-600">Loading testimonials...</div>
  }

  const numSlides = Math.ceil(testimonials.length / itemsPerPage)
  const currentSlide = Math.floor(currentIndex / itemsPerPage)

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Carousel Container */}
      <div className="relative w-full">
        {/* Slides */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {testimonials.map((testimonial, idx) => (
              <div
                key={testimonial._id || idx}
                className="w-full shrink-0 min-w-0"
              >
                <div className="group rounded-lg p-4 sm:p-6 md:p-8 border border-slate-200 bg-white hover:shadow-lg hover:border-accent transition-all duration-300 h-full">
                  {/* Quote */}
                  <p className="text-slate-700 leading-relaxed mb-3 sm:mb-4 italic text-sm sm:text-base">
                    &quot;{testimonial.quote}&quot;
                  </p>

                  {/* Result highlight */}
                  {testimonial.result && (
                    <div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded border" style={{ 
                      backgroundColor: 'var(--overlay-light)',
                      borderColor: 'var(--accent-primary)'
                    }}>
                      <p className="text-xs sm:text-sm font-bold" style={{ color: 'var(--accent-primary)' }}>
                        <span className="inline-block mr-2">📈</span>
                        Key Result: {testimonial.result}
                      </p>
                    </div>
                  )}

                  {/* Client info */}
                  <div className="border-t border-slate-200 pt-3 sm:pt-4">
                    <p className="font-bold text-slate-900 text-sm sm:text-base">
                      {testimonial.clientName}
                    </p>
                    <p className="text-xs text-slate-600">
                      {testimonial.role}
                    </p>
                    <p className="text-xs font-medium" style={{ color: 'var(--accent-primary)' }}>
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-1 sm:gap-2 mt-6 sm:mt-8 flex-wrap px-2">
          {Array.from({ length: numSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className="rounded-full transition-all duration-300 shrink-0"
              style={{
                backgroundColor:
                  idx === currentSlide ? 'var(--accent-primary)' : 'var(--border-color)',
                width: idx === currentSlide ? '28px' : '8px',
                height: '8px',
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
