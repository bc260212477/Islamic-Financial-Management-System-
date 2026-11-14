# PROJECT-TREE.md — Repository Organisation Map

Every file lives in its related folder. Root keeps only `README.md` (index) plus top-level folders. Last reorganised: 2026-11-14 (DECISIONS D-010).

```
Islamic-Financial-Management-System-/
├── README.md                        # Index: live link, test checklists, doc index
├── docs/                            # ALL documents / .md planning files
│   ├── PROJECT-TREE.md              # This map
│   ├── 00-project/                  # What we're building
│   │   ├── PROJECT.md               # Product vision, design tokens, glossary
│   │   ├── PRD.md                   # Functional requirements F1–F11
│   │   └── BARAKAH-PROJECT.md       # Original static v1.0–v2.0 spec (legacy, shipped)
│   ├── 01-architecture/             # How it's built
│   │   ├── TECHNICAL-PLAN.md        # Master 18-section technical specification
│   │   ├── ARCHITECTURE.md          # System boundaries + API catalogue
│   │   └── DATABASE.md              # Data models & relationships
│   ├── 02-finance/                  # Financial & Islamic rules + data
│   │   ├── FINANCIAL-RULES.md       # Formulas FIN-01…18 (binding)
│   │   ├── ISLAMIC-FINANCE.md       # Shariah screening, zakat, purification
│   │   └── DATA-SOURCES.md          # PSX EOD ingestion, scraping policy
│   └── 03-governance/               # How we work
│       ├── SOUL.md                  # Agent identity & principles
│       ├── AGENTS.md                # Arena build instructions (read order starts here + SOUL)
│       ├── ROADMAP.md               # Phases 0–8, copy-paste build prompts
│       ├── DECISIONS.md             # Decisions D-001… + risk register (append-only)
│       ├── SECURITY.md              # Auth, encryption, privacy, retention
│       └── TESTING.md               # Formula/ingestion/API/E2E test plans
├── skills/                          # Reusable Arena skills (one folder per skill)
│   ├── financial-calculations/SKILL.md
│   ├── financial-research/SKILL.md
│   ├── database-design/SKILL.md
│   ├── security-review/SKILL.md
│   ├── testing/SKILL.md
│   ├── ui-implementation/SKILL.md
│   └── market-analysis/SKILL.md
├── apps/
│   └── static-v1/                   # Shipped live demo (GitHub Pages publishes this folder)
│       ├── index.html
│       ├── styles.css
│       └── app.js
└── .github/
    └── workflows/
        └── deploy-pages.yml         # Deploys apps/static-v1 on push to main
```

## Rules
- New document → put it in the matching `docs/0X-…/` folder and add a row here.
- New platform code → `apps/web` / `apps/api` when Roadmap Phases 2–3 start (not before).
- New skill → `skills/<name>/SKILL.md`.
- Never put a loose `.md` (other than root `README.md`) or code file in the repository root.
