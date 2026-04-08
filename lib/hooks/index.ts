/**
 * Hooks barrel export
 * Central location for all custom React hooks
 */

export { useFormValidation, ValidationRules } from './useFormValidation';
export type { ValidationRule, FormValues } from './useFormValidation';

export { usePointerPosition } from './usePointerPosition';
export { useScrollTrigger } from './useScrollTrigger';
export { useScrollAnimation, getAnimationClass } from './useScrollAnimation';
export type { AnimationVariant } from './useScrollAnimation';

export { useFocusTrap } from './useFocusTrap';
export { useSwipeGesture } from './useSwipeGesture';

export { useFormSubmission } from './useFormSubmission';
export { useMultiStep } from './useMultiStep';
export { useKeyboardNavigation } from './useKeyboardNavigation';
