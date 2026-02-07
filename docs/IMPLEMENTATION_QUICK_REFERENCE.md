# Quick Reference: Top 15 Improvements to Implement

## 1. **Add Design Tokens** (30 min)

```typescript
// lib/design-tokens.ts
export const TOKENS = {
  HERO_SVG: 200,
  TRANSITION_FAST: 150,
  Z_MODAL: 30,
  BREAKPOINTS: { MOBILE: 480, TABLET: 1024 },
};
```

**Why:** Eliminates magic numbers, makes changes easier, improves maintainability.

---

## 2. **Implement Image Optimization** (2 hours)

Replace all `<img>` with `<Image>` from `next/image`:

```tsx
import Image from "next/image";

<Image
  src="url"
  alt="desc"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
  sizes="(max-width: 768px) 100vw, 50vw"
/>;
```

**Impact:** 40-60% faster image load time

---

## 3. **Create Stylized Card Component** (45 min)

```tsx
// components/common/Card.tsx
interface CardProps {
  variant: "default" | "neon" | "vibrant" | "magenta";
  hoverable?: boolean;
  children: ReactNode;
}

export default function Card({ variant, hoverable, children }: CardProps) {
  const styles = {
    default: "border-primary bg-secondary",
    neon: "border-neon bg-neon-faint",
    vibrant: "border-vibrant bg-vibrant-faint",
    magenta: "border-magenta bg-magenta-faint",
  };

  return (
    <div
      className={`
      border-3 p-6 transition-all duration-300
      ${styles[variant]}
      ${hoverable ? "hover:shadow-lg hover:scale-105" : ""}
    `}
    >
      {children}
    </div>
  );
}
```

**Use:** Replace 100+ scattered `<div>` border patterns

---

## 4. **Add Lazy Loading for Components** (1 hour)

```tsx
// app/page.tsx
import dynamic from "next/dynamic";

const Form = dynamic(() => import("@/components/forms/CollaborationForm"), {
  ssr: false,
  loading: () => <div className="min-h-96 bg-tertiary animate-pulse" />,
});

<Form />; // Loads only when needed
```

**Impact:** 300ms+ faster initial page load

---

## 5. **Create Reusable Heading Component** (30 min)

```tsx
// components/common/Heading.tsx
interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  accent?: boolean;
}

const sizeMap = {
  1: "text-8xl",
  2: "text-7xl",
  3: "text-6xl",
  4: "text-5xl",
  5: "text-4xl",
  6: "text-3xl",
};

export default function Heading({ level, children, accent }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag
      className={`font-bold heading-display ${sizeMap[level]} ${accent ? "text-vibrant" : ""}`}
    >
      {children}
    </Tag>
  );
}
```

---

## 6. **Add Cosmic Corner Brackets** (20 min)

```tsx
// components/effects/CornerBracket.tsx
export function CornerBracket({ position = "top-left", size = "md" }: Props) {
  const positions = {
    "top-left": "top-0 left-0 border-t-2 border-l-2",
    "bottom-right": "bottom-0 right-0 border-b-2 border-r-2",
  };

  return (
    <div
      className={`absolute ${positions[position]} border-vibrant ${size === "md" ? "w-8 h-8" : ""}`}
    />
  );
}

// In card:
<Card variant="vibrant">
  <CornerBracket position="top-left" />
  <CornerBracket position="bottom-right" />
  {/* Content */}
</Card>;
```

---

## 7. **Enhance Form Fields with Animation** (1 hour)

```tsx
// components/forms/AnimatedInput.tsx
export function AnimatedInput({ label, value, onChange }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <label>{label}</label>
      <div
        className={`
        relative border-b-2 transition-colors
        ${isFocused ? "border-vibrant" : "border-primary"}
      `}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full px-4 py-3 bg-secondary outline-none"
        />
      </div>
    </div>
  );
}
```

---

## 8. **Add Reduced Motion Support** (15 min)

```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. **Create Pattern Library** (1 hour)

```css
/* globals.css - Add these classes */
.pattern-grid {
  background-image: linear-gradient(
    0deg,
    transparent 24%,
    var(--border-color) 25%,
    ...
  );
  background-size: 50px 50px;
}

.pattern-diagonal {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    var(--border-color) 10px,
    var(--border-color) 11px
  );
}

