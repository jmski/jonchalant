import type { Metadata } from 'next';
import IkigaiClient from './IkigaiClient';

export const metadata: Metadata = {
  title: 'Discover Your Ikigai | Purpose-Led Leadership | Jonchalant',
  description:
    'Take the free Ikigai quiz to uncover where your passion, mission, vocation, and profession intersect — and what that means for your executive leadership presence.',
  keywords:
    'ikigai quiz, purpose-led leadership, executive presence, leadership coaching, find your purpose, passion mission vocation profession',
  openGraph: {
    title: 'Discover Your Ikigai | Jonchalant',
    description:
      'Eight questions. Four quadrants. One clear direction for your leadership presence.',
    type: 'website',
    url: 'https://jonchalant.com/ikigai',
    siteName: 'Jonchalant',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discover Your Ikigai | Jonchalant',
    description: 'Eight questions. Four quadrants. One clear direction for your leadership presence.',
    creator: '@jonchalant',
  },
};

export default function IkigaiPage() {
  return <IkigaiClient />;
}
