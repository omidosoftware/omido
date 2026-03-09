# Omido Mobile Visual Direction
## Visual Systems Director Output — March 2026

---

## 1. MOBILE SPACING SYSTEM

### Issue
`SectionWrapper` defines three spacing presets — `tight`, `default`, `loose` — but nearly every section uses `default` (`py-16 md:py-22 lg:py-26`). The result on mobile is a metronomic 64px top + 64px bottom on every single section. Nine sections in a row, all with identical vertical breathing room. The page reads like a spreadsheet, not editorial content. There is no pacing — no inhale/exhale rhythm that signals to the user "this section is different, pay attention."

The `TrustMetrics` strip uses its own `py-10`, and `CTASection` uses `py-22`, but the five main content sections between them all land at `py-16`. That uniformity kills hierarchy.

### Recommendation
Replace the three-preset system with a five-tier mobile spacing scale. Each tier has a specific semantic meaning:

```
Spacing Tier       Mobile Value    Tailwind Class     Usage
─────────────────────────────────────────────────────────────────
compact            py-8            py-8               Trust strips, divider moments, thin UI bands
snug               py-12           py-12              FAQ, secondary content, supporting sections
default            py-14           py-14              Standard content sections (WhyOmido, ServicesPreview)
generous           py-18           py-18              Primary narrative sections (Results, EntryOffer)
statement          py-22           py-22              CTA, hero-adjacent, final closing sections
```

Desktop values stay as they are — this only affects mobile. The `SectionWrapper` should accept a `mobileSpacing` prop or the spacing map should be updated:

```typescript
const spacingClasses = {
  compact:   "py-8  md:py-12 lg:py-16",
  snug:      "py-12 md:py-16 lg:py-20",
  default:   "py-14 md:py-22 lg:py-26",
  generous:  "py-18 md:py-26 lg:py-30",
  statement: "py-22 md:py-30 lg:py-34",
};
```

Assign sections on homepage as follows:

| Section          | Spacing Tier | Reasoning                                        |
|------------------|--------------|--------------------------------------------------|
| Hero             | (own layout) | Handled by min-h, not SectionWrapper             |
| TrustMetrics     | compact      | A bar, not a section. Reduce to py-6 on mobile.  |
| WhyOmido         | default      | Standard narrative block                         |
| ServicesPreview  | default      | Standard grid section                            |
| ProcessSection   | generous     | Important trust builder, needs breathing room    |
| ResultsSection   | generous     | Featured case study, high-value content          |
| EntryOfferSection| generous     | Pricing moment, needs confidence space around it |
| FAQSection       | snug         | Utility section, tighten it up                   |
| CTASection       | statement    | Final conversion moment, maximum breathing room  |

### Reasoning
Premium editorial sites (Stripe, Linear, Vercel) never use uniform section spacing. They vary rhythm based on content importance. A pricing section surrounded by spacious padding reads as "this matters." A FAQ tucked tight reads as "this is useful but secondary." The rhythm itself communicates hierarchy without any visual change to the content.

### Tradeoffs
More spacing variants means more decisions per section. Developers must consciously choose a tier for each new section rather than defaulting. This is a feature, not a bug — it forces intentionality.

### Final Direction
Implement the five-tier spacing scale in `SectionWrapper`. Every section must declare its tier explicitly. No default fallback on the homepage — each section's spacing is a deliberate choice.

---

## 2. MOBILE MENU VISUAL LANGUAGE

### Issue
The current mobile menu is a basic dropdown that slides open with `height: "auto"`. It uses `bg-bg-elevated` (which is `#111113`), standard `text-base` links with `py-3.5` padding, and a single CTA button at the bottom. On a 390px-wide phone, this occupies maybe 300px of vertical space, leaving visible page content below. It feels like a settings panel, not a premium brand moment.

For a studio selling EUR25K-100K projects, the mobile menu is one of the first interactions a prospect has. It must feel intentional, not bolted on.

### Recommendation
Full-screen takeover menu with these specifications:

