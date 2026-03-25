interface WhyItWorksProps {
  label?: string;
  highlight?: string;
  paragraph1?: string;
  paragraph2?: string;
  paragraph3?: string;
}

export function WhyItWorks({ label, highlight, paragraph1, paragraph2, paragraph3 }: WhyItWorksProps) {
  return (
    <section className="home-why-works-section">
      {label && <span className="home-why-works-label">{label}</span>}
      {highlight && <span className="about-highlight">{highlight}</span>}
      {paragraph1 && <p className="home-why-works-paragraph">{paragraph1}</p>}
      {paragraph2 && <p className="home-why-works-paragraph">{paragraph2}</p>}
      {paragraph3 && <p className="home-why-works-paragraph">{paragraph3}</p>}
    </section>
  );
}
