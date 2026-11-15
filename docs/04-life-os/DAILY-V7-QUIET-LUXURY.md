# D.A.I.L.Y. — v7 Quiet Luxury + Rename (Founder-directed, 2026-11-14)

Skill per step (Primary: ui-implementation; Secondary: testing, security-review). Each step < 30 min.

1. **Record** (ui-implementation): DESIGN-V7-QUIET-LUXURY.md + D-022 + this plan. Rename rule locked: founder approval required for any product-name change.
2. **Tokens** (ui-implementation): rewrite `apps/web/styles.css` to v7 — #F8F9FA, white glass cards, #E5E7EB 1px, emerald #065F46 / gold #D97706 only, glass secondary buttons, 24px gaps, 12-col grid, tabular numbers, no dark gradients/neon/rainbow.
3. **Rename** (ui-implementation + security-review): “Financial Management System” in index title/meta, auth, sidebar, components preview, README, downloads, demo seed labels. Internal storage keys unchanged (existing browser data must not be orphaned — not user-visible). Supabase/Vercel infra project names NOT renamed (founder action if wanted; would risk deployment links).
4. **Dashboard A** (ui-implementation): greeting + month/year filter + glass Quick Add; 4 KPIs with derived % badges; 65/35 area + donut charts from real entries; last-5 editable activity table (Edit modal + Delete-Undo).
5. **Investments B** (ui-implementation + financial-calculations): 3 estimate summary cards; platform-grouped cards (Ktrade / Meezan term tags / Faysal / Physical); Shariah pill only when user-declared; Edit/Update Value modal per holding.
6. **Family C** (ui-implementation): member profile cards (allowance + spent this month, click-to-filter), filtered expense table, add/edit/delete.
7. **Verify** (testing): `node --check apps/web/app.js`, `node --test apps/web/tests/` (expect 9/9), local server 200s, then PR → merge → check Pages + Vercel production.

Out of scope this version: Supabase Auth wiring, Laravel hosting, renaming infra projects, new modules beyond A/B/C polish.
