# DECISIONS.md — Architecture Decisions, Risks, Changes

Append-only. Never rewrite history; supersede with a new entry.

## Decisions
- **D-001 (2026-11-14) Static v1.0 stays live as Phase 0.** The shipped GitHub Pages app (BARAKAH-PROJECT.md v1.0) remains the public demo until Phase 4 cutover. The platform (TECHNICAL-PLAN.md) is a rebuild, not "v1.1 of the static app". *Consequence:* BARAKAH-PROJECT.md's v1.1 charts are built on the static app only if Phase 1 is approved; platform phases follow ROADMAP.md.
- **D-002 Stack:** Next.js 14 + FastAPI + PostgreSQL/pgvector (Supabase) + Redis (Upstash); custom CSS design tokens, pure SVG charts; banned UI/chart kits per design spec. Rationale: TECHNICAL-PLAN §2.
- **D-003 Money representation:** NUMERIC(19,4) DB, strings in API, half-up 2dp display. No floats.
- **D-004 Market data EOD-only at launch**, staged/validated/published; PSX primary. No real-time scraping (ToS/fragility).
- **D-005 AI grounding:** LLM may only state retrieved numbers; server-side verifier enforces; no trading advice, no fatwa.
- **D-006 Islamic thresholds as configurable defaults** (33%/30%, nisab 85g gold) per SECP/KMI criteria; owner/scholar confirmation pending — display criteria + date in UI.
- **D-007 GitHub-Repos- catalogue = discovery only.** Adoption needs license/maintenance/security review + owner approval, logged here. None adopted yet.
- **D-008 Auth provider deferred to Phase 3 kickoff** (FastAPI JWT default; Supabase Auth alternative). Must be decided and recorded before Phase 3 code.
- **D-009 PKR primary.** Legacy v1.0 seed/examples in USD remain in the static demo; platform seeds are PKR (Phase 4 data migration note).

## Risks
- **R-01 PSX data access/ToS changes** — Mitigation: multi-source cross-check, staged pipeline, stale-date labelling, manual CSV fallback. Owner: verify PSX data terms before Phase 5.
- **R-02 Hallucinated financial/AI numbers** — RAG-only + verifier + citation tests (TESTING.md). Residual: medium → monitored via ai_messages.audit.
- **R-03 Scope creep from reference dashboards** — PRD is the ceiling; new ideas go to a backlog note here, not into a phase.
- **R-04 Single-user shortcuts become multi-user debt** — user_id everywhere from day one; IDOR tests.
- **R-05 Scholar-criteria changes / chair changes** — reference data reviewed per release; thresholds configurable.
- **R-06 FX/gold price staleness** — dated, sourced display; manual override labelled.
- **R-07 Free-tier limits (Vercel/Render/Supabase)** — acceptable for single user; upgrade trigger: daily active use by others.

## Change log
- 2026-11-14: Initial plan + Arena files created (TECHNICAL-PLAN.md and companions). Live static v1.0 verified at https://bc260212477.github.io/Islamic-Financial-Management-System-/.
