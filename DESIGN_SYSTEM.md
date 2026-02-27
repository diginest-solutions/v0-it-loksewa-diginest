# Design System - IT Loksewa Smart Prep

## 🎨 Color Palette

### Primary Colors
- **Indigo-600**: `#4F46E5` - Primary actions, active states
- **Blue-600**: `#2563EB` - Secondary actions, interactive elements
- **Indigo-500**: `#6366F1` - Tertiary, hover states

### Semantic Colors
- **Emerald-500**: `#10B981` - Success, positive metrics
- **Amber-500**: `#F59E0B` - Warning, medium difficulty
- **Red-500**: `#EF4444` - Danger, hard difficulty, errors

### Neutral Colors
- **Slate-950**: `#030712` - Main background
- **Slate-900**: `#111827` - Card backgrounds
- **Slate-800**: `#1E293B` - Interactive elements (input, hover)
- **Slate-700**: `#334155` - Borders
- **Slate-500**: `#64748B` - Disabled text
- **Slate-400**: `#94A3B8` - Secondary text
- **Slate-300**: `#CBD5E1` - Tertiary text (light)
- **White**: `#FFFFFF` - Primary text, highlights

## 🔤 Typography

### Font Family
- **Primary**: Geist (sans-serif) - System default
- **Mono**: Geist Mono - Code, technical content

### Font Weights
- **Bold**: 700 - Headings, emphasis
- **Semibold**: 600 - Card titles, labels
- **Medium**: 500 - Button text, badges
- **Regular**: 400 - Body text, descriptions

### Font Sizes
| Size | Usage |
|------|-------|
| 7xl (3.5rem) | Page hero title |
| 5xl (3rem) | Section headlines |
| 4xl (2.25rem) | Page title |
| 2xl (1.5rem) | Section titles |
| xl (1.25rem) | Card titles |
| lg (1.125rem) | Subheadings |
| base (1rem) | Body text |
| sm (0.875rem) | Labels, captions |
| xs (0.75rem) | Small text, hints |

## 🎯 Component System

### Buttons
```
Primary: bg-indigo-600 hover:bg-indigo-700
Secondary: border-slate-700 hover:bg-slate-800
Danger: bg-red-600/20 text-red-300
```

### Cards
```
Default: bg-slate-900 border-slate-800
Hover: border-slate-700 shadow-lg
Gradient: from-indigo-500/10 to-indigo-600/5
```

### Inputs
```
Default: bg-slate-800 border-slate-700
Focus: border-indigo-500 ring-1 ring-indigo-500
Disabled: opacity-60
```

### Badges
```
Primary: bg-indigo-600 text-white
Secondary: bg-slate-800 text-slate-300
Status: bg-emerald-500/20 text-emerald-300
```

## 📐 Spacing System

### Scale (based on Tailwind)
- 1 = 0.25rem (4px)
- 2 = 0.5rem (8px)
- 3 = 0.75rem (12px)
- 4 = 1rem (16px)
- 6 = 1.5rem (24px)
- 8 = 2rem (32px)

### Commonly Used
- **Padding**: p-4, p-6 (default content padding)
- **Gaps**: gap-4, gap-6 (spacing between elements)
- **Margins**: my-8, mb-6 (section spacing)

## 🖼️ Layout Patterns

### Hero Section
- Max-width: 6xl (1152px)
- Padding: px-6 py-20 md:py-32
- Gradient background overlay

### Dashboard Page
- Main container: max-w-6xl mx-auto
- Sidebar: fixed left (md:static)
- Content padding: p-6 md:p-8

### Card Grid
- Responsive: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Gap: gap-6 (consistent spacing)
- Card padding: p-6

## 🎬 Animation Tokens

### Duration
- **Fast**: 200ms - Hover effects
- **Normal**: 300ms - Component transitions
- **Slow**: 500ms - Page transitions

### Easing
- **Default**: ease-in-out
- **Spring**: For sidebar (stiffness: 300, damping: 30)

### Common Patterns
```
Fade In: opacity-0 → opacity-1 (300ms)
Slide Up: y-20 → y-0 (300ms)
Scale Hover: scale-1 → scale-1.05 (200ms)
```

## 🌐 Responsive Breakpoints

| Breakpoint | Size | Usage |
|-----------|------|-------|
| sm | 640px | Mobile landscape |
| md | 768px | Tablet |
| lg | 1024px | Desktop |
| xl | 1280px | Large desktop |

### Mobile-First Strategy
- Base styles for mobile
- `md:` for tablet and up
- `lg:` for desktop and up

## 🎨 Gradient Examples

### Primary Gradient
```
from-indigo-600 to-blue-600
(Used for primary buttons, hero section)
```

### Accent Gradient
```
from-indigo-400 to-blue-400
(Used for text gradients, emphasis)
```

### Background Gradient
```
from-indigo-500/10 to-indigo-600/5
(Used for card backgrounds with transparency)
```

## 🔍 Visual Hierarchy

### Emphasis Levels
1. **Primary**: Indigo color, bold weight, largest size
2. **Secondary**: Blue color, semibold weight, medium size
3. **Tertiary**: Slate-400, regular weight, smaller size
4. **De-emphasized**: Slate-500, disabled opacity

## 📦 Shadow System

### Card Shadow
```
shadow-lg shadow-indigo-500/20
(Subtle colored shadow for depth)
```

### Button Shadow
```
shadow-lg shadow-indigo-500/20
(Enhanced on hover)
```

### Default
```
No shadow (cleaner, modern look)
```

## ✅ Accessibility

- **Contrast Ratio**: All text meets WCAG AA standards
- **Focus States**: Visible ring on interactive elements
- **Color Not Only**: Icons and text in addition to color
- **Keyboard Navigation**: Full support via shortcuts

## 🎯 Dark Theme Considerations

- No pure white background (uses slate-950)
- Sufficient contrast ratios maintained
- Blue light reduction through color temperature
- Consistent theme throughout application

---

**Design Philosophy**: Clean, modern, professional. Inspired by Vercel and premium SaaS products. Focus on clarity, readability, and user experience.
