# Omido Mobile-First UX Direction

Strategic mobile refinement plan. Each area contains one definitive direction with full reasoning.

---

## 1. Navbar & Menu Overlay

### Issue
The mobile menu (Navbar.tsx, lines 106-151) uses `height: "auto"` animation that renders as a dropdown panel appended below the nav bar. It slides down with `opacity: 0, height: 0` to `opacity: 1, height: "auto"` -- this is a content-pushing pattern that feels like a utilitarian accordion, not a premium navigation moment. The nav items animate with a small `x: -12` slide-in (line 122), which is subtle to the point of being invisible. The hamburger icon swaps between `Menu` and `X` with no transition (line 70). The entire mobile menu lives inside the `<nav>` element as overflow-hidden content, meaning it can never feel full-screen or immersive.

### Recommendation
Replace the dropdown with a full-viewport overlay menu that renders as a sibling layer, not appended content.

**Structure:**
- The overlay should be a `fixed inset-0` element with `z-50`, rendered via a portal or at the top level of the Navbar component, outside the nav bar content flow.
- Background: `bg-bg-primary` (solid, not blurred -- premium sites use solid overlays, not frosted glass which feels like a system UI element).
- The nav bar itself remains visible at the top of the overlay with the X button in the same position as the hamburger, so the close action is spatially consistent.

**Animation choreography:**
- Overlay enters with `clipPath: "inset(0 0 100% 0)"` animating to `clipPath: "inset(0)"` over 400ms with `[0.76, 0, 0.24, 1]` easing. This creates a curtain-drop from top, which is directionally consistent with the hamburger's position.
- Nav items stagger in with `opacity: 0, y: 20` to `opacity: 1, y: 0`, starting 150ms after the overlay begins, with 60ms stagger between items.
- The CTA button ("Plan een kennismaking") enters last, 80ms after the final nav item.
- Exit: reverse the clip-path with items fading out simultaneously (no stagger on exit -- exits should be faster than entrances).

**Hamburger morph:**
- Replace the `Menu`/`X` lucide icon swap with two `span` elements (lines, not icons) that rotate into an X. This is a 14px-wide, 2px-tall span pair, positioned inside the existing `h-11 w-11` button. Top line rotates 45deg, bottom line rotates -45deg, both translate to center. Use Framer Motion `animate` with 300ms duration.

**Layout inside overlay:**
- Nav items should be left-aligned, not centered. Font size: `text-2xl` (24px) with `font-[family-name:var(--font-display)]` to match the editorial heading style used elsewhere. This makes navigation feel like content, not chrome.
- Remove the `rounded-[var(--radius-sm)]` and background hover states from mobile nav links (line 127). In a full-screen overlay, these feel like button artifacts. Use a simple `text-text-secondary` to `text-text-primary` color transition on tap/focus.
- Position nav items starting at roughly 30% from the top of the viewport (`pt-[30vh]`) so they sit in the natural thumb zone and the upper portion of the screen creates deliberate negative space.
- The CTA remains full-width but positioned at the bottom of the nav list with `mt-8`, not `mt-3` (current line 142).
- Add contact info (phone number, email) at the bottom of the overlay in small text (`text-xs text-text-muted`), creating a secondary action path.

### Reasoning
A dropdown menu communicates "this is a functional element." A full-viewport overlay communicates "this is a moment." For a premium studio selling projects starting at thousands of euros, the navigation is a brand touchpoint, not just a utility. The clip-path animation is GPU-accelerated and performs better than height animation on mobile. Left-aligned large type in the overlay creates the editorial quality that matches the site's positioning. The 30vh top padding puts links in the thumb zone while the negative space above signals confidence and restraint.

### Tradeoffs
- More complex component structure (portal or restructured JSX).
- The overlay completely obscures page content, which means if a user opens the menu to "peek" at options while reading, they lose context. This is acceptable because mobile navigation is a committed action -- users who open the menu have decided to navigate.
- The hamburger morph requires custom span elements instead of the simpler lucide icon swap.

### Final Direction
Full-viewport solid overlay with clip-path curtain animation, editorial left-aligned nav items at 24px display font, staggered fade-up entrance, hamburger-to-X span morph, contact details anchored at bottom. The overlay must feel like opening a book's table of contents, not a dropdown.

---

## 2. Hero Composition

