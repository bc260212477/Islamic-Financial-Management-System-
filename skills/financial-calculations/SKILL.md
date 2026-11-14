# SKILL: Financial Calculations
**Use when:** implementing/changing any number the user sees.
**Inputs:** FINANCIAL-RULES.md formula ID, DATABASE.md fields. **Outputs:** pure function in `apps/api/app/calculators`, unit test, API field.
Procedure: 1) Find/create formula ID (owner approves new formulas). 2) Implement with Decimal/NUMERIC only, no I/O, explicit rounding (half-up 2dp display). 3) Add the worked example from FINANCIAL-RULES as a test verbatim + one edge case (zero, negative, below-threshold). 4) Percentages: define numerator/denominator; missing parts → "No data", never silent 0. 5) Cross-check UI total = sum of detail rows (invariant test).
Pitfalls: floats, transfers counted as income, mixing personal+business, annualising partial months without labelling.
Done when: TESTING.md calculator tests pass and the formula ID is referenced in code + API response.
