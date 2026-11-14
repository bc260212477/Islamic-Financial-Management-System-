# BARAKAH FINANCE — Master Project File
# Personal Islamic Finance Dashboard

**Version:** 1.0 of this document
**Last updated:** 2026-01-15
**Owner:** (your name)
**Purpose:** A single-user, private, browser-based Islamic finance dashboard.

---

## PART 1 — HOW TO USE THIS DOCUMENT

Read this part first. Everything else is for the developer.

### 1.1 What this document is
This is the **complete project brief**. It contains:
- The full design vision (Part 2)
- The full feature list (Part 3)
- The technical stack (Part 4)
- A **version-by-version build plan** (Part 5)
- **Copy-paste prompts** for each version (Part 6)
- How to test and share results (Part 7)

### 1.2 How to hand this to a developer
1. Send them this whole file.
2. Say: "Read Part 1, Part 2, Part 3, and Part 4 first. Then build Part 6, Prompt v1.0 only. Do not build v1.1 yet."
3. When v1.0 is done, send them the v1.1 prompt. Continue one version at a time.

### 1.3 The feedback loop
After each version is built:
1. Open the live link the developer gives you.
2. Test every feature listed for that version.
3. Note what is broken, missing, or ugly.
4. Come back to the **project owner assistant** (the one who wrote this file) and describe the problems in words — or paste the specific code file they want fixed.
5. The assistant updates this document and writes the next prompt.

**Do not move to the next version until the current one is tested and approved.**

---

## PART 2 — DESIGN VISION (READ EVERY WORD)

The user wants a **luxurious, high-end, "3D white"** aesthetic. Think a premium iOS banking app, but on the web. Calm. Clean. Expensive. Peaceful.

### 2.1 Color palette (use these exact hex values)

| Token | Hex | Usage |
|---|---|---|
| `--bg-base` | `#F7F4EC` | Page background (warm off-white) |
| `--bg-glow-1` | `#FBF8EF` | Top-left radial glow |
| `--bg-glow-2` | `#F4F0E4` | Top-right radial glow |
| `--bg-glow-3` | `#EFE9D8` | Bottom radial glow |
| `--ink` | `#1B1A17` | Primary text (warm near-black) |
| `--ink-soft` | `#6B665C` | Secondary text |
| `--ink-muted` | `#8C8676` | Labels, tertiary text |
| `--gold` | `#C9A227` | Primary accent |
| `--gold-light` | `#E5C766` | Gold gradient top |
| `--green` | `#2F7A5E` | Positive values, sadaqah |
| `--red` | `#B4543F` | Negative values, over-budget |

**Never use pure white `#FFFFFF` or pure black `#000000`.** Always warm off-whites and near-blacks.

### 2.2 Typography
- **Headings & large numbers:** `Cormorant Garamond` (serif, 400/600/700).
- **Body & UI:** `Inter` (sans, 400/500/600).
- Both from Google Fonts.

### 2.3 The "3D white glass card" — the most important style rule

Every card must use ALL of these CSS properties together:

```css
background: linear-gradient(145deg, rgba(255,255,255,.92) 0%, rgba(255,255,255,.62) 100%);
border: 1px solid rgba(255,255,255,.9);
border-radius: 22px;
box-shadow:
  0 1px 0 rgba(255,255,255,.95) inset,
  0 -1px 0 rgba(200,190,160,.14) inset,
  0 18px 40px -18px rgba(120,110,80,.28),
  0 4px 12px -6px rgba(120,110,80,.14);
backdrop-filter: blur(14px) saturate(140%);
```

This creates the soft, floating, 3D white card effect. Do not deviate.

2.4 Buttons (user asked for transparent buttons)

Three variants only:

