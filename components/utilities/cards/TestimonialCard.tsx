interface TestimonialCardProps {
  quote: string;
  clientName: string;
  role: string;
  company: string;
  result?: string;
}

export function TestimonialCard({
  quote,
  clientName,
  role,
  company,
  result,
}: TestimonialCardProps) {
  return (
    <div className="testimonial-card">
      {/* Quote */}
      <p className="testimonial-card-quote">
        &quot;{quote}&quot;
      </p>

      {/* Result highlight */}
      {result && (
        <div className="testimonial-card-result">
          <p className="testimonial-card-result-text">
            <span className="testimonial-card-result-icon">📈</span>
            Key Result: {result}
          </p>
        </div>
      )}

      {/* Client info */}
      <div className="testimonial-card-footer">
        <p className="testimonial-card-client-name">
          {clientName}
        </p>
        <p className="testimonial-card-role">
          {role}
        </p>
        <p className="testimonial-card-company">
          {company}
        </p>
      </div>
    </div>
  );
}