**Layout:**
- `position: fixed; inset: 0;` — covers entire viewport
- `min-h-[100dvh]` to account for mobile browser chrome
- `flex flex-col justify-between` — nav links top-weighted, CTA anchored at bottom
- `px-6 pt-24 pb-8` — 96px top padding clears the navbar, 32px bottom for safe area

**Background:**
- `bg-bg-primary` (pure `#0A0A0B`), not `bg-bg-elevated`
- This creates maximum contrast separation from the page content behind it
- Subtle radial gradient from accent at 3% opacity, centered top-right: `bg-[radial-gradient(ellipse_at_top_right,rgba(212,168,83,0.03),transparent_60%)]`

**Typography for nav links:**
- Font: `font-[family-name:var(--font-display)]` — use the Instrument Serif display font
- Size: `text-[2rem]` (32px) — statement-sized, not body-sized
- Line height: `leading-[1.3]` with `space-y-1` between items
- Weight: `font-normal` (display font carries its own authority at this size)
- Color: `text-text-secondary` default, `text-text-primary` on active page
- Active indicator: small `w-6 h-px bg-accent` line below the active link text, not a background highlight

**CTA at bottom:**
- Full-width button: `w-full py-4 text-base`
- Contact info below CTA: phone number as `text-sm text-text-muted` with `mt-4`

**Animation:**
- Enter: `opacity: 0 -> 1` over 300ms with the expo ease
- Links stagger in from `opacity: 0, y: 12` with 60ms delay between items
- Exit: `opacity: 1 -> 0` over 200ms (faster exit than enter)
- No `height` animation — use opacity/transform only for smoother performance

**Close button:**
- The X icon in the navbar stays as-is, but increase to `h-6 w-6`

### Reasoning
Full-screen menus at display-font scale signal editorial quality. The user sees five or six words filling the viewport — that is a brand moment, not a utility interaction. Stripe, Linear, and every premium studio uses this pattern because it converts a navigation action into a brand impression.

### Tradeoffs
The user cannot see page content while the menu is open. This is acceptable — the menu is a modal, and modal behavior should feel complete.

### Final Direction
Full-screen takeover with display font at 32px, dark background, staggered entrance, CTA anchored at viewport bottom.

---

## 3. HERO MOBILE COMPOSITION

### Issue
`min-h-[92vh]` creates dead space on mobile. The content (badge + headline + subtitle + 2 CTAs) occupies roughly 400-450px of vertical space. On a 844px viewport (iPhone 14), that leaves 300-350px of empty space below the CTAs before any content begins. There is no scroll hint — the user sees a complete-looking composition and may not realize there is more below.

The headline uses `text-[clamp(2.5rem,6.5vw,5.5rem)]` which resolves to approximately 40px on a 390px screen. This is adequate but could be sharper. The badge at the top ("Software & AI partner voor groeiende bedrijven") adds visual clutter before the main headline lands.

### Recommendation

**Height:**
- Change from `min-h-[92vh]` to `min-h-[85vh] md:min-h-[92vh]`
- On mobile, 85vh still feels full-screen but leaves a visible sliver of the TrustMetrics section below, acting as a natural scroll hint
- Alternative: keep `min-h-[92vh]` but add an explicit scroll indicator (see below)

**Scroll hint (preferred approach):**
- Below the CTA buttons, add a subtle animated element at the bottom of the hero
- A thin line (`w-px h-8 bg-gradient-to-b from-text-muted/40 to-transparent`) with a slow `translateY` pulse animation
- Position with `absolute bottom-6 left-1/2 -translate-x-1/2`
- This element is hidden on desktop (`hidden md:block` inverted — `md:hidden`)

**Typography adjustments:**
- Headline: keep `clamp(2.5rem,6.5vw,5.5rem)` — it resolves well
- Subtitle: change from `text-[clamp(1rem,2vw,1.2rem)]` to `text-[15px] md:text-[clamp(1rem,2vw,1.2rem)]` — on mobile, the clamp resolves to 16px which is fine, but 15px feels slightly more refined and creates better density
- Badge: reduce `mb-8` to `mb-5` on mobile to tighten the top cluster
- Accent line above badge: reduce `mb-8` to `mb-5` on mobile