### Issue
The hero (HeroSection.tsx, line 40) uses `min-h-[92vh]` with `items-center`, which vertically centers the content. On most mobile devices (especially taller phones like iPhone 14 Pro Max at 932px logical height), this creates roughly 150-200px of dead space below the CTA buttons before the fold. There is no scroll indicator, no visual suggestion that content continues below. The `min-h-[92vh]` also means on shorter devices (like iPhone SE at 667px logical height), the hero might not even fit, causing the CTAs to be partially cut off. The badge, accent line, headline, subtitle, and two CTAs are stacked in a single centered column -- this is a reasonable layout but the vertical centering combined with the extreme height creates a "landing page that forgot to load the rest" sensation on mobile.

### Recommendation
Change the mobile hero height from `min-h-[92vh]` to `min-h-[calc(100svh-4rem)]` (subtracting the 4rem/64px nav height). Use `svh` (small viewport height) which accounts for mobile browser chrome correctly. Add `items-end` on mobile with `pb-16` so the content gravitates toward the bottom of the viewport instead of floating in the center.

**Specific class changes on the `<section>` (line 40):**
```
min-h-[calc(100svh-4rem)] items-end pb-16 md:min-h-[92vh] md:items-center md:pb-0
```

This pushes all hero content to the lower portion of the screen on mobile, with the HeroBackground filling the upper area. The result: the visual weight is at the bottom, the brand/atmosphere lives at the top, and the user's eye naturally falls to the CTA area.

**Scroll hint:**
Add a subtle scroll indicator at the absolute bottom of the hero section. Implementation: a `div` positioned `absolute bottom-6 left-1/2 -translate-x-1/2` containing a small chevron or a 20px-tall, 1px-wide line with a Framer Motion `y` animation that pulses 8px downward in a loop (`repeat: Infinity, repeatType: "reverse", duration: 1.5`). Show only on mobile (`md:hidden`). Color: `text-text-muted` at 40% opacity. This element must be invisible enough to not feel like a gimmick but present enough to create scroll curiosity.

**Mobile CTA simplification:**
On screens below `sm` breakpoint, keep only the primary CTA ("Plan een kennismaking") as a full-width button. Move "Bekijk ons werk" to a text link below it with `text-sm text-text-tertiary` styling. Two equally-weighted buttons on mobile create decision paralysis in the first 3 seconds. The primary action must dominate.

### Reasoning
Bottom-aligned hero content on mobile mirrors how modern editorial apps (Apple News, Medium, premium editorial sites) position their key messaging. It eliminates dead space without reducing the hero's atmospheric impact. The `100svh` unit solves the iOS Safari dynamic toolbar problem that `100vh` notoriously gets wrong. Gravity-based layout (content at bottom) creates a natural reading flow: eye scans down, hits the headline, continues to the CTA, and the scroll hint confirms there is more below.

### Tradeoffs
- The HeroBackground component gets more visual real estate on mobile (the upper portion of the screen). If the background is weak or empty, this will feel barren. The background must carry enough visual interest to fill that space.
- Single primary CTA on mobile means the portfolio link is deprioritized. This is intentional -- the homepage's mobile job is to convert visitors to contact, not to browse portfolio.

### Final Direction
Bottom-aligned hero with `100svh` height, single dominant CTA on mobile, subtle scroll pulse indicator at the bottom edge. The hero should feel like the opening frame of a story that is about to begin, not a billboard floating in space.

---

## 3. Section Spacing Rhythm

### Issue
SectionWrapper.tsx defines three spacing tiers: `tight` (`py-12 md:py-16 lg:py-20`), `default` (`py-16 md:py-22 lg:py-26`), and `loose` (`py-20 md:py-26 lg:py-34`). In practice, the homepage uses mostly `default` spacing, with `ProcessSection` and `EntryOfferSection` using `elevated` (which adds the border-y and bg change but still uses `default` padding), and `FAQSection` using `tight`. The result on mobile is a metronomic `py-16` (64px top and bottom) for 6 out of 9 sections. Every section transition feels identical. There is no sense of chapters, grouping, or narrative pacing.

### Recommendation
Introduce a mobile-specific spacing system that creates three distinct rhythmic zones. Do NOT change the SectionWrapper component's existing tiers -- instead, add a fourth tier and use different tiers strategically.

**New spacing tier -- add to SectionWrapper:**
```
compact: "py-8 md:py-16 lg:py-20"
```

**Revised homepage section spacing assignments:**

