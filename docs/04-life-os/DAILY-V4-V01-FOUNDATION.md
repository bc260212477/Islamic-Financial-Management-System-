# D.A.I.L.Y. — v4.0 · v0.1 Foundation (pre-code; approval required)

## Skill Declaration
- **Primary:** `product-requirements` — D.A.I.L.Y. before code, acceptance criteria first
- **Secondary:** `motion-design`, `ui-design-system`, `database-design`, `security-review`, `testing`, `technical-writing`
- **Why:** v0.1 is tokens + core components + shell — design-system and motion work, not features
- **Will NOT do without them:** build any component lacking the 8-state matrix, or animate without tokens

## D — Define
v0.1 done = motion tokens + design tokens live in the product, 5 core components (Button, Card, Input, Modal, Toast) each verified across all 8 states in light/dark with reduced-motion respected, a public **component preview page**, and the existing dashboard shell re-skinned to the v4.0 tokens — demoable, critiqued with the Part 13 checklist, nothing else touched.

## A — Audit (actual state, 2026-11-14)
Exists: `apps/web` SaaS live on GitHub Pages (all pillars navigable; styles.css has base tokens but durations/easings are ad-hoc, no state matrix, no preview page); Laravel 13 platform (auth, tenant tests) in `apps/platform`; Supabase live (15 RLS tables); Vercel project configured (founder connecting GitHub App now). Docs just completed: SKILLS.md, MOTION-SYSTEM.md, DESIGN-SYSTEM.md created this PR (the 14-file set is complete). Gaps for v0.1 letter: tokens not yet tokenized per Part 4; components are page-level markup, not a library; no skeleton/empty/error system states; no count-up/chart-draw choreography; GSAP not adopted (native implementation instead — decision below); Bootstrap/SASS absent (CSS variables mirror the SASS tokens).

## I — Isolate
One slice: **tokens + 5 components + preview page + dashboard re-skin, in `apps/web` only.** Laravel/Blade component library (directive's long-term surface) is deferred as a named decision — duplicating the library in two stacks before v1.0 would violate the directive's own Risk #1 (feature obesity).

## L — List (each <30 min, skill per step)
1. Token layer in styles.css: durations/easings/stagger/elevation/semantic colors as CSS vars mirroring MOTION-SYSTEM/DESIGN-SYSTEM exactly (`ui-design-system`).
2. Reduced-motion guard: `prefers-reduced-motion` + manual toggle in Settings (`motion-design`, `accessibility`).
3. Button: 8 states incl. ripple+scale press, save spinner→checkmark variant (`ui-design-system`).
4. Card: stat/chart/form variants, hover lift −2px, gold hairline states (`ui-design-system`).
5. Input: floating label, focus gold, error shake+slide (`ui-design-system`).
6. Modal + Toast: scale .96 in/out, toast progress-bar dismiss, undo-toast pattern (`motion-design`).
7. `apps/web/components.html` preview page rendering all 5 × 8 states, light/dark toggle (`ui-design-system`).
8. Dashboard re-skin: count-up numerals (800ms out-expo), chart draw-on-mount, stagger reveal via IntersectionObserver (`motion-design`).
9. Verification: node tests still 9/9; screenshot via existing CI workflow; Part 13 critique self-check recorded (`testing`).
10. README/CHANGELOG/CLOUD-SETUP updates + Build Report in §12.3 format, then STOP (`technical-writing`).

## Component state matrix (the 5, per Part 4.3 — full detail in MOTION-SYSTEM.md)
Button/Card/Input/Modal/Toast each: Default · Hover · Focus (gold ring) · Active (scale .98 where pressable) · Disabled (40%) · Loading (spinner/skeleton) · Error (red+slide, inputs/modals) · Empty (cards/preview placeholders with one CTA).

## Acceptance targeted (Part 11 excerpts)
11.4 motion (states, ≤400ms, reduced-motion, 60fps transforms only) · 11.5 design (tokens, Fraunces numerals, no pure black/white, critique checklist) · 11.6 a11y (focus rings, keyboard) · 11.9 docs. Financial/Islamic criteria: unchanged formulas, 9/9 tests — no formula work in v0.1.

## Founder approvals needed (no silent swaps)
1. **Surface:** v0.1 library in `apps/web` (live SaaS) first, Blade library later — recommended.
2. **Motion engine:** native CSS/IO choreography (0KB, meets tokens) vs GSAP+ScrollTrigger CDN (directive default, +~45KB budget).
3. **Stack deltas carried:** Laravel 13 not 11; CSS variables mirroring SASS tokens (no Bootstrap re-skin this version).

## Y — Yield
This PR (docs only), then STOP. On approval: steps 1–10 ship as v0.1 with Build Report + screenshots, then v0.2 (full 27-component library) D.A.I.L.Y. is presented.
