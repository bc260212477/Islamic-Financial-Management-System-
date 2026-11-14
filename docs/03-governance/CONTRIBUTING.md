# CONTRIBUTING.md
- Branch per phase (`feature/phase-N-short-name`) off `main`; PR per phase; never commit directly to `main`.
- Read order: `docs/03-governance/AGENTS.md` + `SOUL.md`, then the governing doc for your change.
- Code: PSR-12 (Laravel Pint), PHPDoc on calculator classes, every formula references its FIN-id. Money: DECIMAL/integer minor units only.
- Tests: PHPUnit for formulas/APIs; a PR that changes a formula without updating FINANCIAL-RULES.md + its test is rejected.
- Commits: imperative, scoped (`feat(finance): transfers FIN-19`). PR description includes the phase acceptance checklist with results.
- Docs: new documents go in the matching `docs/0X-…/` folder + a row in `docs/PROJECT-TREE.md`; decisions appended to DECISIONS.md (never edited).
- Security: SECURITY.md checklist on auth/money/upload/AI changes; no secrets in repo; demo data labelled FICTIONAL.
