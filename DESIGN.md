# Omido — Design System v2

## Brand Positioning
- **Perception**: Elite boutique software studio. Technical depth + strategic intelligence.
- **Tone**: Confident, direct, intelligent. Not corporate, not startup-casual.
- **Visual feel**: Editorial, expensive, calm but powerful, intentional.

## Typografie

| Rol | Font | Gewicht | Gebruik |
|-----|-------|---------|---------|
| Sans (body) | **Inter** | Regular/Medium/Semibold/Bold | Body, buttons, labels, navigation |
| Display (headings) | **Instrument Serif** | 400 | Hero titels, sectie headers, pull quotes |

## Kleuren

### Achtergronden (donker thema)

| Token | Hex | Gebruik |
|-------|-----|---------|
| `bg-primary` | `#0A0A0B` | Pagina achtergrond |
| `bg-elevated` | `#111113` | Navbar, footer, elevated secties |
| `bg-subtle` | `#161618` | Cards, lichte secties |
| `bg-muted` | `#1C1C1F` | Inputs, icon containers |
| `bg-hover` | `#222226` | Hover states |

### Tekst

| Token | Hex | Gebruik |
|-------|-----|---------|
| `text-primary` | `#F5F5F4` | Hoofdtekst, headings |
| `text-secondary` | `#A1A1AA` | Subtekst, beschrijvingen |
| `text-tertiary` | `#71717A` | Labels, hints, nav items |
| `text-muted` | `#52525B` | Uitgeschakeld, section labels |

### Accent (Warm Gold)

| Token | Hex/Value | Gebruik |
|-------|-----------|---------|
| `accent` | `#D4A853` | Buttons, links, CTA's, accenten |
| `accent-hover` | `#E0BA6A` | Hover state |
| `accent-muted` | `rgba(212,168,83,0.10)` | Badge/card achtergrond |
| `accent-text` | `#E8C86E` | Accent tekst op donkere bg |
| `accent-subtle` | `rgba(212,168,83,0.05)` | Lichte achtergrond tint |

### Borders

| Token | Hex |
|-------|-----|
| `border-default` | `#232328` |
| `border-subtle` | `#1A1A1E` |
| `border-hover` | `#3A3A42` |
| `border-accent` | `rgba(212,168,83,0.2)` |

## Border Radius

| Token | Waarde | Gebruik |
|-------|--------|---------|
| `xs` | 4px | Kleine elementen |
| `sm` | 6px | Buttons, badges, inputs |
| `md` | 10px | Icon containers, kleine cards |
| `lg` | 16px | Cards |
| `xl` | 24px | Hero mockups, grote containers |
| `2xl` | 32px | Feature containers |

## Shadows

| Token | Waarde | Gebruik |
|-------|--------|---------|
| `sm` | `0 1px 2px rgba(0,0,0,0.3)` | Subtiele diepte |
| `md` | `0 4px 16px rgba(0,0,0,0.35)` | Card hover |
| `lg` | `0 8px 32px rgba(0,0,0,0.4)` | Modals, elevated |
| `glow-sm` | `0 0 24px rgba(212,168,83,0.06)` | Subtiele accent glow |
| `glow-md` | `0 0 48px rgba(212,168,83,0.10)` | Card accent glow |
| `glow-lg` | `0 0 80px rgba(212,168,83,0.14)` | Hero/CTA glow |

## Animatie

| Token | Waarde |
|-------|--------|
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` |
| `duration-fast` | 150ms |
| `duration-base` | 250ms |
| `duration-slow` | 500ms |
| `duration-slower` | 800ms |

## Motion System (Framer Motion)

### Hero Choreography
1. Accent line scales from center (0.9s)
2. Badge fades up (staggered +0.1s)
3. Headline fades up (staggered +0.1s)
4. Subtitle fades up (staggered +0.1s)
5. CTAs fade up (staggered +0.1s)
6. Background gold nodes fade in (1.2-2.2s delay)

### Section Reveals
- `FadeIn`: scroll-triggered, supports up/down/left/right/none, configurable distance/delay
- `StaggerChildren`: viewport-aware stagger container
- All respect `prefers-reduced-motion`

### Hover System
- Cards: -0.5 translateY + border-hover + shadow-md
- Highlighted cards: + shadow-glow-sm
- Buttons: color shift + glow (primary), border + bg change (secondary)
- Arrow icons: translateX +0.5 on group hover
- Tech items: translateY -2

### Navbar Motion
- `layoutId` animated active indicator (spring)
- Mobile menu: AnimatePresence with height + opacity
- Menu items: staggered slide-in from left

### FAQ Accordion
- AnimatePresence for open/close
- Chevron rotation animation
- Height + opacity transition

## SVG Background System

| Achtergrond | Gebaseerd op | Gebruik |
|-------------|-------------|---------|
| `HeroBackground` | SVG 1 (constellation) | Homepage hero |
| `GridBackground` | SVG 2 (engineering grid) | Process sectie |
| `TopoBackground` | SVG 4 (topo lines) | About/story sectie |
| `RingsBackground` | SVG 7 (concentric rings) | CTA sectie, Contact pagina |

Alle backgrounds: inline SVG React components, `aria-hidden`, vignette fades.

## UI Componenten

### Button — 3 varianten, 3 maten
- **Primary**: gouden bg, donkere tekst, glow on hover
- **Secondary**: transparant, border, bg-hover on hover
- **Ghost**: transparant, geen border, tekst kleur shift
- Maten: sm (px-4 py-2), md (px-5 py-2.5), lg (px-7 py-3)
- Optionele arrow met hover translate

### Card
- bg-subtle, border-default, radius-lg
- Padding varianten: compact, standard, spacious
- Optioneel: hover lift, glow

### Badge
- Pill-vormig, uppercase, tracking-[0.1em], 11px
- Default: grijs + border-subtle
- Accent: accent-muted bg + accent border

### PageHeader
- Animated accent line + badge + heading + subtitle
- Reduced motion fallback
- Centered, narrow container

## Spacing
8px grid (Tailwind default) + custom: 18 (4.5rem), 22 (5.5rem), 26 (6.5rem), 30 (7.5rem), 34 (8.5rem)

## Section Labels
Consistent pattern: `text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted`
Used above every section heading for visual rhythm.

## SEO / Schema
- Organization + LocalBusiness schema in layout
- Breadcrumb schema on all sub-pages
- FAQ schema on homepage
- Service schema on diensten page
- Semantic HTML throughout
- robots.ts + sitemap.ts

## Architectuur

```
src/
  app/           -> Pages + metadata + schema
  components/
    backgrounds/ -> SVG background React components
    layout/      -> Container, SectionWrapper, Navbar, Footer, PreFooterCTA
    motion/      -> FadeIn, StaggerChildren
    sections/    -> Page-specific section components
    ui/          -> Button, Card, Badge, PageHeader
  content/       -> Data: services, team, portfolio, faqs
  lib/           -> Constants, schema helpers
```
