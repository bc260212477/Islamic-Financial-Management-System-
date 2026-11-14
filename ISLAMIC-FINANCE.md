# ISLAMIC-FINANCE.md — Shariah Principles and Compliance Boundaries

> Barakah displays recognised screening criteria and the user's own calculations. It does **not** issue fatwas or religious rulings. Where criteria are shown, cite the framework ("SECP/KMI criteria") and date. Owner should confirm thresholds with their scholar; thresholds are configurable settings, with defaults below.

## Screening (SECP / KMI-style, defaults)
- **Debt ratio:** non-compliant (interest-bearing) debt / total assets ≤ **33%** = pass. (SECP revision 37% → 33%.)
- **Investments ratio:** non-compliant investments / total assets ≤ **30%** = pass. (Recommended revision 33% → 30%.)
- **Non-compliant income ratio:** non-compliant income / total income — used for purification; flag if >5% for owner review (display, with source).
- **Core business:** instrument flagged non-halal core activity (conventional banking/insurance, alcohol, gambling, etc.) = excluded regardless of ratios (list maintained as data, reviewed by owner).
- **Verdicts:** both pass → "Halal ✓" (green); one fail or near-threshold (within 2pts) → "Under review" (amber); dividend purification required → "Purify dividends" (red badge state); both fail → "Not compliant" (red).
- **Stars:** 5 = debt<20% and inv<15%; 4 = both pass; 3 = one fails; 1 = both fail. (From BARAKAH-PROJECT v1.5.)
- KMI-30 tracks Shariah-compliant PSX equities; membership is supporting evidence, not a substitute for ratio screening display.

## Zakat
- Rate 2.5% on eligible net wealth held one lunar year (hawl). Formula FIN-11/FIN-12.
- Nisab: 85g gold (default) or 595g silver; UI shows which is selected, price source/date. User may adjust gold/silver price.
- Zakatable: cash/bank, gold/silver, business/trade assets, receivables (owner setting). Deduct: debts due now. Personal home/car excluded (display note).
- App shows "Due / Below nisab"; it does not declare the user's religious obligation — copy: "Based on the values you entered."

## Purification
FIN-13. Show per-dividend purification_due with payer, ratio, period; annual purification total in portfolio + reports, with a "record as sadaqah/donation" action that creates a linked expense (owner confirms).

## Terminology (UI copy rules)
"Profit" not "interest"; "financing cost" where needed; avoid "Islamic bond" without "sukuk (asset-backed certificates)"; no "guaranteed halal returns". Conventional products, if ever listed for comparison, are labelled "conventional (interest-based)" factually.

## Reference data
Islamic banks list (BARAKAH-PROJECT v1.5): Meezan Bank (Full-fledged; Justice (Retd.) Muhammad Taqi Usmani), Faysal Bank (Converted 2023; Mufti Mohib ul Haq), BankIslami Pakistan (Mufti Javed Ahmad), Dubai Islamic Bank Pakistan (Dr. Hussein Hamed Hassan), MCB Islamic Bank (Mufti Munib-Ur-Rehman), Al Baraka Bank Pakistan (Shaikh Esam Mohammad Ishaq), Bank Alfalah Islamic (window; Dr. Mufti Khalil Ahmad Aazami), UBL Ameen (window; Dr. Mufti Muhammad Zubair Usmani), HBL Islamic (window; Dr. Mufti Muhammad Zubair Usmani). Footnote everywhere the list appears: "Pakistani banks do not expose public transaction APIs for personal dashboards. Use CSV export from your bank app or manual entry." Chairs/roles are reference content — re-verify before each release and log in DECISIONS.md.

## Boundaries
No fatwa generation by AI (refuse + suggest consulting a qualified scholar). Screening outputs: "meets/does not meet the displayed criteria", never "Islam guarantees…". Scholar disagreement note on screener page.
