# PROJECT.md — Barakah: Complete Product Vision

## Vision
A web platform where an individual or business owner (starting with Pakistan/PSX and Islamic finance) sees their **complete financial life** — net worth, multi-source cash flow, businesses, investments, goals, liabilities — researches **real** PSX/KMI opportunities with an analytics engine, and asks a grounded AI assistant that explains *their* numbers. Calm, luxurious, trustworthy. Real data, real calculations, no hype.

## Users
- **Now:** the owner (single user, PKR primary).
- **Later:** individuals/business owners who want one true view of personal + business money and halal investment research. Multi-tenancy is designed-for (every row has `user_id`) but not marketed until Phase 8 hardening.

## Product pillars
1. **My Money** — profile, accounts, net worth, daily expenses, multi-source income (job, business, partnership, factory, freelance, rental, investment, other), budgets, goals, emergency fund.
2. **My Businesses** — multiple businesses/branches, revenue/expenses, P&L, working capital, strictly separated from personal money (every transaction optionally carries `business_id`; reports never mix without explicit consolidation view).
3. **Markets (StockIntel-style engine)** — pick index (KSE-100, KMI-30, KMI All) → sector → company; the *entire* view re-computes: circular KPI rings, heatmap (size=market cap, colour=performance), sector weights donut + point contribution (Pullers & Draggers), gainers/losers, movers, breadth, company tabs (Overview/Profile/Performance/Financials/Technical). Reference styles: Finviz heatmap, PSX KMI-30 Market Wrap cards, Equitytics, FinSight, Quantro, FinWise (see master prompt references; emulate layout patterns, never copy assets/branding).
4. **Islamic Finance** — Shariah screening, zakat/nisab, dividend purification, Islamic banks reference, halal filters everywhere investments appear.
5. **Calculators** — zakat, nisab, savings goal, profit (never "interest" in labels), currency PKR⇄USD display.
6. **AI Assistant** — chat over the user's own data + published market data; explains reports, flags wasteful expenses, compares scenarios with shown calculations. Analysis, not licensed advice; no trading signals.
7. **Reports & Data** — monthly/quarterly/yearly reports, PDF/CSV export, CSV import (expenses/investments), JSON export, full data export/delete.

## Design (binding, from shipped v1.0)
Warm off-white 3-D glass. Tokens: `--bg-base #F7F4EC`, glows `#FBF8EF/#F4F0E4/#EFE9D8`, ink `#1B1A17`, soft `#6B665C`, muted `#8C8676`, gold `#C9A227`, gold-light `#E5C766`, green `#2F7A5E`, red `#B4543F`. Never `#FFFFFF/#000000`. Glass card: 145° white gradient, 22px radius, layered soft shadows, `blur(14px) saturate(140%)`. Type: Cormorant Garamond (headings/numbers), Inter (UI). Max width 1240px (app shell may widen for markets in Phase 5 with owner approval), gap 18px, responsive to 375px. Pure SVG charts; circular KPIs are SVG rings. Transparent glass buttons + one gold primary. Dark mode optional (Phase 8).

## Glossary (extended)
Nisab, Zakat, Sukuk, KMI-30/KSE-100, Purification, Halal screening, Pullers/Draggers, Breadth (advancers vs decliners), Working capital (current assets − current liabilities), Emergency fund (months of expenses covered), Free cash flow, XIRR, EOD, RAG, Market Wrap (Open/High/Low/Close/Δpts/Δ%/Volume/FYTD/CYTD).

## Out of scope (always)
Brokerage execution, trading signals/tips, guaranteed-return claims, fatwa issuance, bank-account aggregation via credentials (no Pakistani personal bank APIs exist), real-time tick data at launch, crypto speculation features.

## Success definition
Owner opens Barakah and answers in <30s: What am I worth? What came in/went out this month (personal vs each business)? What do I own, is it halal, what needs purifying? What is the market/sector/company really doing (EOD, sourced)? What is my zakat? — every answer with a visible calculation or source.
