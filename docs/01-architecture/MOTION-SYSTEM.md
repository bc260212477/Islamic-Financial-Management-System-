# MOTION-SYSTEM.md — Motion Design System (Directive v4.0 Part 4)

Philosophy: animation is **explanatory** — every animation answers "what just changed, and where did it go?" No animation without a question it answers. Motion as meaning, never entertainment.

## Tokens (canonical SASS per directive; mirrored 1:1 as CSS variables in `apps/web/styles.css`)
Durations: instant 100ms · fast 150ms · normal 250ms · slow 400ms · deliberate 600ms · scroll 800ms.
Easings: standard `cubic-bezier(0.2,0,0,1)` · decelerate `cubic-bezier(0,0,0,1)` · accelerate `cubic-bezier(0.3,0,1,1)` · spring `cubic-bezier(0.34,1.56,0.64,1)` (playful confirmations only) · out-expo `cubic-bezier(0.16,1,0.3,1)` (hero reveals, chart draws).
Stagger: tight 30ms · loose 80ms · section 120ms. Distances: lift −1/−2/−4px, scale 1.01/1.02, modal-from 0.96.
Hard rules: UI state changes ≤400ms; animate only `transform`/`opacity`; 60fps on mid-range Android; `prefers-reduced-motion` disables everything (plus manual toggle, Feature 200); motion JS budget <45KB gz.

## Component State Matrix (mandatory, every component — Part 4.3)
Default (none) · Hover (surface lightens, lift −2px, gold border, 150ms) · Focus (gold ring 2px offset, 100ms) · Active (scale .98, 100ms) · Disabled (40% opacity, not-allowed) · Loading (skeleton shimmer 1.2s / button spinner) · Error (red border, message slides down 200ms) · Empty (illustration + message + ONE CTA, fade+rise 300ms).

## The 30 mandatory micro-interactions (Part 4.4)
Navigation (5): sidebar hover slide, active gold pill slides between items, page fade 150-out/250-in + 8px rise, breadcrumb stagger 40ms, ⌘K backdrop blur + scale .96.
Cards/Data (7): stat hover lift, numbers count up 800ms out-expo, chart draw 600ms left→right + area fade, chart tooltip 60ms lag + crosshair snap, donut segment expand 4px + center cross-fade, table row actions slide in, sort arrow rotate + FLIP reorder.
Forms (6): input focus gold border + floating label, error shake 4px + slide-down message, toggle spring knob, checkbox checkmark draw 200ms, select options stagger 30ms, file drag-over pulse + success checkmark.
Actions (7): button ripple + scale .98, save spinner→checkmark cross-fade, delete row slide-out + toast, toast slide-up + progress bar, modal backdrop 200ms + scale-in 300ms, modal close reverse 200ms, confirm dialog spring overshoot.
Empty/Loading (5): skeleton shimmer 1.2s, empty-state draw-in + CTA pulse once, progress ring fill 800ms out-expo, streak odometer flip, gold-only milestone confetti 1.5s.

## Scroll choreography
Reveal at 85% viewport, once only, translateY(24px)→0 + opacity, 600ms out-expo, 80ms card stagger. Directive names GSAP+ScrollTrigger; the web app implements the same tokens/choreography natively (CSS/IntersectionObserver, 0KB) — GSAP adoption is a v0.1 approval question, not a silent swap (D-020).

## Signatures
- **Market Breathing:** live quote borders pulse 3s ease-in-out, ONLY on LIVE/DELAYED-labelled data — never on DEMO/MANUAL. Stops when market closes.
- Numbers are heroes: count-ups and odometer flips only for genuine values, always source-labelled.
