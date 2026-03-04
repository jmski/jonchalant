'use client';

import { useState, useEffect } from 'react';
import { PageTransition, SectionWrapper, SectionContent } from "@/components/layout";
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
        {/* HERO SECTION */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="text-sm uppercase tracking-widest font-medium" style={{ color: 'var(--text-tertiary)' }}>Let's Talk</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {pageMetadata?.headline || 'Ready to Transform Your Presence?'}
                </h1>

                <p className="text-lg sm:text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {pageMetadata?.subheadline || 'Whether it\'s coaching, collaboration, or just questions—I\'m here to help. Let\'s discuss how we can build your executive presence together.'}
                </p>

                <p className="text-base" style={{ color: 'var(--text-tertiary)' }}>
                  The best way to start: Fill out the form below or reach out directly.
                </p>
              </div>

              {/* Right column - Quick contact methods from Sanity */}
              <div className="space-y-8">
                {isLoading ? (
                  <p style={{ color: 'var(--text-tertiary)' }}>Loading contact options...</p>
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
                                <h3 className="text-lg font-bold mb-2 group-hover:transition-colors" style={{ color: 'var(--text-primary)', }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}>
                                  {method.label}
                                </h3>
                                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                                  {method.value}
                                </p>
                                {method.description && (
                                  <p className="text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>
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
          </SectionContent>
        </SectionWrapper>

        {/* FORM GUIDANCE */}
        <SectionWrapper variant="secondary">
          <SectionContent>
            <section>
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                  Before You Send
                </h2>
                
                <div className="space-y-6 mb-8">
                  {/* What to Include */}
                  <div className="border-l-4 pl-8" style={{ borderColor: 'var(--accent-primary)' }}>
                    <div className="flex items-start gap-4">
                      <div className="text-2xl mt-1">📝</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                          What to Include
                        </h3>
                        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
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
                        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                          Response Time
                        </h3>
                        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                          I respond to all inquiries within 48 hours. For time-sensitive matters, reach out directly via <a href="mailto:contact@jonchalant.com" className="font-semibold hover:underline" style={{ color: 'var(--accent-primary)' }}>email</a> or <a href="https://instagram.com/sojonchalant" className="font-semibold" style={{ color: 'var(--accent-primary)' }}>Instagram DM</a>.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </SectionContent>
        </SectionWrapper>

        {/* CONTACT FORM SECTION */}
        <SectionWrapper variant="primary">
          <SectionContent>
            <section>
              <div className="max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  Send Your Inquiry
                </h2>
                <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
                  Tell me about your project, what you're interested in, or any questions you have.
                </p>
              </div>

              <SegmentedInquiryForm />
            </section>
          </SectionContent>
        </SectionWrapper>
      </PageTransition>
    </div>
  );
}
