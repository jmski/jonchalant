import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: "Free Presence Audit | Find Your Leadership Presence Gap",
  description: "Take Jon's free Presence Audit. Answer two questions and receive a personalized breakdown of your biggest executive presence gap — within 48 hours.",
  keywords: "executive presence audit, leadership presence, introvert leadership coaching, confidence coaching, presence gap",
  openGraph: {
    title: "Free Presence Audit — Jonchalant",
    description: "Two questions. One personalized audit. Find out where your presence is breaking down.",
    type: "website",
    url: "https://jonchalant.com/contact",
    siteName: "Jonchalant",
    images: {
      url: "https://jonchalant.com/social/og-contact-1200x630.png",
      width: 1200,
      height: 630,
      alt: "Free Presence Audit with Jon",
      type: "image/png",
    },
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Presence Audit — Jonchalant",
    description: "Two questions. One personalized audit. Find out where your presence is breaking down.",
    images: ["https://jonchalant.com/social/og-contact-1200x630.png"],
    creator: "@jonchalant",
  },
};

export default function Contact() {
  return <ContactClient />;
}
