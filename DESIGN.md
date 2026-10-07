---
name: DAG TECH
description: Dark interference field — live RGB rings on black, tight white type, blue only as action.
colors:
  paper-black: "#000000"
  ink: "#f4f7fb"
  ink-soft: "#c5d0dc"
  ink-white: "#ffffff"
  action-blue: "#1d4ed8"
  action-blue-deep: "#1e40af"
  focus: "#93c5fd"
  error: "#ffb4b4"
  signal: "#dbeafe"
  hairline: "rgba(255, 255, 255, 0.16)"
  field-line: "rgba(255, 255, 255, 0.22)"
  ghost-line: "rgba(255, 255, 255, 0.45)"
  surface-input: "#0a0a0a"
  surface-dialog: "#050505"
typography:
  display:
    fontFamily: "Unbounded, Manrope, Arial, sans-serif"
    fontSize: "clamp(2.15rem, 6vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Unbounded, Manrope, Arial, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Unbounded, Manrope, Arial, sans-serif"
    fontSize: "clamp(1.6rem, 2.6vw, 2.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
rounded:
  none: "0"
  control: "2px"
spacing:
  gutter: "6vw"
  gutter-sm: "20px"
  nav: "72px"
  section: "112px"
  section-bottom: "72px"
  section-sm: "80px"
  md: "16px"
  lg: "28px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.action-blue}"
    textColor: "{colors.ink-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.action-blue-deep}"
    textColor: "{colors.ink-white}"
    rounded: "{rounded.control}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "rgba(255, 255, 255, 0.08)"
    textColor: "{colors.ink-white}"
  button-hero-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-white}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "48px"
  input:
    backgroundColor: "{colors.surface-input}"
    textColor: "{colors.ink-white}"
    rounded: "{rounded.none}"
    padding: "14px"
  nav:
    backgroundColor: "{colors.paper-black}"
    textColor: "{colors.ink-soft}"
    height: "72px"
    padding: "0 3.5vw"
  form-panel:
    backgroundColor: "transparent"
    rounded: "{rounded.none}"
    padding: "28px"
  project-tile:
    backgroundColor: "{colors.paper-black}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
---

# Design System: DAG TECH

## Overview

**Creative North Star: "Interference Field"**

The first viewport is a live WebGL field: chromatic RGB rings generated on Paper Black. The offer sits inside that field — centered Unbounded headline, two actions, three facts — not on a panel, orb, or veil above it. After the hero, the page is a black ruled document: hairline strips, an indexed service list, a screenshot mosaic, a four-column process, then the brief and contact.

Voice is dark, precise, and Russian. Type is cool ink on black. Blue is an action, not an atmosphere. Density is editorial: large tight display, body held to a readable measure, sections opened by a two-column head then a structural index or grid. Motion lives in the shader; UI state changes are instant except the project shot track.

Confirmed rejections: glass orbs, gradient type, equal service cards, eyebrow kickers, Unicode glyph icons, page-sized frosted veils.

**Key Characteristics:**

- Live RGB interference shader full-bleed behind the first viewport; `prefers-reduced-motion` renders a still frame
- Unbounded 600 for display; Manrope for body and controls
- Action Blue fill on primary actions and selected interactive states; never as a wash or on type
- Flat surfaces; depth from the live field plus 1px hairlines; hero type uses a glyph shadow so letters hold on bright bands
- Square geometry: 2px radius on buttons, 0 elsewhere; services as a ruled index, not cards

## Colors

A black ground with cool near-white ink and one blue used as fill for action and selection.

### Primary

- **Action Blue**: Fill for primary buttons, skip-link, checked quiz options, the quiz progress bar, and the active shot dot. Hover deepens to **Action Blue Deep**. Selection highlight uses the same fill with white text.
- **Focus**: 2px outline, 3px offset on `:focus-visible`; inputs and quiz options use 2px offset. Also the input border on focus.

### Neutral

- **Paper Black**: Page ground, nav, footer, project tiles, shader clear color.
- **Ink**: Default body color on Paper Black.
- **Ink Soft**: Secondary copy, nav links, section lead, timeline body, legal paragraphs.
- **Ink White**: Hero type, brand, primary/ghost button labels, display headings.
- **Hairline**: 1px rules for nav bottom, section indexes, timeline, footer, dialog, project tiles at rest.
- **Field Line**: Input, textarea, and quiz-option borders at rest.
- **Ghost Line**: Ghost button border off the hero.
- **Surface Input**: Input and textarea fill.
- **Surface Dialog**: Project dialog fill (near-black, not a glass sheet).
- **Signal**: Pale blue for process numerals, quiz step index, form status, index-title hover, project CTA hover. Metadata, not a second brand color.

### Named Rules

**The Action Blue Rule.** Action Blue is fill for primary actions and selected interactive states. It is not a page wash, a type color, a gradient, or a glow.

