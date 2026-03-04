import type { Metadata } from 'next';
import ContactClient from './ContactClient';
import { getContactInfo, getPageMetadata } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Contact & Inquiry | Leadership Coaching & Choreography Services | Jonchalant",
  description: "Get in touch for leadership coaching, choreography services, or collaboration inquiries. Let's work together on your professional growth or creative project.",
  keywords: "leadership coaching inquiry, choreography services, collaboration, contact coach, professional development, dance services",
  openGraph: {
    title: "Contact Jonchalant | Leadership & Choreography Services",
    description: "Reach out to discuss leadership coaching, choreography, or collaboration opportunities.",
    type: "website",
    url: "https://jonchalant.com/contact",
    siteName: "Jonchalant",
    images: {
      url: "https://jonchalant.com/social/og-contact-1200x630.png",
      width: 1200,
      height: 630,
      alt: "Contact Jonchalant",
      type: "image/png",
    },
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Jonchalant",
    description: "Get in touch for leadership coaching or collaboration inquiries.",
    images: ["https://jonchalant.com/social/og-contact-1200x630.png"],
    creator: "@jonchalant",
  },
};

export default async function Contact() {
  let contactMethods = [];
  let contactPageMetadata = null;

  try {
    const [contactInfo, metadata] = await Promise.all([
      getContactInfo(),
      getPageMetadata('contact')
    ]);

    if (contactInfo?.contactMethods) {
      contactMethods = contactInfo.contactMethods;
    }

    if (metadata) {
      contactPageMetadata = metadata;
    }
  } catch (error) {
    console.warn('Failed to fetch contact info from Sanity:', error);
  }

  return (
    <ContactClient 
      initialContactMethods={contactMethods}
      initialPageMetadata={contactPageMetadata}
    />
  );
}
