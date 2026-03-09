# Omido Mobile-First Motion Direction

## System-Level Diagnosis

The current motion system has one animation: fade-up. Every section uses `FadeIn` with `direction="up"` and `distance=24`. `StaggerChildren` uses `y: 24`. The hero uses `y: 28`. TrustMetrics uses `y: 16`. These are not different patterns. They are the same pattern with trivially different pixel values. The result is a monotonous scroll experience where every section enters identically, creating what feels like a loading waterfall rather than a composed editorial reveal.

The motion system needs variety, intentionality, and rhythm.

---

## 1. Motion Vocabulary

Five distinct motion patterns for mobile. Each has a clear function.

### Pattern A: "Fade Up" (retain, but refine)
**When to use:** Primary content blocks, section headings, body text.
**Function:** The workhorse. Communicates "new content arriving."
**Current problem:** Used for everything, creating monotony.
**Refined values:**
```ts
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
}
```
**Changes from current:** Reduced distance from 24 to 20. Duration from 0.6 to 0.5. Easing changed from `[0.16, 1, 0.3, 1]` (extreme overshoot-style ease-out) to `[0.25, 0.46, 0.45, 0.94]` (smoother, more Apple-like ease-out). The current easing accelerates too hard at the start and creates a "pop" feel. The new easing glides.

### Pattern B: "Scale Settle"
**When to use:** Cards, featured content blocks, case study panels, pricing cards.
**Function:** Communicates "this is an object arriving into place." Creates visual weight. Breaks the vertical monotony.
```ts
const scaleSettle = {
  initial: { opacity: 0, scale: 0.97, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
}
```
**Reasoning:** The tiny scale shift (3%) is imperceptible as "zoom" but adds a dimensionality that pure translate cannot achieve. The 8px y-shift prevents it from feeling like a pure zoom. This is the premium pattern for object-type elements.

### Pattern C: "Blur Emerge"
**When to use:** Hero elements, high-importance moments, section transitions that mark a change in page mood.
**Function:** Communicates significance. The blur-to-sharp transition mimics camera focus and reads as cinematic.
```ts
const blurEmerge = {
  initial: { opacity: 0, filter: "blur(8px)", y: 12 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
}
```
**Performance note:** `filter: blur()` is GPU-composited in all modern mobile browsers. At 8px radius on a single element, the cost is negligible. Do NOT apply this to lists or grids of elements simultaneously.

### Pattern D: "Soft Enter" (opacity only)
**When to use:** Supporting text, meta labels, trust strips, fine print, guarantees.
**Function:** Content that should appear without drawing attention to itself. No spatial movement. Just materializes.
```ts
const softEnter = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, ease: "easeOut" }
}
```
**Reasoning:** Not everything needs to move. Secondary content that slides up competes with primary content. A pure opacity fade is the most respectful animation for subordinate elements.

### Pattern E: "Stagger Cascade"
**When to use:** Lists, feature grids, FAQ items, process steps on mobile.
**Function:** Communicates "these are related items in a sequence." Each item enters after the previous.
```ts
const staggerCascade = {
  container: {
    animate: { transition: { staggerChildren: 0.06 } }
  },
  item: {
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
  }
}
```
**Changes from current:** Stagger reduced from 0.08 to 0.06 (faster cascade). Item distance reduced from 24 to 14. Duration reduced from 0.55 to 0.4. The current stagger is slow enough that late items feel like they are loading rather than cascading. At 0.06s intervals, a 4-item list completes in 0.64s total. At the current 0.08/0.55, it takes 0.79s. That difference matters on mobile where users scroll faster.

### Tradeoffs
We give up the extreme ease-out "snap into place" feeling of the current `[0.16, 1, 0.3, 1]` easing. That easing is dramatic and attention-grabbing, which is exactly the problem when every element uses it. The new easing is calmer and more confident. Premium motion does not shout.

---

## 2. Mobile Menu Motion

### Issue
The current mobile menu uses `height: 0` to `height: "auto"` with 0.25s duration. This is the most basic accordion pattern. Nav items stagger at 50ms intervals (5 items = 250ms total stagger window), which is barely perceptible. The menu feels like a dropdown, not an immersive navigation moment. The hamburger icon swaps instantly between `Menu` and `X` lucide icons with zero transition.

### Recommendation: Full-Screen Overlay with Staged Reveal

