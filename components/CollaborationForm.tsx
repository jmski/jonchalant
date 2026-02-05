'use client';

import { useState, FormEvent } from 'react';
import { FormLoadingState, FormSuccessState, FormErrorState } from './FormFeedback';

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.collaborationType) {
      newErrors.collaborationType = 'Please select a collaboration type';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

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
      setErrors({});

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Loading State */}
      {status === 'loading' && <FormLoadingState />}

      {/* Success State */}
      {status === 'success' && (
        <FormSuccessState message="Your inquiry has been received. I'll get back to you within 24 hours." />
      )}

      {/* Error State */}
      {status === 'error' && (
        <FormErrorState message={errorMessage} />
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
          className="w-full px-4 py-3 border rounded transition-all duration-200 focus:outline-none focus:ring-2"
          style={{
            borderColor: errors.name ? 'var(--color-error)' : 'var(--form-input-border)',
            backgroundColor: 'var(--form-input-bg)',
            color: 'var(--form-input-text)',
            outlineColor: 'var(--accent-vibrant)',
          }}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>
            ⚠ {errors.name}
          </p>
        )}
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
          className="w-full px-4 py-3 border rounded transition-all duration-200 focus:outline-none focus:ring-2"
          style={{
            borderColor: errors.email ? 'var(--color-error)' : 'var(--form-input-border)',
            backgroundColor: 'var(--form-input-bg)',
            color: 'var(--form-input-text)',
            outlineColor: 'var(--accent-vibrant)',
          }}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>
            ⚠ {errors.email}
          </p>
        )}
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
          className="w-full px-4 py-3 border rounded transition-all duration-200 focus:outline-none focus:ring-2"
          style={{
            borderColor: 'var(--form-input-border)',
            backgroundColor: 'var(--form-input-bg)',
            color: 'var(--form-input-text)',
            outlineColor: 'var(--accent-vibrant)',
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
          className="w-full px-4 py-3 border rounded transition-all duration-200 focus:outline-none focus:ring-2"
          style={{
            borderColor: errors.collaborationType ? 'var(--color-error)' : 'var(--form-input-border)',
            backgroundColor: 'var(--form-input-bg)',
            color: 'var(--form-input-text)',
            outlineColor: 'var(--accent-vibrant)',
          }}
          aria-invalid={!!errors.collaborationType}
          aria-describedby={errors.collaborationType ? 'collab-error' : undefined}
        >
          <option value="">Select a collaboration type...</option>
          <option value="Sponsored Content">Sponsored Content</option>
          <option value="Event Performance">Event Performance</option>
          <option value="Content Creation">Content Creation</option>
          <option value="Brand Partnership">Brand Partnership</option>
          <option value="Other">Other</option>
        </select>
        {errors.collaborationType && (
          <p id="collab-error" className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>
            ⚠ {errors.collaborationType}
          </p>
        )}
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
          className="w-full px-4 py-3 border rounded transition-all duration-200 focus:outline-none focus:ring-2"
          style={{
            borderColor: errors.message ? 'var(--color-error)' : 'var(--form-input-border)',
            backgroundColor: 'var(--form-input-bg)',
            color: 'var(--form-input-text)',
            outlineColor: 'var(--accent-vibrant)',
          }}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-xs mt-1" style={{ color: 'var(--color-error)' }}>
            ⚠ {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full font-bold py-3 px-6 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2"
        style={{
          backgroundColor: 'var(--accent-vibrant)',
          color: 'var(--btn-primary-text)',
          border: '1px solid var(--accent-vibrant)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.875rem',
          fontWeight: '600',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
        }}
      >
        {status === 'loading' ? 'Sending...' : 'Send Inquiry'}
      </button>
    </form>
  );
}
