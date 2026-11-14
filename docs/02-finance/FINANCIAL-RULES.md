# FINANCIAL-RULES.md — Calculations and Accounting Rules (Binding)

Implementation rule: each formula lives once in `apps/api/app/calculators`, is unit-tested with the worked example here, and is referenced by ID (e.g. `FIN-03`) in code comments and API responses. Money rounding: half-up to 2dp at display; internal NUMERIC(19,4). Percentages: 1dp display unless KPI ring (0dp ring fill, 1dp label).

- **FIN-01 Net worth** = Σ account balances + Σ holding current values + Σ business net assets − Σ liabilities (accounts with negative/liability kind + debts_due). Business net assets = business assets − business liabilities as recorded.
- **FIN-02 Account balance** = opening_balance + Σ in − Σ out (transfers net zero across own accounts).
- **FIN-03 Cash flow (period)** = Σ income − Σ expenses (transfers excluded). Net cash (dashboard) = income − expenses for the period. *Worked (v1.0 seed): expenses 214+1250+180+145+320+150+96+260+440 = 3,055; budget 3,200 → "145 left"; over budget → "X over", red.*
- **FIN-04 Budget variance** = limit − spent; negative = over (red).
- **FIN-05 Holding return %** = (value − invested)/invested × 100 (green ≥0, red <0). Portfolio return = value-weighted: (Σvalue − Σinvested)/Σinvested × 100. XIRR (Phase 5+) solves NPV of dated cash flows = 0; display only when ≥2 flows and 30+ days.
- **FIN-06 Allocation %** = holding value / Σ portfolio value × 100; donut segments must sum to 100.0 ±0.1 (largest-remainder fix).
- **FIN-07 Business P&L (period)** = Σ revenue(in, business_id) − Σ expenses(out, business_id). Working capital = current business assets − current business liabilities.
- **FIN-08 KPI ring %** = each KPI defines numerator/denominator in its registry entry (e.g. advancers/(advancers+decliners)×100; sector weight = Σ constituent weights; company index weight from constituents). KPI without both parts renders "No data", never 0-by-default.
- **FIN-09 Index points contribution** = weight_pct × index level change approximation per PSX published Pullers/Draggers when available; else Σ(weight_i × pct_i)/100 × level. Label the method + date.
- **FIN-10 Heatmap** size = market cap (fundamentals), colour = EOD % change (green up / red down, intensity scaled, cap ±10%).
- **FIN-11 Zakat** (see ISLAMIC-FINANCE.md): net = cash_bank + gold_silver_value + business_assets − debts_due_now; nisab = 85 × gold_price_per_gram (or 595 × silver price if silver nisab selected); eligible = net ≥ nisab; zakat = eligible ? net × 0.025 : 0; progress = min(net/nisab,1)×100. *Worked: cash 18,500 + gold 4,200 − debts 2,100 = 20,600; nisab 85×78=6,630; zakat = 515.00; progress 100%.* Defaults shown are USD-era v1.0 examples; PKR defaults set in Phase 6 with owner.
- **FIN-12 Nisab display** always shows grams, price source + date.
- **FIN-13 Purification** = dividend_amount × (non_compliant_income / total_income) for the payer's latest fundamentals; show ratio + period. Rounded up to nearest rupee for donation display, exact value stored.
- **FIN-14 Savings goal**: months = ceil((target − current)/monthly_saving) (no-profit case). With assumed profit rate r (monthly): months solves future-value annuity; label "assumes X% p.a. — not a guarantee". Goal date = today + months.
- **FIN-15 Profit calc** = principal × rate% × (days/365) (or period years). Label "profit (expected/illustrative)", never "interest". Loan comparison shows total payable + effective monthly outflow for both options side by side.
- **FIN-16 FX display** = amount × latest fx_rates for pair/date; original currency always shown alongside converted.
- **FIN-17 Sadaqah total** = Σ expenses category=sadaqah (period), green.
- **FIN-18 Emergency fund months** = liquid savings / average monthly expenses (trailing 6 complete months; if <6, use available and label n).

Accounting invariants (tested): transfers never change net worth; deleting a transaction reverses its balance effect exactly; imports are additive batches that can be rolled back by batch_id; consolidated personal+business totals = sum of parts (no double count of transfers).

## Health score & extended calculators (added 2026-11-14)
- **FIN-19 Financial Health Score (0–100, transparent weights, shown per-indicator):** savings rate 20 (score = clamp(savings_rate/30%)*20), emergency months 15 (months/6*15 capped), cash-flow stability 15 (1 − CV of monthly net, floored 0, ×15; needs ≥3 months else "insufficient data" and weight redistributed pro-rata — method displayed), debt burden 15 (15×(1 − debt_payments/income), floored), expense-to-income 10 (10×(1 − ratio) floored), income diversification 10 (10×(1 − largest_source_share)), goal progress 10 (weighted % to targets), net-worth trend 5 (positive 3-month trend = 5, flat 2.5, negative 0). Overall = sum; each indicator renders as KpiRing with formula tooltip + trend. No score without ≥3 indicators of data.
- **FIN-20 CAGR** = (end/start)^(1/years) − 1 (guard start>0, years>0). **ROI** = (gain − cost)/cost ×100. **Savings rate** = (income − expenses)/income ×100. **Burn rate** = avg monthly expenses (trailing 3 complete months); **runway** = liquid assets / burn rate (months). **Break-even** = fixed costs / (price − variable cost per unit). **Inflation-adjusted value** = nominal / (1+inflation)^years. **Compound growth** = P(1+r/n)^(n·t) — label Islamic vs riba-based per ISLAMIC-FINANCE (loan calc shows riba warning).
- **FIN-21 Transfers** between own accounts: excluded from income, expenses, savings rate, and P&L on both sides (link pair `transfer_pair_id`); reports prove neutrality by test.
