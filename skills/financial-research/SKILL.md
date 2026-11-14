# SKILL: Financial Research (incl. AI Assistant Grounding)
**Use when:** answering market/company questions, building AI prompts, writing market copy.
**Inputs:** published market tables (as_of-labelled), user data via scoped queries, DATA-SOURCES.md source list. **Outputs:** cited statements; AI context packs.
Procedure: 1) State the question and the exact tables/date range that can answer it. 2) Retrieve; record source + as_of for every figure. 3) Compute with skills/financial-calculations; show the calculation. 4) For AI: build context pack `{figures:[{label,value,source,as_of}], notes}`, prompt the LLM to explain only these, attach citations `[table:id/date]`, run the number verifier before emitting. 5) Refuse: buy/sell instructions, guaranteed returns, fatwa, figures not in context ("I don't have that data yet").
Pitfalls: stale data presented as live, uncited web numbers, mixing EOD dates, survivorship bias in movers lists.
Done when: every number in the output traces to a retrieved row and carries a date/source.