**CTA treatment:**
- On mobile, both buttons go full-width: `flex-col w-full` (already happening via `flex-col` at mobile)
- Primary CTA: add `w-full` explicitly so it spans edge to edge within the container
- Secondary CTA: same `w-full`
- Gap between: keep `gap-4` (16px) — this is correct
- Top margin: reduce `mt-9` to `mt-7` on mobile to bring CTAs closer to the subtitle

**Vertical rhythm tightening on mobile:**
The entire hero content cluster should feel tighter on mobile. Specific changes:
- Accent line `mb-8` -> `mb-5 md:mb-8`
- Badge `mb-8` -> `mb-5 md:mb-8`
- Subtitle `mt-7` -> `mt-5 md:mt-7`
- CTA container `mt-9` -> `mt-7 md:mt-9`

### Reasoning
The hero must do two things on mobile: land the message immediately, and signal that there is more below. Right now it only does the first. The tighter vertical rhythm brings the content cluster up, making room for either a scroll hint or visible next-section peek. Premium mobile heroes (Apple product pages, Linear landing) always have either a scroll indicator or visible content below the fold.

### Tradeoffs
Reducing `min-h` to 85vh means the hero feels slightly less "cinematic" on very tall phones. The scroll hint approach preserves the 92vh while solving the dead-space problem.

### Final Direction
Keep `min-h-[92vh]` but tighten internal spacing as specified above, and add a scroll-hint line element (visible only on mobile). The hero stays full-viewport but clearly communicates "scroll down."

---

## 4. CARD PATTERN DIFFERENTIATION

### Issue
The current site uses one visual formula for almost every grouped content block: `rounded-[var(--radius-md)] border border-border-default bg-bg-subtle p-6`. This appears in:
- ServicesPreview cards (bordered box with icon + text)
- ProcessSection steps (icon box + text, though centered)
- ResultsSection case study (bordered box)
- EntryOfferSection pricing cards (bordered box)
- FAQSection items (bordered box with accordion)
- ValuesSection cards (bordered box with icon + text)
- CaseStudy challenge/approach/solution trio (bordered box)

Seven instances of the same visual container. The eye stops registering them as distinct content types.

### Recommendation
Define four distinct component patterns. Each has a clear visual identity and a semantic role:

**Pattern A: "Ruled List" — for sequential/ordered content**
Used for: WhyOmido differentiators, Process steps on mobile
Visual: No box. No border container. Items separated by `border-b border-border-subtle` horizontal rules. Content flows vertically with `py-6` between items. First item has no top padding, last item has no bottom border.
Mobile-specific: Each item is a simple vertical stack — icon/number, title, description. No grid complexity.
Tailwind: `divide-y divide-border-subtle` on the parent. Items get `py-6 first:pt-0 last:pb-0 last:border-b-0`.
This is already partially used in WhyOmido but should also apply to ProcessSection on mobile.

**Pattern B: "Flush Panel" — for featured/highlighted content**
Used for: ResultsSection case study, featured service card
Visual: `rounded-[var(--radius-lg)] border border-border-default bg-bg-subtle` — the current card look, but reserved exclusively for high-importance featured content. Only one or two per page.
Key rule: This pattern always has generous internal padding (`p-6 md:p-8`). It never appears in a grid of 3+ identical siblings. If you have three items that all look like this, you are using the wrong pattern.

**Pattern C: "Minimal Stack" — for utility content lists**
Used for: FAQ items, feature checklists, value propositions
Visual: No container border. No background. Just the content with a subtle left accent — a `2px` left border in `border-border-subtle` or a dot marker. Items separated by `space-y-4`.
FAQ specifically: Remove the bordered box around each question. Use a clean `border-b border-border-subtle` separator between items instead. The question text gets `text-[15px] font-medium`, the answer sits below with `pt-3 pb-5`.
Values: Remove boxes entirely. Use icon + text in a simple flex row with `space-y-5` between items.

