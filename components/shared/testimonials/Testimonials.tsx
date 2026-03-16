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
  if (!testimonials?.length) return null

  return (
    <section className="testimonial-section">
      <header className="testimonial-section-header">
        <span className="testimonial-section-eyebrow">Client Stories</span>
        <h2 className="testimonial-section-title">Real Results. Real People.</h2>
      </header>

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
