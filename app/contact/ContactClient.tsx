'use client';

import { useState, useEffect } from 'react';
import { PageTransition } from "@/components/layout";
import { getContactInfo, getPageMetadata, type ContactMethod } from "@/lib/sanity";
import SegmentedInquiryForm from "@/components/forms/SegmentedInquiryForm";

type ContactClientProps = {
  initialContactMethods?: ContactMethod[];
  initialPageMetadata?: any;
};

export default function ContactClient({ 
  initialContactMethods = [], 
  initialPageMetadata 
}: ContactClientProps) {
  const [contactMethods, setContactMethods] = useState<ContactMethod[]>(initialContactMethods);
  const [pageMetadata, setPageMetadata] = useState(
    initialPageMetadata || {
      headline: 'Get in Touch',
      subheadline: 'Have a collaboration idea or question? I\'d love to hear from you.'
    }
  );
  const [isLoading, setIsLoading] = useState(!initialContactMethods.length);

  useEffect(() => {
    if (!initialContactMethods.length) {
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
    }
  }, [initialContactMethods.length]);

  return (
    <div className="min-h-screen bg-white">
      <PageTransition animation="fade">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          {/* HERO SECTION */}
          <section className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="text-sm uppercase tracking-widest font-medium text-slate-600">Let's Talk</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900">
                {pageMetadata?.headline || 'Ready to Transform Your Presence?'}
              </h1>

              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed">
                {pageMetadata?.subheadline || 'Whether it\'s coaching, collaboration, or just questions—I\'m here to help. Let\'s discuss how we can build your executive presence together.'}
              </p>

              <p className="text-base text-slate-600">
                The best way to start: Fill out the form below or reach out directly.
              </p>
            </div>

            {/* Right column - Quick contact methods from Sanity */}
            <div className="space-y-8">
              {isLoading ? (
                <p className="text-slate-600">Loading contact options...</p>
              ) : (
                <>
                  <div className="space-y-8">
                    {contactMethods.map((method, idx) => {
                      const emojiMap: { [key: string]: string } = {
                        'Email': '✉️',
                        'Instagram': '📸',
                        'TikTok': '🎵',
                        'Twitter': '𝕏',
                      };
                      const emoji = emojiMap[method.label] || '→';

                      return (
                        <a
                          key={idx}
                          href={method.href}
                          target={method.href.startsWith('http') ? '_blank' : undefined}
                          rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="border-l-4 pl-8 group block transition-all duration-300"
                          style={{ borderColor: 'var(--accent-primary)' }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="text-3xl mt-1">{emoji}</div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-slate-900 group-hover:text-accent transition-colors">
                                {method.label}
                              </h3>
                              <p className="text-slate-700 leading-relaxed">
                                {method.value}
                              </p>
                              {method.description && (
                                <p className="text-sm text-slate-600 mt-1">
                                  {method.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </section>

          {/* FORM GUIDANCE */}
          <section className="mb-8 py-6 border-t border-slate-200">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                Before You Send
              </h2>
              
              <div className="space-y-6 mb-8">
                {/* What to Include */}
                <div className="border-l-4 pl-8" style={{ borderColor: 'var(--accent-primary)' }}>
                  <div className="flex items-start gap-4">
                    <div className="text-2xl mt-1">📝</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        What to Include
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        Project details, timeline, budget if applicable, and any specific goals or questions. The more context you provide, the better I can understand your vision and respond with tailored recommendations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="border-l-4 pl-8" style={{ borderColor: 'var(--accent-primary)' }}>
                  <div className="flex items-start gap-4">
                    <div className="text-2xl mt-1">⏱️</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        Response Time
                      </h3>
                      <p className="text-slate-700 leading-relaxed">
                        I respond to all inquiries within 48 hours. For time-sensitive matters, reach out directly via <a href="mailto:contact@jonchalant.com" className="font-semibold text-accent hover:underline">email</a> or <a href="https://instagram.com/sojonchalant" className="font-semibold text-accent">Instagram DM</a>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT FORM SECTION */}
          <section className="mb-16 py-0">
            <div className="max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Send Your Inquiry
              </h2>
              <p className="text-lg text-slate-700">
                Tell me about your project, what you're interested in, or any questions you have.
              </p>
            </div>

            <SegmentedInquiryForm />
          </section>
        </main>
      </PageTransition>
    </div>
  );
}