.pattern-dots {
  background-image: radial-gradient(
    circle,
    var(--border-color) 1px,
    transparent 1px
  );
  background-size: 20px 20px;
}
```

---

## 10. **Add Form Progress Indicator** (30 min)

```tsx
// components/common/FormProgress.tsx
export function FormProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percent = (current / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold text-primary">
        <span>
          Step {current} of {total}
        </span>
        <span>{Math.round(percent)}%</span>
      </div>
      <div className="h-2 bg-tertiary border border-primary overflow-hidden">
        <div
          className="h-full bg-gradient-90 from-vibrant to-neon transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
```

---

## 11. **Implement Scroll Animation Hook** (1 hour)

```tsx
// lib/hooks/useScrollAnimation.ts
export function useScrollAnimation(offsetPercent = 20) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: `0px 0px -${offsetPercent}% 0px` },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [offsetPercent]);

  return { ref, isVisible };
}
```

---

## 12. **Enhanced Gallery Cards** (2 hours)

```tsx
// components/content/GalleryCard.tsx
export function GalleryCard({ src, title, category }: Props) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative group overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image
        src={src}
        alt={title}
        className={`transition-transform duration-500 ${
          isHovering ? "scale-110 rotate-1" : "scale-100"
        }`}
      />

      <div
        className={`
        absolute inset-0 bg-black transition-opacity duration-300
        ${isHovering ? "opacity-40" : "opacity-0"}
      `}
      />

      <div
        className={`
        absolute inset-0 flex flex-col justify-end p-6 text-white
        transition-all duration-300 ${
          isHovering ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }
      `}
      >
        <p className="text-vibrant text-xs uppercase tracking-widest">
          {category}
        </p>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
    </div>
  );
}
```

---

## 13. **Add Theme-Aware Gradients** (30 min)

```css
/* globals.css */
:root {
  --gradient-hero: linear-gradient(
    135deg,
    var(--accent-vibrant),
    var(--accent-neon)
  );
  --gradient-subtle: linear-gradient(90deg, var(--accent-vibrant), #ff9575);
  --gradient-accent: linear-gradient(
    45deg,
    var(--accent-neon),
    var(--accent-magenta)
  );
}

.gradient-text {
  background: var(--gradient-hero);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 14. **Refactor Globals.css** (4 hours)

Split into modules:

```
app/
├── globals.css (imports only)
├── styles/
│   ├── themes.css (3 themes)
│   ├── typography.css
│   ├── components.css
│   ├── animations.css
│   ├── responsive.css
│   └── utilities.css
```

---

## 15. **Add Tailwind Config** (30 min)

```ts
// tailwind.config.ts
export default {
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        vibrant: "var(--accent-vibrant)",
        neon: "var(--accent-neon)",
      },
      keyframes: {
        "pulse-neon": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
};
```

---

## IMPLEMENTATION CHECKLIST

### Week 1: Foundation

- [ ] Create design tokens
- [ ] Add Image optimization
- [ ] Create styled Card component
- [ ] Implement lazy loading

### Week 2: Components

- [ ] Heading component
- [ ] Corner brackets
- [ ] Form enhancements
- [ ] Scroll animation hook

### Week 3: Polish

- [ ] Gallery improvements
- [ ] Pattern library
- [ ] Tailwind config
- [ ] Refactor globals.css

### Week 4: Testing

- [ ] Lighthouse audit
- [ ] Performance testing
- [ ] Cross-browser testing
- [ ] Mobile testing

---

## PERFORMANCE IMPACT

| Improvement | Est. Time | FCP Impact | LCP Impact | Bundle Impact         |
| ----------- | --------- | ---------- | ---------- | --------------------- |
| Images      | 2h        | -200ms     | -400ms     | -100KB                |
| Lazy load   | 1.5h      | -300ms     | -200ms     | -50KB                 |
| Components  | 3h        | -100ms     | -150ms     | -30KB                 |
| Patterns    | 2h        | 0ms        | 0ms        | 0KB                   |
| CSS split   | 4h        | 0ms        | -50ms      | +5KB (better caching) |
| **Total**   | **12.5h** | **-600ms** | **-800ms** | **-175KB**            |

---

## Questions to Guide Implementation

1. **Which pages have the most images?** → Prioritize image optimization there
2. **Which components are below the fold?** → Lazy load those
3. **Which animations are most noticeable?** → Optimize those with transform/opacity
4. **Which sections need the most visual polish?** → Add patterns and decorative elements there

---

**Start with the quick wins!** Target 3-4 improvements in your next development session.
