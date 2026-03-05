"use client";

import { useState, ChangeEvent, FormEvent } from "react";

type InquiryType = "coaching" | "collaboration" | "media" | "other";

interface FormData {
  name: string;
  email: string;
  inquiry_type: InquiryType;
  message: string;
  phone?: string;
  company?: string;
  budget?: string;
  timeline?: string;
}

interface FormState {
  isSubmitting: boolean;
  submitted: boolean;
  error: string | null;
}

interface InquiryOption {
  value: InquiryType;
  label: string;
  description: string;
}

const INQUIRY_OPTIONS: InquiryOption[] = [
  {
    value: "coaching",
    label: "Leadership Coaching",
    description: "1-on-1 movement-based leadership coaching",
  },
  {
    value: "collaboration",
    label: "Brand Collaboration",
    description: "Partner with me on campaigns or content",
  },
  {
    value: "media",
    label: "Media/Speaking",
    description: "Podcast interviews, speaking engagements, etc.",
  },
  {
    value: "other",
    label: "Other",
    description: "Something else not listed above",
  },
];

/**
 * SegmentedInquiryForm Component
 * ─────────────────────────────────────────────
 * Multi-step inquiry form with conditional fields and status messages.
 * All styling handled through CSS classes in form-inquiry.css
 * 
 * CSS Classes Used:
 * - .inquiry-form: Main form wrapper with flex layout
 * - .form-section: Individual form section
 * - .form-label: Label styling
 * - .form-input, .form-select, .form-textarea: Input field styling
 * - .radio-group, .radio-option: Radio button group styling
 * - .form-submit: Submit button styling
 * - .form-message: Status message container
 * - .form-message-success, .form-message-error: Message variants
 * - .form-helper-text: Helper text styling
 */
export default function SegmentedInquiryForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    inquiry_type: "coaching",
    message: "",
    phone: "",
    company: "",
    budget: "",
    timeline: "",
  });

  const [state, setState] = useState<FormState>({
    isSubmitting: false,
    submitted: false,
    error: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ isSubmitting: true, submitted: false, error: null });

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      setState({
        isSubmitting: false,
        submitted: true,
        error: null,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        inquiry_type: "coaching",
        message: "",
        phone: "",
        company: "",
        budget: "",
        timeline: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setState((prev) => ({ ...prev, submitted: false }));
      }, 5000);
    } catch (err) {
      setState({
        isSubmitting: false,
        submitted: false,
        error: err instanceof Error ? err.message : "An error occurred",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="inquiry-form">
      {/* Inquiry Type Selection */}
      <div className="form-section">
        <label className="form-label">What type of inquiry?</label>
        <div className="radio-group">
          {INQUIRY_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`radio-option ${
                formData.inquiry_type === option.value ? "active" : ""
              }`}
            >
              <input
                type="radio"
                name="inquiry_type"
                value={option.value}
                checked={formData.inquiry_type === option.value}
                onChange={handleChange}
              />
              <span className="radio-label">{option.label}</span>
              <p className="radio-description">{option.description}</p>
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div className="form-section">
        <label htmlFor="name" className="form-label">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div className="form-section">
        <label htmlFor="email" className="form-label">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="your.email@example.com"
        />
      </div>

      {/* Phone */}
      <div className="form-section">
        <label htmlFor="phone" className="form-label">
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      {/* Conditional Fields */}
      {(formData.inquiry_type === "collaboration" ||
        formData.inquiry_type === "media") && (
        <div className="form-conditional">
          <div className="form-section">
            <label htmlFor="company" className="form-label">
              Company/Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="form-input"
              placeholder="Your company name"
            />
          </div>

          {formData.inquiry_type === "collaboration" && (
            <>
              <div className="form-section">
                <label htmlFor="budget" className="form-label">
                  Budget Range (Approximate)
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select a range...</option>
                  <option value="under-5k">Under $5k</option>
                  <option value="5k-10k">$5k - $10k</option>
                  <option value="10k-25k">$10k - $25k</option>
                  <option value="25k-50k">$25k - $50k</option>
                  <option value="50k-plus">$50k+</option>
                </select>
              </div>

              <div className="form-section">
                <label htmlFor="timeline" className="form-label">
                  Desired Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select a timeline...</option>
                  <option value="asap">ASAP (within 2 weeks)</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </>
          )}
        </div>
      )}

      {/* Message */}
      <div className="form-section">
        <label htmlFor="message" className="form-label">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="form-textarea"
          placeholder="Tell me more about your inquiry, what you're looking for, and why you think we'd be a great fit..."
        />
      </div>

      {/* Submit Button */}
      <div className="form-button-group">
        <button
          type="submit"
          disabled={state.isSubmitting}
          className="form-submit"
        >
          {state.isSubmitting ? "Submitting..." : "Send Inquiry"}
        </button>
      </div>

      {/* Success Message */}
      {state.submitted && (
        <div className="form-message form-message-success">
          <p className="form-message-title">✓ Inquiry submitted successfully!</p>
          <p className="form-message-text">
            You'll receive a confirmation email shortly. I'll get back to you within 24 hours.
          </p>
        </div>
      )}

      {/* Error Message */}
      {state.error && (
        <div className="form-message form-message-error">
          <p className="form-message-title">✕ Oops, something went wrong</p>
          <p className="form-message-text">{state.error}</p>
        </div>
      )}

      {/* Helper text */}
      <p className="form-helper-text">
        * Required fields. I typically respond within 24 hours.
      </p>
    </form>
  );
}
