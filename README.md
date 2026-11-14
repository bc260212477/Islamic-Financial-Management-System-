# Barakah Finance

Personal Islamic finance dashboard, currently implemented through **v1.0**.

## Platform planning (Arena build contract)

The full technical plan for evolving Barakah into the Complete Financial Intelligence Platform is in **[TECHNICAL-PLAN.md](TECHNICAL-PLAN.md)**, with the binding companion files: [SOUL.md](SOUL.md) · [AGENTS.md](AGENTS.md) · [PROJECT.md](PROJECT.md) · [PRD.md](PRD.md) · [ARCHITECTURE.md](ARCHITECTURE.md) · [DATABASE.md](DATABASE.md) · [FINANCIAL-RULES.md](FINANCIAL-RULES.md) · [ISLAMIC-FINANCE.md](ISLAMIC-FINANCE.md) · [DATA-SOURCES.md](DATA-SOURCES.md) · [SECURITY.md](SECURITY.md) · [TESTING.md](TESTING.md) · [ROADMAP.md](ROADMAP.md) · [DECISIONS.md](DECISIONS.md) · [skills/](skills/)

Build order is **[ROADMAP.md](ROADMAP.md)** — one phase at a time, owner-tested. Current status: Phase 0 (planning) complete; **Phase 1 (static v1.1 charts) built — awaiting owner test.**

## v1.1 test checklist (Phase 1)

- [ ] "Monthly Spend" bar chart (last 6 months) renders below the stat cards; Jan bar is gold, earlier bars soft white; totals shown (Jan $3,055)
- [ ] "Where it went" donut centre = your current expense total; legend lists top 5 categories with amounts + %
- [ ] Add an expense → donut + legend + centre total update immediately (bar chart is the fixed 6-month trend per spec)
- [ ] Charts stack to one column on mobile; no console errors

## View it on GitHub Pages

**Live URL (once Pages is enabled):** <https://bc260212477.github.io/Islamic-Financial-Management-System-/>

The repo is public and the automation token has admin on the repo, but only
`pages=read` on the Pages API — so GitHub will not let automation *create*
the Pages site (`Resource not accessible by integration`). The owner must
flip one setting, once:

1. Open <https://github.com/bc260212477/Islamic-Financial-Management-System-/settings/pages>
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Then run/approve the **Deploy Barakah Finance** workflow (Actions tab), or
   push to `main` — the workflow at `.github/workflows/deploy-pages.yml` deploys it.

Future pushes to `main` will redeploy the site automatically.

## Local preview

From the repository root, run:

```bash
python3 -m http.server 4173
```

Then open <http://127.0.0.1:4173/>.

## v1.0 test checklist (test before approving v1.1)

- [ ] Header shows "Assalamu alaikum", "Your wealth, in balance.", month · Full overview, Export + "+ Add expense"
- [ ] Spent this month = **$3,055** ("$145 left of $3,200"), Sadaqah given = **$150** (green); Income/Portfolio show $0 until v1.3/v1.2
- [ ] Recent activity lists the 9 seed expenses, newest first, with category dots
- [ ] "+ Add expense" → add one → it appears in Recent activity and Spent/Sadaqah totals update
- [ ] Refresh the page — the added expense is still there (localStorage)
- [ ] Add expenses past $3,200 total — the note turns red and reads "$X over $3,200"
- [ ] Placeholder cards are shown for v1.1–v1.6 features (not yet built, per `BARAKAH-PROJECT.md`)
- [ ] No console errors; layout works down to 375px wide

**Do not start v1.1 until this checklist passes.** Report any defects as a clear list.