# STACK-AUDIT.md — Phase 0: Repo & Stack Audit (2026-11-14)

## Repo audit (actual state)
- Static prototype **complete** (v1.0–v2.0 + improvements, PR #5): `apps/static-v1` (React-via-CDN, localStorage), live on GitHub Pages. Per latest directive it is a **design reference / demo**, not the platform foundation. Seed/demo figures in it are illustrative.
- Agent Operating System files exist under `docs/` + `skills/` (7 skills) from the previous (Next.js/FastAPI) plan.
- Repo is public; Pages deploy from `apps/static-v1` via GitHub Actions works.
- **Environment constraint (verified):** Arena sandbox has no PHP, no Composer, and outbound network limited to GitHub/npm/PyPI (no Packagist). Laravel cannot be scaffolded or run locally here. Phase 2 must execute in GitHub Actions (`shivammathur/setup-php`) or on the owner's machine; every PHP claim must be CI-verified (TECHNICAL-PLAN rule: never claim built/tested unless it actually is).

## Stack audit (supersedes D-002; see D-012)
| Item | Audited choice (Nov 2026) | Note |
|---|---|---|
| Framework | **Laravel 13.x** (PHP 8.3–8.5) | Laravel 11 security support ended Mar 2026 — do not start on 11. Laravel 12 supported to Feb 2027; 13 is current stable. Pin exact version at Phase 2 in composer.json + record here. |
| DB | **PostgreSQL** (16+; pin at Phase 2) | DECIMAL(19,4) for money; MySQL 8 acceptable fallback only by ADR. |
| Views | Blade + **Bootstrap 5.3** | No React/Next.js frontend (directive Part 5). Prototype's glass design ported as custom CSS tokens over Bootstrap (UI-DESIGN.md). |
| Admin base | **Tabler** (MIT, Bootstrap 5) — **selected** | vs Metis (jQuery-era, weaker maintenance): Tabler is actively maintained, MIT, component-rich; Barakah overrides tokens/cards/KPI rings so it won't look generic. Evaluate again at Phase 2 if Tabler's Laravel integration cost grows. |
| JS | Vanilla JS + jQuery only where needed; Chart.js (MIT) charts; DataTables (MIT) tables; Day.js (MIT); FullCalendar (MIT Standard); Select2 (MIT); SweetAlert2 (MIT); Bootstrap Icons + Tabler Icons (MIT) | Every dependency license recorded in composer/package lock + `docs/03-governance/DECISIONS.md` at Phase 2. No library without a named feature need. |
| Queue/cache | Laravel queues + Redis (or database queue at start) | Ingestion/AI jobs later phases. |
| Testing | PHPUnit/Pest + Laravel Dusk or Playwright (Phase 15 gate) | Financial accuracy tests are PHPUnit unit tests on pure calculator classes. |
| Deploy | GitHub Actions CI (setup-php, Postgres service) → owner-chosen host (shared/VPS/Forge) | Static prototype stays on Pages until platform launch. |

## Decisions arising
D-012 stack supersession, D-013 prototype status, D-014 PHP execution environment. Recorded in DECISIONS.md.
