# BARAKAH — Complete Technical Plan (Arena Master Document)

**Role of this document:** Single technical specification produced by the Technical Planning Architect for the Arena implementation agent. Arena must build from this plan and the companion files listed in §14. Arena must not invent product scope. Where this plan and `BARAKAH-PROJECT.md` conflict, this plan wins for the *platform* and `BARAKAH-PROJECT.md` remains the spec for the already-shipped static v1.0 (see DECISIONS.md D-001).

**Status:** v1.0 plan · Owner: bc260212477 · Currency: PKR primary, USD display-optional · Market: PSX / KMI first

---

## 1. Executive summary

Barakah evolves from the shipped static v1.0 dashboard (React-via-CDN, localStorage, GitHub Pages: https://bc260212477.github.io/Islamic-Financial-Management-System-/) into a **Financial Intelligence Platform**: personal + business finance, PSX/KMI market analytics, Shariah screening, zakat, and a grounded AI assistant.

Approach: **modular monolith first** (one Next.js app + one FastAPI service + PostgreSQL), local-first data ownership for the single initial user, end-of-day (EOD) PSX data only at launch, and an AI assistant that may only quote numbers retrieved from the database (never generated). Every financial figure in the UI must be traceable to a stored row + a formula in FINANCIAL-RULES.md. This avoids the two classic failure modes: fake market data and hallucinated advice.

## 2. Architecture (textual) and stack decisions

```
Browser (Next.js 14 App Router, React 18, TS)
  │  HTTPS, JWT (httpOnly refresh + short-lived access)
  ▼
Next.js (Vercel) ──rewrites /api/*──► FastAPI (Render/Railway, Docker)
                                        ├─ Auth (argon2id, JWT, RBAC: owner only in v1)
                                        ├─ Finance API (personal, business, portfolio)
                                        ├─ Market API (indices, sectors, companies, KPIs)
                                        ├─ Calculators API (pure functions, unit-tested)
                                        ├─ AI API (RAG orchestrator, guardrails)
                                        └─ Reports API (CSV/PDF export)
                                            │
              ┌─────────────────────────────┼──────────────────────────────┐
              ▼                             ▼                              ▼
       PostgreSQL (Supabase/Neon)    Redis (Upstash, cache/rate-limit)   Object storage (exports)
              ▲
              │ scheduled EOD ingestion (GitHub Actions cron / APScheduler)
       PSX EOD sources (see DATA-SOURCES.md) → validate → stage → publish
              │
       Vector store: pgvector (same Postgres) for AI retrieval over
       user transactions, holdings, and ingested market/company facts
```

| Layer | Choice | Justification | Rejected / why |
|---|---|---|---|
| Frontend | Next.js 14 + TypeScript + Tailwind? **No — custom CSS design tokens** (existing Barakah glass system) | SSR for market pages, one deploy target (Vercel), keeps the bespoke luxury look already approved | Tailwind/MUI/shadcn — banned by original design spec; generic look |
| Backend | Python FastAPI | Financial/pandas ecosystem, Pydantic validation of money, fast to test formulas | Node/Express — weaker data tooling for PSX ingestion |
| DB | PostgreSQL (Supabase) + pgvector | Relational money data + vectors in one store; row-level ownership | MongoDB — wrong fit for ledgers/joins |
| Cache/queue | Redis (Upstash) | Market-page caching, rate limiting, job locks | In-process cache — dies on redeploy |
| Auth | FastAPI JWT + argon2id; Supabase Auth acceptable alternative (pick one in Phase 3, record in DECISIONS.md) | Single-user first; avoid premature OAuth | Social login at launch — unnecessary attack surface |
| Charts | Pure SVG components (existing rule), circular KPI = SVG stroke-dasharray | No chart-lib weight; KPIs must be exact | Chart.js/Recharts for KPI gauges — imprecise styling |
| AI | LLM API (provider-agnostic adapter) + pgvector RAG | Numbers come from SQL, LLM only explains | Free-form chat over raw prompts — hallucination risk |
| Ingestion | Python jobs, EOD only, staged + validated | PSX has no free official real-time personal API; ToS-safe | Live scraping tick data — fragile, ToS risk |
| Deploy | Vercel (web) + Render/Railway (API) + Supabase (DB) + GitHub Actions CI | Free tiers, already-connected accounts (Vercel/Supabase) | Self-hosted VPS at launch — ops burden |

## 3. Database schema

Full DDL-level detail in **DATABASE.md**. Core tables: `users, accounts, categories, transactions, businesses, business_transactions (via transactions.business_id), holdings, instruments, prices_eod, indices, index_constituents, sectors, companies, fundamentals, dividends, watchlists, goals, zakat_profiles, screenings, ai_conversations, ai_messages, audit_log, ingestion_runs`. Money is `NUMERIC(19,4)` + `currency CHAR(3)`; never float. Every user-owned row has `user_id` + indexes; soft-delete via `deleted_at`.

## 4. API design

Full endpoint catalogue in **ARCHITECTURE.md §API**. Conventions: `/api/v1/...`, Bearer JWT, JSON, amounts as strings in responses (`"amount": "1250.00"`) to avoid float drift, error shape `{error:{code,message,details}}`, pagination `?limit&cursor`, idempotency key header on POST money endpoints. Key groups: auth, accounts, transactions (CRUD + CSV import), businesses + P&L, portfolio/holdings, market (indices/sectors/companies/KPIs/heatmap/movers), calculators (zakat, nisab, goals, profit), screenings, AI chat (SSE stream, citations required), reports (CSV/PDF), admin ingestion status.

## 5. UI component breakdown

Pages/components in **PRD.md + skills/ui-implementation/SKILL.md**. Shell: sidebar (Dashboard, Cash Flow, Businesses, Portfolio, Markets, Calculators, AI Assistant, Reports, Settings), topbar with index ticker cards (KMI-30/KSE-100: Open High Low Close Δpts Δ% Volume). Reusable: `GlassCard, StatCard, KpiRing (circular %), Heatmap, SectorDonut, MoversTable, GainersLosers, SentimentGauge, CompanyTabs, ChatPanel, DataTable, CsvImporter`. Rule: selecting index→sector→company re-queries one `MarketScope` context; every widget subscribes to it — no widget keeps private filter state.

## 6. Data source strategy

Detail in **DATA-SOURCES.md**. EOD ingestion daily after PSX close (PKT), sources ranked (PSX official EOD files/website → Sarmaaya/PakistanBourse as cross-check), staged → validation (row counts, OHLC sanity, %change recompute, constituent weights sum ≈100) → publish atomically; failed validation keeps yesterday's published data and raises an ingestion alert. Fundamentals quarterly as published. Islamic banks list is static reference data (already in v1.5 spec of BARAKAH-PROJECT.md). No bank transaction APIs exist for Pakistani personal accounts — manual/CSV only, stated in UI.

## 7. AI assistant design

Detail in **PRD.md §AI + skills/financial-research/SKILL.md**. Flow: question → intent classify → SQL/tool retrieval over user's own data + published market tables → pgvector retrieval over facts/notes → LLM composes answer **only from retrieved context, with citations `[table:id/date]`** → guardrail verifier re-checks every number in the answer against retrieved values; mismatch → answer is blocked and regenerated or refused. Hard rules: no buy/sell instructions, no guaranteed returns, label outputs "analysis, not licensed financial advice", always show the calculation. Scam-signal requests are refused.

## 8. Financial rules

All formulas in **FINANCIAL-RULES.md**: net worth, cash flow, net cash, returns (simple, XIRR later), allocation %, P&L, KPI percentages, zakat/nisab, purification. No formula may exist only in code — it is written there first, then implemented, then unit-tested (TESTING.md).

## 9. Islamic finance rules

**ISLAMIC-FINANCE.md**: screening debt ≤33% of total assets, non-compliant investments ≤30%, non-compliant income purification, terminology ("profit" not "interest" in user-facing labels), SECP/KMI criteria notes, "Under review / Purify dividends" states, scholar-reference list (static data, not fatwa generation — the app never issues religious rulings; it displays criteria and sources).

## 10. Security plan

**SECURITY.md**: argon2id, JWT rotation, httpOnly cookies, encryption in transit (TLS) + at rest (provider), secrets in platform env only, rate limits, CSV upload sandboxing (size/type/row caps, no formula execution), audit log on money mutations, data export + hard delete (GDPR-style), dependency + license review. User financial data is never sent to an LLM except the retrieved rows needed for the asked question, and never used for training by us.

## 11. Testing plan

**TESTING.md + skills/testing/SKILL.md**: unit tests for every formula with worked numeric examples (e.g. seed v1.0: spent 3055 of 3200 → 145 left; zakat 20600 net vs nisab 6630 → 515.00), ingestion validation tests, API contract tests, E2E (Playwright) for add-expense, CSV import, zakat, screener, market scope switching; KPI reconciliation test: sector-switch changes dataset and percentages recompute from fixtures.

## 12. Deployment and monitoring

Vercel (web, preview per PR), Render/Railway (API Docker), Supabase (Postgres + pgvector), Upstash Redis. GitHub Actions: CI (lint, unit, formula tests) on PR; EOD ingestion cron with failure issue auto-created; uptime check on `/health`; structured logs; Sentry (or platform logs at launch). Backups: Supabase daily; export-my-data self-serve. Existing GitHub Pages static v1.0 stays live as the public demo until Phase 4 cutover (DECISIONS.md D-001).

## 13. Phased roadmap

**ROADMAP.md** — Phases 0–8, each with a copy-paste Arena prompt. Summary: P0 plan/files (this), P1 static v1.1 charts on current app, P2 Next.js shell + design system port, P3 API+DB+auth, P4 personal+business finance migration, P5 market analytics engine, P6 calculators+screening, P7 AI assistant, P8 reports/hardening/launch. Do not skip phases; owner tests and approves each.

## 14. Arean (Arena) instruction files — full content

`SOUL.md, AGENTS.md, PROJECT.md, PRD.md, ARCHITECTURE.md, DATABASE.md, FINANCIAL-RULES.md, ISLAMIC-FINANCE.md, DATA-SOURCES.md, SECURITY.md, TESTING.md, ROADMAP.md, DECISIONS.md` at repo root, and `skills/{financial-calculations,financial-research,database-design,security-review,testing,ui-implementation,market-analysis}/SKILL.md`. These files are the build contract; this plan summarises them, they govern details.

On `GitHub-Repos-` (inspected 2026-11-14: catalogues `*.csv` per category + `agent_architect.py`, described as an AI-research catalogue): treat it as a **discovery catalogue only**. Arena may propose candidates from `ai-agents-orchestration.csv`, `memory-search-databases.csv`, `research-education.csv`, `security-privacy.csv`, `coding-agents-developer-tools.csv` — but each candidate requires license (prefer MIT/Apache-2.0), maintenance (commit within 12 months), dependency and security review recorded in DECISIONS.md before adoption. No bulk tooling. Custom financial logic is built in-repo, never imported from catalogue projects.

## 15. Tools / libraries — use and not use

**Use:** Next.js 14, TypeScript, FastAPI, Pydantic, SQLAlchemy/Alembic, PostgreSQL+pgvector, Redis, PapaParse (CSV, already in v1 spec), Playwright, pytest, Vitest, GitHub Actions. **Not use:** Tailwind/MUI/shadcn/Chart.js/Recharts (design rule), any "trading signals" library, unaudited catalogue repos, floats for money, real-time scraping bots, LLM SDK calls without the guardrail verifier.

## 16. Risk register + decision log

Risks in **DECISIONS.md §Risks** (R-01 PSX data availability/ToS, R-02 hallucinated advice, R-03 scope creep from references, R-04 single-user→multi-user auth debt, R-05 FX/PKR formatting, R-06 scholar-criteria changes). Decisions D-001… in DECISIONS.md; every future architecture change appends a decision, never edits history.

## 17. Success criteria / acceptance

Phase-gated (ROADMAP.md). Platform-level: (a) every displayed number reproducible from DB + FINANCIAL-RULES formula via an automated test; (b) sector switch demonstrably changes all market widgets from fixture data; (c) zakat/screener match worked examples; (d) AI answers cite retrieved rows and pass the number-verifier in tests; (e) CSV round-trip preserves totals; (f) no console errors, responsive to 375px, luxury glass design tokens unchanged.

## 18. Glossary

**Nisab** — minimum zakatable wealth (85g gold or 595g silver equivalent). **Zakat** — 2.5% of eligible net wealth held one lunar year. **Sukuk** — Shariah-compliant asset-backed certificates (not "Islamic bonds" in UI copy without qualifier). **KMI-30** — PSX Shariah-compliant index. **Purification** — donating the non-compliant income proportion of dividends. **XIRR** — money-weighted return for irregular cash flows. **EOD** — end-of-day data. **RAG** — retrieval-augmented generation. **Pullers/Draggers** — constituents adding/subtracting most index points. Full glossary in PROJECT.md.

---
*End of master plan. Companion files govern execution.*
