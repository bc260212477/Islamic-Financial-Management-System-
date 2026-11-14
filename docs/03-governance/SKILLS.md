# SKILLS.md — Skill Library & Invocation Rules (Directive v4.0 §7)

## The Rule
No code without a skill declaration. Every work response begins with:

```markdown
## Skill Declaration
- **Primary skill:** [name]
- **Secondary skill:** [if applicable]
- **Why this skill:** [one sentence]
- **What I will NOT do without this skill:** [one sentence]

## D.A.I.L.Y. Breakdown
- **Define:** … **Audit:** … **Isolate:** … **List:** (5–10 micro-steps <30 min, each naming its skill) **Yield:** …
```

## Skill map (directive → repo)
| Task | Skill (directive) | Repo location |
|---|---|---|
| UI component | `ui-design-system` | `skills/ui-implementation/` + docs/01-architecture/DESIGN-SYSTEM.md |
| Animation | `motion-design` | docs/01-architecture/MOTION-SYSTEM.md |
| Financial formula | `financial-calculation` | `skills/financial-calculations/` + docs/02-finance/FINANCIAL-RULES.md |
| Islamic finance | `islamic-finance-compliance` | docs/02-finance/ISLAMIC-FINANCE.md |
| Database change | `database-design` | `skills/database-design/` + docs/01-architecture/DATABASE.md |
| Auth/security | `security-review` | `skills/security-review/` + docs/03-governance/SECURITY.md |
| Tests | `testing` | `skills/testing/` + docs/03-governance/TESTING.md |
| Market data | `market-analysis` | `skills/market-analysis/`, `skills/kpi-computation/` |
| Research | `financial-research` | `skills/financial-research/` |
| Docs | `technical-writing` | this repo's docs conventions |

External skill libraries (GitHub-Repos-, Claude/Hermes skills) are referenced by name when used; the repo skills above are the enforceable minimum. If a task spans skills, declare all of them.
