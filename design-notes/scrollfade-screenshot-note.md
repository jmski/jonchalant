# ScrollFade + IntersectionObserver + Screenshot Tools

## The behavior

Methodology, curriculum, and other below-fold sections on the Foundation page (and elsewhere) use
the `ScrollFade` component, which applies an `opacity-0` class until the element enters the
viewport via IntersectionObserver.

Screenshot tools that capture the page at initial load position (top of the document) will show
blank or invisible content for any section that hasn't entered the viewport yet. This is correct
rendering behavior, not a bug.

## How to get accurate screenshots

- **Playwright CLI:** Use `--wait-for-timeout` and navigate to an anchor on the target section
  (e.g. `#pricing`) before capturing. Full-page screenshots with `--full-page` will still show
  blank areas for sections that were off-screen at capture time.
- **Manually:** Scroll to the section before screenshotting. Once IntersectionObserver fires,
  `isAnimating` is set to `true` and the element becomes visible.
- **Dev workaround:** Temporarily disable `triggerOnce` or the `opacity-0` class in
  `components/animations/ScrollFade.tsx` for capture sessions.

## Where this matters

- `app/(marketing)/foundation/page.tsx` — methodology cards, curriculum modules
- Any page using `<ScrollFade>` with below-fold content

## Confirmed non-bug (Phase 3 investigation, 2025-04)

Diagnosed during Phase 3 P3.E. `useScrollAnimation` hook in `lib/hooks/useScrollAnimation.ts`
uses IntersectionObserver with `triggerOnce: true`. The `getAnimationClass` function returns
`'opacity-0'` when `!isAnimating`. No fix needed.
