import { TestimonialCard } from '@/components/utilities/cards'
import { SectionHeader } from '@/components/ui/SectionHeader'

interface Testimonial {
  _id?: string
  quote: string
  clientName: string
  role: string
  company: string
  result?: string
  image?: unknown
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  eyebrow?: string
  heading?: string
}

export function Testimonials({ testimonials, eyebrow, heading }: TestimonialsProps) {
  if (!testimonials?.length) return null

  if (testimonials.length === 1) {
    const t = testimonials[0]
    return (
      <section className="testimonials-display">
        <span className="testimonials-display-eyebrow">{eyebrow ?? 'CLIENT STORIES'}</span>
        <div className="testimonials-display-stars" aria-label="5 out of 5 stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="testimonials-display-star" aria-hidden="true">★</span>
          ))}
        </div>
        <blockquote className="testimonials-display-quote">
          {t.quote}
        </blockquote>
        <footer className="testimonials-display-attribution">
          <span className="testimonials-display-name">{t.clientName}</span>
          <span className="testimonials-display-role">
            {t.role} · {t.company}
          </span>
          {t.result && (
            <span className="testimonials-display-result">{t.result}</span>
          )}
        </footer>
      </section>
    )
  }

  return (
    <section className="testimonial-section">
      <SectionHeader
        eyebrow={eyebrow ?? 'Client Stories'}
        title={heading ?? 'Real Results. Real People.'}
      />

      <div className="testimonial-grid">
        {testimonials.map((t, idx) => (
          <TestimonialCard
            key={t._id || idx}
            quote={t.quote}
            clientName={t.clientName}
            role={t.role}
            company={t.company}
            result={t.result}
            image={t.image}
          />
        ))}
      </div>
    </section>
  )
}
