"use client";

import { useState, ChangeEvent } from "react";
import { useFormSubmission } from "@/lib/hooks";
import { FormField } from "@/components/ui/FormField";
import { FormMessage } from "@/components/ui/FormMessage";

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

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  inquiry_type: "coaching",
  message: "",
  phone: "",
  company: "",
  budget: "",
  timeline: "",
};

export default function SegmentedInquiryForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);

  const { state, submit } = useFormSubmission<FormData>({
    endpoint: "/api/inquiries",
    resetDelay: 5000,
    onSuccess: () => setFormData(INITIAL_FORM),
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(formData);
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
      <FormField label="Full Name" id="name" required>
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
      </FormField>

      {/* Email */}
      <FormField label="Email Address" id="email" required>
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
      </FormField>

      {/* Phone */}
      <FormField label="Phone Number (Optional)" id="phone">
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-input"
          placeholder="+1 (555) 000-0000"
        />
      </FormField>

      {/* Conditional Fields */}
      {(formData.inquiry_type === "collaboration" ||
        formData.inquiry_type === "media") && (
        <div className="form-conditional">
          <FormField label="Company/Organization" id="company">
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="form-input"
              placeholder="Your company name"
            />
          </FormField>

          {formData.inquiry_type === "collaboration" && (
            <>
              <FormField label="Budget Range (Approximate)" id="budget">
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
              </FormField>

              <FormField label="Desired Timeline" id="timeline">
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
              </FormField>
            </>
          )}
        </div>
      )}

      {/* Message */}
      <FormField label="Message" id="message" required>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="form-textarea"
          placeholder="Tell me more about your inquiry, what you're looking for, and why you think we'd be a great fit..."
        />
      </FormField>

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

      {/* Status Messages */}
      {state.submitted && (
        <FormMessage variant="success" title="✓ Inquiry submitted successfully!">
          You'll receive a confirmation email shortly. I'll get back to you within 24 hours.
        </FormMessage>
      )}

      {state.error && (
        <FormMessage variant="error" title="✕ Oops, something went wrong">
          {state.error}
        </FormMessage>
      )}

      {/* Helper text */}
      <p className="form-helper-text">
        * Required fields. I typically respond within 24 hours.
      </p>
    </form>
  );
}
