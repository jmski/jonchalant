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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Success Message */}
      {state.submitted && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          <p className="font-semibold">✓ Inquiry submitted successfully!</p>
          <p className="text-sm mt-1">
            You'll receive a confirmation email shortly. I'll get back to you within 24 hours.
          </p>
        </div>
      )}

      {/* Error Message */}
      {state.error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          <p className="font-semibold">✕ Oops, something went wrong</p>
          <p className="text-sm mt-1">{state.error}</p>
        </div>
      )}

      {/* Inquiry Type Selection */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-4">
          What type of inquiry?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {INQUIRY_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={`block p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.inquiry_type === option.value
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <input
                type="radio"
                name="inquiry_type"
                value={option.value}
                checked={formData.inquiry_type === option.value}
                onChange={handleChange}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="block ml-0 mt-2 font-medium text-slate-900">
                {option.label}
              </span>
              <p className="text-xs text-slate-600 mt-1">{option.description}</p>
            </label>
          ))}
        </div>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="your.email@example.com"
        />
      </div>

      {/* Phone (Optional for all) */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-2">
          Phone Number (Optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      {/* Conditional fields for Collaboration & Media */}
      {(formData.inquiry_type === "collaboration" ||
        formData.inquiry_type === "media") && (
        <>
          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-slate-900 mb-2">
              Company/Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Your company name"
            />
          </div>

          {formData.inquiry_type === "collaboration" && (
            <>
              <div>
                <label htmlFor="budget" className="block text-sm font-semibold text-slate-900 mb-2">
                  Budget Range (Approximate)
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  <option value="">Select a range...</option>
                  <option value="under-5k">Under $5k</option>
                  <option value="5k-10k">$5k - $10k</option>
                  <option value="10k-25k">$10k - $25k</option>
                  <option value="25k-50k">$25k - $50k</option>
                  <option value="50k-plus">$50k+</option>
                </select>
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-semibold text-slate-900 mb-2">
                  Desired Timeline
                </label>
                <select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                >
                  <option value="">Select a timeline...</option>
                  <option value="asap">ASAP (within 2 weeks)</option>
                  <option value="1-month">Within 1 month</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </>
          )}
        </>
      )}

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          placeholder="Tell me more about your inquiry, what you're looking for, and why you think we'd be a great fit..."
        />
      </div>

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={state.isSubmitting}
          className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
        >
          {state.isSubmitting ? "Submitting..." : "Send Inquiry"}
        </button>
      </div>

      {/* Helper text */}
      <p className="text-xs text-slate-600 text-center">
        * Required fields. I typically respond within 24 hours.
      </p>
    </form>
  );
}
