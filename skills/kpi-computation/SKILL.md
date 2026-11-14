# SKILL: KPI Computation
**Use when:** building any KPI ring, health indicator, sector/company KPI, or dashboard percentage.
**Inputs:** FINANCIAL-RULES formula ID (FIN-08/19/20…), a scoped dataset (personal period, business, or market scope {index, sector, company} + as_of), DATA-SOURCES data-mode.
**Outputs:** `{key,label,value,unit,percent,formula_ref,method_text,as_of,source,mode}` consumed by the single reusable KpiRing component.
Procedure: 1) Identify formula ID; if none, stop — add it to FINANCIAL-RULES with a worked example first. 2) Compute numerator/denominator from the *filtered* dataset only; when scope changes, recompute — never reuse another scope's cached KPI. 3) Missing numerator/denominator → render "No data", never 0. 4) Attach method text (tooltip) + as_of + source + data-mode (Live/Delayed/Historical/Manual/CSV/Demo). 5) Unit-test against a hand-computed fixture for at least two scopes (e.g. two sectors giving different percentages).
Pitfalls: denominators drifting between ring and table, stale-scope responses, percent of wrong base (portfolio vs sector), demo data labelled live.
Done when: fixture tests for ≥2 scopes pass and ring/table totals reconcile.
