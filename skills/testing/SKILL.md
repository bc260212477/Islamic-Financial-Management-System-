# SKILL: Testing
**Use when:** finishing any slice; before asking owner approval.
**Inputs:** TESTING.md, FINANCIAL-RULES worked examples. **Outputs:** passing suites + a results summary in the reply/PR.
Procedure: 1) Map the change to TESTING sections (calculators/ingestion/API/market/AI/E2E). 2) Formula change → worked-example test verbatim + edge case, per skills/financial-calculations. 3) Scope/filter change → fixture test proving outputs differ per scope and match hand-computed values. 4) Money mutation → invariant tests (totals reconcile, delete reverses, transfer-neutral). 5) Run full affected suites; report counts and any failure verbatim — never "should pass". 6) Browser smoke: no console errors, 375px layout, live totals vs seed hand-check (e.g. 3055/145/150 on v1.0 data).
Pitfalls: mocking away the DB in money tests, live-LLM tests in CI, unseeded random data without recorded seed.
Done when: release gate for the phase (TESTING.md) is green and reported.
