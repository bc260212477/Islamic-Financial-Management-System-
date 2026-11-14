# ROADMAP.md — Phased Build Plan (Copy-Paste Prompts for Arena)

Rule: one phase at a time. Owner tests + approves before the next prompt is used. Status: P0 done (plan files, PR #3); **Phase 1 built** (static v1.1 charts) — pending owner test/approval; Phases 2–8 pending.

## Phase 0 — Planning & Arena files ✅
Deliverable: TECHNICAL-PLAN.md + SOUL/AGENTS/PROJECT/PRD/ARCHITECTURE/DATABASE/FINANCIAL-RULES/ISLAMIC-FINANCE/DATA-SOURCES/SECURITY/TESTING/ROADMAP/DECISIONS + skills/*/SKILL.md. Acceptance: owner reads TECHNICAL-PLAN §§1–2, 13, 16 and approves stack + D-001/D-008.

## Phase 1 — Static app v1.1 charts (keeps live demo improving)
```
Arena: Read BARAKAH-PROJECT.md Prompt v1.1 and AGENTS.md. On the existing static app only (index.html/app.js/styles.css), add the Monthly Spend SVG bar chart (trend data in BARAKAH-PROJECT v1.1, current bar gold gradient, dashed gridlines, rounded tops) and the Category Donut (group expenses by category, stroke-dasharray segments, centre = total, top-5 legend) in a 1.1fr/1fr grid below the stat cards. Pure SVG, no libraries, design tokens unchanged. Verify totals equal the expense sum (seed 3055). Do not build v1.2 features. Report test results, keep GitHub Pages deploy green.
```

## Phase 2 — Platform shell (Next.js + design system)
```
Arena: Following TECHNICAL-PLAN §2 and skills/ui-implementation, scaffold apps/web (Next.js 14 + TypeScript) with the Barakah design tokens ported to CSS variables, GlassCard/Btn/Badge/StatCard/KpiRing components, sidebar+topbar shell with placeholder pages (Dashboard, Cash Flow, Businesses, Portfolio, Markets, Calculators, AI, Reports, Settings), responsive to 375px. No backend, use typed mock data clearly marked MOCK. Deploy preview on Vercel. Acceptance: PROJECT.md design rules pass review; no banned libraries.
```

## Phase 3 — API, database, auth
```
Arena: Implement apps/api (FastAPI) with DATABASE.md schema via Alembic on Supabase Postgres (+pgvector), Redis cache, auth per SECURITY.md (decide D-008 first and record it), accounts/transactions CRUD + summary with calculators FIN-01..04, money as strings, audit_log, IDOR + calculator tests from TESTING.md all passing in CI. Seed owner account (registration closed after). No UI wiring beyond a login smoke page.
```

## Phase 4 — Personal + business finance (cutover)
```
Arena: Wire web Dashboard/Cash Flow/Businesses to the API (F1–F3, F10 import/export): transactions CRUD, businesses + P&L (FIN-07), budgets, goals, CSV import (undoable batches) + JSON export, PKR default (D-009). Migrate the v1.0 seed story as demo data. Playwright E2E for add-expense/import must pass. On owner approval, point the public link to the platform (retire Pages demo per D-001) and update README.
```

## Phase 5 — Market analytics engine (PSX/KMI)
```
Arena: Build ingestion per DATA-SOURCES.md (PSX EOD, staged→validated→published, ingestion_runs, stale labelling) for KSE-100/KMI-30/KMI All: index_prices_eod, constituents, prices_eod, sectors. Implement /market endpoints + Markets UI per PRD F5: MarketScope (index→sector→company) driving Wrap cards, KPI rings (FIN-08/09), heatmap (FIN-10), sector donut, movers/gainers/losers, company tabs. Fixture tests (TESTING market engine) must prove sector switching recomputes every widget. Live data only after owner confirms PSX terms (R-01); otherwise ship with labelled fixture/demo dataset.
```

## Phase 6 — Calculators & Islamic finance
```
Arena: Implement F6–F8: zakat/nisab (FIN-11/12 with PKR defaults set with owner), savings goal (FIN-14), profit (FIN-15), FX display (FIN-16); screener (ISLAMIC-FINANCE thresholds, stars, FIN-13 purification on dividends) applied to holdings + company pages; Islamic banks reference panel with footnote. Calculator unit tests (TESTING) verbatim from FINANCIAL-RULES worked examples.
```

## Phase 7 — AI assistant
```
Arena: Implement F9 per ARCHITECTURE AI pipeline: intent→SQL/pgvector retrieval (user-scoped facts), cited streaming answers, number verifier (block/regenerate), refusal rules (trading/fatwa/guarantees), conversations+audit stored, disclaimer UI. Mock-LLM guardrail tests pass; owner evaluates 20 real questions against their data before enabling by default.
```

## Phase 8 — Reports, hardening, launch
```
Arena: F10 reports (monthly/quarterly/yearly, PDF/CSV), full export + hard delete, security checklist (skills/security-review) + dependency audit, performance (cached market pages <2s), optional dark mode, backup/restore drill, README + DECISIONS updated, production deploy (Vercel + Render/Railway + Supabase), uptime check on /health. Launch gate = TESTING release gate all green + owner sign-off.
```

---
Backlog (not in any phase without a DECISIONS entry): real-time data, broker integrations, mobile apps, multi-user billing, crypto, Supabase/Vercel connector automations in-chat.