**Pattern D: "Comparison Pair" — for side-by-side options**
Used for: EntryOfferSection pricing cards only
Visual: Two cards side by side (stacked on mobile). The non-highlighted card uses `border border-border-default bg-bg-primary`. The highlighted card uses `border border-accent/20 bg-accent-subtle`. On mobile, the highlighted card should come first (reorder with `order-first`).
Key rule: The highlighted card should have a visible top accent bar (`h-[2px] bg-accent`) that the other card does not have. This creates immediate visual hierarchy between the two options.

### Reasoning
When every content block looks like a bordered card, the user's eye treats them all as equivalent importance. By restricting bordered containers to 1-2 featured moments per page, and using ruled lists or minimal stacks elsewhere, each section gets its own visual identity. The user unconsciously processes "this section feels different" — which keeps attention fresh through a long scroll.

### Tradeoffs
Less visual uniformity across sections. Some developers may feel this is "inconsistent." It is not — it is intentional variety within a cohesive system. The typography, color palette, and spacing system provide consistency. The container treatment provides variety.

### Final Direction
Implement all four patterns. Assign each section its pattern. Never use Pattern B (flush panel) more than twice on any single page. Pattern C (minimal stack) becomes the default for lists and utilities. Pattern A (ruled list) is for sequential content.

---

## 5. SECTION VISUAL BREAKS

### Issue
Scrolling the homepage on mobile, every section sits on `bg-bg-primary` (`#0A0A0B`) or `bg-bg-elevated` (`#111113`). The alternation between these two backgrounds is the only visual variety. Both are extremely close in value — the difference between `#0A0A0B` and `#111113` is barely perceptible on most mobile screens, especially OLED displays where both read as "near black." The page feels like one continuous dark corridor.

There are no full-bleed moments, no typographic scale shifts between sections, no images, no texture changes, no breathing moments.

### Recommendation
Introduce four types of visual breaks, used sparingly across the page:

**Break Type 1: Background Temperature Shift**
Instead of alternating between two near-identical dark backgrounds, introduce a third background for 1-2 key sections:
- `bg-[#0D0D10]` — a slightly cooler (blue-shifted) dark that reads as noticeably different from the warm-neutral `#0A0A0B`
- Use this for ProcessSection (the "how we work" section) to signal a shift from "what we do" to "how we do it"
- Alternative: use a very subtle gradient on one section: `bg-gradient-to-b from-bg-primary to-bg-elevated`

**Break Type 2: Accent Divider Moment**
Between certain sections, insert a thin divider that is not just a `border-t`. Options:
- A `1px` line with a subtle gradient: `bg-gradient-to-r from-transparent via-accent/15 to-transparent`
- Height: `h-px`. Full-width (edge to edge, not contained within the container).
- Use between: Hero/TrustMetrics (already has border), WhyOmido/ServicesPreview, ResultsSection/EntryOfferSection
- This replaces the current `border-y border-border-subtle` on `SectionWrapper elevated` sections

Implement as a simple component:
```tsx
function SectionDivider() {
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-border-hover to-transparent" />;
}
```

**Break Type 3: Typographic Scale Shift**
One section on the page should use a dramatically larger typographic scale for its heading — not just the hero. The CTA section heading should scale up to `text-[clamp(2.25rem,5vw,3.5rem)]` on mobile (currently it matches other section headings). This signals "final statement" and breaks the heading-size monotony.

**Break Type 4: Full-Bleed Background Accent**
The EntryOfferSection (pricing) should break out of the standard container rhythm. On mobile:
- The section itself remains contained, but the background extends full-bleed with a very subtle `bg-gradient-to-b from-accent/[0.02] to-transparent` layered on the elevated background
- This creates a barely-perceptible warm glow that subconsciously draws the eye to the pricing content
- On mobile only, since this is where every pixel of attention matters most

### Reasoning
Visual monotony is the enemy of scroll depth. When every section looks structurally identical, the brain stops registering new information — it assumes "more of the same." Premium editorial sites use background shifts, divider moments, and scale changes to reset attention at key conversion points.

