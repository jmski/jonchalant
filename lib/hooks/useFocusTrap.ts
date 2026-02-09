import { useEffect, useRef } from 'react';

/**
 * useFocusTrap Hook
 * 
 * Traps focus within a modal or dialog element.
 * - Captures Tab key presses and keeps focus within the element
 * - Restores focus to the element that opened the modal when closed
 * - Essential for accessibility (WCAG 2.1 Level AA)
 * 
 * @param isActive - Whether the focus trap should be active
 * @param onEscape - Optional callback when Escape is pressed
 * 
 * @example
 * const modalRef = useRef<HTMLDivElement>(null);
 * useFocusTrap(isOpen, modalRef, () => setIsOpen(false));
 */
export function useFocusTrap(
  isActive: boolean,
  ref: React.RefObject<HTMLElement | null>,
  onEscape?: () => void
) {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;

    // Store the element that had focus before the trap
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Get all focusable elements within the trapped element
    const getFocusableElements = (): HTMLElement[] => {
      if (!ref.current) return [];

      const focusableSelectors = [
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'a[href]',
        '[tabindex]:not([tabindex="-1"])',
      ].join(',');

      return Array.from(ref.current.querySelectorAll(focusableSelectors));
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        onEscape();
        return;
      }

      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
      let nextIndex = currentIndex;

      if (e.shiftKey) {
        nextIndex = currentIndex <= 0 ? focusableElements.length - 1 : currentIndex - 1;
      } else {
        nextIndex = currentIndex === focusableElements.length - 1 ? 0 : currentIndex + 1;
      }

      e.preventDefault();
      focusableElements[nextIndex]?.focus();
    };

    ref.current.addEventListener('keydown', handleKeyDown);

    // Set initial focus to the first focusable element
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0]?.focus();
    }

    return () => {
      ref.current?.removeEventListener('keydown', handleKeyDown);

      // Restore focus to the element that opened the modal
      if (previousActiveElement.current && previousActiveElement.current.focus) {
        previousActiveElement.current.focus();
      }
    };
  }, [isActive, onEscape]);
}
