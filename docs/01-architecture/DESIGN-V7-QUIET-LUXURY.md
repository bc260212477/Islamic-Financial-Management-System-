# Design v7 — Quiet Luxury (Founder-locked, 2026-11-14)

> Founder instruction (verbatim intent): the product is **Financial Management System**.
> Do not rename it from any pasted prompt — names require founder approval first.
> Design instructions in prompts may be followed (founder-approved rule, 2026-11-14).
> This spec supersedes Design v6 (warm paper / serif) for `apps/web`.

## 1. Palette (only these)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#F8F9FA` | Page background (soft off-white / pearl) |
| `--card` | `#FFFFFF` / `rgba(255,255,255,.78)` glass | Cards, panels |
| `--border` | `#E5E7EB` (1px) | Card borders, dividers |
| `--ink` | `#111827` | Primary text, PKR numbers |
| `--muted` | `#64748B` | Labels, subtitles |
| `--emerald` | `#065F46` | Primary buttons, positive, Shariah badges |
| `--emerald-bright` | `#059669` | Positive trend badges / chart income line only |
| `--gold` | `#D97706` | Zakat, warnings, highlights |
| `--red` | `#DC2626` (soft use) | Expenses, deficits, delete |

No neon, no dark gradients, no rainbow charts. Charts use emerald / gold / soft-red only.

## 2. Glass & elevation
- Cards: `background:rgba(255,255,255,.78); backdrop-filter:blur(16px); border:1px solid rgba(229,231,235,.8); box-shadow:0 8px 32px rgba(15,23,42,.04); border-radius:16px`
- Secondary buttons: frosted glass `rgba(255,255,255,.6)`, blur 10px, `1px solid rgba(203,213,225,.8)`, ink text; hover → solid white + elevation.
- Primary buttons: solid `#065F46`, white text.
- Sidebar: frosted white, emerald pill for active item.

## 3. Layout
- Left sidebar + main canvas. Strict **12-column grid**, **gap: 24px** everywhere (`--gap:24px`).
- Dashboard: KPI row = 4 × span-3 · Charts row = span-8 (65%) + span-4 (35%) · Table = span-12.
- Card padding ≥ 20–24px. Nothing cramped.

## 4. Typography
- Plus Jakarta Sans / Inter, sans-serif only (no serif voice).
- Numbers: large, bold, `font-variant-numeric: tabular-nums`.

## 5. Screens built to this spec (this version)
- **A. Main Overview Dashboard** — greeting header + month/year filter + glass “+ Quick Add”; 4 KPI cards (Net Worth, Monthly Income, Monthly Expenses, Zakat Due This Year) each with a small derived % badge; smooth Income-vs-Expenses area chart (65%) + Asset Allocation donut (35%: PSX Stocks / Meezan Funds / Gold / Real Estate etc. from holdings); Recent Activity table (last 5: Date, Category, Family Member, Source/Account, Amount, Edit/Delete — every row editable).
- **B. Investments & Halal Wealth** — 3 summary cards (Total Invested, Expected Monthly Profit from Mahana/Meezan-style funds, Upcoming Quarterly Dividends from Ktrade PSX stocks — all labelled estimates); portfolio grouped by platform (Ktrade, Meezan Funds with Short/Medium/Long-term tags, Faysal Funds, Physical Assets: Gold/Land/Business); green “Shariah Compliant” pill **only where the user has declared/screened it** (never auto-certified), “Edit / Update Value” on every card.
- **C. Family & Dependents** — horizontal member cards (initials, monthly allowance, spent this month) that filter the expense table below (School/College Fees, Bicycle, Laptop, Medical, Sadaqah…), “+ Add Expense for Member”, full edit/delete.

## 6. Honesty rules carried over
- Percentage badges are **derived ratios** (savings rate, expense ratio, invested share, nisab status) — never invented trends.
- Expected profit/dividends are user-estimate maths, labelled `MANUAL`/estimate, never guaranteed or live.
- Demo data stays labelled DEMO.