Replace the accordion-style dropdown with a full-viewport overlay.

**Container animation:**
```ts
const menuOverlay = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3, ease: "easeOut" }
}
```

**Background:**
Full viewport, `position: fixed`, `inset: 0`, with the same `bg-bg-elevated` color. No slide. No height animation. Opacity in, opacity out. Height animations cause layout recalculations on every frame. Opacity is composited on the GPU.

**Nav item stagger:**
```ts
const menuItem = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
}
// staggerChildren: 0.05 (5 items + CTA = 6 items, total stagger: 0.3s)
// delayChildren: 0.1 (let overlay settle first)
```

**CTA button (bottom of menu):**
```ts
const menuCTA = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
}
```
The CTA enters last and from a different direction (y instead of x) to signal that it is a different type of element than the nav links. This creates a natural focal point.

**Exit:** Reverse the opacity on the container. Items do not need individual exit animations -- the container opacity handles it. This keeps exit fast (0.2s) and clean.

### Reasoning
Full-screen overlays communicate confidence. They say "navigation is important enough to command the entire screen." Accordion menus feel utilitarian. For a premium brand charging up to six figures per project, the menu is a trust signal.

### Tradeoffs
Slightly more DOM complexity (fixed overlay vs accordion). The exit is less "reversible" feeling than a height collapse. Both are acceptable costs for the quality improvement.

### Final Direction
Full-screen opacity overlay. Items stagger from left at 50ms intervals with 100ms initial delay. CTA enters last from below. Exit is a single 200ms opacity fade on the container.

---

## 3. Hero Entrance Choreography

### Issue
The current hero uses a single stagger container with `staggerChildren: 0.1` and `delayChildren: 0.15`. Every child uses the same `fadeUp` variant (`y: 28, duration: 0.7`). The accent line uses a `scaleX` reveal, which is good -- it is the only element in the entire site with a different motion pattern. But the sequence is: line, badge, headline, subtitle, CTAs. All fade-up. On mobile, this plays out over roughly 0.15 + (4 * 0.1) + 0.7 = 1.25 seconds before all content is visible. That is too long for mobile where users expect instant content.

### Recommendation

**Sequence (5 beats):**

1. **Accent line** -- `scaleX` from center (keep current, it works)
   ```ts
   { initial: { scaleX: 0 }, animate: { scaleX: 1 }, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
   ```

2. **Headline** -- Blur emerge (Pattern C). This is the most important element. It gets the most premium treatment.
   ```ts
   { initial: { opacity: 0, filter: "blur(8px)", y: 12 }, animate: { opacity: 1, filter: "blur(0px)", y: 0 }, transition: { duration: 0.5, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] } }
   ```

3. **Badge** -- Soft enter (Pattern D). It is a label, not a headline. It should not compete.
   ```ts
   { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay: 0.25 } }
   ```

4. **Subtitle** -- Fade up (Pattern A), but smaller distance.
   ```ts
   { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }
   ```

5. **CTAs** -- Fade up (Pattern A).
   ```ts
   { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }
   ```

**Total entrance time: ~0.85s** (down from ~1.25s). The headline is fully visible at 0.65s.

### Reasoning
The headline is the hero. It should get the most distinctive treatment (blur emerge). The badge is supporting context -- it should not upstage the headline by animating identically. The CTAs come last because action follows comprehension. The compressed timing (0.85s vs 1.25s) respects mobile users who have already waited for page load.

### Tradeoffs
We lose the uniform "everything fades up in unison" feeling, which some might find clean. We gain a composed sequence that directs the eye: line, then headline, then context, then action. This is editorial choreography.

### Final Direction
5-beat sequence. Headline gets blur emerge. Badge gets soft enter. Everything else gets refined fade-up. Total under 0.85 seconds.

---

## 4. Section Reveal Strategy (Mobile)

Homepage section order with assigned motion patterns:

