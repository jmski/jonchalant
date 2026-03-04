'use client';

import { useState, FormEvent, useMemo } from 'react';
import { useFormValidation, ValidationRules, type ValidationRule } from '@/lib/hooks/useFormValidation';
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

interface CollaborationFormProps {
  formType?: 'collaboration' | 'program';
}

const COLLABORATION_TYPES = [
  { value: 'Music Video', label: '🎬 Music Video Direction' },
  { value: 'Social Content', label: '📱 TikTok/Reels Content' },
  { value: 'Brand Campaign', label: '🤝 Brand Campaign' },
  { value: 'Live Performance', label: '🎤 Live Performance' },
  { value: 'Other', label: '✨ Other' },
];

const PROGRAM_TYPES = [
  { value: '90-Day Pivot', label: '🚀 The 90-Day Presence Pivot' },
  { value: 'Social Choreography', label: '👥 Social Choreography Workshop' },
  { value: 'Quiet Command Essentials', label: '📚 The Quiet Command Essentials' },
  { value: 'Interview Coaching', label: '🎯 Interview & Pitch Coaching' },
  { value: 'Team Leadership', label: '👔 Team Leadership Program' },
  { value: 'Unsure', label: '❓ Not sure yet' },
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

const EXPERIENCE_LEVELS = [
  { value: 'beginner', label: '🌱 Beginner (just starting leadership)' },
  { value: 'intermediate', label: '🔄 Intermediate (some experience)' },
  { value: 'advanced', label: '⭐ Advanced (experienced leader)' },
  { value: 'unsure', label: '❓ Not sure where I am' },
];

const COLLABORATION_STEP_LABELS = ['Project Details', 'Budget & Timeline', 'Contact Info', 'Review'];
const PROGRAM_STEP_LABELS = ['Program Interest', 'Background & Goals', 'Contact Info', 'Review'];

export default function CollaborationForm({ formType = 'collaboration' }: CollaborationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isProgram = formType === 'program';
  const STEP_LABELS = isProgram ? PROGRAM_STEP_LABELS : COLLABORATION_STEP_LABELS;

  // Helper function to get label for dropdown values
  const getLabelForValue = (value: string, options: Array<{ value: string; label: string }>) => {
    return options.find(opt => opt.value === value)?.label || value;
  };

  // Setup validation rules
  const validationRules = useMemo(() => {
    const rules: Partial<Record<keyof FormData, ValidationRule<string>[]>> = {
      projectName: [isProgram ? ValidationRules.required('Your main goal') : ValidationRules.required('Project name')],
      collaborationType: [isProgram ? ValidationRules.required('Program choice') : ValidationRules.required('Collaboration type')],
      message: [ValidationRules.required(isProgram ? 'Your situation' : 'Message'), ValidationRules.minLength(20)],
      timeline: [ValidationRules.required('Timeline')],
      name: [ValidationRules.required('Your name')],
      email: [ValidationRules.required('Email'), ValidationRules.email()],
      company: [],
    };
    
    // Conditionally add budget validation
    if (!isProgram) {
      rules.budget = [ValidationRules.required('Budget range')];
    } else {
      rules.budget = [];
    }
    
    return rules;
  }, [isProgram]);

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
        if (isProgram) {
          return (
            !getFieldError('timeline') &&
            !!form.timeline
          );
        } else {
          return (
            !getFieldError('budget') &&
            !getFieldError('timeline') &&
            !!form.budget &&
            !!form.timeline
          );
        }
      case 3:
        return (
          !getFieldError('name') &&
          !getFieldError('email') &&
          !!form.name &&
          !!form.email
        );
      case 4:
        return true; // Review step - no validation needed
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
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
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Server error: ${response.status}`;
        throw new Error(errorMessage);
      }

      setStatus('success');
      resetForm();
      setCurrentStep(1);

      // Keep success state visible for user to see messages
    } catch (error) {
      setStatus('error');
      if (error instanceof TypeError) {
        // Network error
        setErrorMessage('Network error. Please check your connection and try again.');
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  };

  // Reset form and return to step 1
  const handleSuccessDismiss = () => {
    setStatus('idle');
    resetForm();
    setCurrentStep(1);
  };

  // Navigate to home page
  const handleReturnHome = () => {
    window.location.href = '/';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Form Progress Indicator */}
      <FormProgress currentStep={currentStep} totalSteps={4} stepLabels={STEP_LABELS} />

      {/* Loading State */}
      {status === 'loading' && <FormLoadingState />}

      {/* Success State */}
      {status === 'success' && (
        <FormSuccessState 
          message={isProgram ? "Your program inquiry has been submitted successfully! I'll review your information and get back to you within 24 hours to discuss the best program for your goals." : "Your inquiry has been submitted successfully! I'll review your collaboration request and get back to you within 24 hours."}
          onDismiss={handleSuccessDismiss}
          onReturnHome={handleReturnHome}
        />
      )}

      {/* Error State */}
      {status === 'error' && <FormErrorState message={errorMessage} />}

      {/* STEP 1: PROJECT DETAILS / PROGRAM INTEREST */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-2xl font-black uppercase heading-display mb-2 text-primary">
              {isProgram ? "Which program interests you?" : "Let's talk about your project"}
            </h3>
            <p className="text-tertiary">{isProgram ? "Tell me about your coaching goals" : "Tell me about the collaboration you have in mind"}</p>
          </div>

          <SelectField
            label={isProgram ? "Program Interest" : "Collaboration Type"}
            name="collaborationType"
            options={isProgram ? PROGRAM_TYPES : COLLABORATION_TYPES}
            value={form.collaborationType}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError('collaborationType')}
            state={getFieldState('collaborationType')}
            required
            hint={isProgram ? "Which program fits your needs?" : "What kind of collaboration are you interested in?"}
          />

          <InputField
            label={isProgram ? "Your Main Goal" : "Project Name / Title"}
            name="projectName"
            type="text"
            placeholder={isProgram ? "e.g., 'Get promoted', 'Lead with confidence'" : "e.g., 'Fashion Brand Campaign' or 'Music Video'"}
            value={form.projectName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getFieldError('projectName')}
            state={getFieldState('projectName')}
            required
            hint={isProgram ? "What do you want to achieve?" : "Give your project a working title"}
          />

          <InputField
            label={isProgram ? "Tell me more about your situation" : "Project Description"}
            name="message"
            placeholder={isProgram ? "What's your current challenge? What does success look like?" : "Describe your vision, goals, and any specific ideas you have..."}
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

      {/* STEP 2: BUDGET & TIMELINE / TIMELINE & BACKGROUND */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-2xl font-black uppercase heading-display mb-2 text-primary">
              {isProgram ? "Background & Availability" : "Budget & Timeline"}
            </h3>
            <p className="text-tertiary">{isProgram ? "Help me understand your experience level" : "Help me understand your project scope"}</p>
          </div>

          {!isProgram && (
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
          )}

          {isProgram && (
            <SelectField
              label="Leadership Experience Level"
              name="budget"
              options={EXPERIENCE_LEVELS}
              value={form.budget}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getFieldError('budget')}
              state={getFieldState('budget')}
              hint="This helps me tailor the program to your level"
            />
          )}

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
            hint={isProgram ? "When do you want to start?" : "When do you need this completed?"}
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

      {/* STEP 4: REVIEW SUBMISSION */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-2xl font-black uppercase heading-display mb-2 text-primary">
              Review Your Inquiry
            </h3>
            <p className="text-tertiary">Double-check your information before sending</p>
          </div>

          {/* Review Card */}
          <div className="border-2 border-primary rounded p-6 space-y-6">
            {/* Project/Program Details Summary */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-border-color hover:bg-vibrant hover:bg-opacity-5 px-3 py-2 -mx-3 rounded transition-colors duration-200">
                <span className="text-tertiary mono-text">{isProgram ? "Program Interest" : "Collaboration Type"}</span>
                <span className="font-bold text-primary group-hover:text-vibrant">{getLabelForValue(form.collaborationType, isProgram ? PROGRAM_TYPES : COLLABORATION_TYPES)}</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-border-color hover:bg-vibrant hover:bg-opacity-5 px-3 py-2 -mx-3 rounded transition-colors duration-200">
                <span className="text-tertiary mono-text">{isProgram ? "Your Goal" : "Project Name"}</span>
                <span className="font-bold text-primary">{form.projectName}</span>
              </div>
              <div className="hover:bg-vibrant hover:bg-opacity-5 px-3 py-2 -mx-3 rounded transition-colors duration-200">
                <span className="text-tertiary mono-text block mb-2">{isProgram ? "Your Situation" : "Project Description"}</span>
                <p className="text-primary whitespace-pre-wrap">{form.message}</p>
              </div>
            </div>

            {/* Budget & Timeline / Experience & Timeline Summary */}
            <div className="space-y-4 pt-4 border-t border-border-color">
              {!isProgram && (
                <div className="flex items-center justify-between pb-4 border-b border-border-color hover:bg-vibrant hover:bg-opacity-5 px-3 py-2 -mx-3 rounded transition-colors duration-200">
                  <span className="text-tertiary mono-text">Budget Range</span>
                  <span className="font-bold text-primary">{getLabelForValue(form.budget, BUDGET_RANGE)}</span>
                </div>
              )}
              {isProgram && form.budget && (
                <div className="flex items-center justify-between pb-4 border-b border-border-color hover:bg-vibrant hover:bg-opacity-5 px-3 py-2 -mx-3 rounded transition-colors duration-200">
                  <span className="text-tertiary mono-text">Experience Level</span>
                  <span className="font-bold text-primary">{getLabelForValue(form.budget, EXPERIENCE_LEVELS)}</span>
                </div>
              )}
              <div className="flex items-center justify-between hover:bg-vibrant hover:bg-opacity-5 px-3 py-2 -mx-3 rounded transition-colors duration-200">
                <span className="text-tertiary mono-text">Timeline</span>
                <span className="font-bold text-primary">{getLabelForValue(form.timeline, TIMELINE_OPTIONS)}</span>
              </div>
            </div>

            {/* Contact Info Summary */}
            <div className="space-y-4 pt-4 border-t border-border-color">
              <div className="flex items-center justify-between pb-4 border-b border-border-color hover:bg-vibrant hover:bg-opacity-5 px-3 py-2 -mx-3 rounded transition-colors duration-200">
                <span className="text-tertiary mono-text">Name</span>
                <span className="font-bold text-primary">{form.name}</span>
              </div>
              <div className="flex items-center justify-between pb-4 border-b border-border-color hover:bg-vibrant hover:bg-opacity-5 px-3 py-2 -mx-3 rounded transition-colors duration-200">
                <span className="text-tertiary mono-text">Email</span>
                <span className="font-bold text-primary text-sm">{form.email}</span>
              </div>
              {form.company && (
                <div className="flex items-center justify-between hover:bg-vibrant hover:bg-opacity-5 px-3 py-2 -mx-3 rounded transition-colors duration-200">
                  <span className="text-tertiary mono-text">Company</span>
                  <span className="font-bold text-primary">{form.company}</span>
                </div>
              )}
            </div>
          </div>

          {/* Edit Steps Hint */}
          <div className="text-center text-tertiary text-sm mono-text">
            Click Previous to edit any information before submitting
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 pt-6 border-t border-primary">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={handlePrevStep}
            disabled={status === 'loading'}
            className="px-6 py-3 border-2 border-primary text-primary font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
        )}

        {currentStep < 4 ? (
          <button
            type="button"
            onClick={handleNextStep}
            disabled={status === 'loading'}
            className="ml-auto px-6 py-3 bg-accent-vibrant text-white font-black uppercase tracking-widest hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        ) : (
          <button
            type="submit"
            disabled={status === 'loading'}
            className="ml-auto px-6 py-3 bg-accent-vibrant text-white font-black uppercase tracking-widest hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? '⏳ Submitting...' : '✨ Send Inquiry'}
          </button>
        )}
      </div>
    </form>
  );
}
