# Color Blindness Testing Guide

Ensure your theme is accessible to users with color blindness.

---

## Overview

Approximately **1 in 12 men** and **1 in 200 women** have some form of color blindness. Three main types:

- **Protanopia** (Red-Blind): Can't see red/pink
- **Deuteranopia** (Green-Blind): Can't see green
- **Tritanopia** (Blue-Yellow): Can't see blue/yellow

---

## Automated Testing

### Using Chrome DevTools

**Steps:**

1. Open any page in Chrome
2. Press `F12` to open DevTools
3. Click `⋮` (More) → More tools → Rendering
4. Under "Emulate vision deficiencies", select:
   - Protanopia (red-blind)
   - Deuteranopia (green-blind)
   - Tritanopia (blue-yellow)
5. Check each theme against each type

**What to Verify:**

- [ ] All text is still readable
- [ ] Buttons/links are still distinguishable
- [ ] Status badges (success/error/warning) convey meaning without color alone
- [ ] Form validation errors are clear (not just red highlighting)

---

## Online Simulator Tools

### Coblis Color Blindness Simulator

**URL:** https://www.color-blindness.com/coblis-color-blindness-simulator/

**Steps:**

1. Upload a screenshot of your theme
2. Select vision type
3. Compare original vs. simulated

**Best For:** Quick visual check before deployment

---

## Manual Testing Procedure

### 1. Form Validation States

**Test:** Submit contact form with empty fields

**Verify (for each vision type):**

- [ ] Error messages are readable (not just red text)
- [ ] Error icons/symbols are visible
- [ ] Placeholder text is distinguishable from errors

### 2. Portfolio Categories

**Location:** Dance portfolio page filter

**Verify:** Each category badge is distinct even in color-blind mode

- Choreography badge should be distinguishable
- Performance badge should be distinguishable
- Freestyle badge should be distinguishable
- Etc.

### 3. Stage Lighting Effects

**Location:** Home hero section

**Verify:**

- [ ] Gradient overlays are visible
- [ ] Lighting effects don't solely rely on hue differences
- [ ] Opacity/brightness changes are perceivable

### 4. Focus Indicators

**Test:** Tab through navigation

**Verify (for each color blindness type):**

- [ ] Focus ring is clearly visible
- [ ] Outline width and offset are adequate
- [ ] Not confused with other UI elements

### 5. Accent Colors in Text

**Test:** Media Kit page (stats grid)

**Verify:** Accent-colored text headings are readable

- [ ] Sufficient contrast with background
- [ ] Not confused with body text
- [ ] Icon colors (if present) are distinguishable

---

## Developer Checklist

When designing themes, ensure:

- [ ] **Don't rely on color alone**: Use icons, labels, or patterns
- [ ] **Test accent colors**: Ensure they're distinguishable even desaturated
- [ ] **Sufficient contrast**: 7:1 for text (AAA), 3:1 for UI components
- [ ] **Test all states**: Hover, focus, active, disabled states
- [ ] **Use patterns**: Combine color with texture, borders, or icons

### Anti-Patterns to Avoid

```tsx
// ❌ BAD: Only red for error (not color-blind safe)
<div style={{ color: 'red' }}>Error occurred</div>

// ✅ GOOD: Icon + color + text (color-blind safe)
<div style={{ color: 'red' }}>
  <span>❌</span> Error occurred
</div>

// ❌ BAD: Green checkmark only for success
<span style={{ color: 'green' }}>✓</span>

// ✅ GOOD: Icon + text + aria-label
<span style={{ color: 'var(--color-success)' }} aria-label="Success">
  ✓ Submission successful
</span>
```

---

## Accessibility Testing Tools

| Tool                                                                                  | Type       | Best For                          |
| ------------------------------------------------------------------------------------- | ---------- | --------------------------------- |
| [Chrome DevTools Rendering](chrome://devtools)                                        | Browser    | Quick emulation                   |
| [Coblis Simulator](https://www.color-blindness.com/coblis-color-blindness-simulator/) | Online     | Screenshot testing                |
| [Color Oracle](http://www.colororacle.org/)                                           | Standalone | Real-time desktop emulation       |
| [Sim Daltonism](https://apps.apple.com/us/app/sim-daltonism/id693112260)              | macOS App  | Native color blindness simulation |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)              | Online     | Contrast ratio validation         |

---

## Test Results Template

Use this template to document your theme testing:

```markdown
# Color Blindness Test Results

**Theme:** [Your Theme Name]  
**Date:** [Date]  
**Tester:** [Name]

## Protanopia (Red-Blind)

- [ ] Text readable
- [ ] Buttons distinguishable
- [ ] Category badges distinct
- [ ] Form validation clear
- [ ] Status colors work (not just red)
- **Issues:** [List any problems]

## Deuteranopia (Green-Blind)

- [ ] Text readable
- [ ] Buttons distinguishable
- [ ] Category badges distinct
- [ ] Form validation clear
- [ ] Status colors work (not just green)
- **Issues:** [List any problems]

## Tritanopia (Blue-Yellow)

- [ ] Text readable
- [ ] Buttons distinguishable
- [ ] Category badges distinct
- [ ] Form validation clear
- [ ] Focus rings visible
- **Issues:** [List any problems]

## Overall Verdict

✅ **PASS** - Theme is color-blind accessible  
⚠️ **CONDITIONAL** - Needs these changes: [List]  
❌ **FAIL** - Significant issues, redesign needed
```

---

## Common Issues & Fixes

### Issue: Red/Pink accents invisible in Protanopia

**Fix:** Change accent to blue, cyan, or yellow. Add texture/pattern overlay if needed.

### Issue: Green success badges can't be seen by deuteranopia users

**Fix:** Add checkmark icon or text label. Use blue or yellow instead of green.

### Issue: Blue/yellow distinctions disappear in Tritanopia

**Fix:** Add different opacity levels or patterns. Include text labels ("Success" vs "Error").

### Issue: Focus ring invisible on certain backgrounds

**Fix:** Increase outline width. Add box-shadow for better visibility. Test all 3 color blindness types.

---

## Resources

- [WebAIM: Color Blindness](https://webaim.org/articles/colorblind/)
- [A11y Project: Color Blindness](https://www.a11yproject.com/posts/2021-07-21-colorblind-friendly-design/)
- [WCAG 2.1: Use of Color](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html)
- [Accessible Colors: Science](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2927921/)

---

## Next Steps

1. **Run Chrome DevTools emulation** on each theme
2. **Document results** in template above
3. **Fix any issues** before deploying
4. **Get feedback** from color-blind users if possible
5. **Archive test results** for compliance records

**Compliance Level:** WCAG 2.1 Level AA (2.1: Use of Color)