### Tradeoffs
Too many visual breaks create chaos. The rule is: maximum 3 visual-break moments on the homepage mobile scroll. More than that, and the variety itself becomes monotonous.

### Final Direction
Implement the gradient SectionDivider component. Apply the accent-glow background to EntryOfferSection only. Scale up the CTA heading. Keep the third background color as an option but start with the other three breaks first.

---

## 6. FOOTER MOBILE REDESIGN

### Issue
The footer uses `grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20`. On mobile, this renders as four stacked sections (Brand, Navigatie, Diensten, Contact) each with `gap-12` (48px) between them, plus `py-16` (64px) top and bottom padding. Total: roughly 550-600px of footer on a 390px screen. The user scrolls past more than a full viewport of footer content. Four column headers ("Navigatie", "Diensten", "Contact"), each with 3-5 links below them, feels like a corporate sitemap.

For a studio with five pages and four services, this footer is overdone.

### Recommendation

**Structure: Two-zone footer**

Zone 1 — "Essential footer" (always visible):
- Logo (left-aligned, `h-7`)
- One-line brand descriptor: `text-sm text-text-tertiary` — keep existing text but truncate to one line
- Two rows of inline links: nav links and service links combined into one row of `text-[13px] text-text-tertiary` links separated by `mx-2 text-text-muted` middot characters
- Contact: email and phone on one line, separated by middot
- Total height target on mobile: 180-220px

Zone 2 — "Legal bar" (bottom):
- Copyright + legal links on one line (or two lines on very narrow screens)
- `py-5 border-t border-border-subtle`
- `text-xs text-text-muted`

**Specific layout:**
```
[Logo]
[Brand descriptor - one line]

[Home . Diensten . Portfolio . Over ons . Contact]
[info@omido.nl . +31 ...]

---
(c) 2026 Omido Software    Privacy . Voorwaarden
```

**Spacing:**
- Section padding: `py-10` (down from `py-16`)
- Gap between logo block and links: `mt-5` (down from the implicit `gap-12`)
- Gap between nav links and contact line: `mt-3`

**What to cut:**
- Remove the four-column grid entirely on mobile
- Remove the "Diensten" subsection header and links — they duplicate the main nav
- Combine everything into a compact vertical stack
- Remove uppercase tracking headers ("NAVIGATIE", "DIENSTEN", "CONTACT")

**Desktop remains unchanged.** The four-column layout is fine at `lg:` breakpoints.

### Reasoning
A 600px footer on a 390px phone says "we do not respect your scroll time." Premium studio sites (Basement, Rauno, Linear) have compact footers on mobile — logo, essential links, contact, legal. Everything a user needs, nothing they do not. The footer is not a sitemap; it is a safety net for users who scroll past the CTA.

### Tradeoffs
Service-specific deep links from the footer are lost on mobile. These are rarely used — the primary diensten page handles navigation to individual services. If analytics later show footer service links drive meaningful traffic, they can be added back behind a "Meer" toggle.

### Final Direction
Two-zone compact footer. Total mobile height under 250px. Logo + descriptor + inline links + contact + legal bar. No grid, no headers, no redundant sections.

---

## 7. PAGEHEADER MOBILE TREATMENT

### Issue
`PageHeader` uses `pt-34 pb-16 md:pt-38 md:pb-20`. The custom spacing value `pt-34` equals `8.5rem` (136px). On a 390px-wide phone, this means 136px of empty dark space above the first visible content. Combined with the 64px navbar height, the user sees 200px of nothing before the page title appears. It looks like the page failed to load.

The subtitle uses `text-lg` (18px) which is slightly large for mobile body copy and creates awkward line breaks on narrow screens.

### Recommendation

**Padding:**
- `pt-24 pb-10 md:pt-34 md:pb-16 lg:pt-38 lg:pb-20`
- Mobile: `pt-24` = 96px (64px navbar + 32px breathing room). This is tight but intentional — the content should feel accessible, not distant.
- Mobile bottom: `pb-10` = 40px, reduced from 64px. The page header is a label, not a section — it should transition quickly into the content below.

