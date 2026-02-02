# 🚀 Quick Start: Using Day 4 Components

## 1️⃣ GlitchText - Add Attention-Grabbing Headlines

### Before (Standard Hero)

```tsx
<h1 className="text-5xl font-bold">Welcome to My Portfolio</h1>
```

### After (With Glitch Effect)

```tsx
import GlitchText from "@/components/GlitchText";

<GlitchText
  text="Welcome to My Portfolio"
  intensity="high"
  autoGlitch={true}
  className="text-5xl font-bold"
/>;
```

### Where to Use

- ✅ Homepage hero headline
- ✅ Dance portfolio section title
- ✅ "Let's Collaborate" headline
- ✅ Special announcements

---

## 2️⃣ ParticleBackground - Premium Background Animation

### Before (Static Background)

```tsx
<div className="bg-white dark:bg-slate-900">{/* content */}</div>
```

### After (Animated Particles)

```tsx
import ParticleBackground from "@/components/ParticleBackground";

<div className="relative">
  <ParticleBackground />
  <div className="relative z-10">{/* your content */}</div>
</div>;
```

### Where to Use

- ✅ Collaborations page (premium feel)
- ✅ Media kit page (professional tone)
- ✅ About page (personality)
- ✅ Contact page (engagement boost)

**Tip**: Works best on pages with lots of whitespace

---

## 3️⃣ Observable - Auto-Trigger Animations on Scroll

### Before (Static Cards)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {items.map((item) => (
    <PortfolioCard key={item.id} {...item} />
  ))}
</div>
```

### After (Animated on Scroll)

```tsx
import Observable from "@/components/Observable";

<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {items.map((item, idx) => (
    <Observable
      key={item.id}
      animation="blurSlideUp"
      delay={idx * 100} // Stagger animation
    >
      <PortfolioCard {...item} />
    </Observable>
  ))}
</div>;
```

### Animation Types

- `blurSlideUp` - Slides up with blur fade (most popular)
- `fadeIn` - Simple fade in
- `blurIn` - Blur to focus fade
- `rotateIn` - 3D rotation entrance
- `waveReveal` - Wavy text reveal

### Where to Use

- ✅ Portfolio galleries (dance, Gunpla, Pokémon)
- ✅ Stats section on media kit
- ✅ Team/collaborators section
- ✅ Testimonials (if added)

---

## 4️⃣ FormValidator - Form Validation Feedback

### Before (Basic Form)

```tsx
<input type="email" placeholder="your@email.com" />
```

### After (Smart Validation)

```tsx
import { useFormValidator, validateEmail } from "@/components/FormValidator";

export default function ContactForm() {
  const { errors, setFieldError, setFieldValidated } = useFormValidator();

  const handleEmailChange = (value: string) => {
    const error = validateEmail(value);
    setFieldError("email", error);
    setFieldValidated("email", !error);
  };

  return (
    <div>
      <input
        type="email"
        onChange={(e) => handleEmailChange(e.target.value)}
        className={`
          px-4 py-2 border rounded
          ${errors.email ? "border-red-500 bg-red-50" : "border-slate-300"}
        `}
        placeholder="your@email.com"
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-1 animate-validationError">
          {errors.email}
        </p>
      )}
    </div>
  );
}
```

### Available Validators

```tsx
import {
  validateEmail, // Checks valid email format
  validateRequired, // Checks not empty
  validateMinLength, // Checks minimum length
  validatePhone, // Checks valid phone format
} from "@/components/FormValidator";
```

### Where to Use

- ✅ Collaboration inquiry form (contact/page.tsx)
- ✅ Any contact form
- ✅ Newsletter signup (if added)
- ✅ Feedback form

---

## 🎯 Recommended Integration Plan

### Phase 1: Quick Wins (15 minutes)

1. Add **GlitchText** to `app/page.tsx` hero
2. Add **ParticleBackground** to `app/collaborations/page.tsx`
3. Test in dev server: `npm run dev`

### Phase 2: Portfolio Enhancement (20 minutes)

1. Wrap all portfolio items with **Observable** in:
   - `app/dance/page.tsx`
   - `app/showcase/page.tsx`
2. Stagger animations with `delay={idx * 100}`
3. Test scroll performance

### Phase 3: Form Improvement (15 minutes)

1. Upgrade **CollaborationForm** with **FormValidator**
2. Add validation feedback with CSS animations
3. Test form validation

### Phase 4: Polish (10 minutes)

1. Fine-tune animation timings
2. Test on mobile devices
3. Verify Lighthouse scores

**Total Time: ~60 minutes for full integration**

---

## ⚡ Performance Tips

### GlitchText

- Use `autoGlitch={true}` sparingly (CPU intensive on auto)
- Better: Use `autoGlitch={false}` for hover-only glitch
- Limit to 1-2 elements per page

### ParticleBackground

- Place as first child in `relative` container
- Use `z-10` on content to layer above
- Monitor FPS on lower-end devices (may need particle count tweak)

### Observable

- Use `delay={idx * 100}` for staggered animations
- Default threshold (0.5) works for most cases
- Adjust `threshold={0.1}` for earlier triggers

### FormValidator

- Only validate on change/blur (not on every keystroke)
- Debounce email validation (optional)
- Show success feedback with `animate-validationSuccess`

---

## 🎨 Customization

### Change Glitch Intensity

```tsx
// Subtle glitch
<GlitchText intensity="low" />

// Medium intensity (default)
<GlitchText intensity="medium" />

// Aggressive glitch
<GlitchText intensity="high" />
```

### Change Observable Animation Timing

```tsx
<Observable
  animation="blurSlideUp"
  delay={200} // Wait 200ms before animating
  threshold={0.2} // Trigger at 20% visible
/>
```

### Customize Animation CSS

Edit `app/globals.css`:

```css
@keyframes glitch {
  /* Adjust offsets here */
  0%,
  100% {
    clip-path: inset(0);
  }
  20% {
    clip-path: inset(0 0 0 5px);
  }
  /* ... */
}
```

---

## ❓ Troubleshooting

### Glitch Text Not Working

- Check if `'use client'` is at top of file
- Verify `intensity` is one of: `'low'`, `'medium'`, `'high'`
- Check browser console for errors

### Particles Not Rendering

- Verify canvas has space (check parent container)
- Check for z-index conflicts
- Try increasing browser window size

### Observable Not Animating

- Ensure component is in scrollable container
- Check if animation class exists in globals.css
- Verify threshold value (0-1, higher = later trigger)

### Form Validation Not Working

- Import validators from FormValidator.tsx
- Ensure state updates properly with setFieldError
- Check CSS classes for error state styling

---

## 📚 Full Component Documentation

See each component file for detailed prop documentation:

- `components/GlitchText.tsx` - Full props interface
- `components/ParticleBackground.tsx` - Canvas configuration
- `components/FormValidator.tsx` - Validator functions and hooks
- `components/Observable.tsx` - Animation types and options

---

Ready to integrate? Start with Phase 1! 🚀
