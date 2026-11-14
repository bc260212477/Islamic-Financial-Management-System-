# UI-DESIGN.md — Barakah Design System (Laravel/Blade implementation)

Base: Bootstrap 5.3 + Tabler (MIT) components, overridden by Barakah tokens. The static prototype (`apps/static-v1`) is the visual reference; this file is the platform spec. Original design — no copied Dribbble assets/branding.

## Tokens
Colours (light): bg `#F7F4EC`, glows `#FBF8EF/#F4F0E4/#EFE9D8`, ink `#1B1A17`, soft `#6B665C`, muted `#8C8676`, deep green `#2F7A5E` (primary/positive), gold `#C9A227` / light `#E5C766` (accent), red `#B4543F`, amber for review. Never pure #FFF/#000 backgrounds. Dark mode mirrors prototype `data-theme="dark"` values. Status colours always paired with text/icons (never colour-only).
Type: Cormorant Garamond 600/700 headings + large numerals; Inter 400/500/600 UI. PKR amounts formatted `PKR 1,250` (en_PK grouping), dates `d M Y`.
Glass card: 145° white gradient, 1px rgba(255,255,255,.9) border, 22px radius, layered soft shadows, blur(14px) saturate(140%) — prototype CSS is the reference implementation to port into `resources/css/barakah.css`.

## Components
GlassCard, StatCard (+delta pill), **KpiRing** (circular %: SVG circle stroke-dasharray; must display label, value, % , formula info-tooltip, as-of/source; reusable for health score, screening, sector KPIs — one Blade component `<x-kpi-ring>`), bar/donut/line via Chart.js with token colours, DataTables styled to tokens, heatmap grid (div tiles, size=market cap class, green/red intensity, value printed), sector donut, movers/gainers-losers tables, badges (Halal ✓ green / Under review amber / Purify dividends red), SweetAlert2 confirms for destructive actions, toasts for imports.

## Layout & responsive
Sidebar (modules A–I) + topbar (index ticker cards when market data exists, data-mode badge always visible: Live/Delayed/Historical/Manual/CSV/Demo). Breakpoints: ≥1200 desktop 4-col stats; 768–1199 2-col; <768 1-col, sidebar collapses to off-canvas. Mobile min 375px, tap targets ≥40px.

## RTL / Urdu
`dir="rtl"` stylesheet via Bootstrap RTL + `[dir=rtl]` overrides; Urdu is secondary language (Phase 14): translations in `lang/ur`, numerals stay Latin for financial figures unless owner decides otherwise (record ADR). All user-facing strings via Laravel `__()` from day one — no hard-coded English in Blade.

## Accessibility
Contrast ≥4.5:1 body text (muted token on bg checked), focus-visible gold outline, aria-labels on icon buttons/rings (ring announces "label, value percent, as of date"), reduced-motion media query disables transitions.

## Chart style guide
Gridlines dashed rgba(140,134,118,.35); current period gold gradient, history soft; no chart without axis units, period, and source/as-of caption. Demo data watermark: "DEMO — fictional data" badge on any chart fed by seeders.
