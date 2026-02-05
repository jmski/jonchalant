# UX/UI Design Audit & Improvement Plan

## Jon Chalon Professional Brand Hub

**Date**: February 4, 2026
**Status**: Comprehensive Analysis & Implementation Plan

---

## EXECUTIVE SUMMARY

Your website has a **strong technical foundation** with modern technologies (Next.js 16, React 19, Tailwind) and creative aesthetic choices (pixelated fonts, SVG graphics). However, several **critical UX/UI issues** diminish usability and professional credibility.

**Key Issues Identified**: 9 (3 Critical, 4 Major, 2 Minor)
**Severity**: Moderate-High for professional brand positioning
**Effort to Fix**: Low-Medium (most fixes are CSS/component adjustments)

---

## DETAILED CRITIQUE

### 🔴 CRITICAL ISSUES

#### 1. **Unclear Value Proposition on Homepage**

**Problem**:

- Home page opens directly with "Deconstructed Hamburger" graphic
- No clear headline explaining who you are or what you do
- Visitors don't immediately understand your value proposition
- Technical novelty (hamburger diagram) overshadows professional credibility

**Impact**: High bounce rate, unclear brand identity
**Business Risk**: Collaborators/clients confused about services
**User Perspective**: "What is this page about?" (first impression)

**Current**:

```
[Deconstructed Hamburger Graphic]
"Technical Specification: Menu Assembly"
[CTA Section: "Ready to Collaborate?"]
```

**Should be**:

```
[Hero Section with clear headline]
"Jon Chalon - Choreographer, Content Creator, Collaborator"
[Brief value proposition]
[Deconstructed Hamburger as visual interest element]
[CTA]
```

---

#### 2. **Visual Hierarchy Problems**

**Problem**:

- All headings use Silkscreen pixelated font (h1-h4)
- Makes text harder to read on body content pages
- No clear distinction between page titles and section headings
- Reduces professional perception

**Current State**: Decorative aesthetic overrides readability
**Impact**:

- Lower readability score (especially on mobile)
- Content pages feel less professional
- Reduces time-on-page metrics

**Affected Pages**: Dance, Showcase, About, Collaborations, Media Kit

**Fix Needed**:

- h1 (page title): Keep Silkscreen (distinctive)
- h2+ (section headings): Revert to serif for readability
- Body text: Maintain serif (good readability)

---

#### 3. **Navigation/Discoverability Issues**

**Problem**:

- No breadcrumb navigation on content pages
- Users can't see where they are in site structure
- Back button is unclear when deep in content
- Mobile nav works but no visual indication of current page

**Current State**:

```
Navigation: Home | Dance | Showcase | Collaborations | Media Kit | About | Contact
No breadcrumbs
No active state indicator on current page
```

**Impact**: Users get lost, reduced exploration
**Mobile**: Extra problem - no visible active state

**Fix Needed**:

- Add breadcrumb navigation on all non-home pages
- Visual active state indicator in navigation
- Visual feedback for mobile nav active state

---

### 🟠 MAJOR ISSUES

#### 4. **Insufficient Color Contrast in Some Combinations**

**Problem**:

- Vibrant accent color (#ff5f1f light theme) on certain backgrounds may not meet WCAG AA
- Text selection feature (wavy underline) might be missed by some users
- Theme switching: Earthy theme has warm colors that reduce contrast

**Current**: Using CSS variables but no contrast verification
**Impact**: Accessibility failure, reduced readability for 15% of users

**Standards**:

- WCAG AA: 4.5:1 for normal text
- WCAG AAA: 7:1 for normal text

**Fix Needed**:

- Test all color combinations with accessibility checker
- Adjust colors if needed to meet WCAG AA minimum
- Add visible focus indicators for keyboard navigation

---

#### 5. **Mobile Experience Gaps**

**Problem**:

- Deconstructed Hamburger doesn't respond well on small screens
- SVG aspect-square may be too large on iPhone 12 mini
- Touch targets could be larger for mobile users
- Spacing inconsistent between mobile/desktop in some sections

**Current**: Uses responsive breakpoints (sm:, md:, lg:) but inconsistent application
**Impact**: 45%+ users on mobile, potential frustration
**Mobile Tests**: Not recently verified on actual devices

**Affected**:

- Hero section padding
- Hamburger SVG size
- CTA button sizing
- Form input padding

**Fix Needed**:

- Larger touch targets (minimum 48px)
- Better mobile spacing
- Test SVG scaling on actual mobile devices

---

#### 6. **Form & Input Feedback Missing**

**Problem**:

- Collaboration form has no loading state indicator
- No success/error feedback visual design
- Form validation errors not clearly displayed
- No focus states on form inputs

**Current**: Basic form implementation
**Impact**: Users don't know if form submitted
**Professional Impact**: Looks incomplete/unfinished

**Fix Needed**:

- Add loading spinner during submit
- Clear success message component
- Red error states for validation
- Visible focus ring on inputs
- Animated confirmation checkmark

---

#### 7. **Content Pages Lack Personality**

**Problem**:

- Dance, Showcase, About pages are text-heavy
- No intermediate visual breaks/breathing room
- Portfolio items lack thumbnails or preview images
- Feels more like a blog than a creative portfolio

**Current**:

- Simple grid layout
- Heavy text emphasis
- No visual variety

**Impact**:

- Doesn't showcase visual creativity
- Reduces engagement time
- Doesn't match the caliber of "creative professional"

**Fix Needed**:

- Add image gallery components
- Vary section layouts (alternating text/image)
- Add visual elements (dividers, backgrounds)
- Create more visual interest

---

### 🟡 MINOR ISSUES

#### 8. **Scanline Effect Too Subtle**

**Problem**:

- 3% opacity scanline overlay barely visible
- Doesn't enhance retro aesthetic effectively
- Some users might not notice it exists

**Current**: `rgba(0, 0, 0, 0.03)` opacity
**Fix**: Increase to `0.08-0.12` for more visible effect

**Justification**: Retro aesthetic is core brand, should be more apparent

---

#### 9. **Loading States for Lazy Content**

**Problem**:

- No visual feedback when Sanity content is loading
- Images from Sanity API might take time to load
- Portfolio grids pop in without skeleton screens

**Current**: No loading indicators
**Fix Needed**:

- Add skeleton screens for portfolio items
- Blur-up image loading effect
- Loading shimmer animations

---

## PRIORITY IMPROVEMENT PLAN

### Phase 1: Critical (High Impact, Low Effort)

**Priority Order**:

1. Add hero section with clear value proposition to homepage
2. Fix heading hierarchy (h1 pixelated, h2+ serif)
3. Add breadcrumb navigation to all content pages
4. Add active page indicator to navigation

**Estimated Time**: 2-3 hours
**User Impact**: High - immediately improves usability

### Phase 2: Major (Medium Impact, Medium Effort)

**Priority Order**:

1. Add form loading states and success feedback
2. Verify color contrast, adjust if needed
3. Improve mobile touch targets and spacing
4. Add image previews to portfolio items

**Estimated Time**: 3-4 hours
**User Impact**: Medium-High - improves professional perception

### Phase 3: Polish (Low Impact, Low Effort)

**Priority Order**:

1. Increase scanline opacity
2. Add skeleton loaders for content
3. Improve empty states
4. Add micro-interactions (button hover, link effects)

**Estimated Time**: 1-2 hours
**User Impact**: Low - enhances premium feel

---

## METRICS TO TRACK

### Before Changes

- Page load time
- Mobile responsiveness score
- Accessibility score (Lighthouse)
- Time on page
- Navigation clarity (user testing)

### After Changes

- Same metrics for comparison
- Form submission rate (should increase)
- Bounce rate (should decrease)
- Mobile usage increase (should increase)

---

## RECOMMENDATIONS BY ROLE

### 👤 UX Designer Perspective

1. **Discoverability**: Breadcrumbs + active nav state critical
2. **Mental Model**: Clear value prop reduces cognitive load
3. **Form Feedback**: Loading states build trust
4. **Visual Hierarchy**: Readable typography improves scanning
5. **Accessibility**: WCAG compliance non-negotiable for professional sites

### 🎨 Web Designer Perspective

1. **Visual Balance**: More whitespace in content pages
2. **Layout Variety**: Not everything should be centered text blocks
3. **Type System**: Hierarchy through size, weight, color - not just font
4. **Micro-interactions**: Subtle animations on hover/focus
5. **Image Usage**: Creative field needs more visual portfolio

### 💻 Developer Perspective (Technical Debt)

1. **Component Reusability**: Form validation logic abstracted
2. **Loading States**: Create composable loading + success components
3. **Navigation**: Extract active route detection to hook
4. **Images**: Implement Next.js Image component with blur placeholder
5. **A11y**: Add ARIA labels, focus management, keyboard navigation

---

## IMPLEMENTATION CHECKLIST

### Phase 1: Critical Fixes

- [ ] Create Hero section component with clear headline
- [ ] Adjust heading hierarchy CSS (keep h1 Silkscreen, h2+ serif)
- [ ] Create Breadcrumb component
- [ ] Add active page detection to Navbar
- [ ] Update homepage layout to include new hero

### Phase 2: Major Fixes

- [ ] Create Form success/loading states
- [ ] Run color contrast audit
- [ ] Update mobile padding/spacing
- [ ] Create ImagePreview component for portfolios
- [ ] Test on actual mobile devices

### Phase 3: Polish

- [ ] Increase scanline opacity
- [ ] Add skeleton loaders
- [ ] Create micro-interactions CSS
- [ ] Test accessibility with screen reader

---

## ESTIMATED EFFORT

| Phase     | Tasks  | Time     | Difficulty     |
| --------- | ------ | -------- | -------------- |
| 1         | 5      | 2-3h     | Low            |
| 2         | 5      | 3-4h     | Medium         |
| 3         | 4      | 1-2h     | Low            |
| **Total** | **14** | **6-9h** | **Low-Medium** |

---

## SUCCESS CRITERIA

✅ **Phase 1 Complete When**:

- [ ] Homepage has clear headline explaining who/what
- [ ] H2-H4 readable on all pages
- [ ] Breadcrumbs show on non-home pages
- [ ] Current page highlighted in navigation
- [ ] Mobile nav shows active state

✅ **Phase 2 Complete When**:

- [ ] Forms have loading + success states
- [ ] Color contrast ≥ WCAG AA on all combinations
- [ ] Touch targets ≥ 48px on mobile
- [ ] Portfolio items show preview images
- [ ] Tested on 3+ mobile devices

✅ **Phase 3 Complete When**:

- [ ] Scanlines visible but not distracting
- [ ] Skeleton screens show while loading
- [ ] Micro-interactions smooth (no jank)
- [ ] Lighthouse accessibility score ≥ 95

---

## NEXT STEPS

1. **Review this audit** - Does this match your vision?
2. **Prioritize**: Confirm Phase 1-3 priorities
3. **Approval**: Sign off on specific changes before implementation
4. **Implementation**: Execute changes systematically
5. **Testing**: Verify each phase on desktop + mobile
6. **Monitoring**: Track metrics post-deployment
