# SECURITY.md — Privacy, Authentication, Encryption, Retention

## Data classification
User financial data (transactions, holdings, balances) = highly sensitive. Market data = public. Credentials = secret.

## Authentication & sessions
Passwords argon2id (never plaintext/MD5/SHA-only). JWT access token ≤15 min + rotating refresh token in httpOnly, Secure, SameSite=Lax cookie; logout revokes refresh. Login rate-limit (Redis, 5/min/IP + account lock backoff). Single-user mode flag until Phase 8; registration closed by default after owner account created (`ALLOW_REGISTRATION=false`).

## Transport & storage
TLS everywhere (platform-enforced, HSTS via host). Encryption at rest via Supabase/Neon + disk encryption on API host. Secrets only in platform env vars; never in repo, logs, or client bundle. DB credentials least-privilege (API role cannot drop tables). Backups encrypted (provider) with 7-day retention minimum.

## Authorisation
Every query filtered by `user_id` from the token (never from client input). Admin endpoints check owner role server-side. IDOR test in TESTING.md for every `/{id}` route.

## Input & uploads
Pydantic validation on all payloads; amounts >0 and ≤ 10^12; CSV import: ≤2 MB, ≤10k rows, text/csv only parsed with PapaParse-equivalent server parser, spreadsheet formulas neutralised (leading `= + - @` escaped on export), invalid rows skipped + reported, import is an undoable batch. No user HTML rendered unsanitised (React escaping; no `dangerouslySetInnerHTML` without sanitiser + DECISIONS entry).

## AI-specific
Only retrieved rows for the asked question are sent to the LLM provider; no credentials, emails, or other users' data in prompts; provider must be configured for no-training where available; prompts/outputs logged (owner-visible) with citations; verifier blocks mismatched numbers (ARCHITECTURE.md).

## Audit & privacy rights
`audit_log` on money mutations, imports, exports, deletions, logins. Self-serve: full JSON export, hard delete (cascade + confirmation re-auth). No analytics trackers on finance screens at launch; error tracking (if enabled) must scrub amounts/merchant strings. No selling/sharing data; no ads.

## Dependencies & supply chain
Lockfiles committed; CI runs `pip-audit`/`npm audit` (high+ blocks merge unless DECISIONS exception); catalogue/external code only per DATA-SOURCES.md review process. Licences of all deps listed in release notes.

## Incident basics
Rotate JWT secret + DB password, revoke sessions, notify owner, preserve audit_log. Report security issues privately to owner (SECURITY contact in repo settings — owner to add email).

## Checklist (per PR touching auth/money/upload/AI)
skills/security-review/SKILL.md must be run and its result pasted in the PR.

## Laravel enforcement map (2026-11-14)
Blade `{{ }}` escaping (no `{!! !!}` on user data), `@csrf` on all forms, Eloquent parameter binding only (no raw SQL with input; reviewed `DB::raw` exceptions logged), Form Request validation, Breeze/Fortify-grade auth with hashed (bcrypt/argon2id) passwords, session regeneration on login, rate limiting (`RateLimiter`) on auth/AI/imports, policies per tenant-owned model + tenant scope tests, `APP_DEBUG=false` in production, secrets in `.env` (never committed), signed download URLs for exports, `composer audit` + `npm audit` in CI.
