# Barakah OS — Web SaaS (`apps/web`)

Founder feedback (2026-11-14): "I need this like a full SaaS software on web base — I don't see any tools/features." Correct: the Laravel platform was CI-verified but hosted nowhere, and GitHub Pages only showed the design demo. This app fixes the visibility problem.

## What it is
A zero-build web SaaS front-end (plain HTML/CSS/ES modules — no npm install, runs on any static host) implementing the product surface of Barakah OS:

- **SaaS shell:** register / sign-in / one-click demo, per-user workspace (tenant key in browser storage), sidebar over the 12 pillars, dark mode, Plans page (Free / Pro / Family — billing honestly marked NOT CONNECTED).
- **Money OS:** accounts, transactions (FIN-21 transfer rule noted), budgets with over-budget flags, goals with required-monthly, cash-flow statement + forecast.
- **Business OS:** businesses with profit flowing to the dashboard (entity separation).
- **Investments:** holdings with P/L; PSX market board + Shariah screener — FICTIONAL feed, always labelled DEMO.
- **Tools Hub (9 working tools):** Zakat, Halal Screener, Dividend Purification, Riba Detector, Debt Payoff (snowball/avalanche), Goal Planner, Inflation Compounder, PK Tax Estimator, Subscription Audit. Pure functions in `formulas.mjs`, unit-tested with `node --test` (9 tests, incl. FIN-11 known case 20,600 → 515.00).
- **Islamic Finance:** live zakat from accounts, sadaqah-from-surplus rule, qard hasan tracker.
- **Life OS:** Family (expenses auto-post to Transactions/Cash Flow), Habits (feeds Health Score + AI), Tasks (overdue flags), Learning & Growth (reading/skills/journal), Health log, Legacy (wasiyyah ⅓ checker — never a fatwa).
- **Decision OS (AI):** deterministic, grounded in the user's own numbers, cites sources, refuses trades/fatwas, refuses to invent missing data.
- **Reports:** KPI table with sources + CSV export + JSON backup/restore.

## Honest limits
- Auth + data are **browser-local demo-grade** (labelled in-app). Production auth/database is the Laravel platform (`apps/platform`, PostgreSQL, tenant-isolation tests in CI) — same features and formulas.
- Market data is DEMO; real PSX data enters via CSV/manual in Laravel until a licensed feed is approved (DATA-SOURCES.md).
- No payment provider connected; plans are informational.

## Run / deploy
- Local: `python3 -m http.server 8080 --directory apps/web` → http://localhost:8080
- GitHub Pages: `.github/workflows/deploy-pages.yml` now publishes `apps/web` (the old `apps/static-v1` remains in-repo as the design reference).
- Vercel: project can be created from this repo with root directory `apps/web` (no build command, output = root). Supabase: organisation exists; a project still needs a founder-chosen database password, after which the Laravel platform can point at its PostgreSQL.
