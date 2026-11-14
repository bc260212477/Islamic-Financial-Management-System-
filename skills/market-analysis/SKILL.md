# SKILL: Market Analysis
**Use when:** building/verifying indices, sectors, KPI rings, heatmap, movers, company analytics.
**Inputs:** published EOD tables only (DATA-SOURCES.md), FINANCIAL-RULES FIN-08/09/10. **Outputs:** KPI payloads `{key,label,value_pct,formula,as_of}` + widgets.
Procedure: 1) Fix scope {index, sector?, company?} + as_of (latest published). 2) Compute from constituents/prices/fundamentals; weights must reconcile (Σ≈100 ±0.5) before rendering donut. 3) KPI rings: advancers %, sector/company weight, breadth, yield percentile — each with registry formula; missing inputs → "No data". 4) Heatmap: size=market cap, colour=EOD % (cap ±10%); movers ranked on published volume/Δ%; Pullers/Draggers via FIN-09 with method labelled. 5) Verify against a hand-computed fixture (TESTING market engine) and spot-check one real EOD against the PSX-published wrap. 6) Stamp every widget "EOD · date · source".
Pitfalls: intraday claims on EOD data, KPI denominators changing silently per scope, stale-scope responses overwriting new ones.
Done when: sector/index switch demonstrably recomputes all widgets and fixture expectations match exactly.
