'use client';

import { useState, FormEvent } from 'react';

export default function CollaborationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    collaborationType: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        collaborationType: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === 'success' && (
        <div className="p-4 border rounded-lg" style={{ backgroundColor: 'var(--color-success-light)', borderColor: 'var(--color-success)', color: 'var(--color-success-dark)' }}>
          ✓ Thank you! Your inquiry has been received. I&apos;ll get back to you soon.
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 border rounded-lg" style={{ backgroundColor: 'var(--color-error-light)', borderColor: 'var(--color-error)', color: 'var(--color-error-dark)' }}>
          ✗ {errorMessage}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-heading)' }}>
          Your Name <span style={{ color: 'var(--color-error)' }}>*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
          style={{
            borderColor: 'var(--form-input-border)',
            backgroundColor: 'var(--form-input-bg)',
            color: 'var(--form-input-text)',
          }}
        />
      </div>

      <div>
        <label style={{ color: 'var(--text-heading)' }} className="block text-sm font-medium mb-2">
          Email <span style={{ color: 'var(--color-error)' }}>*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@company.com"
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
          style={{
            borderColor: 'var(--form-input-border)',
            backgroundColor: 'var(--form-input-bg)',
            color: 'var(--form-input-text)',
          }}
        />
      </div>

      <div>
        <label style={{ color: 'var(--text-heading)' }} className="block text-sm font-medium mb-2">
          Company / Brand
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Your company name"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
          style={{
            borderColor: 'var(--form-input-border)',
            backgroundColor: 'var(--form-input-bg)',
            color: 'var(--form-input-text)',
          }}
        />
      </div>

      <div>
        <label style={{ color: 'var(--text-heading)' }} className="block text-sm font-medium mb-2">
          Collaboration Type <span style={{ color: 'var(--color-error)' }}>*</span>
        </label>
        <select
          name="collaborationType"
          value={formData.collaborationType}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
          style={{
            borderColor: 'var(--form-input-border)',
            backgroundColor: 'var(--form-input-bg)',
            color: 'var(--form-input-text)',
          }}
        >
          <option value="">Select a collaboration type...</option>
          <option value="Sponsored Content">Sponsored Content</option>
          <option value="Event Performance">Event Performance</option>
          <option value="Content Creation">Content Creation</option>
          <option value="Brand Partnership">Brand Partnership</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label style={{ color: 'var(--text-heading)' }} className="block text-sm font-medium mb-2">
          Message <span style={{ color: 'var(--color-error)' }}>*</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          placeholder="Tell me about your collaboration idea..."
          required
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
          style={{
            borderColor: 'var(--form-input-border)',
            backgroundColor: 'var(--form-input-bg)',
            color: 'var(--form-input-text)',
          }}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: 'var(--cta-gradient)',
          color: 'var(--btn-primary-text)',
        }}
      >
        {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
      </button>
    </form>
  );
}