```css
/* Default (transparent glass) */
.btn {
  background: rgba(255,255,255,.55);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,.9);
  border-radius: 12px;
  padding: 9px 16px;
  font: 500 13px 'Inter';
  color: var(--ink);
  cursor: pointer;
  transition: all .18s ease;
}
.btn:hover { background: rgba(255,255,255,.85); transform: translateY(-1px); }

/* Gold (primary action) */
.btn-gold {
  background: linear-gradient(145deg, #E5C766, #C9A227);
  color: #2A2410;
  box-shadow: 0 6px 16px -6px rgba(201,162,39,.5);
}

/* Ghost (fully transparent) */
.btn-ghost {
  background: transparent;
  border: 1px solid rgba(140,134,118,.3);
}
```

2.5 Page background (3 radial glows, no flat color)

```css
body {
  background:
    radial-gradient(1200px 800px at 10% -10%, #FBF8EF 0%, transparent 60%),
    radial-gradient(1000px 700px at 100% 0%, #F4F0E4 0%, transparent 55%),
    radial-gradient(900px 900px at 50% 110%, #EFE9D8 0%, transparent 60%),
    #F7F4EC;
  min-height: 100vh;
  font-family: 'Inter', system-ui, sans-serif;
  color: #1B1A17;
}
```

2.6 Layout

· Max width: 1240px centered.
· Padding: 32px 24px desktop → 20px 14px mobile.
· Grid gap: 18px.
· Stats row: 4 cols desktop → 2 tablet → 1 mobile.
· Two-col panels: 1.1fr / 1fr desktop → 1 col below 1024px.

---

PART 3 — FULL FEATURE LIST

3.1 Header

· Greeting "Assalamu alaikum"
· Title: "Your wealth, in balance."
· Subtitle: current month/year + " · Full overview"
· Buttons: "Export" (ghost), "+ Add expense" (gold)

3.2 Stat cards (4)

1. Spent this month — sum of expenses. Note: "$X left of $3,200". Red if over.
2. Income this month — sum of income. Note: "Net cash: $X".
3. Portfolio value — sum of investment values. Delta pill (return %). Note: "$X invested".
4. Sadaqah given — sum of sadaqah category. Green.

3.3 Monthly Spend Chart

SVG bar chart, last 6 months. Current month = gold gradient, past = soft white. Dashed gridlines. Rounded bar tops. No chart library.

3.4 Category Donut

SVG donut, expenses grouped by category. Center shows total spend. Legend: top 5 categories, color dot + label + amount.

3.5 Cash Flow panel

· List of income entries (job, business, partnership, factory, freelance, rental, investment, other).
· Form: source name, type dropdown, amount.
· Green +$X on right of each row.
· Header: total inflow.

3.6 Pakistan Islamic Banks panel

Static informational list:

· Meezan Bank — Full-fledged Islamic — Chair: Justice (Retd.) Muhammad Taqi Usmani
· Faysal Bank — Converted (2023) — Mufti Mohib ul Haq
· BankIslami Pakistan — Full-fledged — Mufti Javed Ahmad
· Dubai Islamic Bank Pakistan — Full-fledged — Dr. Hussein Hamed Hassan
· MCB Islamic Bank — Full-fledged — Mufti Munib-Ur-Rehman
· Al Baraka Bank (Pakistan) — Full-fledged — Shaikh Esam Mohammad Ishaq
· Bank Alfalah Islamic — Islamic window — Dr. Mufti Khalil Ahmad Aazami
· UBL Ameen — Islamic window — Dr. Mufti Muhammad Zubair Usmani
· HBL Islamic — Islamic window — Dr. Mufti Muhammad Zubair Usmani

Footnote: "Pakistani banks do not expose public transaction APIs for personal dashboards. Use CSV export from your bank app or manual entry."

3.7 Investments table

Columns: Holding (name + type), Invested, Value, Return %, Screening.
Screening badges: halal green "Halal ✓" · review amber "Under review" · purify red "Purify dividends".
Return %: green if positive, red if negative.

3.8 Shariah Screener

· Two sliders: non-compliant debt / total assets (threshold ≤33%), non-compliant investments / total assets (threshold ≤30%).
· Live pass/fail.
· Star rating: 5 if well under, 4 if both pass, 3 if one fails, 1 if both fail.
· Footnote: "SECP revised: debt ratio from 37% → 33%; investments ratio recommended 33% → 30%. KMI-30 tracks Shariah-compliant PSX equities."

