# Barakah Finance

Personal Islamic finance dashboard, currently implemented through **v1.0**.

## View it on GitHub Pages

Expected project URL:

<https://bc260212477.github.io/Islamic-Financial-Management-System-/>

GitHub Pages is not enabled yet because this repository is private and the current automation token does not have repository-admin permission. To publish it:

1. Open **Settings → Pages** in the repository.
2. Under **Build and deployment**, choose **GitHub Actions**.
3. Approve/run the **Deploy Barakah Finance** workflow if GitHub asks for approval.
4. Open the project URL above after the workflow completes.

The workflow is already committed at `.github/workflows/deploy-pages.yml`; future pushes to `main` will redeploy the site.

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