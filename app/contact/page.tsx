'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { PageTransition } from "@/components/layout";
import { getContactInfo, getPageMetadata } from "@/lib/sanity";

const CTASection = dynamic(() => import('@/components/sections').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="py-16 md:py-24">Loading...</div>,
  ssr: true
});

// Mock contact methods (fallback only)
const MOCK_CONTACT_METHODS = [
  { label: 'Email', value: 'contact@jonchalon.com', href: 'mailto:contact@jonchalon.com' },
  { label: 'Instagram', value: '@jonchalon', href: 'https://instagram.com/jonchalon' },
  { label: 'TikTok', value: '@jonchalon', href: 'https://tiktok.com/@jonchalon' }
];

// Mock page metadata (fallback only)
const MOCK_PAGE_METADATA = {
  headline: 'Get in Touch',
  subheadline: 'Have a collaboration idea or question? I\'d love to hear from you.'
};

export default function Contact() {
  const [contactMethods, setContactMethods] = useState(MOCK_CONTACT_METHODS);
  const [pageMetadata, setPageMetadata] = useState(MOCK_PAGE_METADATA);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [contactInfo, metadata] = await Promise.all([
          getContactInfo(),
          getPageMetadata('contact')
        ]);
        
        if (contactInfo?.contactMethods) {
          setContactMethods(contactInfo.contactMethods);
        }
        
        if (metadata) {
          setPageMetadata(metadata);
        }
      } catch (error) {
        console.warn('Failed to fetch contact info from Sanity, using fallback data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

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
                {pageMetadata?.headline || 'Get in Touch'}
              </h1>

              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
                {pageMetadata?.subheadline || 'Have a collaboration idea or question? I\'d love to hear from you.'}
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
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                Quick Links
              </h2>
              <p className="text-base text-slate-700">
                Connect with me directly through your preferred channel.
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-8 text-slate-600">Loading contact methods...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 auto-rows-fr">
                {contactMethods.map((method, idx) => (
                  <a
                    key={idx}
                    href={method.href}
                    className="card group block border-2 border-slate-200 hover:border-accent transition-all duration-300 no-underline overflow-visible h-full"
                  >
                    <div className="flex flex-col h-full">
                      {/* Icon/Label section */}
                      <div className="mb-4 pb-4 border-b border-slate-200">
                        <p className="text-xs uppercase tracking-widest font-black text-accent mb-2">
                          {method.label}
                        </p>
                        <div className="h-2 w-8 bg-accent rounded-full" />
                      </div>
                      
                      {/* Content section */}
                      <div className="flex-1">
                        <p className="text-lg font-black text-slate-900 leading-tight mb-3 group-hover:text-accent transition-colors">
                          {method.value}
                        </p>
                        {method.description && (
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {method.description}
                          </p>
                        )}
                      </div>
                      
                      {/* CTA indicator */}
                      <div className="mt-6 pt-4 border-t border-slate-200 text-right">
                        <span className="text-xs font-bold uppercase tracking-widest text-accent group-hover:translate-x-1 transition-transform inline-block">
                          Connect →
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
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