| # | Section | Pattern | Reasoning |
|---|---------|---------|-----------|
| 1 | **HeroSection** | Custom choreography (see above) | First impression. Unique treatment. |
| 2 | **TrustMetrics** | **Soft Enter (D)** for the strip, **Stagger Cascade (E)** for the 4 pillars | Trust metrics should feel present, not animated. They are facts, not features. The pillars stagger to create rhythm in a 2x2 grid. |
| 3 | **WhyOmido** | **Fade Up (A)** for heading, **Stagger Cascade (E)** for the 3 differentiator rows | The ruled layout with horizontal dividers benefits from items cascading in one by one. Each row entering sequentially reinforces the "three distinct reasons" structure. |
| 4 | **ServicesPreview** | **Fade Up (A)** for heading, **Scale Settle (B)** for service cards | Cards are objects. They benefit from the dimensionality of scale. This is the first use of Scale Settle, creating a deliberate break from the fade-up rhythm established in sections 2-3. |
| 5 | **ProcessSection** | **Fade Up (A)** for heading, **Stagger Cascade (E)** for the 3 steps on mobile | Steps are sequential by nature. Mobile should reveal them one by one with clear stagger (0.12s intervals instead of the current 0.15s which makes them feel simultaneous). The GSAP-driven connecting line is desktop-only, which is correct. |
| 6 | **ResultsSection** | **Fade Up (A)** for heading, **Scale Settle (B)** for the case study card, **Soft Enter (D)** for the guarantees strip | The case study is the largest visual block on the page. Scale Settle gives it weight. The guarantees strip is supporting -- it should not animate dramatically. |
| 7 | **EntryOfferSection** | **Fade Up (A)** for heading, **Scale Settle (B)** for the two pricing cards with stagger | Pricing cards are decision objects. Scale Settle makes them feel tangible. The stagger between the two cards (0.08s) creates a left-then-right rhythm. |
| 8 | **FAQSection** | **Fade Up (A)** for heading, **Stagger Cascade (E)** for FAQ items | List items. Natural stagger. See FAQ-specific motion below. |
| 9 | **CTASection** | **Blur Emerge (C)** for headline, **Soft Enter (D)** for supporting text and phone number | This is the closing statement. Blur Emerge signals a return to high importance (matching the hero). It creates a bookend effect. See CTA-specific direction below. |

### Pattern Distribution
- Fade Up (A): 7 uses (headings, body)
- Scale Settle (B): 3 uses (service cards, case study, pricing cards)
- Blur Emerge (C): 2 uses (hero headline, CTA headline)
- Soft Enter (D): 3 uses (trust strip, guarantees, CTA supporting text)
- Stagger Cascade (E): 4 uses (trust pillars, differentiators, process steps, FAQ items)

No two adjacent sections use the same primary pattern for their main content block. This breaks the monotony.

### Tradeoffs
More complex implementation than the current "wrap everything in FadeIn." Each section needs deliberate pattern assignment. The `FadeIn` component will need to accept a `variant` or `pattern` prop, or we create separate lightweight components per pattern. The maintenance cost is worth the quality improvement.

### Final Direction
As mapped above. Key principle: headings always use Fade Up (consistency for orientation). Content blocks vary by type: cards get Scale Settle, lists get Stagger Cascade, supporting text gets Soft Enter, hero/CTA headlines get Blur Emerge.

---

## 5. Scroll Choreography

### Issue
All current reveals use `useInView` with `once: true` and small `amount` thresholds (0.1-0.15). Elements trigger the moment 10-15% of their height enters the viewport. On mobile, this means content animates while still near the bottom of the screen, which the user may not even notice. The reveal feels like a side effect of scrolling rather than a composed experience.

### Recommendation

**Viewport-triggered reveals only.** No scroll-linked (scrub) animations on mobile.

**Trigger thresholds by element type:**
- Section headings: `amount: 0.3` (trigger when 30% visible -- these are short elements, they will be well into the viewport)
- Cards and content blocks: `amount: 0.2`
- List items in stagger groups: `amount: 0.1` on the container (the container triggers the full cascade)

**Viewport margin offset:**
Use Framer Motion's `margin` option on `useInView` to trigger elements slightly before they enter the viewport on mobile:
```ts
useInView(ref, { once: true, amount: 0.2, margin: "0px 0px -60px 0px" })
```
The `-60px` bottom margin means elements trigger 60px before their natural threshold. This prevents the "element animates at the very bottom of the screen" problem without using scroll-linked animations.

**No scroll-linked (scrub) animations on mobile.** Reasons:
1. Scroll-linked animations on mobile fight with momentum scrolling (iOS elastic scroll, Android fling)
2. They create a "stuck" feeling when users try to scroll quickly
3. They require GSAP ScrollTrigger, adding bundle weight
4. The ProcessSection already correctly limits GSAP to desktop only