**The Generated Field Rule.** Chromatic rings are generated by the shader. They are not palette tokens and must not be sampled into swatches or CSS gradients.

## Typography

**Display Font:** Unbounded (fallback Manrope, Arial, sans-serif) via `--font-display`
**Body Font:** Manrope (fallback Arial, sans-serif) via `--font-manrope`

**Character:** Unbounded 600 is tight, geometric, and loud enough to sit on moving rings. Manrope carries Russian UI copy without decoration. The pairing is precise, not theatrical.

### Hierarchy

- **Display** (600, `clamp(2.15rem, 6vw, 6rem)`, line-height 0.96, tracking −0.04em): Hero `h1` only. Second line may break onto its own block. Glyph shadow keeps it readable on bright bands.
- **Headline** (600, `clamp(2rem, 4.4vw, 4rem)`, line-height 1.02, tracking −0.04em): Section `h2`. Legal `h1` is a slightly smaller clamp in the same face.
- **Title** (600, `clamp(1.6rem, 2.6vw, 2.5rem)` on the service index; 22px on project tiles and process steps; quiz step titles `clamp(1.4rem, 2vw, 1.7rem)`): Same face and tracking as headlines.
- **Body** (400/500, 16px / 1.5, measure ~62ch): Page default. Hero lead is 18px / 1.55, max-width 42rem, Ink White. Section leads 17px / 1.6 in Ink Soft. Legal 16px / 1.65, max-width 72ch.
- **Label** (600, 14px): Nav links, buttons. Small controls 13px / 700 (nav toggle, skip-link). Brand is Unbounded 600 at 15px, tracking −0.04em.

### Named Rules

**The Sentence-Case Rule.** Headings, nav, and buttons stay sentence case (or the product’s own Russian casing). No uppercase tracked kickers, eyebrows, or overline labels.

## Layout

Viewport gutters are 6vw. On small screens they become 20px. The nav is a fixed full-bleed bar (`72px` desktop, `64px` from 900px down) with `3.5vw` horizontal padding (`16px` from 900px). Hero is `100svh`, content centered, padding `calc(72px + 36px) 6vw 64px`.

Sections pad `112px 6vw 72px` (`80px 20px 56px` below 640px) with `scroll-margin-top` equal to the nav. Section heads are two columns (`1.15fr / 0.85fr`, 48px gap) collapsing to one column at 900px.

Services are a hairline-ruled index: each row two columns (title / body), `32px 0` padding, 1px Hairline top and bottom. Projects are a mosaic: `1.35fr 1fr 1fr`, 14px gap; the first tile spans two rows. Process is four equal columns divided by vertical hairlines. Quiz and contact are `0.8fr / 1.2fr` with 64px gap; the quiz intro sticks under the nav until 900px.

Breakpoints observed: `1100px` (mosaic becomes 2-col, first tile full width), `900px` (nav menu, stacked section heads, stacked timeline, stacked forms), `640px` (single-column mosaic and quiz options, stacked hero actions, 20px gutters).

Footer is a wrapping flex row on Paper Black with a top hairline, `28px 6vw 40px`.

## Elevation & Depth

The system is flat. Resting surfaces have no drop shadow. Depth is the live shader in the first viewport plus 1px Hairline rules that stack the rest of the page. The project dialog is the one lifted surface. Hero type uses a tight glyph shadow so white letters hold when the rings pass underneath — that shadow is for legibility, not for floating a card.

No glass, no orbs, no page-sized scrim over the hero. The dialog backdrop is a solid dim (`rgba(0, 0, 0, 0.76)`), not blur.

### Shadow Vocabulary

- **Hero display** (`0 2px 16px rgba(0, 0, 0, 0.85)`): Hero `h1` only.
- **Hero copy** (`0 1px 2px #000, 0 2px 12px rgba(0, 0, 0, 0.95)`): Hero lead, facts, and the hero ghost button label.
- **Dialog lift** (`0 28px 80px rgba(0, 0, 0, 0.6)`): Open project dialog only.

### Named Rules

**The Flat Field Rule.** Surfaces are flat at rest. Do not add ambient card shadows, glow, or backdrop-filter. The moving field and 1px rules already supply depth.

## Shapes

Almost everything is a sharp rectangle. Buttons are the exception: 2px radius, 1px border, `min-height` 48px. Inputs, textareas, dialogs, project tiles, form panels, timeline cells, and index rows are radius 0.

Borders are 1px Hairline or Field Line. Project tiles brighten the border to `rgba(255, 255, 255, 0.5)` on hover. The brand mark is an 11px hollow circle (1.5px white stroke, empty fill) — a logo device, not a radius token for components. Shot pagination dots are 10px circles; they are the only other round control.

No pills, no large rounded sheets, no clipped orbs.

