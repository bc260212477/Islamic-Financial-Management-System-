# ARCHITECTURE.md — Approved Technical Architecture

System diagram and stack table: TECHNICAL-PLAN §2 (binding). This file adds service boundaries and the API catalogue.

## Boundaries
- `apps/web` (Next.js 14, TS): UI only. Calls API via server-side rewrites; never talks to DB directly; never computes financial formulas (displays API results; only formatting).
- `apps/api` (FastAPI): `routers/` (auth, accounts, transactions, businesses, portfolio, market, calculators, screenings, ai, reports, admin), `calculators/` (pure functions, no I/O — the ONLY place formulas live), `ingestion/` (PSX jobs), `ai/` (retrieval, prompts, verifier), `core/` (auth, config, db, cache).
- Postgres is the single source of truth; Redis only caches published market reads (key includes scope+date) and rate-limits. pgvector lives in Postgres (`facts` embeddings).

## API catalogue (/api/v1, JWT Bearer, money as strings)
- Auth: POST `/auth/register|login|refresh|logout`, GET `/auth/me`
- Accounts: GET/POST `/accounts`, PATCH/DELETE `/accounts/{id}`
- Transactions: GET `/transactions?from&to&business_id&category&cursor`, POST, PATCH/DELETE `/{id}`, POST `/transactions/import` (CSV), GET `/transactions/summary?period=month|quarter|year`
- Businesses: CRUD `/businesses`, GET `/businesses/{id}/pnl?period=`
- Portfolio: CRUD `/holdings`, GET `/portfolio/summary` (value, invested, return, allocation, screening counts), CRUD `/watchlists`
- Market: GET `/market/indices`, `/market/indices/{id}/wrap`, `/market/sectors?index_id`, `/market/heatmap?index_id&sector_id`, `/market/movers?index_id`, `/market/companies/{id}` (+`/financials`,`/performance`), GET `/market/kpis?index_id&sector_id&company_id` (each KPI: `{key,label,value_pct,formula,as_of}`)
- Calculators: POST `/calc/zakat|nisab|goal|profit|fx` (pure, also used by UI live)
- Screenings: POST `/screenings/evaluate` `{instrument_id or ratios}` → pass/fail, stars, purification
- AI: POST `/ai/chat` (SSE; events: `context`, `token`, `citations`, `done`; server runs verifier before `done`)
- Reports: GET `/reports/summary?period=`, GET `/reports/export.csv|pdf`, GET `/me/export.json`, DELETE `/me`
- Admin: GET `/admin/ingestion/runs`, POST `/admin/ingestion/run` (owner only)

Errors: `{error:{code,message,details}}`; 422 validation lists fields; POST money endpoints accept `Idempotency-Key`. Pagination cursor-based. All list endpoints accept `currency` display param; storage currency per-row.

## Ingestion pipeline
`fetch (EOD files/site per DATA-SOURCES) → stage_* tables → validators → publish (single transaction swapping published_date) → cache bust → ingestion_runs row`. Runs via GitHub Actions cron after PSX close (PKT) + manual admin trigger. See DATA-SOURCES.md for validation rules.

## AI pipeline
`classify intent → tool/SQL retrieval (user-scoped) → pgvector fact retrieval → prompt (templates in skills/financial-research) → LLM stream → number verifier (regex-extract amounts/percentages, compare to retrieved set ±rounding) → emit or regenerate (max 2) → refuse`. Conversations stored (`ai_conversations/messages` with citations JSON) for audit.

## Environments & CI
Local docker-compose (Postgres+Redis+API+Web). CI: lint+typecheck, pytest (calculators/ingestion), Vitest, Playwright smoke. Deploy: Vercel (web), Render/Railway (api Docker), Supabase (db). Secrets only in platform env vars (SECURITY.md).
