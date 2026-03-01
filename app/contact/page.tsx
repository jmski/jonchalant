'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { PageTransition } from "@/components/layout";

const CTASection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

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

  const contactMethods = [
    { label: 'Email', value: 'contact@jonchalon.com', href: 'mailto:contact@jonchalon.com' },
    { label: 'Instagram', value: '@jonchalon', href: 'https://instagram.com/jonchalon' },
    { label: 'TikTok', value: '@jonchalon', href: 'https://tiktok.com/@jonchalon' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageTransition animation="fade">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* HERO SECTION */}
          <section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm uppercase tracking-widest font-medium text-slate-600">Direct Inquiry</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900">
                Get in Touch
              </h1>

              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
                Have a collaboration idea or question? I'd love to hear from you. Drop me a message and I'll get back to you within 24 hours.
              </p>

              <p className="text-base text-slate-600">
                Choose your preferred way to connect below.
              </p>
            </div>

            {/* Right column visual placeholder */}
            <div className="bg-slate-100 rounded-lg h-96 flex items-center justify-center">
              <p className="text-slate-500">Contact Methods</p>
            </div>
          </section>

          {/* QUICK CONTACT OPTIONS */}
          <section className="mb-24 border-t border-slate-200 pt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              Quick Links
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, idx) => (
                <a
                  key={idx}
                  href={method.href}
                  className="border p-8 rounded hover:shadow-md transition-shadow duration-300 text-center no-underline hover:no-underline"
                >
                  <p className="text-xs uppercase tracking-widest font-medium text-slate-600 mb-3">
                    {method.label}
                  </p>
                  <p className="text-lg font-semibold text-slate-900 transition-colors">
                    {method.value}
                  </p>
                </a>
              ))}
            </div>
          </section>

          {/* CONTACT FORM SECTION */}
          <section className="mb-24 py-16 border-t border-slate-200">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Send a Message
              </h2>
              <p className="text-lg text-slate-700">
                Tell me about your project, collaboration idea, or any questions you have.
              </p>
            </div>

            <div className="max-w-2xl">
              {submitted ? (
                <div className="border border-slate-200 p-12 text-center bg-slate-50 rounded">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-slate-700">
                    Thanks for reaching out. I'll respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 bg-white text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0 transition-all"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-slate-200 bg-white text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-3">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-slate-200 bg-white text-slate-900 rounded focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0 transition-all resize-none"
                      placeholder="Tell me about your project or inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-full"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* INFO BOXES */}
          <section className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-8 py-16 border-t border-slate-200">
            <div className="border border-slate-200 p-8 rounded">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Response Time</h3>
              <p className="text-slate-700">
                I respond to all messages within 24 hours. For time-sensitive inquiries, reach out directly via email or Instagram.
              </p>
            </div>

            <div className="border border-slate-200 p-8 rounded">
              <h3 className="text-lg font-bold text-slate-900 mb-3">What to Include</h3>
              <p className="text-slate-700">
                Project details, timeline, budget if applicable, and any specific goals or questions. The more context, the better I can help.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section>
            <CTASection
              title="Ready to Connect?"
              description="Submit the form above or reach out directly via email or social media."
              buttonText="Scroll Up to Form"
              buttonLink="#"
            />
          </section>
        </main>
      </PageTransition>
    </div>
  );
}
