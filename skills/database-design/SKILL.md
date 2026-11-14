# SKILL: Database Design
**Use when:** adding tables/fields/queries.
**Inputs:** DATABASE.md, PRD feature. **Outputs:** Alembic migration, updated DATABASE.md, indexes, tests.
Procedure: 1) Model money as NUMERIC(19,4)+currency; time as timestamptz; UUID PKs; `user_id` + index on every user-owned table. 2) Prefer derived-over-stored; if stored (e.g. invested), document the derivation and a reconciliation test. 3) Dated reference data (constituents, prices, fundamentals) keyed by (entity, date) — never overwrite history. 4) Soft delete + audit hooks on money tables. 5) Write the IDOR/ownership test with the migration. 6) Check query plans for list endpoints (no N+1; cache only published market reads).
Pitfalls: float columns, client-supplied user_id, deleting price history, unindexed date scans.
Done when: migration up/down works locally, DATABASE.md updated, ownership tests pass.
