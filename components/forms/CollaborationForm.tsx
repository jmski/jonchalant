'use client';

import { useState, FormEvent, useMemo } from 'react';
import { useFormValidation, ValidationRules } from '@/lib/hooks/useFormValidation';
import { FormLoadingState, FormSuccessState, FormErrorState, InputField, SelectField } from './FormFeedback';
import FormProgress from './FormProgress';

interface FormData {
  projectName: string;
  collaborationType: string;
  message: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
}

const COLLABORATION_TYPES = [
  { value: 'Music Video', label: '🎬 Music Video Direction' },
  { value: 'Social Content', label: '📱 TikTok/Reels Content' },
  { value: 'Brand Campaign', label: '🤝 Brand Campaign' },
  { value: 'Live Performance', label: '🎤 Live Performance' },
  { value: 'Other', label: '✨ Other' },
];

const TIMELINE_OPTIONS = [
  { value: 'ASAP', label: 'ASAP (within 2 weeks)' },
  { value: '1-2-months', label: '1-2 months' },
  { value: '2-3-months', label: '2-3 months' },
  { value: 'Flexible', label: 'Flexible timeline' },
];

const BUDGET_RANGE = [
  { value: 'under-1k', label: 'Under $1,000' },
  { value: '1k-5k', label: '$1,000 - $5,000' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k+', label: '$10,000+' },
  { value: 'TBD', label: 'Budget TBD' },
];

const STEP_LABELS = ['Project Details', 'Budget & Timeline', 'Contact Info'];

export default function CollaborationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Setup validation rules
  const validationRules = useMemo(() => ({
    projectName: [ValidationRules.required('Project name')],
    collaborationType: [ValidationRules.required('Collaboration type')],
    message: [ValidationRules.required('Message'), ValidationRules.minLength(20)],
    budget: [ValidationRules.required('Budget range')],
    timeline: [ValidationRules.required('Timeline')],
    name: [ValidationRules.required('Your name')],
    email: [ValidationRules.required('Email'), ValidationRules.email()],
    company: [],
  }), []);

  // Setup form validation hook
  const {
    form,
    errors,
    touched,
    handleChange,
    handleBlur,
    getFieldError,
    getFieldState,
    resetForm,
    isFormValid,
    validateField,
  } = useFormValidation<FormData>({
    initialValues: {
      projectName: '',
      collaborationType: '',
      message: '',
      budget: '',
      timeline: '',
      name: '',
      email: '',
      company: '',
    },
    validationRules,
    validateOnChange: true,
    validateOnBlur: true,
  });

  // Validate current step before moving forward
  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1:
        return (
          !getFieldError('collaborationType') &&
          !getFieldError('projectName') &&
          !getFieldError('message') &&
          !!form.collaborationType &&
          !!form.projectName &&
          form.message.length >= 20
        );
      case 2:
        return (
          !getFieldError('budget') &&
          !getFieldError('timeline') &&
          !!form.budget &&
          !!form.timeline
        );
      case 3:
        return (
          !getFieldError('name') &&
          !getFieldError('email') &&
          !!form.name &&
          !!form.email
        );
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid() || !validateCurrentStep()) {
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
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus('success');
      resetForm();
      setCurrentStep(1);

      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Form Progress Indicator */}
      <FormProgress currentStep={currentStep} totalSteps={3} stepLabels={STEP_LABELS} />

      {/* Loading State */}
      {status === 'loading' && <FormLoadingState />}

      {/* Success State */}
      {status === 'success' && (
        <FormSuccessState message="🎉 Your inquiry is on the way! I'll review it and get back to you within 24 hours." />
      )}

      {/* Error State */}
      {status === 'error' && <FormErrorState message={errorMessage} />}

      {/* STEP 1: PROJECT DETAILS */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-2xl font-black uppercase heading-display mb-2 text-primary">
              Let's talk about your project
            </h3>
            <p className="text-tertiary">Tell me about the collaboration you have in mind</p>
          </div>

          <SelectField
            label="Collaboration Type"
            name="collaborationType"
            options={COLLABORATION_TYPES}
            value={form.collaborationType}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError('collaborationType')}
            state={getFieldState('collaborationType')}
            required
            hint="What kind of collaboration are you interested in?"
          />

          <InputField
            label="Project Name / Title"
            name="projectName"
            type="text"
            placeholder="e.g., 'Fashion Brand Campaign' or 'Music Video'"
            value={form.projectName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError('projectName')}
            state={getFieldState('projectName')}
            required
            hint="Give your project a working title"
          />

          <InputField
            label="Project Description"
            name="message"
            placeholder="Describe your vision, goals, and any specific ideas you have..."
            value={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError('message')}
            state={getFieldState('message')}
            required
            hint="At least 20 characters (aim for 50+)"
            isTextarea
            rows={5}
          />
        </div>
      )}

      {/* STEP 2: BUDGET & TIMELINE */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-2xl font-black uppercase heading-display mb-2 text-primary">
              Budget & Timeline
            </h3>
            <p className="text-tertiary">Help me understand your project scope</p>
          </div>

          <SelectField
            label="Budget Range"
            name="budget"
            options={BUDGET_RANGE}
            value={form.budget}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError('budget')}
            state={getFieldState('budget')}
            required
            hint="Select the range that fits your budget"
          />

          <SelectField
            label="Timeline"
            name="timeline"
            options={TIMELINE_OPTIONS}
            value={form.timeline}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError('timeline')}
            state={getFieldState('timeline')}
            required
            hint="When do you need this completed?"
          />
        </div>
      )}

      {/* STEP 3: CONTACT INFO */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-2xl font-black uppercase heading-display mb-2 text-primary">
              Contact Information
            </h3>
            <p className="text-tertiary">How should I get in touch with you?</p>
          </div>

          <InputField
            label="Your Name"
            name="name"
            type="text"
            placeholder="Your name or preferred name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError('name')}
            state={getFieldState('name')}
            required
          />

          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError('email')}
            state={getFieldState('email')}
            required
            hint="I'll send you a confirmation and next steps to this email"
          />

          <InputField
            label="Company / Brand (Optional)"
            name="company"
            type="text"
            placeholder="Your company name"
            value={form.company}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError('company')}
            state={getFieldState('company')}
            hint="If applicable"
          />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-6 border-t border-primary">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handlePrevStep}
            className="px-6 py-3 border-2 border-primary text-primary font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300"
          >
            ← Previous
          </button>
        )}

        {currentStep < 3 ? (
          <button
            type="button"
            onClick={handleNextStep}
            className="ml-auto px-6 py-3 bg-accent-vibrant text-white font-black uppercase tracking-widest hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Next →
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === 'loading'}
            className="ml-auto px-6 py-3 bg-accent-vibrant text-white font-black uppercase tracking-widest hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Submitting...' : '✨ Send Inquiry'}
          </button>
        )}
      </div>
    </form>
  );
}
