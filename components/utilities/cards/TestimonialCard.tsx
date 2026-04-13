import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

interface TestimonialCardProps {
  quote: string;
  clientName: string;
  role: string;
  company: string;
  result?: string;
  image?: unknown;
}

export function TestimonialCard({
  quote,
  clientName,
  role,
  company,
  result,
  image,
}: TestimonialCardProps) {
  const avatarUrl = image ? urlFor(image).width(80).height(80).url() : null;

  return (
    <div className="testimonial-card">
      {/* Stars */}
      <div className="testimonial-card-stars" aria-label="5 out of 5 stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="testimonial-card-star" aria-hidden="true">★</span>
        ))}
      </div>

      {/* Quote */}
      <p className="testimonial-card-quote">
        &quot;{quote}&quot;
      </p>

      {/* Result highlight */}
      {result && (
        <div className="testimonial-card-result">
          <p className="testimonial-card-result-text">
            Key Result: {result}
          </p>
        </div>
      )}

      {/* Client info */}
      <div className="testimonial-card-footer">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={clientName}
            width={40}
            height={40}
            className="testimonial-card-avatar"
          />
        )}
        <div className="testimonial-card-identity">
          <p className="testimonial-card-client-name">{clientName}</p>
          <p className="testimonial-card-role">{role}</p>
          <p className="testimonial-card-company">{company}</p>
        </div>
      </div>
    </div>
  );
}
