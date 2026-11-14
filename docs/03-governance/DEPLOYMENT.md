# DEPLOYMENT.md — Platform Runbook (Phase 15)

## Options
1. **Docker host / VPS (recommended):** `apps/platform/Dockerfile` (PHP 8.3 + Apache + pdo_pgsql). Run behind HTTPS reverse proxy; PostgreSQL 16 managed (Supabase/Neon) or compose service; Redis optional.
2. **Laravel Forge / shared hosting:** PHP 8.3, document root `apps/platform/public`, queue worker via supervisor, scheduler cron `php artisan schedule:run`.

## Steps
1. `cp .env.example .env` — set production DB credentials, `APP_ENV=production`, `APP_DEBUG=false`, strong `APP_KEY` (`php artisan key:generate`).
2. `composer install --no-dev --optimize-autoloader && npm ci && npm run build`
3. `php artisan migrate --force && php artisan config:cache && php artisan route:cache`
4. Seed only on first install: `php artisan db:seed` (creates FICTIONAL demo user — change/remove before real use).
5. Backups: daily DB dump (pg_dump) retained 7+ days; test restore quarterly. Health endpoint: `/up`.

## CI gate (must be green before deploy)
GitHub Actions "Platform CI (Phase 2+)": composer install, Vite build, `migrate:fresh --seed` on PostgreSQL 16, full PHPUnit. Security: run `composer audit` in CI (review output per release), SECURITY.md checklist signed in the PR.

## Honest status (2026-11-14)
Platform is **CI-verified but not yet deployed to a production host** — no hosting account/keys exist in this environment. The static demo remains live on GitHub Pages. Deploy = owner's host + the steps above; do not label the platform "live" until a production URL passes a smoke test.
