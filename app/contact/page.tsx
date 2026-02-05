'use client';

import { useState } from 'react';
import { ScrollFade } from "@/components/animations";

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
    <div className="min-h-screen page-wrapper">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="py-20 sm:py-28">
          <ScrollFade>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold gradient-heading-text mb-6 font-display">
              {contactData.headline}
            </h1>
            <p className="text-xl leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              {contactData.subheadline}
            </p>
          </ScrollFade>
        </div>

        {/* Contact Options */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactData.contactOptions.map((option, idx) => (
              <ScrollFade key={idx} delay={idx * 100}>
                <div className="card-enhanced p-8 text-center">
                  <div className="text-4xl mb-4">{option.icon}</div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-accent-bright)' }}>
                    {option.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    {option.value}
                  </p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-20">
          <ScrollFade>
            <h2 className="text-4xl font-bold bg-clip-text text-transparent mb-8 font-display" style={{ background: 'var(--gradient-heading)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {contactData.formTitle}
            </h2>
          </ScrollFade>

          {submitted ? (
            <ScrollFade>
              <div className="p-12 card-enhanced text-center">
                <p className="text-3xl mb-4">✨</p>
                <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-accent-secondary)' }}>
                  Message Sent!
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                  Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            </ScrollFade>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
              <div>
                <label style={{ color: 'var(--text-accent-bright)' }} className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  placeholder="Your name"
                  style={{
                    borderColor: 'var(--form-input-border)',
                    backgroundColor: 'var(--form-input-bg)',
                    color: 'var(--form-input-text)',
                  }}
                />
              </div>

              <div>
                <label style={{ color: 'var(--text-accent-bright)' }} className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  placeholder="you@example.com"
                  style={{
                    borderColor: 'var(--form-input-border)',
                    backgroundColor: 'var(--form-input-bg)',
                    color: 'var(--form-input-text)',
                  }}
                />
              </div>

              <div>
                <label style={{ color: 'var(--text-accent-bright)' }} className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
                  placeholder="Tell me about your idea..."
                  style={{
                    borderColor: 'var(--form-input-border)',
                    backgroundColor: 'var(--form-input-bg)',
                    color: 'var(--form-input-text)',
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full font-bold py-3 px-6 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: 'var(--accent-vibrant)',
                  color: 'var(--btn-primary-text)',
                }}
              >
                Send Message
              </button>
            </form>
          )}
        </section>

        {/* Response Time */}
        <ScrollFade>
          <div className="p-12 card-enhanced text-center">
            <h3 style={{ color: 'var(--text-accent-bright)' }} className="text-xl font-bold mb-2">
              Quick Response
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              I typically respond to messages within 24 hours.
            </p>
          </div>
        </ScrollFade>
      </main>
    </div>
  );
}