**Typography:**
- Title: keep `text-[clamp(2.25rem,5vw,3.75rem)]` — this resolves well on mobile (approximately 36px)
- Subtitle: change `text-lg` to `text-[15px] md:text-lg` — 15px on mobile reads as refined body copy without creating short ragged lines
- Subtitle `max-w-xl` -> `max-w-md md:max-w-xl` — tighter max-width on mobile prevents orphaned two-word final lines
- Subtitle `mt-5` -> `mt-4 md:mt-5` — slightly tighter vertical coupling

**Accent line:**
- The `w-12 h-px bg-accent` line above the title is a nice touch but `mb-6` spacing pushes it too far from the title
- Change to `mb-4 md:mb-6`
- Consider increasing width to `w-16` to match the hero accent line (visual consistency across components)

**Badge:**
- `mb-6` -> `mb-4 md:mb-6` to tighten the mobile stack

### Reasoning
136px of top padding was clearly designed with desktop proportions in mind. On a 667px iPhone SE viewport, that is 20% of the visible screen consumed by empty space. Premium mobile pages (Notion, Figma, Stripe docs) start content within 80-100px of the top edge. The user's thumb just navigated here — reward them with immediate content.

### Tradeoffs
Less breathing room above the title could feel "cramped" if the page header text is very long. For Omido's use cases (short titles like "Over ons" and "Contact"), this is not a concern. If a future page has a three-line title, the spacing will still work.

### Final Direction
`pt-24 pb-10` on mobile. Subtitle at 15px. All internal gaps tightened by 2-4px. Badge and accent line spacing reduced to `mb-4`.

---

## 8. MOBILE TYPOGRAPHY HIERARCHY

### Issue
The current type scale on mobile resolves to:
- Hero h1: ~40px (via clamp)
- Section h2: ~32px (via clamp) — used identically across WhyOmido, Process, Results, EntryOffer
- Card h3: 18px (`text-lg`) or 15px (`text-[15px]`)
- Body: 14-15px (via `text-sm` and `text-[15px]`)
- Labels: 11px (`text-[11px]`)

The gap between h2 (32px) and h3 (18px) is too large — 14px jump. And every section h2 being 32px means there is no heading hierarchy between sections. WhyOmido, Process, Results, and EntryOffer all have identical heading presence.

### Recommendation

**Mobile type scale (explicit, not clamp-dependent):**

```
Role                    Mobile Size    Class Override
────────────────────────────────────────────────────────────
Hero headline           40px           (keep current clamp — resolves correctly)
Primary section h2      30px           text-[30px] md:text-[clamp(2rem,4vw,3.25rem)]
Secondary section h2    26px           text-[26px] md:text-[clamp(1.75rem,3.5vw,2.5rem)]
Card/block h3           17px           text-[17px] md:text-lg
Body large              15px           text-[15px]
Body default            14px           text-sm (unchanged)
Label/overline          11px           text-[11px] (unchanged)
Caption/meta            12px           text-xs (unchanged)
```

**Section heading assignments:**
- "Primary" h2 sections (30px on mobile): WhyOmido, EntryOfferSection, CTASection — these are the key narrative/conversion moments
- "Secondary" h2 sections (26px on mobile): ServicesPreview, ProcessSection, ResultsSection, FAQSection — these are supporting content

**Additional adjustments:**
- Section overlines ("Waarom Omido", "Hoe wij bouwen"): keep at `text-[11px]` with `tracking-[0.15em]` — this works well as a micro-label
- Section overline spacing: `mb-3` -> `mb-2 md:mb-3` on mobile — bring the overline closer to its heading to strengthen the label-title coupling
- Hero subtitle: lock to `text-[15px]` on mobile instead of clamp
- Card descriptions: keep at `text-sm` (14px) — this is the right density for card content on mobile