3.9 Zakat calculator

Inputs: Cash & bank, Gold/silver value, Business assets, Debts due now, Gold price/gram (default 78).
Calculates: net = cash + gold + business − liabilities, nisab = 85 × goldPrice, zakat = net >= nisab ? net × 0.025 : 0.
Progress bar (net / nisab). Gold box shows "Zakat payable".

3.10 Recent Activity

Scrollable expense list (newest first). Category color dot, merchant, category + date, amount.

3.11 CSV Tools

Two sections: Expenses CSV and Investments CSV.
Each: hidden file input, "Upload CSV" button, "Export JSON" button.
Uses PapaParse.

3.12 Add Expense modal

Fields: Merchant, Amount, Category. Cancel / Add.

---

PART 4 — TECHNICAL STACK

Layer Choice
Framework React 18 (UMD via CDN)
JSX compiler Babel Standalone (in-browser)
CSV PapaParse 5.4 (CDN)
Charts Pure SVG (NO library)
Styling Plain CSS (styles.css)
Fonts Cormorant Garamond + Inter
Storage localStorage (expenses only)
Hosting Netlify Drop or Vercel Drop (free)

Do not use: Tailwind, MUI, shadcn, Chart.js, Recharts, or any UI library. The whole point is a bespoke luxury look.

CDN tags (paste at end of <body> in index.html)

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>
```

Fonts (in <head>)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

File structure

```
barakah-finance/
├── index.html
├── styles.css
└── app.js
```

Data models

```ts
interface Expense {
  id: string;            // crypto.randomUUID()
  date: string;          // ISO
  merchant: string;
  category: 'food' | 'housing' | 'transport' | 'utilities'
          | 'family' | 'sadaqah' | 'health' | 'shopping';
  amount: number;
}

interface Income {
  id: string;
  date: string;
  source: string;
  type: 'job' | 'business' | 'partnership' | 'factory'
      | 'freelance' | 'rental' | 'investment' | 'other';
  amount: number;
}

