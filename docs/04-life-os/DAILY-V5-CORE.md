# D.A.I.L.Y. — v5.0 Founder's Simple Core (Barakah web SaaS)

## Skill Declaration
Primary: `product-requirements`, `financial-calculations` · Secondary: `ui-design-system`, `database-design`, `technical-writing`.
Will NOT: use the name "OS", fake live prices, or start other modules before this core is approved.

## D — Define
Done = in the live Barakah web app: (1) product renamed Barakah everywhere in UI; (2) Salary Allocation page where salary splits into % buckets that MUST total 100%, showing PKR per bucket + donut; (3) Investments carry platform + term + expected return % + payouts/year, with by-platform and by-term summaries; (4) transaction entry offers the Pakistani category tree, a family-member tag, and recurrence; (5) dashboard shows StockIntel-style KPI circles. All with existing 9/9 formula tests green.

## A — Audit
Exists: accounts/transactions/budgets/goals/businesses/holdings/family/habits/tasks + tools in apps/web (live on Pages + Vercel); holdings lack platform/term/payout fields; categories are free text; transactions lack member/recurrence; no allocation module. Supabase schema already has the tables for when auth wiring lands.

## I — Isolate
Only the five items above, in apps/web. Vehicles/Events/FBR/partnerships UI = later versions per v5 roadmap (data model already noted in BARAKAH-MASTER-v5.0.md).

## L — List (<30 min each)
1. Rebrand UI strings Barakah OS → Barakah (`ui-design-system`).
2. Seed + normalize: allocation buckets, holding platform/term/return/payouts defaults (`database-design`).
3. Salary Allocation view: % editor, 100% guard, amounts, SVG donut, actual-vs-planned note (`financial-calculations`).
4. Holdings view: platform/term/return/payouts fields + grouped summaries (`financial-calculations`).
5. Transaction form: category datalist (PK tree + income types), member select, recurrence select (`ui-design-system`).
6. Dashboard KPI circles: savings/expense/investment/emergency (`financial-calculations`).
7. Verify: node --check, 9/9 tests, preview server, deploy both hosts (`testing`).

## Y — Yield
This PR, deployed to Vercel + Pages, Build Report in chat. Then STOP for the founder's next increment ("I will tell more and more").
