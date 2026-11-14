# BARAKAH OS — Master Build Directive v4.0 (Governing Summary)

Source: Founder-provided v4.0 (14 Nov 2026), adopted (D-020). Supersedes v3.0 summary for product/build scope. Core upgrade over v3.0: **SaaS product mindset replaces the static-dashboard mindset** — every element has 8 states, motion is tokenized choreography, empty/loading/error are designed, plus a full Platform OS (SaaS infrastructure).

## Identity
"Live deliberately. Grow barakah." Design philosophy: **Quiet Confidence** (private bank, not crypto startup). Three promises: Clarity (answer in <3s), Momentum (every action has a next step), Trust (every number traceable). Founder critique authority: Part 13's 15-point Design Critique Checklist — any failed check = not done.

## 15 pillars
Money, Business, Family, Habit, Routine, Task, Learning, Growth, Health, **Worship** (split from Habits), Legacy, Community, Decision OS (AI), **Wealth Legacy** (wasiyyah/faraid/takaful/succession), **Platform OS** (tenancy, billing, flags, admin, support). Every feature feeds ≥2 pillars or is cut.

## 200 features
1–100 from v3.0 (BARAKAH-OS-DIRECTIVE-v3.0.md). New 101–200:
- **101–150 Money & Investment depth:** waterfall, Sankey money map, runway, safe-to-spend, envelopes, zero-based, bill negotiation, price watchlist, purchase helper, financial calendar, expense splitter, reconciliation, bank PDF import, duplicate detection, auto-categorization, merchant intel, subscription price alerts, sinking funds, windfall planner, emergency ladder, debt simulator, riba leak report, sadaqah budget, qard hasan ledger, family pool, tax vault, salary parser, bonus planner, multi-currency, remittance, thesis log, DRIP tracker, rebalancing, sector heatmap, compliance timeline, purification ledger, gold/silver plans, sukuk calendar, real-estate analyzer, REITs, real returns, benchmarks, risk score, watchlist alerts, earnings calendar, company deep-dive, screener builder, sector rotation, market mood.
- **151–175 Life/Family/Growth:** salah quality, Quran plan, hifz SRS, dua journal, dhikr counter, fasting planner, sadaqah jariyah, Hajj planner, Hijri calendar, family tree, dependent dashboard, school fees, education projector, elder care, family meetings, wasiyyah builder, faraid calculator, takaful tracker, succession, digital assets, skill tree, certifications, reading retention, courses, mentorship.
- **176–200 Platform/Motion/SaaS:** onboarding wizard, ⌘K palette, notifications, activity feed, shortcuts, undo, bulk actions, saved views, export center, import wizard, feature flags, teams, RBAC, audit log, backup/restore, privacy dashboard, API keys, webhooks, billing, usage metering, support, feedback, changelog, theme/RTL, motion preferences.

## Binding systems
- **Motion:** docs/01-architecture/MOTION-SYSTEM.md — tokens, 8-state matrix, 30 mandatory micro-interactions, scroll choreography, <45KB motion budget, 60fps, ≤400ms UI changes, reduced-motion always.
- **Design:** docs/01-architecture/DESIGN-SYSTEM.md — elevation, semantic colors, fluid type, 27 components × 8 states × 3 modes (648 cases), ~60 pages, 10-point anti-childish checklist.
- **SaaS (Platform OS):** tenant column isolation + isolation test per PR; Breeze + TOTP; spatie roles Owner/Admin/Member/Viewer; billing Stripe + PK gateway (Plans Free/Pro PKR 1,500/Elite PKR 4,000); Pennant flags; 5-step skippable onboarding with sample-data empty states; Filament admin; Sentry/PostHog observability.
- **Skills protocol:** docs/03-governance/SKILLS.md — skill declaration + D.A.I.L.Y. before any code; never: untested claims, invented features, fake data/"live" labels, skipped tests, committed secrets, FLOAT money, broken design system, two versions at once, component without 8 states.
- **Roadmap (16 versions):** v0.1 Foundation → v0.2 Design System → v0.3 Money → v0.4 Cash Flow → v0.5 Family → v0.6 Habits → v0.7 Tasks & Routine → v0.8 Business → v0.9 Investments → **v1.0 Launch MVP** → v1.1 Islamic → v1.2 PSX → v1.3 Learning → v1.4 Health & Worship → v1.5 AI → v1.6 Advanced Money → v1.7 Legacy & Community → v1.8 Platform SaaS → **v2.0 The OS**. One version at a time; Build Report (§12.3 format) + founder approval between versions.

## Stack notes (founder decisions carried in D-020)
Directive names Laravel 11/PHP 8.3/PostgreSQL 16/Bootstrap 5 SASS/GSAP/Filament. Repo reality (do not silently downgrade): Laravel **13.42.0** platform + the live `apps/web` SaaS (D-019) + Supabase live (PR #13) + Vercel pending founder's GitHub App connect. Any stack change (Bootstrap re-skin, GSAP adoption, Filament) is an approval question inside each version's D.A.I.L.Y., never a silent swap.