interface Investment {
  id: string;
  name: string;
  type: 'Equity' | 'Sukuk' | 'Gold' | 'REIT' | 'Fund';
  invested: number;
  value: number;
  income: number;
  screen: 'halal' | 'review' | 'purify';
}
```

CSV import formats

Expenses:

```
date,merchant,category,amount
2026-01-02,Whole Foods,food,214
```

Investments:

```
name,type,invested,value,income,screen
Global Islamic Equity ETF,Equity,12000,13850,240,halal
```

---

PART 5 — VERSION ROADMAP

Build in this exact order. Do not skip ahead. Each version must be tested before starting the next.

Version Title What's added
v1.0 Foundation HTML/CSS/React setup, header, 4 stat cards, recent activity, add-expense modal, localStorage
v1.1 Charts Monthly spend bar chart, category donut, category grouping
v1.2 Investments Investments table, add investment modal, portfolio stat
v1.3 Cash Flow Income list, add income form, net cash calculation
v1.4 Zakat & Sadaqah Zakat calculator, sadaqah stat, sadaqah category highlight
v1.5 Shariah & Banks Shariah screener, Pakistan Islamic banks panel
v1.6 Data Tools CSV import (expenses + investments), JSON export
v2.0 Polish Responsive refinement, soft animations, optional dark mode

---

PART 6 — COPY-PASTE PROMPTS (ONE PER VERSION)

Copy each block exactly and send to the developer/AI. Do NOT mix versions.

---

=== PROMPT v1.0 — START ===

You are a senior React developer. Build v1.0 of a personal Islamic finance dashboard called "Barakah Finance".

Context: Read the full spec I will give you separately (BARAKAH-PROJECT.md). Build ONLY what v1.0 requires. Do not add v1.1 features.

Deliverable: 3 files — index.html, styles.css, app.js.

Stack:

· React 18 (UMD via unpkg)
· Babel Standalone (in-browser)
· Plain CSS (no Tailwind, no libraries)
· Google Fonts: Cormorant Garamond + Inter
· No chart libraries

Build for v1.0:

1. index.html — shell with fonts, React, Babel scripts.
2. styles.css — full design system from Part 2 of the spec (colors, glass card, buttons, typography, background, layout, responsive).
3. app.js — these components:
   · money(n) — USD currency formatter
   · CATEGORIES — 8 categories (food, housing, transport, utilities, family, sadaqah, health, shopping) with id/label/color
   · SEED_EXPENSES — 9 sample expense entries for this month
   · GlassCard, Btn, Badge — UI primitives
   · StatCard — big number card
   · Transactions — scrollable list
   · AddExpense — modal form
   · App — root component

Features required for v1.0:

· Header: greeting + title + subtitle + "Export" (ghost) + "+ Add expense" (gold) buttons
· 4 stat cards: Spent this month (with "$X left of $3,200" note, red if over), Income this month, Portfolio value, Sadaqah given
· Recent activity list (from seed expenses)
· "+ Add expense" opens modal → adding pushes to expenses list → appears in Recent Activity → updates totals
· Expenses saved to localStorage on every change, loaded on mount (fallback to seed)
· Empty sections for the other features (charts, investments, zakat) — placeholder cards that say "Coming in v1.1 / v1.2" etc. This keeps the layout complete without implementing them.

Do not build yet: charts, investments, cash flow, zakat, shariah screener, banks, CSV.

Success criteria:

· Opens in browser with no console errors
· 4 stat cards render with correct totals from seed data
· Adding an expense updates the list and totals
· Glass cards look luxurious (soft shadow, gold accent, warm off-white)
· Responsive down to 375px

Return all 3 files complete.

=== PROMPT v1.0 — END ===

---

=== PROMPT v1.1 — START ===

You are continuing the Barakah Finance dashboard. v1.0 is done. Add v1.1: Charts.

Keep everything from v1.0. Add:

1. Monthly Spend bar chart (pure SVG, no library):
   · Last 6 months, hardcoded trend data: [{month:'Aug',spend:3120},{month:'Sep',spend:2870},{month:'Oct',spend:3410},{month:'Nov',spend:2980},{month:'Dec',spend:3620},{month:'Jan',spend:3055}]
   · Current (last) bar uses gold gradient #E5C766 → #C9A227. Previous bars use soft white gradient #FFFFFF → #EDEAE2.
   · Dashed gridlines, rounded bar tops (rx = barWidth / 2).
   · Wrapped in a GlassCard with title "Monthly Spend" and subtitle "Last 6 months".
2. Category Donut (pure SVG):
   · Groups expenses by category, sums amounts, sorts descending.
   · Renders donut with stroke-dasharray segments using each category's color.
   · Center: total spend this month (bold serif).
   · Legend to the right: top 5 categories, colored dot + label + amount.
   · Wrapped in a GlassCard titled "Where it went".

Layout: place these two panels side by side in a 2-column grid below the stat cards (1.1fr / 1fr desktop, 1 column below 1024px).

Success criteria:

· Both charts render as SVG
· Numbers match the seed expenses total
· Colors match category palette
· No chart library imported

=== PROMPT v1.1 — END ===

---

=== PROMPT v1.2 — START ===

Continue Barakah Finance. v1.0 and v1.1 are done. Add v1.2: Investments.

Add:

1. Investments table (GlassCard, title "Investments"):
   · Columns: Holding (name + type in small grey under it), Invested, Value, Return %, Screening.
   · Return % = (value - invested) / invested × 100, formatted with + or -, green if positive, red if negative.
   · Screening badge: halal → green "Halal ✓", review → amber "Under review", purify → red "Purify dividends".
   · Seed data:
     · Global Islamic Equity ETF, Equity, 12000, 13850, 240, halal
     · Sukuk Fund — Short Term, Sukuk, 8000, 8320, 310, halal
     · Gold (50g), Gold, 3400, 3900, 0, halal
     · Tech Growth Fund, Equity, 5000, 5350, 60, review
     · REIT — Commercial, REIT, 6000, 5580, 280, purify
   · "+ Add" button in header opens a modal with fields: name, type (dropdown), invested, value, income, screen (dropdown). On submit, adds to list.
2. Update the Portfolio stat card — value is now the live sum of investment.value. Note shows total invested. Delta pill shows average return %.

Success criteria:

· Table renders all seed rows with correct colors
· Adding an investment updates the portfolio stat card
· Modal opens and closes cleanly

=== PROMPT v1.2 — END ===

---

=== PROMPT v1.3 — START ===

Continue Barakah Finance. Add v1.3: Cash Flow.

Add:

1. Cash Flow panel (GlassCard, title "Cash Flow"):
   · Inline form: source text input, type dropdown (job, business, partnership, factory, freelance, rental, investment, other), amount number input, "+ Add inflow" gold button.
   · List below: green dot, source name, type + date, green +$X on right.
   · Header subtitle: "Inflows this month · $X" (total).
2. Update the Income stat card — value is now the live sum of income entries. Note shows "Net cash: $X" (income − expenses).
3. Seed income data:
   · Salary — Software Engineer, job, 4800
   · Freelance — Web Project, freelance, 1200
   · Dividend — Islamic ETF, investment, 240
   · Rental — Shop Unit, rental, 650
4. Save incomes to localStorage like expenses.

Success criteria:

· Adding an income updates the list and the Income stat card
· Net cash shows correctly (positive or negative)
· Persists across page refresh

=== PROMPT v1.3 — END ===

---

=== PROMPT v1.4 — START ===

Continue Barakah Finance. Add v1.4: Zakat & Sadaqah.

Add:

1. Zakat calculator (GlassCard, title "Zakat", subtitle "2.5% on wealth held one lunar year"):
   · 5 number inputs in 2-column grid:
     · Cash & bank (default 18500)
     · Gold/silver value (default 4200)
     · Business assets (default 0)
     · Debts due now (default 2100)
     · Gold price / gram (default 78)
   · Live calculation:
     · netWealth = cash + gold + business − liabilities
     · nisab = 85 × goldPrice
     · eligible = netWealth >= nisab
     · zakat = eligible ? netWealth × 0.025 : 0
   · Progress bar showing netWealth / nisab (capped at 100%).
   · Two rows: "Net wealth: $X" and "Nisab (85g gold): $X".
   · Highlighted gold box at bottom: "Zakat payable: $X".
   · Top-right badge: "Due" (gold) or "Below nisab" (muted).
2. Update Sadaqah stat card — already correct from v1.0 (sums sadaqah category). Just confirm it stays green.

Success criteria:

· Slider inputs update numbers live
· If netWealth < nisab, Zakat is $0 and badge says "Below nisab"
· If netWealth >= nisab, Zakat is 2.5% of netWealth
· Progress bar reflects correct ratio

=== PROMPT v1.4 — END ===

---

=== PROMPT v1.5 — START ===

Continue Barakah Finance. Add v1.5: Shariah Screener + Banks.

Add:

1. Shariah Screener (GlassCard, title "Shariah Screener", subtitle "PSX KMI All Share criteria"):
   · Range slider 1: "Non-compliant debt / total assets" (0–50, default 28). Threshold ≤33% = pass.
   · Range slider 2: "Non-compliant investments / total assets" (0–50, default 24). Threshold ≤30% = pass.
   · Each slider shows live value and ✓ or ✗ with the threshold note.
   · Star rating below: 5 stars if both well under (debt<20 && inv<15), 4 if both pass, 3 if one fails, 1 if both fail.
   · Badge top-right: "Compliant" (green) or "Review" (amber).
   · Footnote: "SECP revised: debt ratio from 37% → 33%; investments ratio recommended 33% → 30%. KMI-30 tracks Shariah-compliant PSX equities."
2. Pakistan Islamic Banks panel (GlassCard, title "Pakistan Islamic Banks", subtitle "Shariah-compliant institutions"):
   · Grid of mini cards (each with subtle white background, rounded 14px):
     · Name (bold)
     · Type (small gold uppercase: "Full-fledged Islamic" / "Islamic window" / "Converted (2023)")
     · "Shariah Chair: [name]"
     · One-line note
   · Banks (use this exact list):
     · Meezan Bank — Full-fledged Islamic — Justice (Retd.) Muhammad Taqi Usmani — Pakistan's first & largest Islamic bank
     · Faysal Bank — Converted (2023) — Mufti Mohib ul Haq — Second-largest full-fledged Islamic bank
     · BankIslami Pakistan — Full-fledged Islamic — Mufti Javed Ahmad — Dedicated Islamic retail & corporate
     · Dubai Islamic Bank Pakistan — Full-fledged Islamic — Dr. Hussein Hamed Hassan — Subsidiary of DIB UAE
     · MCB Islamic Bank — Full-fledged Islamic — Mufti Munib-Ur-Rehman — Islamic banking arm of MCB
     · Al Baraka Bank (Pakistan) — Full-fledged Islamic — Shaikh Esam Mohammad Ishaq — Part of Al Baraka Group, Bahrain
     · Bank Alfalah Islamic — Islamic window — Dr. Mufti Khalil Ahmad Aazami — Islamic window of Bank Alfalah
     · UBL Ameen — Islamic window — Dr. Mufti Muhammad Zubair Usmani — UBL's dedicated Islamic banking arm
     · HBL Islamic — Islamic window — Dr. Mufti Muhammad Zubair Usmani — HBL's dedicated Islamic banking arm

Footnote: "Pakistani banks do not expose public transaction APIs for personal dashboards. Use CSV export from your bank app or manual entry."

Success criteria:

· Both sections render with the specified content
· Rating and compliancy conditions are live
· Cards are styled with the existing luxury theme

=== PROMPT v1.5 — END ===

---

=== PROMPT v1.6 — START ===

Continue Barakah Finance. Add v1.6: CSV Tools.

Add:

1. CSV Tools section with two panels: "Expenses CSV" and "Investments CSV".
2. Each panel includes:
   · hidden file input
   · "Upload CSV" button
   · "Export JSON" button
3. Use PapaParse for CSV parsing and generation.
4. Expenses CSV format:
   ```csv
   date,merchant,category,amount
   2026-01-02,Whole Foods,food,214
   ```
5. Investments CSV format:
   ```csv
   name,type,invested,value,income,screen
   Global Islamic Equity ETF,Equity,12000,13850,240,halal
   ```
6. On upload, parse and append valid rows to the existing state.
7. Export button downloads JSON of current data.

Success criteria:

· Valid CSV rows import correctly
· Invalid rows are ignored safely
· JSON export works in browser

=== PROMPT v1.6 — END ===

---

=== PROMPT v2.0 — START ===

Finalize Barakah Finance with v2.0 polish.

Keep everything from previous versions. Add:

1. Mobile-first responsive refinement.
2. Soft animations on hover / panels / cards.
3. Optional dark mode toggle.
4. Final tuning for spacing, shadows, typography, and readability.

Success criteria:

· The dashboard feels premium and smooth on desktop and mobile.
· Dark mode is optional and consistent with the luxury aesthetic.

=== PROMPT v2.0 — END ===

---

## PART 7 — HOW TO TEST AND SHARE RESULTS

After each version is built:

1. Open the dev link in a browser.
2. Check the features requested in that version only.
3. Take screenshots or short screen recordings if necessary.
4. Report any defects as a clear list.
5. Do not move to the next version before the current one is approved.

---

## FINAL NOTE FOR THE DEVELOPER

Build in versions. Do not jump ahead. Keep the design warm, premium, glassy, and minimal. Every UI should feel like a luxury Muslim-friendly personal finance dashboard: calm, grounded, trustworthy, and refined.