| Section | Current | New | Mobile py | Rationale |
|---------|---------|-----|-----------|-----------|
| HeroSection | custom | custom | n/a | Has its own height system |
| TrustMetrics | custom `py-10` | keep | 40px | Tight band, this works |
| WhyOmido | default (py-16) | default | 64px | Opening argument needs breathing room |
| ServicesPreview | default (py-16) | compact | 32px | Tighten to group it visually with WhyOmido above -- they are both "what we do" content |
| ProcessSection | default+elevated | tight | 48px | Process is sequential and should feel connected |
| ResultsSection | default (py-16) | loose | 80px | Case study needs pre-space to signal importance |
| EntryOfferSection | default+elevated | default | 64px | Standard treatment |
| FAQSection | tight (py-12) | compact | 32px | FAQ is support content, should not claim too much space |
| CTASection | custom py-22 | keep | 88px | Final CTA needs gravity |

**Additional mobile rhythm device:**
Add a `SectionDivider` component -- a simple horizontal line (`h-px bg-border-subtle mx-6`) that can be placed between sections that currently transition without any visual break. Use it between WhyOmido and ServicesPreview (which currently have no visual separator and both have white backgrounds). This costs 1px of height but creates a chapter break that the padding alone cannot achieve.

### Reasoning
The current system has three tiers but uses one of them 70% of the time. The problem is not the system, it is the application. By reassigning tiers per section based on content role (opening argument, supporting evidence, proof, conversion), the page develops a rhythm: breathe, tighten, breathe wider, tighten, expand for the close. The `compact` tier at 32px mobile padding is aggressive but appropriate for content that should feel connected to its neighbors. The `loose` tier at 80px before ResultsSection creates a deliberate pause that says "what follows is important" -- this is the case study, the single strongest trust asset on the page.

### Tradeoffs
- The `compact` spacing might feel cramped if individual sections have their own internal padding issues. Must be tested per-section.
- Adding the `SectionDivider` element is an additional component, but it is trivially simple (a styled `<hr>`).

### Final Direction
Add a `compact` spacing tier to SectionWrapper. Reassign section spacing based on content hierarchy rather than uniformity. Use `loose` before proof sections (ResultsSection) and `compact` for support content (FAQ, ServicesPreview when grouped). The page should read like chapters with intentional pauses, not a feed with equal gaps.

---

## 4. Homepage Content Flow

### Issue
Current mobile section order (page.tsx, lines 22-30): Hero, TrustMetrics, WhyOmido, ServicesPreview, ProcessSection, ResultsSection, EntryOfferSection, FAQSection, CTASection. This order has a structural problem: the proof (ResultsSection/case study) appears as section 6 of 9. On mobile, where scroll depth drops significantly, the single most persuasive element (a real project with a real live link) is buried past the midpoint. The WhyOmido section (claims about differentiation) appears before any proof. The process section (how we work) appears before the visitor knows IF they should care. This is a classic "about us first, proof later" order that works against conversion.

### Recommendation
**Do not change the section order.** This is counterintuitive given the analysis, but here is why: the current order follows a legitimate persuasion arc (promise, differentiate, show capability, explain process, prove, offer, resolve objections, convert). Reordering for mobile creates a divergent experience that complicates maintenance and breaks the narrative cohesion that the desktop version relies on.

Instead, the fix is to **inject proof signals earlier** without moving the full ResultsSection.

**Specific implementation:**
1. In TrustMetrics (which appears immediately after the hero), add a fifth pillar: `{ icon: ExternalLink, label: "Bewezen resultaat", detail: "Snapklus.nl - live in productie" }`. This micro-reference to a real project at the very top of the page creates a proof anchor that the visitor carries through the rest of the scroll. On mobile, TrustMetrics renders as a 2x2 grid (line 24: `grid-cols-2`), so a fifth item would orphan. Change the mobile grid to `grid-cols-2` with the fifth item spanning full width (`col-span-2`) and styled as a highlighted/linked element pointing to `/portfolio`.

2. In ServicesPreview cards, the AI Agents card has `highlighted: true` and shows a "Populair" badge. Add a secondary proof line to the highlighted card only: a small `text-[11px] text-text-muted mt-2` line reading something like "Zoals gebouwd voor Snapklus" -- this contextualizes the service with a real project name.

3. Keep the full ResultsSection at position 6. Its job changes from "first proof" to "deep proof" -- the visitor has already seen the project name twice by this point, so the full case study now feels like an expected deep-dive rather than a surprise reveal.

