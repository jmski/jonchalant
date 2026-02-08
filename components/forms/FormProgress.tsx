'use client';

import React from 'react';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

/**
 * FormProgress Component
 *
 * Displays visual progress indicator for multi-step forms
 * Shows current step, completed steps, and upcoming steps
 *
 * @param currentStep - Current step number (1-indexed)
 * @param totalSteps - Total number of steps
 * @param stepLabels - Array of step labels (e.g., ['Project Details', 'Budget', 'Contact Info'])
 */
export default function FormProgress({
  currentStep,
  totalSteps,
  stepLabels,
}: FormProgressProps) {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm font-black uppercase tracking-widest text-primary">
            Step {currentStep} of {totalSteps}
          </div>
          <div className="text-xs font-mono text-tertiary">
            {Math.round(progressPercentage)}% complete
          </div>
        </div>

        {/* Progress Track */}
        <div className="relative w-full h-1 bg-tertiary rounded-full overflow-hidden">
          {/* Filled Progress */}
          <div
            className="absolute h-full bg-gradient-to-r transition-all duration-500 ease-out"
            style={{
              width: `${progressPercentage}%`,
              background: 'linear-gradient(90deg, var(--accent-vibrant), var(--accent-secondary))',
            }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between items-center gap-2">
        {stepLabels.map((label, idx) => {
          const stepNumber = idx + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={idx} className="flex flex-col items-center flex-1">
              {/* Step Circle */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                  transition-all duration-300 mb-2
                  ${
                    isCompleted
                      ? 'bg-accent-vibrant text-white'
                      : isCurrent
                        ? 'bg-primary border-2 border-accent-vibrant text-accent-vibrant'
                        : 'bg-tertiary text-secondary'
                  }
                `}
              >
                {isCompleted ? '✓' : stepNumber}
              </div>

              {/* Step Label */}
              <div
                className={`
                  text-xs font-mono text-center
                  ${isCurrent ? 'font-bold text-primary' : 'text-tertiary'}
                `}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
