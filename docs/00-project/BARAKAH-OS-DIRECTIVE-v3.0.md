# BARAKAH OS — Master Build Directive v3.0 (Governing Summary)

Source: Founder-provided "BARAKAH OS — MASTER BUILD DIRECTIVE v3.0" (14 Nov 2026), adopted 2026-11-14 (DECISIONS D-018). This file is the in-repo governing summary; the founder's full text remains the ultimate reference. Supersedes BARAKAH-PROJECT.md v1.0 and Master Prompt v2.0 for product scope.

## Identity
Barakah OS — "Live deliberately. Grow barakah." A life operating system for the practicing Muslim: money, family, habits, time, learning, business, health, legacy, community — unified, cross-fed, AI-read. Brand voice: warm, firm, intelligent; never preachy or guilt-tripping. Promise: 90 days → know every rupee, save ≥15% more, 3 permanent habits, 12 meaningful tasks, clear 5-year plan, feel in control.

## The 12 pillars
1 Money OS · 2 Business OS · 3 Family OS · 4 Habit OS · 5 Routine OS · 6 Task OS · 7 Learning OS · 8 Growth OS · 9 Health OS · 10 Legacy OS · 11 Community OS · 12 Decision OS (AI). Every feature must feed ≥2 others; a feature that makes no other feature smarter is cut.

## 100-feature map (names; detail in founder text Part 5/6)
1–10 Personal finance · 11–15 Cash flow · 16–22 Business · 23–26 Savings & goals · 27–33 Investments · 34–39 Market intelligence · 40–44 Islamic finance · 45–50 AI & tools · 51 Riba Detector · 52 Debt Snowball/Avalanche · 53 Subscription Audit · 54 Tax Estimator (FBR) · 55 Sadaqah Budget · 56 Qard Hasan · 57 Joint/Family Pools · 58 Zakat Payment Planner · 59 Halal DRIP · 60 Rebalancing · 61 Auto Shariah Screener · 62 Real Estate ROI · 63 Gold Savings Plan · 64 Sukuk Maturity Calendar · 65 Dividend Calendar · 66 Inflation Compounder · 67 Salah+Qaza · 68 Hifz · 69 Fasting · 70 Sleep Score · 71 Screen Time · 72 Focus Analytics · 73 Weekly Review (Friday) · 74 Monthly Retrospective · 75 Skill Tree · 76 Certifications · 77 Reading/Retention · 78 Course Tracker · 79 Mentorship · 80 Networking CRM · 81 Personal Brand · 82 Language Streak · 83 Family Tree · 84 Wasiyyah (≤⅓) · 85 Marriage/Mahr Goal · 86 Child Education Fund · 87 Parent Care Log · 88 Yateem Sponsorship · 89 Biometrics · 90 Medication · 91 Mental Health Check-ins · 92 Fitness Goals · 93 Nutrition (halal) · 94 Doctor Appointments · 95 Scenario Simulator · 96 Life Event Planner · 97 FIRE (Islamic) · 98 AI Goal Coach (weekly) · 99 Predictive Cash Flow Alerts · 100 Legacy Dashboard.

## Binding rules (from directive)
- Money DECIMAL(19,4), never float; services own calculations (never controllers); every formula unit-tested (FINANCIAL-RULES.md).
- Data freshness labels on everything: LIVE / DELAYED / MANUAL / DEMO (DEMO = purple + banner). Never fake "live".
- AI: retrieve → compose → cite every number → verify → refuse if data missing. No trades, no fatwa.
- Design signatures: gold hairline on primary cards, serif numerals, warm cream + 3 glows; tokens in docs/01-architecture/UI-DESIGN.md; no pure white/black; KPI circles real stroke-dasharray percentages; charts labelled with as-of.
- Security: tenant isolation tested every PR; audit log on financial writes; secrets in .env only.
- Delivery: D.A.I.L.Y. before code (docs/04-life-os/DAILY-BREAKDOWN.md), one version at a time, Build Report (Part 12.4 format), screenshots refreshed per UI change, honest reporting — never claim untested work.

## Version roadmap (directive Part 10, re-baselined to actual state in ROADMAP.md)
v0.1 Foundation → v0.2 Money Core → v0.3 Cash Flow → v0.4 Family → v0.5 Habits → v0.6 Tasks & Routine → v0.7 Business → v0.8 Investments → v0.9 Islamic Finance → v1.0 Launch MVP → v1.1 PSX Intelligence → v1.2 Learning & Growth → v1.3 Health → v1.4 AI Assistant → v1.5 Advanced Money (51–58) → v1.6 Advanced Investments (59–66) → v1.7 Legacy & Community (79–88, 100) → v2.0 The OS (95–99 + polish).

## Missing inputs (flagged, not invented)
- `design-reference.html` (Appendix D) is **not in this repo** — visual verification therefore uses the shipped prototype (`apps/static-v1`, the approved design reference per D-013) + CI screenshots in `docs/screenshots/`. Founder may drop the HTML file into `docs/04-life-os/` to make it the pixel target.
- Licensed PSX feed, LLM API key, production host: owner-provided (DATA-SOURCES.md, DEPLOYMENT.md).
