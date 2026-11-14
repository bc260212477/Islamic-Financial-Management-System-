# TESTING.md — Functional and Financial-Accuracy Tests

Rule: a phase is done only when its tests pass and results are reported. Formula tests use the worked examples in FINANCIAL-RULES.md verbatim.

## Unit — calculators (pytest, `apps/api/tests/test_calculators.py`)
- FIN-03: seed expenses [214,1250,180,145,320,150,96,260,440] → spent 3055; budget 3200 → left 145; add 200 expense → "55 over"? (3055+200−3200=55) over-state true.
- FIN-11: (18500, gold 4200, business 0, debts 2100, gold/g 78) → net 20600, nisab 6630, zakat 515.00, progress 100%. Case net 5000 < nisab → zakat 0, "Below nisab", progress 75.4%.
- FIN-05: invested 12000 value 13850 → +15.4%; 6000→5580 → −7.0%. Portfolio weighted example from PRD seed holdings.
- FIN-06: allocations sum 100.0 ±0.1 on random fixtures (property test).
- Screening: debt 28/inv 24 → pass/pass, 4 stars; debt 19/inv 14 → 5 stars; debt 40/inv 24 → 3 stars; debt 40/inv 35 → 1 star (ISLAMIC-FINANCE thresholds).
- FIN-13: dividend 1000, non-compliant income ratio 0.04 → purification 40.00.
- FIN-14: target 120000, current 20000, save 10000/mo → 10 months, no-profit case.
- Invariants: transfer between own accounts leaves net worth unchanged; delete reverses balance; import batch rollback restores totals.

## Ingestion (pytest + fixtures)
OHLC sanity rejects low>close fixture; %change mismatch >0.05pt blocks publish; weights sum 98% blocks; duplicate symbol rejected; failed publish leaves previous published_date serving.

## API contract
Auth required (401), IDOR: user B cannot read user A's transaction/holding (404), money returned as strings, pagination cursor stable, idempotent POST replay creates one row, CSV import skips + reports invalid rows, export JSON contains all user tables.

## Market engine (fixture dataset, 2 indices × 3 sectors × companies)
Switching `MarketScope` sector changes KPI rings, heatmap set, movers, donut — assert different payload hash per scope and KPI values equal hand-computed fixture expectations (skills/market-analysis). Stale-scope response discarded test (delayed promise).

## AI guardrails (mock LLM)
Planted wrong number in draft answer → verifier blocks/regenerates; buy/sell request refused; every emitted amount exists in retrieved context (citation check); fatwa request refused with scholar suggestion. No live-LLM tests in CI.

## E2E (Playwright, staging)
Login → add expense → totals update → refresh persists → CSV import 3 rows → zakat calc matches FIN-11 → screener sliders update verdict/stars → market sector switch updates widgets → export downloads. Mobile 375px smoke: no horizontal scroll, tap targets ≥40px.

## Release gate
All above green + SECURITY checklist + zero console errors on key pages + live/preview verified by owner (the v1.0 checklist in README is the model per phase).
