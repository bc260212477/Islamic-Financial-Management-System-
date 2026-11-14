# ROADMAP.md — Phased Implementation Prompts for Arena (Laravel Platform)

Delivery protocol (binding): one phase per prompt. Each prompt is self-contained: Goal / Prerequisites / Files / Acceptance / Demo / Stop. Arena executes, reports evidence, and **stops** for owner approval. Stack: STACK-AUDIT.md (Laravel 13, PostgreSQL, Blade+Bootstrap 5.3+Tabler). Prototype `apps/static-v1` = design reference only (D-013). PHP verification via GitHub Actions (D-014).
Status: **Phase 0 ✅ · Phase 1 ✅** · Phases 2–15 pending.

---

### Prompt 0 — Repo & stack audit ✅
Goal: audit repo + stack versions. Done: docs/01-architecture/STACK-AUDIT.md (Laravel 13 decision, Tabler selected, sandbox PHP constraint D-014).

### Prompt 1 — Agent Operating System files ✅
Goal: full `docs/` file set + 8 skills, no code. Done: PROJECT/PRD (+F12–F15), ARCHITECTURE, DATABASE, FINANCIAL-RULES (FIN-01…21 incl. health score), ISLAMIC-FINANCE, DATA-SOURCES (+data-modes), SECURITY (+Laravel map), UI-DESIGN, TESTING, ROADMAP, DECISIONS (D-012…15), CONTRIBUTING, skills incl. kpi-computation.

### Prompt 2 — Laravel skeleton, migrations, auth, RBAC
Goal: runnable Laravel 13 app in `apps/platform` with auth + tenant isolation.
Prerequisites: Phase 1 approved; PHP 8.3+/Composer via CI or owner machine (D-014).
Files: `apps/platform/**` (composer create-project laravel/laravel:^13), `.env.example`, migrations for users/roles/accounts/categories (DATABASE.md), auth (Breeze Blade), tenant global scope, CI workflow `ci.yml` (setup-php 8.3, Postgres service, Pint, PHPUnit).
Acceptance: CI green: app boots, migrations run on Postgres, register/login/logout works, user B cannot see user A's rows (test), demo seeder data labelled FICTIONAL.
Demo: owner runs CI link / local `php artisan serve` screenshot of login + empty dashboard.
Stop: report CI run URL; wait for approval.

### Prompt 3 — Personal finance core
Goal: accounts, transactions, categories, transfers (FIN-21), recurring rules.
Prereq: P2. Files: models/controllers/Blade for accounts & transactions, transfer pairing, category CRUD, import of prototype categories.
Acceptance: formula tests FIN-02/03/21; transfer-neutrality test; CRUD E2E in CI (feature tests). Demo: add account + salary + expense; balance matches hand calc. Stop.

### Prompt 4 — Cash flow, net worth, reports
Goal: dashboard net worth (FIN-01), cash-flow breakdown, monthly/quarterly/yearly reports, savings rate/burn/runway (FIN-20).
Prereq: P3. Acceptance: report totals reconcile to transactions (test); dashboard = UI-DESIGN tokens. Demo: seed month, compare PDF-less HTML report to hand totals. Stop.

### Prompt 5 — Business finance
Goal: businesses/branches, business accounts, P&L (FIN-07), receivables/payables, owner withdrawals as transfers.
Prereq: P4. Acceptance: personal vs business separation test (no cross-contamination), P&L fixture test. Demo: two businesses, P&L each + consolidated labelled. Stop.

### Prompt 6 — Savings & goals
Goal: goals, emergency fund, contributions, projections (FIN-14/18).
Prereq: P4. Acceptance: goal-math tests incl. assumed-profit labelling. Demo: create house goal, projection date matches formula. Stop.

### Prompt 7 — Investments (manual + CSV first)
Goal: holdings, transactions, cost basis, valuation (manual price + CSV), dividends/sukuk profit, allocation (FIN-05/06), data-mode badges.
Prereq: P3. Acceptance: return/allocation tests; CSV import skips+reports bad rows; no price ever labelled Live. Demo: import prototype holdings CSV, portfolio totals match static demo. Stop.

### Prompt 8 — PSX / sector intelligence engine
Goal: Market→PSX→Index→Sector→Company drill-down; **every** component (KpiRings, donut, heatmap, movers, rankings, company tabs) recomputes from the filtered sector dataset via shared components (skills/market-analysis + kpi-computation).
Prereq: P7; PSX data-terms check (R-01) — else ship Manual/CSV mode only, honestly labelled.
Acceptance: fixture test — two sectors produce different, hand-verified KPI sets; scope switch updates all widgets (feature test). Demo: owner switches Energy vs Banks, screenshots differ everywhere. Stop.

### Prompt 9 — Islamic finance
Goal: zakat (FIN-11/12, Hanafi default shown), screening per holding/company (ISLAMIC-FINANCE), purification (FIN-13), Islamic banks reference.
Prereq: P7. Acceptance: worked-example tests verbatim; no auto-certification copy. Demo: zakat $515-equivalent PKR example + one purify holding. Stop.

### Prompt 10 — Calculators
Goal: suite per F14, each with formula + assumptions displayed, riba vs Islamic distinguished.
Prereq: P4. Acceptance: unit test per calculator vs known case. Demo: CAGR + loan-vs-profit-sharing comparison screenshot. Stop.

### Prompt 11 — Financial health score
Goal: FIN-19 score ring + indicator drill-down, trend, warnings.
Prereq: P4+P6. Acceptance: score reproducible from fixture; <3 indicators → "insufficient data". Demo: seeded user score breakdown matches hand calc. Stop.

### Prompt 12 — AI assistant
Goal: chat over user's own data (RAG/tools), citations on every number, refusal rules (no trades, no fatwa, no invented data), privacy controls + usage limits (PRD F9).
Prereq: P4, P8 data present; LLM key in env (owner). Acceptance: mock-LLM tests — planted wrong number blocked; missing data → "I don't have that data". Demo: owner asks 10 questions, verifies citations. Stop.

### Prompt 13 — Reports & export
Goal: PDF/CSV reports, full data export/delete (SECURITY).
Prereq: P4. Acceptance: export round-trip test; PDF totals = HTML totals. Demo: download monthly PDF. Stop.

### Prompt 14 — UI polish, dark mode, RTL/Urdu
Goal: UI-DESIGN full pass, dark mode, `lang/ur` + RTL layout, responsive QA.
Prereq: P13. Acceptance: 375px smoke, RTL screenshot, contrast checks. Demo: owner toggles Urdu/RTL + dark. Stop.

### Prompt 15 — Security audit, full tests, deployment
Goal: SECURITY checklist + skills/security-review signed off, full suite green, backups, production deploy.
Prereq: P14. Acceptance: TESTING release gate; `composer audit` clean or ADR exceptions; deploy runbook in README. Demo: live production URL + test report. Stop — launch decision is owner's.

---
Backlog (ADR required): real-time licensed PSX feed, broker integration, mobile apps, billing.
