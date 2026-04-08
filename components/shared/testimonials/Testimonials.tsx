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
