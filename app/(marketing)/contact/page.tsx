import type { Metadata } from 'next'
import { getPageContact } from '@/lib/sanity'
import type { PageContact } from '@/lib/types'
import { PageTransition } from '@/components/layout'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact | Jonchalant',
  description: 'Get in touch with Jon — 1-on-1 coaching inquiries or general questions.',
}

export default async function Contact() {
  let pageContact: PageContact | null = null

  try {
    pageContact = await getPageContact()
  } catch {
    // Renders with hardcoded fallbacks in ContactClient
  }

  return (
    <PageTransition animation="fade">
      <ContactClient content={pageContact} />
    </PageTransition>
  )
}