**Line height adjustments:**
- h2 headings on mobile: `leading-[1.15]` instead of `leading-tight` (which is `1.25`). At 30px, tighter line height creates better visual mass.
- Body text: keep `leading-relaxed` (1.625) — this is correct for readability on mobile

### Reasoning
Two levels of section heading create rhythm. When every heading is the same size, the user's eye cannot prioritize — "Waarom Omido" and "Veelgestelde vragen" get equal visual weight, which is wrong. WhyOmido is a trust-building section that should command more attention than FAQ. Two type sizes enforce that hierarchy without any other visual change.

### Tradeoffs
Maintaining two heading sizes means each new section requires a conscious decision about which tier it belongs to. The rule is simple: if the section sells or builds trust, it gets Primary. If it supports or answers, it gets Secondary.

### Final Direction
Two-tier section heading system on mobile. 30px for primary, 26px for secondary. Card titles at 17px. Body at 14-15px. Tighter line-heights on headings, relaxed on body.

---

## 9. MOBILE CTA BUTTON SYSTEM

### Issue
The `Button` component defines three sizes (`sm`, `md`, `lg`) and three variants (`primary`, `secondary`, `ghost`). On mobile, the `lg` size renders as `px-7 py-3 text-[15px]` — this is fine for inline buttons but creates an oddly narrow, centered button when the buttons stack vertically in `flex-col`.

The hero CTAs stack via `flex-col` at mobile breakpoint, but neither button has explicit `w-full`. They render as auto-width centered blocks that are roughly 200-240px wide on a 342px content area (390px minus 2x24px padding). This leaves ~50px of wasted space on each side.

The contact form submit button is `w-full md:w-auto` — the right pattern, but not applied elsewhere.

### Recommendation

**Rule 1: Primary CTAs on mobile are always full-width.**
Every `Button` with `size="lg"` that appears as the primary action in a section should receive `w-full sm:w-auto`.

Affected components:
- HeroSection: both buttons get `w-full sm:w-auto`
- CTASection: both buttons get `w-full sm:w-auto`
- EntryOfferSection: both card CTAs already have `w-full` — correct
- PreFooterCTA: the button should get `w-full sm:w-auto`

**Rule 2: Stacked button pairs on mobile have visual weight hierarchy.**
When two buttons stack (primary + secondary), the primary should be visually dominant:
- Primary: `py-3.5` (increase from `py-3` for lg size on mobile)
- Secondary: keep `py-3`
- This creates a 4px height difference that signals "this one matters more"

Update the `sizes` map:
```typescript
const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[15px] md:py-3",  // taller on mobile, standard on desktop
};
```

Wait — that makes the desktop button shorter. Better approach: add mobile-specific class at the usage site rather than changing the component. In HeroSection and CTASection, add `py-3.5 md:py-3` to the primary button className.

Actually, the cleanest approach: primary `lg` buttons are 52px tall on mobile (py-3.5 at 15px text = ~52px). Secondary `lg` buttons stay at 48px (py-3). The height difference is subtle but the primary button feels more tappable.

**Rule 3: Touch target minimums.**
Every interactive element on mobile must be at least 44px tall (Apple HIG). Current `sm` size buttons: `py-2 text-sm` = roughly 36px. These are below threshold.

Fix: `sm` size should be `px-4 py-2.5 text-sm` on mobile. Or better: add a minimum height utility — `min-h-[44px]` — to the base button class, only on mobile: `min-h-[44px] md:min-h-0`.

**Rule 4: Ghost buttons on mobile get a subtle border.**
The `ghost` variant (`bg-transparent text-text-secondary`) is nearly invisible on the dark background on mobile. Small screens need clearer tap affordances. Add `border border-transparent md:border-0` to ghost buttons used on mobile — wait, that defeats the purpose.

Better: keep ghost buttons as-is but ensure they are never the only CTA in a section on mobile. They always appear paired with a primary or secondary button. The pairing provides context.

**Rule 5: Button text never wraps.**
Add `whitespace-nowrap` to the base button class. If a button label is too long for mobile, the label needs to be shortened — not wrapped.

