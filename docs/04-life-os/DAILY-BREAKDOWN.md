# Life OS Expansion — D.A.I.L.Y. Breakdowns (2026-11-14)

Method: Define → Audit → Isolate → List (micro-steps <30 min) → Yield (ship slice, CI, next).
Stack note: Laravel **13** (not 11 — EOL, STACK-AUDIT), existing Breeze/Tailwind shell retained; Metrica *patterns* adopted (token discipline, animated charts via ApexCharts CDN on dashboard, consistent icons) without buying any template (DECISIONS D-016/D-017). Money OS v1.0 already shipped (Phases 2–15), so sequence resumes at Family.

## Module: Family OS (v1.1)
- **Define:** User manages dependents; a family expense also lands in personal cash flow.
- **Audit:** transactions/businesses exist; no family entities.
- **Isolate:** members CRUD + expense create/list (transactions link). Allowances/school-fee reports later.
- **List:** 1 migration (family_members, family_expenses, transactions.family_member_id) 2 models+tenant trait 3 controller+routes 4 Blade 5 linked-transaction hook 6 feature test (expense appears in cash-flow sum) 7 CI.
- **Yield:** test green → Habit OS.

## Module: Habit OS (v1.2)
- **Define:** Create habit, toggle done today, see streak + 30-day completion %.
- **Audit:** none. **Isolate:** habits + habit_logs toggle; heatmap = 30-day dots in Blade (no lib).
- **List:** migration, models, controller (store/toggle), Blade, streak calc in service, test, CI. **Yield → Task/Routine.**

## Module: Task + Routine OS (v1.3)
- **Define:** Tasks with status/priority/due (overdue flag), projects, weekly routine items linked to tasks/habits.
- **Audit:** none. **Isolate:** tasks CRUD + status move (Kanban columns in Blade), routines+items list. Pomodoro = simple 25-min timer link later slice.
- **List:** migrations (projects, tasks, routines, routine_items), models, controllers, Blade Kanban, overdue test, CI. **Yield → Growth.**

## Module: Growth OS + Elite Path (v1.6)
- **Define:** Journal, reading log, skills, assessments stored; Elite level (1 Aware → 5 Elite) computed from real checkpoints (logging days, habit %, emergency months, portfolio, business income, zakat record).
- **Audit:** health score FIN-19 exists. **Isolate:** CRUD-lite (create/list) + `ElitePath` calculator + dashboard ring data.
- **List:** migrations (journal_entries, reading_logs, skills, assessments, health_logs), models, controller, ElitePath service + unit test, dashboard widget, CI. **Yield → Decision OS.**

## Module: Decision OS upgrade (v1.7)
- **Define:** Assistant answers using money + habits + tasks + family aggregates, with citations; cross-pillar suggestion rule (e.g. food overspend + eating-out habit) only when both facts exist.
- **Audit:** deterministic grounded assistant exists (P12). **Isolate:** extend context + 2 cross-rules + tests. External LLM still owner-key gated.
- **List:** context builder, rules, tests (citation contains habits/tasks), CI. **Yield → report to owner.**

Rule enforced: if a slice fails CI twice, shrink the slice before adding more.