**Rate limiting:** Never trigger more than 3 animation groups simultaneously. If the user scrolls fast and multiple sections enter the viewport, the ones that entered first should complete instantly (skip to final state) and only the most recently entered section should animate. Implementation: check if element has been in view for more than 1 second before animating; if so, snap to final state.

### Reasoning
Mobile scrolling is fast and gestural. Users swipe through content. Motion should reward normal scrolling speed, not punish fast scrolling or slow scrolling differently. Viewport-triggered reveals with `once: true` are the safest, most performant approach. The adjusted thresholds and margin offsets ensure content animates when it is actually in the user's visual field, not at the screen edge.

### Tradeoffs
We lose the smooth, scrub-linked parallax effects possible with GSAP ScrollTrigger. Those are preserved for desktop only. On mobile, we trade continuous scroll response for reliable, performant, one-shot reveals.

### Final Direction
Viewport-triggered reveals with `once: true`. Amount thresholds: 0.3 for headings, 0.2 for blocks, 0.1 for stagger containers. Bottom margin offset of -60px. No scroll-linked animations on mobile. Fast-scroll snap-to-final for elements that enter viewport while previous animations are still running.

---

## 6. FAQ Motion Upgrade

### Issue
The current FAQ accordion uses `height: 0` to `height: "auto"` with `opacity: 0` to `opacity: 1`, both at `duration: 0.25`. The chevron rotates 180 degrees in 0.25s. This is the most basic accordion pattern. Every FAQ library ships this as default.

### Recommendation

**Answer reveal:**
```ts
const faqAnswer = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
      opacity: { duration: 0.25, delay: 0.1 }
    }
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
      opacity: { duration: 0.15 }
    }
  }
}
```

**Key change: stagger height and opacity.** The height expands first (0.35s), then the text fades in 100ms later (0.25s). On exit, the text fades first (0.15s), then the height collapses (0.25s). This creates a two-phase animation:
- Open: space appears, then text materializes
- Close: text dissolves, then space collapses

This is subtle but meaningful. It prevents the "text smearing upward" artifact that simultaneous height+opacity creates.

**Chevron:**
```ts
const faqChevron = {
  animate: { rotate: openIndex === i ? 180 : 0 },
  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
}
```
Slightly slower than current (0.3 vs 0.25) to match the answer reveal timing.

**Active state border:** When a FAQ item is open, its border should transition to `border-accent/20`:
```ts
// On the container div
className={`... transition-colors duration-300 ${openIndex === i ? 'border-accent/20' : 'border-border-default'}`}
```
This provides a visual anchor for which item is open, which is especially useful when the answer text pushes other items below the fold.

**FAQ item entrance stagger:** Reduce from `delay={i * 0.05}` (barely perceptible) to `delay={i * 0.04}`. With 5-7 FAQ items, total stagger is 0.2-0.28s. Use Stagger Cascade (Pattern E) instead of individual FadeIn wrappers.

### Reasoning
The staggered height-then-opacity approach is used by Apple, Linear, and Stripe in their accordions. It feels like revealing content rather than stretching it. The border color change provides orientation. These are small changes with disproportionate quality impact.

### Tradeoffs
The open animation is 100ms longer than current (0.35 + 0.1 vs 0.25). This is acceptable because the perceived speed is actually faster -- the height opens before the text appears, so the user sees response immediately.

### Final Direction
Stagger height and opacity on open/close. Height first on open, opacity first on close. Chevron at 0.3s. Active border color transition. Stagger Cascade for item entrance.

---

## 7. CTA Section Motion

### Issue
The CTA section wraps 5 elements in individual `FadeIn` components with increasing delays: 0, 0.08, 0.16, 0.24, 0.32. On mobile, this creates a 0.32 + 0.6 = 0.92s total animation time. The elements appear one by one from top to bottom, which on a centered layout looks like progressive loading rather than a composed reveal. The stutter is especially noticeable on mobile where the section often enters the viewport all at once.

### Recommendation

Replace the 5 individual FadeIn wrappers with 2 animation groups:

**Group 1: The message (label + headline + subtitle)**
Treated as a single unit. Blur Emerge (Pattern C):
```ts
{
  initial: { opacity: 0, filter: "blur(8px)", y: 12 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
}
```