### Reasoning
Full-width CTAs on mobile are an industry standard for a reason: they maximize tap target area and eliminate the "floating centered button" look that signals generic templates. The height hierarchy between primary and secondary buttons is a micro-detail that premium apps (Stripe checkout, Apple Store) use to guide the eye without any conscious thought from the user.

### Tradeoffs
Full-width buttons take more vertical space. On sections where two buttons stack, this adds roughly 100px of button area. This is acceptable — CTA moments should feel spacious, not cramped.

### Final Direction
All `lg` CTAs get `w-full sm:w-auto`. Primary buttons get 52px height on mobile. Ghost buttons stay inline but must always be paired. Add `whitespace-nowrap` to base button class. Ensure all buttons meet 44px touch target minimum.

---

## IMPLEMENTATION PRIORITY ORDER

1. **SectionWrapper spacing system** (highest impact, affects entire page rhythm)
2. **Mobile menu takeover** (first interaction, brand impression)
3. **PageHeader padding** (fixes the "looks broken" first-load issue on subpages)
4. **Card pattern differentiation** (breaks visual monotony, most labor-intensive)
5. **Hero composition** (scroll hint + spacing tightening)
6. **CTA button system** (w-full + touch targets)
7. **Footer compression** (important but lower conversion impact)
8. **Typography hierarchy** (two-tier headings)
9. **Section visual breaks** (polish layer, last priority)

---

## ANTI-PATTERNS TO AVOID

1. **Do not add mobile-only decorative elements.** No floating dots, no gradient orbs, no particle effects. These destroy performance and look dated on mobile.

2. **Do not use hamburger menu with a sidebar drawer.** Sidebars (sliding from left or right) feel like app navigation, not editorial content. Full-screen takeover is the correct pattern for a studio site.

3. **Do not make every section full-bleed on mobile.** The `px-6` container padding provides essential breathing room. Only background colors should go full-bleed, never content.

4. **Do not add horizontal scroll carousels.** Carousels are a cop-out for "we could not decide what to show." Pick the most important content and show it. Everything else gets progressive disclosure.

5. **Do not add bottom navigation bars.** This is a marketing site, not an app. The CTA is in the content, not in a persistent UI bar.

6. **Do not increase border-radius on mobile.** The current `--radius-md: 10px` and `--radius-lg: 16px` are correct. Larger radii on small screens look like children's app UI.

7. **Do not use card hover effects on mobile.** The `whileHover={{ y: -3 }}` on ServiceCard does nothing on touch devices and can cause visual glitches. Wrap hover animations in a `@media (hover: hover)` check or use `md:` prefix for hover utilities.

---

## FILES AFFECTED

Primary changes:
- `src/components/layout/SectionWrapper.tsx` — spacing tier system
- `src/components/layout/Navbar.tsx` — full-screen mobile menu
- `src/components/layout/Footer.tsx` — compact mobile layout
- `src/components/ui/PageHeader.tsx` — mobile padding + type
- `src/components/ui/Button.tsx` — touch targets + whitespace-nowrap
- `src/components/sections/home/HeroSection.tsx` — scroll hint + spacing
- `src/components/sections/home/FAQSection.tsx` — Pattern C (remove boxes)
- `src/components/sections/home/ProcessSection.tsx` — Pattern A on mobile
- `src/components/sections/about/ValuesSection.tsx` — Pattern C (remove boxes)
- `src/components/sections/home/TrustMetrics.tsx` — compact spacing
- `src/components/sections/home/CTASection.tsx` — type scale shift + button width
- `src/components/sections/home/EntryOfferSection.tsx` — Pattern D enforcement
- `src/app/globals.css` — SectionDivider gradient, accent-glow background utility

Secondary changes (spacing tier assignment):
- `src/components/sections/home/WhyOmido.tsx`
- `src/components/sections/home/ServicesPreview.tsx`
- `src/components/sections/home/ResultsSection.tsx`
- `src/components/sections/portfolio/CaseStudy.tsx` — project meta grid mobile fix
- `src/components/sections/services/ServiceCard.tsx` — hover effect mobile guard
