import type { Metadata } from 'next'
import { getContactPageContent } from '@/lib/sanity'
import type { ContactPageContent } from '@/lib/types'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact | Jonchalant',
  description: 'Get in touch with Jon — take the Presence Audit or send a message directly.',
}

export default async function Contact() {
  let contactContent: ContactPageContent | null = null

  try {
    contactContent = await getContactPageContent()
  } catch {
    // Renders with hardcoded fallbacks in ContactClient
  }

  return <ContactClient content={contactContent} />
}