**Group 2: The action (buttons + phone number)**
Soft Enter (Pattern D) with a short delay:
```ts
{
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, delay: 0.3, ease: "easeOut" }
}
```

**Total time: 0.7s** (down from 0.92s). Two groups instead of five.

### Reasoning
The CTA section is a closing statement. It should arrive with confidence, not trickle in. Two groups create a clear two-beat rhythm: "here is what we want to say" (beat), "here is what to do about it" (beat). Five individual staggers create a drumroll effect that undermines the decisiveness a CTA needs.

The blur emerge on the headline creates a bookend with the hero (which also uses blur emerge). This visual callback creates a sense of compositional closure.

### Tradeoffs
We lose the line-by-line reveal, which some might argue creates reading guidance. On mobile, where the CTA text is short and the viewport is narrow, reading guidance is unnecessary. The text is scannable in a single glance.

### Final Direction
Two animation groups. Message block gets Blur Emerge. Action block gets Soft Enter with 0.3s delay. Total under 0.7 seconds.

---

## 8. Hamburger-to-X Transition

### Issue
The current implementation swaps between `<Menu />` and `<X />` lucide-react icons using a conditional: `{mobileOpen ? <X /> : <Menu />}`. There is zero transition. The icon changes instantly on tap. This is the most basic implementation possible.

### Recommendation

Replace the icon swap with a CSS-driven two-bar morph. Remove the lucide icons for the hamburger entirely.

**Structure:**
```tsx
<button onClick={() => setMobileOpen(!mobileOpen)} className="...">
  <div className="relative h-5 w-5">
    <span
      className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
        mobileOpen
          ? 'top-[9.5px] rotate-45'
          : 'top-[5px] rotate-0'
      }`}
    />
    <span
      className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
        mobileOpen
          ? 'top-[9.5px] -rotate-45'
          : 'top-[13px] rotate-0'
      }`}
    />
  </div>
</button>
```

**How it works:**
- Closed state: Two horizontal bars at different vertical positions (classic hamburger, minus the middle bar -- a two-line menu icon is more modern)
- Open state: Both bars rotate to the center point, forming an X
- The transition is driven entirely by CSS `transition-all duration-300`, no JavaScript animation library needed
- The `top` position and `rotate` both transition simultaneously, creating the morph effect

### Reasoning
The two-bar-to-X morph is the standard for premium mobile navigation. Apple, Linear, Vercel, Stripe all use variations of this pattern. It communicates state change through continuous transformation rather than replacement. It is also cheaper than Framer Motion or GSAP -- pure CSS transitions with no JS overhead.

Two bars instead of three is a deliberate choice. The three-bar hamburger is from 2012. The two-bar variant is cleaner, more modern, and morphs to X more elegantly (no middle bar to hide).

### Tradeoffs
We lose the lucide icon consistency (other icons in the site are lucide). But the hamburger/X is the only icon that needs to animate, so it is a justified exception. We also need slightly more markup than a single `<Icon />` component.

### Final Direction
CSS-only two-bar hamburger that morphs to X via translate and rotate transitions. 300ms duration. No JS animation library. Two bars, not three.

---

## 9. Performance Guardrails

### Max Simultaneous Animations
**Rule: Never animate more than 6 elements simultaneously on mobile.**

Current violation: TrustMetrics animates 4 items at once. ServicesPreview staggers 4 cards. These are fine. But if the user scrolls fast and a stagger group starts while a previous group is still animating, the total can exceed 8+.

**Implementation:** Each animation component should check if `document.getAnimations().length > 12` (6 elements x 2 properties each) and if so, skip to final state immediately using `transition: { duration: 0 }`.

### Will-Change Strategy
**Rule: Apply `will-change` via Framer Motion's `style` prop only during animation. Never leave it on permanently.**

Framer Motion handles this automatically for `opacity` and `transform`. For `filter` (blur emerge), add `willChange: "filter, opacity, transform"` to the `initial` state and remove it in `animate` by setting `willChange: "auto"`.

```ts
const blurEmerge = {
  initial: { opacity: 0, filter: "blur(8px)", y: 12, willChange: "filter, opacity, transform" },
  animate: { opacity: 1, filter: "blur(0px)", y: 0, willChange: "auto" },
}
```

