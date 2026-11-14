# DESIGN v6 — "Designed by a Human" (one channel, everywhere)

Founder feedback: "I don't see any change in design… use the human styles and philosophy of designing and colors and layout — all one channel, like Andy Tells Things." Correct: previous passes tweaked tokens under a generic admin layout. v6 is a visible redesign with ONE design language used by every screen, the preview page, and auth — no screen may invent its own look.

## The philosophy (human, crafted, warm)
1. **A person designed this.** Warm paper, ink, gold — like a well-kept ledger (hisab kitab) bound beautifully. Serif voice (Fraunces) for numbers and headings; plain human sentences before tables: the dashboard *tells your money story* ("You earned…, spent…, kept…") then proves it with data.
2. **One channel.** Same palette, type, shapes, shadows, motion on every page. If a screen needs a new color, the system is wrong — not the screen.
3. **Craft details.** ب (Baa for Barakah) gold brand mark; pill buttons; 18px soft cards; gold hairline; downward warm shadows; staggered hand-placed reveals; numbers count up like being written in.
4. **Designed for a father in Pakistan,** not a Silicon Valley template: PKR first, family first, categories in his words (Food — Dry Fruits, sent home, Eid), mobile like an app (single column, big touch targets).

## The system
- **Color:** paper `#FBF7EE`, card `#FFFDF7`, ink `#223128`, deep green `#14532D` (primary), gold `#C29B3C` (accent), clay `#C96F4A` (rare warmth), sage tints for fills. Never pure black/white. Dark mode is the same room at night (deep green-ink), not an inversion.
- **Type:** Fraunces (display/numbers, `clamp()` fluid), Inter (body). Max 3 weights per screen.
- **Shape/depth:** cards 18px radius, buttons pill, inputs 12px; elevation = warm soft shadows (e1–e5), borders are hairlines, not boxes.
- **Layout:** light sidebar (paper, ink text, green pill active item, gold ب mark), sticky human topbar, content max 1240px, dashboard opens with a deep-green **hero** (greeting + money story + 3 quick actions), then KPIs, circles, charts — story first, evidence second.
- **Motion:** v4 tokens unchanged (100–800ms, transform/opacity only, reduced-motion respected) — motion serves the story (count-ups, drawing bars, staggered reveals).

## Non-negotiables (founder critique, applied)
Every screen: greeting/context in human words · one primary action obvious in 3 seconds · serif numerals · ≤2 accents · empty states with one next step · DEMO/MANUAL labels stay honest · works at 375px.
