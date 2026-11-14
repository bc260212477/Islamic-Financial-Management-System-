# AGENTS.md — Main Development Instructions (Arena)

## Read order (every session)
1. `SOUL.md` 2. `TECHNICAL-PLAN.md` 3. `ROADMAP.md` (find current phase) 4. The file(s) governing your task: PRD.md / ARCHITECTURE.md / DATABASE.md / FINANCIAL-RULES.md / ISLAMIC-FINANCE.md / DATA-SOURCES.md / SECURITY.md / TESTING.md 5. The relevant `skills/*/SKILL.md`.

## Non-negotiables
- Build **only the current ROADMAP phase**. Do not skip ahead or add unlisted features.
- Money: `NUMERIC(19,4)` in DB, string in API JSON, integer minor units in JS calculations where feasible. Never float arithmetic on money.
- Every financial formula: defined in FINANCIAL-RULES.md → implemented once in a shared calc module → unit-tested with the worked examples. UI never re-implements formulas.
- Market data: EOD only, staged→validated→published (DATA-SOURCES.md). Failed validation = keep last published, alert, never serve partial.
- AI: answers only from retrieved DB context, citations required, number-verifier guardrail on (TECHNICAL-PLAN §7). Refuse trading instructions.
- Design: existing glass tokens (PROJECT.md §Design). Pure SVG charts. No banned libraries (SOUL.md).
- Security: SECURITY.md checklist on every PR touching auth, upload, or money mutation.

## Workflow per phase
1. Restate phase scope + acceptance criteria from ROADMAP.md.
2. Implement smallest complete slice; migrate data with Alembic (never hand-edit prod schema).
3. Run TESTING.md suite for the phase; paste results in your reply.
4. Self-review with skills/security-review + skills/testing checklists.
5. Update DECISIONS.md if architecture changed; update ROADMAP.md phase status.
6. Stop. Owner tests live/preview link and approves before next phase.

## Repo conventions
- Current shipped app (root `index.html/app.js/styles.css`) is the static v1.0 — do not break its GitHub Pages deploy until Phase 4 cutover (DECISIONS D-001).
- Platform code (from Phase 2): `apps/web` (Next.js), `apps/api` (FastAPI), `apps/api/app/calculators` (pure formulas), `infra/` (docker, CI). Create only when the phase starts.
- Commits: imperative, scoped (`feat(market): sector KPI rings`). One phase-slice per PR where practical.
- External candidates from `bc260212477/GitHub-Repos-` catalogues: propose in DECISIONS.md with license/last-commit/dependency review; adopt only after owner approval.