### Reduced Motion
**Rule: All motion components must respect `prefers-reduced-motion: reduce`.**

Current state: `FadeIn` and `HeroSection` already check `useReducedMotion()`. `StaggerChildren` does too. This is good.

**Enhancement:** Create a single hook that all motion components use:
```ts
function useMotionSafe() {
  const shouldReduceMotion = useReducedMotion();
  return !shouldReduceMotion;
}
```

When reduced motion is active:
- All content renders immediately, no animation
- No blur filters applied
- Hamburger morph still works (it is a state transition, not decorative motion)
- FAQ accordion still uses height animation at reduced duration (0.15s) because it is functional, not decorative
- Page transitions disabled entirely

### Animation Properties
**Rule: Only animate compositor-friendly properties on mobile.**

Allowed: `opacity`, `transform` (translate, scale, rotate), `filter` (blur only, sparingly)
Forbidden: `width`, `height` (except FAQ accordion where it is unavoidable), `margin`, `padding`, `border-width`, `box-shadow`, `background-color` (use CSS transitions for these, not Framer Motion)

The FAQ accordion uses `height: "auto"` which is not compositor-friendly. This is acceptable because:
1. Only one accordion item animates at a time
2. The element is relatively simple (a paragraph of text)
3. There is no performant alternative for auto-height animation

### Bundle Size
**Rule: GSAP is desktop-only. Do not load GSAP on mobile.**

The ProcessSection already does this correctly with dynamic `import("gsap")` gated behind `isDesktop`. This pattern should be enforced: any future GSAP usage must be behind the same desktop gate.

Mobile motion budget: Framer Motion only. No GSAP. No Three.js. No Spring physics libraries.

### Stagger Limits
**Rule: Stagger groups should complete within 0.5 seconds on mobile.**

Formula: `(itemCount - 1) * staggerDelay + itemDuration < 0.5s`

For 4 items at 0.06s stagger and 0.4s duration: (3 * 0.06) + 0.4 = 0.58s. Slightly over. Reduce to 0.05s stagger: (3 * 0.05) + 0.4 = 0.55s. Still slightly over. This is acceptable for groups of 4. For groups of 6+ items, use 0.04s stagger.

### Frame Rate Target
60fps on devices from 2020 and later. Acceptable to drop to 45fps on pre-2020 devices. No animation should cause a frame drop below 30fps.

### Testing Protocol
Test on:
- iPhone SE (2020) -- smallest viewport, weakest modern iPhone
- A mid-range Android (Pixel 6a or Samsung A54) -- representative of the average visitor
- Chrome DevTools with 4x CPU throttling -- stress test

---

## Summary: The Motion System at a Glance

| Element Type | Pattern | Distance | Duration | Easing |
|---|---|---|---|---|
| Section headings | Fade Up (A) | 20px | 0.5s | [0.25, 0.46, 0.45, 0.94] |
| Cards, panels | Scale Settle (B) | 8px + 3% scale | 0.5s | [0.25, 0.46, 0.45, 0.94] |
| Hero/CTA headlines | Blur Emerge (C) | 12px + 8px blur | 0.6s | [0.25, 0.46, 0.45, 0.94] |
| Supporting text | Soft Enter (D) | none | 0.4s | easeOut |
| List items | Stagger Cascade (E) | 14px | 0.4s | [0.25, 0.46, 0.45, 0.94] |
| Mobile menu | Overlay opacity | none | 0.3s | easeOut |
| Hamburger icon | CSS morph | rotate + translate | 0.3s | [0.25, 0.46, 0.45, 0.94] |
| FAQ open | Height then opacity | none | 0.35s + 0.25s | [0.25, 0.46, 0.45, 0.94] |
| FAQ close | Opacity then height | none | 0.15s + 0.25s | [0.25, 0.46, 0.45, 0.94] |

**One easing to rule them all:** `[0.25, 0.46, 0.45, 0.94]` replaces the current `[0.16, 1, 0.3, 1]` across the board. The current easing has an aggressive initial acceleration that creates a "pop" feel. The new easing is smoother, more controlled, more premium. It is close to CSS `ease-out` but with a slightly longer deceleration tail.

**The system in one sentence:** Headings fade up, cards scale in, important moments blur in, supporting text materializes, lists cascade, and nothing takes longer than 0.6 seconds.