### Reasoning
Moving sections on mobile creates a maintenance burden (conditional rendering, different component order per breakpoint). It also creates disorienting experiences for users who switch between mobile and desktop. The better strategy is to distribute micro-proof throughout the existing flow. A single mention of "Snapklus.nl" in the trust bar costs nothing but immediately signals "these people have built real things" -- which is the entire job that the ResultsSection currently does alone, 6 sections too late.

### Tradeoffs
- Mentioning Snapklus multiple times could feel repetitive if the visitor reads everything carefully. This risk is low on mobile where attention is fragmented.
- Adding a fifth trust metric changes the TrustMetrics grid layout and requires a col-span-2 special case.

### Final Direction
Keep the section order intact. Inject proof signals into TrustMetrics (fifth pillar linking to a real project) and the highlighted ServicesPreview card. The ResultsSection remains at position 6 as the deep-dive proof. The principle: do not move proof down the page, bring proof references up the page.

---

## 5. CTA Flow on Long Scrolls

### Issue
The homepage has 9 sections. On mobile, this creates a scroll depth of approximately 5000-6000px. The primary CTA ("Plan een kennismaking") appears in the hero (top), in the CTASection (bottom), and in the PreFooterCTA on sub-pages. During the middle ~4000px of scrolling, there is no persistent CTA. The EntryOfferSection has CTAs but they are offer-specific ("Meer informatie", "Plan een gesprek"), not the universal conversion action. A mobile user who becomes convinced mid-scroll has to either remember to scroll back up, scroll all the way to the bottom, or abandon.

### Recommendation
Add a sticky bottom CTA bar that appears after the user scrolls past the hero section and disappears when the final CTASection enters the viewport.

