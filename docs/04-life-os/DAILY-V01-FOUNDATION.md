# D.A.I.L.Y. — v0.1 Foundation (Arena, pre-code breakdown per Directive Appendix E)

## D — Define
"Done" = a Laravel app with PostgreSQL, working register/login, tenant isolation, a dashboard shell in the Barakah design, CI proving migrations + tests on every change, and a demo the founder can open.

## A — Audit (actual repo state, 2026-11-14)
Already exists (built Phases 2–15 + Life OS, all CI-verified on main): Laravel **13.42.0** app in `apps/platform`; Breeze Blade auth + spatie RBAC; PostgreSQL migrations (accounts/categories/transactions/businesses/goals/holdings/market/family/habits/tasks/growth/AI tables); tenant global scopes + `TenantIsolationTest`; dashboard shell with ApexCharts; Platform CI (PostgreSQL 16) green; static design prototype live on Pages; CI screenshots in `docs/screenshots/`.
Missing vs directive v0.1 letter: (1) `design-reference.html` not in repo (see Directive summary — prototype substitutes); (2) Bootstrap 5 + SASS token files — existing shell is Breeze/Tailwind (D-017 deviation, founder approval needed to keep or to fund a Bootstrap re-skin); (3) Laravel 11 requested vs 13 installed (11 is EOL — keep 13, D-012).

## I — Isolate
v0.1 needs **no new feature code**. The slice is: (a) adopt Directive v3.0 as governing doc, (b) this D.A.I.L.Y. audit, (c) version/decision records, (d) confirm CI + screenshots evidence is current. Everything else is later versions.

## L — List (micro-steps, each <30 min)
1. ✅ Save governing summary `docs/00-project/BARAKAH-OS-DIRECTIVE-v3.0.md` (pillars, 100-feature map, rules, roadmap, missing inputs).
2. ✅ Write this D.A.I.L.Y. file with the audit table below.
3. ✅ Record D-018 (directive adoption + version re-baseline) in DECISIONS.md; map existing modules to v0.2–v1.4 in ROADMAP.md.
4. ☐ Founder approves: keep Laravel 13 + Tailwind/Breeze shell (recommendation) vs Bootstrap re-skin; keep prototype as design reference vs supply `design-reference.html`.
5. ☐ After approval: tag `v0.1-foundation` on main and open v0.2 gap-closure slice list (budgets table + audit_logs table are the two v0.2-schema items not yet present).

## Exact versions (audited)
Laravel **13.42.0** · PHP **8.3** (CI) · PostgreSQL **16** (CI service; SQLite only for screenshot runs) · Bootstrap **not installed** (Breeze/Tailwind shell instead — decision in step 4) · ApexCharts **3.54.1** (CDN, dashboard) · Playwright (screenshots CI) · Pest not installed — PHPUnit is the test runner in CI (directive lists Pest as preferred; PHPUnit is its engine — acceptable, recorded).

## Visual verification plan (screenshot comparison)
Existing: "Screenshots (docs)" GitHub Actions workflow boots both apps, logs in as FICTIONAL demo, captures 8 PNGs to `docs/screenshots/`, README embeds them. Per version: re-run workflow → compare new PNGs against previous set + prototype (`apps/static-v1`) for the 3 signatures (gold hairline, serif numerals, warm cream) → attach to the Build Report. If founder supplies `design-reference.html`, add it as a third capture target and compare side-by-side.

## Y — Yield
Ship this audit as a PR, stop, await founder approval of step 4. **No v0.2 code in this PR.**

## v0.1 acceptance check (Directive Part 13, foundation-relevant)
Auth ✓ (Breeze tests) · Tenant isolation ✓ · DECIMAL money ✓ (migrations) · Formulas tested ✓ (CalculatorTest FIN-11 etc.) · CI green on main ✓ (run 43606926691 + PR runs) · Screenshots ✓ · Docs updated ✓ (this PR) · Dark/RTL: hooks present (P14), full RTL polish is v1.0 scope · Production deploy: pending owner host (DEPLOYMENT.md) — honestly **not** claimed.