### Named Rules

**The Square Control Rule.** Radius is 2px on buttons and 0 on every other surface.

## Components

### Buttons

Hard, short, filled or ruled. Manrope 600 / 14px, `min-height` 48px, padding `0 22px`, radius 2px.

- **Shape:** Nearly square (2px).
- **Primary:** Action Blue fill and border, Ink White label. Hover → Action Blue Deep. Disabled (pending submit) → `#1e3a8a` fill and border, `cursor: wait`. Small variant: 40px height, `0 16px`, 13px (nav CTA).
- **Hover / Focus:** Color shift only; no lift, no scale. Focus-visible is the global 2px Focus outline, 3px offset.
- **Ghost:** Transparent, Ink White, Ghost Line border. Hover fills `rgba(255, 255, 255, 0.08)` and border goes Ink White.
- **Hero ghost:** Same geometry; border stays Ink White at rest and hover; no fill on hover; label uses the hero copy glyph shadow.

### Cards / Containers

There is no generic card component. Recurring containers:

- **Service index:** Ruled rows, no fill, no radius, no shadow. Title Unbounded; body Ink Soft, 62ch. Hover tints the title to Signal.
- **Project tile:** Paper Black, 1px Hairline, radius 0. Screenshot mock `#111` (210px; featured min 280px). Copy pad `16px 18px 18px`. Hover/focus brightens the border.
- **Form panel** (quiz and contact): Transparent, 1px Hairline, 28px padding, radius 0. Quiz progress is a 2px Hairline track with an Action Blue fill.
- **Project dialog:** Surface Dialog, 1px Hairline, radius 0, Dialog lift shadow, width `min(920px, calc(100vw - 28px))`.

### Inputs / Fields

- **Style:** Surface Input fill, 1px Field Line, radius 0, 14px padding, Manrope 500 / 15px, Ink White, white caret. Placeholder `#b7c3d1`. Textareas min-height 130px. Two-up name/contact uses a 10px-gap grid.
- **Focus:** Border and 2px outline in Focus, 2px offset.
- **Error:** Error color, 14px, below the control. No red border vocabulary.
- **Quiz options:** Square spans, Field Line, 14px 16px padding, 14px type. Checked → Action Blue fill and border. Focus-visible outline on the span.
- **Consent:** 18px checkbox, `accent-color` Action Blue; label Ink Soft 13px.

### Navigation

Fixed Paper Black bar, 72px, 1px Hairline bottom, three-column grid (brand / links / CTA). Brand: hollow 11px dot + Unbounded 15px Ink White. Links: Ink Soft 14px / 600, `8px 14px`; hover Ink White. CTA is the small primary button.

From 900px: 64px bar, word toggle («Меню» / «Закрыть») — no hamburger glyph — opens a column of 16px links plus contacts. At 640px the header CTA hides; the panel keeps the discuss button. Open dialog hides the nav.

### ShaderAnimation (signature)

Full-bleed behind `.hero` (`.shader-field`, `position: absolute; inset: 0`). Three.js fullscreen triangle, clear color Paper Black, fragment shader accumulates RGB rings over time (`time += 0.05` per frame). Pointer-events none; hero copy sits above at `z-index: 2`. If WebGL fails, the container stays Paper Black. `prefers-reduced-motion: reduce` draws one still frame and does not animate.

### Process timeline

Four columns, Hairline top and column rules. Numeral in Signal, Manrope 600 / 13px, tracking `0.14em` (numeric index `01`–`04`, not a kicker). Title 22px Unbounded; body 15px Ink Soft. Below 900px: stacked rows with Hairline bottoms.

## Do's and Don'ts

### Do:

- **Do** put the offer inside the live interference field; keep hero copy centered and unboxed.
- **Do** use Unbounded 600 at the hero clamp with tracking −0.04em and line-height 0.96, plus the hero glyph shadow.
- **Do** treat services as a ruled index, projects as a mosaic, process as a four-column hairline timeline.
- **Do** paint Action Blue only as fill on primary actions and selected states.
- **Do** keep radius at 2px on buttons and 0 on every other surface; use 1px Hairline to divide.
- **Do** render a still shader frame when `prefers-reduced-motion` is set.
- **Do** write UI copy in Russian, sentence case, without hype.

### Don't:

- **Don't** introduce glass, orbs, blur, gradient type, or a page-sized veil over the hero.
- **Don't** turn services into equal rounded cards.
- **Don't** add uppercase tracked kickers, eyebrows, or Unicode glyph icons (including a hamburger).
- **Don't** sample shader ring colors into the palette or recreate them as CSS gradients.
- **Don't** use Action Blue as a section wash or as heading color.
- **Don't** add ambient drop shadows to tiles, forms, or the nav.
- **Don't** round inputs, dialogs, or project tiles.
