'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { ScrollFade, ScrollStagger } from "@/components/animations";
import { PageTransition } from "@/components/layout";

// Below-fold dynamic import
const CTASection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

const contactData = {
  headline: 'Get in Touch',
  subheadline: 'Have a collaboration idea or just want to chat? I\'d love to hear from you.',
  formTitle: 'Send me a Message',
  contactOptions: [
    { icon: '✉️', title: 'Email', value: 'contact@jonchalon.com' },
    { icon: '📱', title: 'Instagram', value: '@jonchalon' },
    { icon: '🎬', title: 'TikTok', value: '@jonchalon' }
  ],
  directEmailText: 'Or email me directly at',
  directEmail: 'contact@jonchalon.com'
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen page-wrapper bg-primary">
      <PageTransition animation="fade">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TECHNICAL HERO SECTION */}
        <div className="relative py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Technical background grid */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 0, 255, 0.1) 25%, rgba(255, 0, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 0, 255, 0.1) 75%, rgba(255, 0, 255, 0.1) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }} />

          {/* Left: Title */}
          <div className="relative z-10">
            <div className="retro-label text-magenta uppercase text-xs tracking-widest mb-4">→ LET'S TALK</div>
            <h1 className="heading-display text-6xl sm:text-7xl lg:text-8xl font-black text-primary mb-6 leading-none">
              GET IN<br />TOUCH
            </h1>
            <p className="text-lg text-secondary max-w-lg mb-8">
              Have a collaboration idea? Let's discuss how we can work together on your next project.
            </p>
            <div className="flex gap-4">
              <div className="w-24 h-1 bg-magenta" />
              <div className="w-16 h-1 bg-neon" />
            </div>
          </div>

          {/* Right: Technical SVG Schematic */}
          <div className="relative z-10 flex justify-end">
            <svg width="300" height="300" viewBox="0 0 300 300" className="opacity-80">
              {/* Outer hexagon */}
              <circle cx="150" cy="150" r="140" fill="none" stroke="var(--accent-magenta)" strokeWidth="2" opacity="0.6"/>
              
              {/* Inner rings */}
              <circle cx="150" cy="150" r="100" fill="none" stroke="var(--accent-magenta)" strokeWidth="1" opacity="0.3"/>
              <circle cx="150" cy="150" r="70" fill="none" stroke="var(--accent-magenta)" strokeWidth="2"/>
              <circle cx="150" cy="150" r="4" fill="var(--accent-magenta)"/>
              
              {/* Connection points */}
              <circle cx="150" cy="80" r="8" fill="none" stroke="var(--accent-magenta)" strokeWidth="2" opacity="0.8"/>
              <circle cx="220" cy="150" r="8" fill="none" stroke="var(--accent-magenta)" strokeWidth="2" opacity="0.8"/>
              <circle cx="150" cy="220" r="8" fill="none" stroke="var(--accent-magenta)" strokeWidth="2" opacity="0.8"/>
              <circle cx="80" cy="150" r="8" fill="none" stroke="var(--accent-magenta)" strokeWidth="2" opacity="0.8"/>
              
              {/* Connection lines */}
              <line x1="150" y1="150" x2="150" y2="80" stroke="var(--accent-magenta)" strokeWidth="1.5" opacity="0.5" strokeDasharray="5,5"/>
              <line x1="150" y1="150" x2="220" y2="150" stroke="var(--accent-magenta)" strokeWidth="1.5" opacity="0.5" strokeDasharray="5,5"/>
              <line x1="150" y1="150" x2="150" y2="220" stroke="var(--accent-magenta)" strokeWidth="1.5" opacity="0.5" strokeDasharray="5,5"/>
              <line x1="150" y1="150" x2="80" y2="150" stroke="var(--accent-magenta)" strokeWidth="1.5" opacity="0.5" strokeDasharray="5,5"/>
              
              {/* Accent diagonal lines */}
              <line x1="105" y1="105" x2="75" y2="75" stroke="var(--accent-neon)" strokeWidth="1" opacity="0.4"/>
              <line x1="195" y1="105" x2="225" y2="75" stroke="var(--accent-vibrant)" strokeWidth="1" opacity="0.4"/>
              <line x1="195" y1="195" x2="225" y2="225" stroke="var(--accent-neon)" strokeWidth="1" opacity="0.4"/>
              <line x1="105" y1="195" x2="75" y2="225" stroke="var(--accent-vibrant)" strokeWidth="1" opacity="0.4"/>
            </svg>
          </div>
        </div>

        {/* CONTACT OPTIONS */}
        <ScrollStagger variant="slideInUp" staggerDelay={100}>
          <section className="py-20 border-t border-primary grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { method: 'Email', value: 'contact@jonchalon.com', icon: '✉', color: 'vibrant' },
            { method: 'Instagram', value: '@jonchalon', icon: '📸', color: 'neon' },
            { method: 'TikTok', value: '@jonchalon', icon: '▶', color: 'magenta' },
          ].map((contact, idx) => {
            const colorMap: Record<string, string> = { vibrant: 'var(--accent-vibrant)', neon: 'var(--accent-neon)', magenta: 'var(--accent-magenta)' };
            return (
              <div
                key={idx}
                className="border-bold group cursor-pointer transition-all duration-300 hover:shadow-bold p-8 text-center"
                style={{ borderColor: colorMap[contact.color], backgroundColor: `var(--bg-${contact.color}-faint)` }}
              >
                <div style={{ color: colorMap[contact.color] }} className="text-5xl mb-4">
                  {contact.icon}
                </div>
                <h3 style={{ color: colorMap[contact.color] }} className="text-lg font-black uppercase retro-label mb-2">
                  {contact.method}
                </h3>
                <p className="text-secondary font-bold mono-text">
                  {contact.value}
                </p>
              </div>
            );
          })}
          </section>
        </ScrollStagger>

        {/* FORM SECTION */}
        <section className="py-20 border-t border-primary">
          <div className="mb-12">
            <span className="retro-label text-magenta text-xs">→ DIRECT MESSAGE</span>
            <h2 className="heading-display text-6xl sm:text-7xl font-black text-primary mt-4 leading-none">
              Send a Message
            </h2>
          </div>

          <div className="max-w-2xl">
            {submitted ? (
              <div className="border-bold border-neon bg-neon-faint p-16 text-center">
                <div className="text-6xl mb-6">✨</div>
                <h3 className="text-4xl font-black text-primary mb-3 heading-display">
                  Message Sent!
                </h3>
                <p className="text-secondary text-lg">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label className="block text-sm uppercase tracking-widest retro-label text-vibrant mb-4 font-black">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 border-2 border-vibrant bg-primary text-primary focus:outline-none focus:shadow-bold transition-all"
                    placeholder="Full Name"
                    style={{ borderColor: 'var(--accent-vibrant)' }}
                  />
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-widest retro-label text-neon mb-4 font-black">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 border-2 border-neon bg-primary text-primary focus:outline-none focus:shadow-bold transition-all"
                    placeholder="you@example.com"
                    style={{ borderColor: 'var(--accent-neon)' }}
                  />
                </div>

                <div>
                  <label className="block text-sm uppercase tracking-widest retro-label text-magenta mb-4 font-black">
                    Project Details
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    className="w-full px-6 py-4 border-2 border-magenta bg-primary text-primary focus:outline-none focus:shadow-bold transition-all resize-none"
                    placeholder="Tell me about your project idea..."
                    style={{ borderColor: 'var(--accent-magenta)' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full border-bold border-vibrant bg-vibrant text-primary font-black text-lg uppercase py-4 px-8 transition-all duration-300 hover:shadow-bold"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </section>

        {/* INFO SECTION */}
        <section className="py-20 border-t border-primary grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border-bold border-vibrant bg-vibrant-faint p-8">
            <h3 className="text-2xl font-black text-primary heading-display mb-4">Response Time</h3>
            <p className="text-secondary text-sm leading-relaxed">
              I typically respond to all inquiries within 24 hours. For urgent matters, reach out on Instagram @jonchalon.
            </p>
          </div>

          <div className="border-bold border-neon bg-neon-faint p-8">
            <h3 className="text-2xl font-black text-primary heading-display mb-4">Collaboration Types</h3>
            <p className="text-secondary text-sm leading-relaxed">
              Open to choreography, content direction, brand partnerships, educational workshops, and creative consulting projects.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-primary">
          <CTASection
            title="Let's Create Together"
            description="Whether it's a quick discussion or a full project proposal, I'm excited to hear your ideas."
            buttonText="RETURN TO HOME"
            buttonLink="/"
          />
        </section>
      </main>
      </PageTransition>
    </div>
  );
}
