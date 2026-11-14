# Barakah OS — Cloud Setup (Vercel + Supabase) — 2026-11-14

## Supabase (DONE — live)
- Project: **barakah-os**, ref `lglkzbzudppudyknzudx`, region **ap-south-1 (Mumbai)**, Free plan, org `bc260212477's Org`.
- API URL: `https://lglkzbzudppudyknzudx.supabase.co` · Dashboard: https://supabase.com/dashboard/project/lglkzbzudppudyknzudx
- Health check (2026-11-14): auth, db, pooler, REST, storage, realtime — **all ACTIVE_HEALTHY**.
- Schema: migration `barakah_os_core` applied (= `supabase/migrations/20261114000000_barakah_os_core.sql` in this repo). **15 tables** — profiles, accounts, transactions, budgets, goals, businesses, holdings, family_members, habits, tasks, journal_entries, readings, skills, health_logs, qard_loans — money `NUMERIC(19,4)`, **RLS enabled on all 15** with `auth.uid() = user_id` policies (tenant isolation).
- Auth: email enabled, signups open, autoconfirm ON (demo-friendly), site URL = GitHub Pages app, redirect allow-list = Pages + `localhost:8080` + `*.vercel.app`.
- Keys: publishable key is committed in `apps/web/supabase-config.mjs` (safe with RLS). **Secret/service keys and the DB password are NEVER committed.** The database password was generated during setup and given to the founder in chat — store it in a password manager; it can be reset anytime in Dashboard → Project Settings → Database.
- Laravel platform can use this as its PostgreSQL: `DB_CONNECTION=pgsql`, `DB_HOST=db.lglkzbzudppudyknzudx.supabase.co`, `DB_PORT=5432`, `DB_DATABASE=postgres`, `DB_USERNAME=postgres`, `DB_PASSWORD=<founder-held>` — then `php artisan migrate` on the owner's machine (D-014).

## Vercel (PARTIAL — one founder action left)
- Project: **barakah-os** (`prj_7MARcQhZqu6b6258rTYsPUvC6SAh`), root directory set to `apps/web`, env vars set for production/preview/development: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- **Deployment blocked (2026-11-14):** Git-source deployments return `429 GitHub API rate limit exceeded` from Vercel's GitHub integration, and linking the repo to the project requires a **GitHub Login Connection** that only the account owner can add: Vercel → avatar → Settings → **Login Connections** → Connect GitHub. After that, redeploy from `main` (or tell the agent "retry Vercel"). GitHub Pages (live now) is unaffected.
- File-upload deployment was not used: the connector cannot supply `projectSettings` for first deployments, and hand-transcribing `app.js` (44 KB) risks corrupting it.

## Next wiring slice (not done yet — honestly)
1. Web app auth → Supabase Auth (replace demo-grade local sign-in), then sync local data to the RLS tables.
2. Vercel production deploy after the Login Connection; Supabase auth allow-list already covers `*.vercel.app`.
3. Laravel platform pointed at Supabase Postgres when a PHP host is chosen.
