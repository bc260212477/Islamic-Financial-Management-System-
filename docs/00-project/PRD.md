# PRD.md — Functional Requirements

Conventions: **M**=must, **S**=should. Phase in brackets. All amounts show currency + period. All formulas per FINANCIAL-RULES.md.

## F1 Accounts & profile [P3–P4] (M)
User, currency preference (PKR default), accounts (bank/cash/wallet/broker) with balances derived from transactions, opening balances as transactions.

## F2 Transactions — personal cash flow [P4] (M)
CRUD income/expense; types: job, business, partnership, factory, freelance, rental, investment, other (income); categories: food, housing, transport, utilities, family, sadaqah, health, shopping + user categories. Fields: date, merchant/source, amount>0, direction, account, business_id nullable, note. Sorting, search, monthly/quarterly/yearly aggregation, budget per category with over-budget state (red, "PKR X over").

## F3 Businesses [P4] (M)
Multiple businesses/branches; transactions tagged to a business; P&L (revenue − expenses by period), business assets/liabilities, working capital; personal↔business transfers recorded as transfers, never income/expense. Consolidated view is opt-in and labelled.

## F4 Portfolio [P4–P5] (M)
Holdings (instrument, qty, avg cost, invested, current value from prices_eod or manual), dividends/profit received, return % (green/red), allocation %, watchlists, screening badge per holding (Halal ✓ / Under review / Purify dividends).

## F5 Market analytics engine [P5] (M)
`MarketScope {indexId, sectorId?, companyId?}` drives all widgets: Market Wrap cards (Open High Low Close Δpts Δ% Volume FYTD CYTD), KPI rings (e.g. % advancers, sector weight, company weight in index, dividend yield percentile — each ring labelled with formula + as-of date), heatmap, sector donut + point-contribution table (Pullers & Draggers), top gainers/losers, movers by volume, breadth, indices table. Changing scope re-queries everything; stale-scope responses are discarded. Data stamped "EOD · <date> · Source: <name>". Company page tabs: Overview, Profile, Performance, Financials, Technical (vs sector/history bars).

## F6 Calculators [P6] (M)
Zakat (cash+gold+business−debts, nisab=85×gold price/g, 2.5%, progress to nisab, Due/Below-nisab), Nisab quick view, Savings goal (months to target at monthly saving, with/without expected profit rate clearly labelled as assumption), Profit calculator (principal, rate, period — "profit" wording), Currency display conversion PKR⇄USD at a stored, dated FX rate. All live-recalculating, all showing the formula.

## F7 Shariah screening [P6] (M)
Per ISLAMIC-FINANCE.md: debt/total assets ≤33%, non-compliant investments/total assets ≤30%, live pass/fail, star rating (5 well-under, 4 pass, 3 one-fail, 1 both-fail), purification amount on dividends = dividend × non-compliant income ratio. Applied to holdings and company pages.

## F8 Islamic banks reference [P6] (M)
Static list from BARAKAH-PROJECT.md v1.5 (Meezan, Faysal, BankIslami, Dubai Islamic PK, MCB Islamic, Al Baraka PK, Bank Alfalah Islamic, UBL Ameen, HBL Islamic) with type, Shariah chair, note, and the "no public transaction APIs — CSV/manual" footnote. Content-reviewed annually (DECISIONS log).

## F9 AI assistant [P7] (M)
Chat UI; answers grounded in retrieved user + market data with citations; capabilities: explain a report, find unnecessary expenses (rule: category trend + recurring merchants, shown with numbers), portfolio analysis, scenario compare ("save PKR X more/month → goal date moves Y"), all calculations displayed. Guardrails per TECHNICAL-PLAN §7. Refusals: trade instructions, return guarantees, fatwa. Disclaimer on panel: "Analysis of your data — not licensed financial advice."

## F10 Reports & import/export [P4, P8] (M)
CSV import expenses/investments (formats in BARAKAH-PROJECT.md Part 4; PapaParse; invalid rows skipped + reported), JSON export, full data export, account deletion, monthly/quarterly/yearly PDF/CSV reports.

## F11 Auth & settings [P3] (M)
Register/login (single-user mode flag), JWT sessions, password reset via email if provider configured (else owner-only note), profile/currency/gold-price defaults.

## Non-functional
Responsive 375px→desktop; page data loads <2s cached; no console errors; accessible labels/focus; all list money totals reconciled to detail rows by automated test (TESTING.md).
