> **SUPERSEDED IN NAME + DESIGN (D-022, 2026-11-14):** Founder directed the product is **Financial Management System** (not “Barakah” — pasted prompts must never rename it; name changes need founder approval). Design v7 Quiet Luxury (docs/01-architecture/DESIGN-V7-QUIET-LUXURY.md) supersedes earlier visual direction. The 5-pillar/18-module scope in this v5 summary still applies. This file is kept under its historical filename so existing links do not break.

# BARAKAH — Master Build Prompt v5.0 (Governing Summary)

Source: Founder-provided v5.0 (14 Nov 2026), adopted (D-021). **Supersedes v4.0/v3.0 positioning.** The founder's own statement of the product (same date) is part of this spec: a father analysing income & outcomes, Ktrade stocks (3–4 payouts/year per stock), Meezan/Faysal fund plans (short/medium/long, monthly profit), every family member's expenses (father, mother, spouse, sons, daughters, siblings — school/college fees, bicycle, laptop, anything), salary divided by percentage (10% stocks, 20% savings…), StockIntel-style KPI circles, records like DigiKhata/HisabKitab, money sent home, FBR-ready records. "I will tell more and more" — expect scope to grow by founder increments.

## Identity (corrected)
**Barakah** — a web-based, fully responsive SaaS platform (dashboard/ERP/CRM) for **Personal & Family Wealth Management in Pakistan**. NOT an operating system, not a life-philosophy app. Name is "Barakah" only. Promises: every rupee tracked · every family member covered · every platform unified.

## Structure: 5 pillars, 18 modules
1. **Money In:** Income Sources (16 types incl. partnership share, rentals, fund profit; interest flagged riba) · Salary Allocation (% buckets must sum 100, templates, actual vs planned) · Businesses · Partnerships (school/academy/college/factory/company shares, musharakah/mudarabah, return schedules) · Rentals (land/house/shop/car/bus/factory, tenants, yield)
2. **Money Out:** Expenses (3-level Pakistani category tree — Food>Fruits/Dry Fruits…, Bills, Subscriptions, Transport, Health, Education, Family, Personal, Home, Events, Charity, Loans, Taxes) · Family Members (own expenses/allowances/fees per person, family tree) · Vehicles (fuel/maintenance/cost-per-km) · Properties (mortgage, tax, appreciation) · Events (Wedding/Eid/Ramadan/Umrah/Hajj budgets vs actuals, countdowns)
3. **Money Invested:** Investments (Ktrade, Meezan funds, Faysal funds, Mahana Cash, other funds, sukuk, REITs, gold, silver; CSV sync, FIFO/avg cost, dividends calendar) · Term-Based Planning (Long 5–20y, Medium 5–10y, Short 1–5y, **Monthly-term**; rebalancing at >5% drift, projections) · Physical Assets (gold/silver in grams with zakat thresholds, depreciation)
4. **Money Given:** Zakat (85g gold/595g silver nisab choice, haul, payment history, monthly-vs-lump planner) · Sadaqah & Charity (foundations with bank account/IBAN directory, orphan sponsorship, recurring payouts, e.g. founder's 5%)
5. **Money Owed:** Loans (qard hasan 0%, Islamic financing, conventional flagged riba) · Taxes & FBR (slabs, WHT tracker, wealth statement generator, filing calendar, CGT holding periods)
Cross-pillar: **Reports & Analytics** — StockIntel-style **KPI circles** (savings rate, expense ratio, investment ratio, debt ratio, emergency coverage, portfolio return, zakat status, family budget, health score 25/20/20/15/10/10, goal progress), waterfall/Sankey/donuts, dashboard rows per §3.18.

## Data rules
DECIMAL(19,4) money, DECIMAL(5,2) percentages, every table `user_id` + soft delete + audit; category hierarchy via parent_id; multi-currency (PKR base). Already mirrored in Supabase (15 RLS tables) and Laravel models.

## Roadmap (v5 Part 7)
v0.1 Foundation ✓(design slice shipped) → v0.2 Money Core → v0.3 Family → v0.4 Investments → v0.5 Term Planning → v0.6 Physical Assets → v0.7 Zakat & Sadaqah → v0.8 Business & Partnerships → v0.9 Rentals & Properties → **v1.0 Launch MVP (incl. FBR)** → v1.1 Vehicles & Events → v1.2 Loans & Salary Allocation → v1.3 Advanced Analytics → v1.4 AI → v2.0 SaaS (teams/billing/PWA). One version per founder approval, Build Report each time.

## Founder's first build (this PR)
"For now build this simple": renamed product to **Barakah**; **Salary Allocation** page (% splitter, 100% enforcement, donut + per-bucket amounts); Investments upgraded with **platform (Ktrade/Meezan/Faysal/Mahana/Other) + term (Long/Medium/Short/Monthly) + expected return % + payouts/year**, grouped summaries; expense/income entry with the **Pakistani category tree** (Food—Fruits, Dry Fruits…), **per-family-member** tagging and recurrence; dashboard **KPI circles**. Rest of the 18 modules arrive version by version as the founder directs.