**Implementation:**
- New component: `StickyMobileCTA.tsx`, rendered in `page.tsx` (or in the layout, conditionally).
- Position: `fixed bottom-0 left-0 right-0 z-40` (below the nav's z-50).
- Appearance trigger: appears when `window.scrollY > window.innerHeight` (user has scrolled past the hero). Use IntersectionObserver on the hero section's bottom edge.
- Disappearance trigger: hides when the CTASection enters the viewport. Use IntersectionObserver on the CTASection.
- Only renders on screens below `lg` breakpoint (use a media query check or `lg:hidden`).

**Visual design:**
- Height: 64px total, including safe area padding.
- Background: `bg-bg-primary/95 backdrop-blur-sm border-t border-border-subtle`.
- Content: single row with the CTA button taking up most of the width. Button text: "Plan een gesprek" (shorter than "Plan een kennismaking" to fit mobile widths). Style: accent background, full-width with `mx-4` horizontal margin.
- Do NOT include a secondary action or a dismiss button. The bar is simple: one button, one job.

**Animation:**
- Enter: `translateY(100%)` to `translateY(0)` over 300ms with `[0.16, 1, 0.3, 1]` easing.
- Exit: reverse.
- Add `pb-[env(safe-area-inset-bottom)]` to handle iPhone notch/home indicator.

### Reasoning
Sticky CTAs on mobile are standard for high-ticket service sites because mobile scroll sessions are long and unpredictable. The user might be convinced after reading the process section (section 5) but the nearest CTA is two sections away. A persistent bar eliminates this friction. The bar disappears near the bottom to avoid overlapping with the full CTASection, which has more context and a phone number fallback. The bar is intentionally minimal -- one button, no text explanation -- because by the time it appears, the user has already read the hero's value proposition.

### Tradeoffs
- 64px of fixed bottom space reduces the visible content area on mobile. This is the standard tradeoff for sticky bars and is acceptable because the CTA bar's conversion value outweighs the minor viewport reduction.
- The bar might feel aggressive if it appears too early. The `scrollY > window.innerHeight` threshold ensures the user has committed to scrolling before it appears.
- Needs safe-area handling for modern iPhones.

### Final Direction
A minimal sticky CTA bar (`StickyMobileCTA`) that appears after scrolling past the hero and hides when the final CTA section is visible. One full-width accent button, 64px height, blur background, safe-area aware. No secondary actions, no dismiss. Mobile-only via `lg:hidden`.

---

## 6. Contact Page Mobile Stacking

### Issue
Contact page (contact/page.tsx, lines 37-46) uses a `grid lg:grid-cols-3` layout. On mobile (below `lg`), this stacks naturally: the sidebar column (ContactInfo, QuickCallCard, WhatHappensNext) renders ABOVE the form (ContactForm). This means the primary action (filling out the form) is pushed below three informational components that total roughly 500-600px of height. A mobile visitor arriving on the contact page must scroll past email, phone, location info, a "plan a call" card, and a 3-step "what happens next" explainer before they can even see the form. The page header (PageHeader with `pt-34` = 136px on mobile) adds another ~280px before any content appears. Total scroll distance to the form: approximately 900-1000px. This is a conversion-hostile layout.

### Recommendation
Reverse the mobile stacking order so the form appears first, then the supporting information.

**Implementation on contact/page.tsx:**
Change the grid layout to use CSS `order` utilities:

```tsx
<div className="grid gap-8 lg:grid-cols-3">
  <div className="order-2 space-y-6 lg:order-none lg:col-span-1">
    <ContactInfo />
    <QuickCallCard />
    <WhatHappensNext />
  </div>
  <div className="order-1 lg:order-none lg:col-span-2">
    <ContactForm />
  </div>
</div>
```

This uses Tailwind's `order-1` and `order-2` to flip the stacking on mobile while preserving the desktop layout (sidebar left, form right) via `lg:order-none`.

**Additional refinements:**
1. On mobile, move QuickCallCard into a compact inline element ABOVE the form (not in the sidebar stack). Render it as a single line: "Liever bellen? [phone number]" with `text-sm`. This provides an immediate alternative without taking 150px of vertical space. The full QuickCallCard remains in the sidebar for desktop.
2. Collapse WhatHappensNext on mobile into a single line below the form's submit button: "We reageren binnen 24 uur." This eliminates the 3-step card (which is reassurance content that works better as a micro-copy line near the submit action than as a standalone block).
3. ContactInfo on mobile should render below the form as a compact horizontal row (email | phone | location) rather than a vertical card with icons. This reduces its mobile footprint from ~200px to ~60px.

### Reasoning
The contact page has one job: get the form filled out. Every pixel of content between the page header and the form input fields is friction. The current layout treats the sidebar information as context-setting that should precede the form. On desktop with a two-column layout, this works because the form and sidebar are side-by-side. On mobile, where everything is vertical, context-setting content becomes a barrier. The form must be the first interactive element after the page header. Supporting information (contact details, process explanation) serves as post-form reassurance -- "you just submitted, here is what happens next" or "here are other ways to reach us."

### Tradeoffs
- Desktop users who resize their browser through the `lg` breakpoint will see the order flip. This is a standard responsive tradeoff and affects virtually no real users.
- The compact phone line above the form might get overlooked. This is acceptable because it is a secondary action path.
- Collapsing WhatHappensNext into a single line means mobile users lose the detailed 3-step explanation. But the 3-step content is standard service-business reassurance ("we respond fast, we schedule a call, we send a proposal") that can be compressed without losing trust impact.

### Final Direction
Use `order-1`/`order-2` to put the form first on mobile. Compress QuickCallCard into a single-line phone link above the form. Collapse WhatHappensNext into a one-line reassurance message near the submit button. Push ContactInfo below the form in a compact horizontal format. The mobile contact page should feel like: header, form, done.

---

## 7. Footer Mobile Compression

### Issue
The footer (Footer.tsx) uses a `grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20` layout. On mobile, all four columns (Brand, Navigation, Services, Contact) stack vertically with `gap-12` (48px) between them. The brand block includes a logo and a paragraph (~80px). Navigation has a heading plus 5 links (~160px). Services has a heading plus 4 links (~140px). Contact has a heading plus 3 items (~120px). With the 48px gaps and `py-16` (64px top and bottom), the total footer height on mobile is approximately 500-620px. The bottom bar adds another ~80px with its `py-8`. Total: 580-700px of footer. This is excessive -- the footer is taller than the hero's content area on many phones.

### Recommendation
Restructure the mobile footer into a two-column layout with compressed spacing.

**Specific changes:**

1. Change the grid to `grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:py-20`.

2. On mobile, the four blocks arrange as:
   - Row 1: Navigation (col 1), Diensten (col 2)
   - Row 2: Contact (col 1), Brand (col 2)

   Achieve this with order utilities:
   - Navigation: `order-1`
   - Services: `order-2`
   - Contact: `order-3 lg:order-none`
   - Brand: `order-4 lg:order-none` (moves to last position on mobile)

3. Remove the brand paragraph on mobile (`hidden lg:block` on the `<p>` tag, line 29). The logo alone is sufficient in the footer context -- the tagline is redundant because the visitor has already scrolled through the entire page.

4. Reduce the list spacing from `space-y-3` to `space-y-2` on mobile. Change to `space-y-2 lg:space-y-3`.

5. Compress the bottom bar: change `py-8` to `py-5 lg:py-8` and reduce the gap from `gap-4` to `gap-3`.

6. Remove the heading labels ("Navigatie", "Diensten", "Contact") on mobile. These are obvious from context. Use `hidden lg:block` on the `<h4>` elements. This saves ~24px per column (3 columns = 72px total).

**Estimated result:** Two-column grid with 8px row gaps, no headings, compressed list spacing, no brand paragraph. Total mobile footer height: approximately 280-320px. This is roughly half the current height.

### Reasoning
Footers on premium sites serve two purposes: navigation fallback and legal/contact reference. They should not compete with content sections for attention. A 600px footer on a phone feels like a dead zone that the user scrolls through with diminishing interest. The two-column layout is standard for mobile footers on premium sites (Stripe, Linear, Vercel all use this pattern). Removing headings is safe because "Home, Diensten, Portfolio, Over Ons, Contact" is obviously navigation and "AI Agents, Web Applicaties, SaaS Platformen, API-integraties" is obviously a services list -- the headings add structural clarity that is unnecessary at this scale.

### Tradeoffs
- Removing column headings on mobile reduces scannability for first-time visitors who jump directly to the footer. This is a minor risk because footer navigation is a fallback behavior.
- The two-column layout requires link text to be short enough to fit in roughly 45% of the screen width. Current link labels fit within this constraint.
- Moving the brand block to last position on mobile deprioritizes the logo, but the logo is already visible in the navbar and was visible at the top of the page.

### Final Direction
Two-column mobile footer grid, remove column headings on mobile, remove brand paragraph on mobile, compress vertical spacing from `gap-12` to `gap-y-8`, reduce bottom bar padding. Target height: 280-320px, roughly half the current footprint.

---

## 8. PageHeader Mobile Reduction

### Issue
PageHeader.tsx (line 28) uses `pt-34 pb-16 md:pt-38 md:pb-20 lg:pb-22`. On mobile, `pt-34` equals 136px of top padding. Combined with the fixed nav bar height of 64px (h-16, Navbar.tsx line 43), the first visible content (the accent line divider) begins at roughly 200px from the top of the viewport. On a 390px-wide iPhone (844px tall viewport), this means the top 24% of the screen is empty space. The page header includes a decorative accent line (`h-px w-12`, line 38), the title, and a subtitle. The accent line adds 24px of margin below it (`mb-6`). The total PageHeader block on mobile is approximately 280-340px tall. This means the first piece of actual page content (e.g., the contact form grid) starts at nearly 350px from the top -- almost half the viewport is consumed by the header before any actionable content appears.

### Recommendation
Reduce mobile top padding and compress internal spacing.

**Specific changes to PageHeader.tsx line 28:**
```
pt-24 pb-10 md:pt-38 md:pb-20 lg:pb-22
```

This changes mobile `pt-34` (136px) to `pt-24` (96px). With the 64px nav, the first content now starts at 160px instead of 200px. The bottom padding reduces from 64px to 40px on mobile.

**Additional internal compression:**
- The accent line divider (`mb-6`, line 38): change to `mb-4 md:mb-6`. Saves 8px.
- The subtitle margin (`mt-5`, line 55): change to `mt-3 md:mt-5`. Saves 8px.

**Net savings on mobile:** 40px top padding + 24px bottom padding + 16px internal = 80px. The PageHeader goes from ~280-340px to ~200-260px.

**Do not remove the accent line divider.** It is a brand element that creates visual continuity with the hero section's accent line. Removing it would save 20px but would break the design system's consistency.

### Reasoning
The `pt-34` value was likely calculated to provide generous clearance below the nav bar, but 136px of clearance for a 64px nav is excessive -- it creates the impression that the page failed to load or that content is missing. The 96px value (`pt-24`) provides 32px of breathing room between the nav bar's bottom edge and the first visual element (the accent line), which is sufficient for a premium feel without wasting mobile viewport space. The bottom padding reduction from 64px to 40px is proportional -- on mobile, sections should transition faster because the user is actively scrolling with their thumb and expects content to arrive sooner.

### Tradeoffs
- Tighter padding means the page header will feel less "airy" on mobile. This is intentional -- air on mobile is wasted viewport, not elegance.
- The `pt-24` value is close to the minimum comfortable clearance. Going lower (e.g., `pt-20` = 80px) would risk the content feeling crowded against the nav bar, especially when the nav has its scrolled state with the border-bottom and background.

### Final Direction
`pt-24 pb-10 md:pt-38 md:pb-20 lg:pb-22` on the PageHeader wrapper. Compress internal margins by 8px each on mobile. Total savings: ~80px. The page header should feel like a chapter title, not a title page.

---

## 9. Card Pattern Breaking

### Issue
The homepage repeats the same visual pattern at least four times: a rounded-corner bordered card with an icon element, a title, and descriptive text. This pattern appears in:
1. **ServicesPreview** (line 55): `rounded-[var(--radius-lg)] border ... bg-bg-subtle` cards with icon + title + description.
2. **ProcessSection** (line 169): cards with `rounded-2xl border border-border-default bg-bg-primary` icon containers + title + description.
3. **EntryOfferSection** (line 46): `rounded-[var(--radius-lg)] border ... bg-bg-primary` cards with icon + title + features list.
4. **ResultsSection** (line 43): `rounded-[var(--radius-lg)] border border-border-default bg-bg-subtle` container with icon elements and text.

Additionally, TrustMetrics uses icon-in-rounded-container + label + detail (a lighter version of the same pattern). WhyOmido uses icon-in-rounded-container + title + description in a horizontal rule layout (line 53), which is the only one that breaks the card formula.

On mobile, this creates a wall of bordered rectangles with icons. After the third instance, the visual language becomes predictable and the user's scanning behavior shifts to "skip" mode. Each section looks like a variant of the same component because they share the same border color, border radius, background approach, and icon treatment.

### Recommendation
Break the pattern by giving each section a distinct visual identity on mobile. Do NOT redesign the components -- modify their mobile presentation.

**Section-by-section differentiation:**

**ServicesPreview (cards):** These are the first cards the user encounters. Keep the bordered card treatment but remove the icon entirely on mobile. The service title and description are sufficient for scanning. Change the mobile layout from the current icon-left/content-right flex layout to a simple stacked layout: title, then description, then the arrow. Remove `gap-5` and the icon `div` on mobile using `hidden md:flex` on the icon container (line 62-69). This makes the services feel like a text list with borders, visually distinct from the icon-heavy sections that follow.

**ProcessSection (steps):** This section should feel sequential, not card-like. On mobile, remove the large 72px icon containers (`h-18 w-18`, line 169) and replace with a left-aligned number treatment. Change the mobile layout from centered (`items-center text-center`, line 166) to left-aligned. The step number (already present as a small badge, line 172) becomes the primary visual anchor: render it as a large `text-3xl font-bold text-accent/20` number flush-left, with the title and description to its right. This creates a numbered-list feel that is visually distinct from the bordered cards above and below. Use `md:flex-col md:items-center md:text-center` to preserve the desktop centered layout.

**EntryOfferSection (pricing cards):** These are the highest-stakes cards on the page. Keep the full bordered card treatment here -- this is where the card pattern should feel most "finished" and intentional. But differentiate the two cards more aggressively on mobile. The "Instaptraject" card should have no border at all on mobile (`border-0 md:border`) and use only a subtle top accent line (`border-t-2 border-accent/20`). The "Maatwerktraject" card keeps its full accent border treatment. This asymmetry between the two cards creates visual hierarchy (the maatwerk card is clearly the recommended option) and breaks the "two identical bordered rectangles" pattern.

**ResultsSection (case study):** This is the single most important proof element. On mobile, it should break out of the container. Remove the card's border and border-radius on mobile and make it full-bleed: `rounded-none border-0 -mx-6 md:rounded-[var(--radius-lg)] md:border md:mx-0`. The full-bleed treatment makes it feel like editorial content (a feature story) rather than another card in the card parade. Add a subtle background differentiation: `bg-bg-elevated` instead of `bg-bg-subtle` to create tonal contrast with the sections above and below.

### Reasoning
Pattern fatigue is a real phenomenon in mobile scrolling. When the brain recognizes a repeating visual formula (border + icon + text), it begins to deprioritize each subsequent instance. The fix is not to redesign each component but to give each one a different mobile silhouette: no-icon text list (services), numbered left-aligned list (process), asymmetric card pair (offers), full-bleed editorial block (case study). This creates four distinct visual moments that happen to contain the same type of information (descriptive content blocks) but feel different to scan. The key principle is that mobile differentiation comes from layout and silhouette, not from color or decoration.

### Tradeoffs
- Removing icons from ServicesPreview on mobile reduces visual richness. The icons are generic lucide icons (BrainCircuit, Monitor, Server, Cable) that add minimal semantic value -- the titles "AI Agents & Automatisering" and "Maatwerk Web Applicaties" are self-explanatory.
- Left-aligning ProcessSection on mobile while keeping it centered on desktop creates a layout shift at the `md` breakpoint. This is a standard responsive design pattern and does not create a jarring experience.
- The full-bleed ResultsSection requires negative margins (`-mx-6`) that must match the Container's padding exactly. If Container's padding changes, this breaks.
- The border-removal on the Instaptraject card might make it feel less "finished." The top accent line compensates for this.

### Final Direction
Four distinct mobile silhouettes: ServicesPreview becomes icon-free text cards, ProcessSection becomes left-aligned numbered list, EntryOfferSection uses asymmetric card styling, ResultsSection goes full-bleed without border. The principle is silhouette variation, not decoration variation. Each section should be identifiable by its shape before the user reads a single word.

---

## Implementation Priority

Ranked by conversion impact, from highest to lowest:

1. **Contact page mobile reorder** (Section 6) -- direct conversion impact, fastest to implement (CSS order change)
2. **Hero recomposition** (Section 2) -- first impression, controls whether users scroll at all
3. **Sticky mobile CTA** (Section 5) -- captures mid-scroll conversion intent
4. **PageHeader reduction** (Section 8) -- affects all sub-pages, simple CSS change
5. **Navbar overlay** (Section 1) -- high brand impact, moderate implementation effort
6. **Card pattern breaking** (Section 9) -- reduces scroll fatigue, moderate effort spread across multiple files
7. **Section spacing rhythm** (Section 3) -- improves pacing, requires per-section audit
8. **Footer compression** (Section 7) -- reduces dead space at page end, moderate CSS refactor
9. **Homepage content flow** (Section 4) -- micro-proof injection, lowest effort but requires copy decisions

---

## Files Referenced

| File | Lines Referenced | Issues |
|------|-----------------|--------|
| `src/components/layout/Navbar.tsx` | 43, 70, 106-151, 109-112, 117-134, 122, 127, 142 | Dropdown menu, icon swap, animation, spacing |
| `src/components/sections/home/HeroSection.tsx` | 30, 40, 62, 82-91 | min-h, centering, dual CTAs |
| `src/components/layout/SectionWrapper.tsx` | 11-15 | Spacing tiers |
| `src/app/page.tsx` | 22-30 | Section order |
| `src/components/sections/home/TrustMetrics.tsx` | 8-13, 24 | Grid, pillar count |
| `src/components/sections/home/ServicesPreview.tsx` | 48, 55, 62-69 | Card pattern, icons |
| `src/components/sections/home/ProcessSection.tsx` | 134, 166, 169, 172 | Card pattern, centering, icon containers |
| `src/components/sections/home/EntryOfferSection.tsx` | 43, 46, 80 | Card pattern, border treatment |
| `src/components/sections/home/ResultsSection.tsx` | 43, 60 | Card pattern, meta grid |
| `src/components/sections/home/WhyOmido.tsx` | 50, 53 | Horizontal rule layout |
| `src/components/sections/home/FAQSection.tsx` | 15, 31 | Spacing, card pattern |
| `src/components/sections/home/CTASection.tsx` | 11, 34 | Spacing, dual CTAs |
| `src/app/contact/page.tsx` | 37-46 | Grid stacking order |
| `src/components/sections/contact/ContactInfo.tsx` | 26-58 | Card with icon list |
| `src/components/sections/contact/WhatHappensNext.tsx` | 22-51 | 3-step reassurance card |
| `src/components/layout/Footer.tsx` | 17, 29, 36, 39, 55, 58, 77, 94, 98 | Grid, spacing, headings |
| `src/components/ui/PageHeader.tsx` | 28, 38, 55 | Top padding, internal spacing |
| `src/components/layout/PreFooterCTA.tsx` | 15 | Spacing |
| `src/components/motion/FadeIn.tsx` | 9-13, 35-41 | Default distance/direction |
| `src/components/sections/services/ServiceCard.tsx` | 26-27 | whileHover on mobile |
