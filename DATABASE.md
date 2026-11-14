# DATABASE.md — Data Models and Relationships

Rules: PostgreSQL; `NUMERIC(19,4)` money + `currency CHAR(3) NOT NULL DEFAULT 'PKR'`; timestamps `timestamptz`; UUID PKs; every user-owned table: `user_id UUID NOT NULL REFERENCES users`, index on `(user_id, date)` where dated; soft delete `deleted_at`; Alembic migrations only. Skills: skills/database-design/SKILL.md.

## Tables
- **users**: id, email unique, password_hash (argon2id), display_name, base_currency, created_at.
- **accounts**: id, user_id, name, kind (bank/cash/wallet/broker), currency, opening_balance NUMERIC, opened_on.
- **categories**: id, user_id nullable (system seeds), kind (income/expense), name, color, icon.
- **businesses**: id, user_id, name, branch, kind, started_on, is_active.
- **transactions**: id, user_id, account_id, business_id NULL (NULL=personal), category_id, direction (in/out/transfer), type (job/business/partnership/factory/freelance/rental/investment/other/expense/transfer), counterparty (merchant/source), amount NUMERIC>0, currency, date, note, import_batch_id NULL. Check: transfer requires both accounts (use `transfer_account_id`).
- **instruments**: id, symbol, name, kind (Equity/Sukuk/Gold/REIT/Fund/Stock), sector_id, is_shariah_listed, currency.
- **sectors**: id, index-relevant name (e.g. Oil & Gas Exploration), code.
- **indices**: id, code (KSE100/KMI30/KMIALL), name.
- **index_constituents**: index_id, instrument_id, weight_pct NUMERIC(7,4), as_of date. PK(index_id, instrument_id, as_of).
- **prices_eod**: instrument_id, date, open, high, low, close, volume, PK(instrument_id, date). Index OHLC in **index_prices_eod** (index_id, date, open/high/low/close, points_change, pct_change, volume, fytd_pct, cytd_pct).
- **companies/fundamentals**: instrument_id 1-1 company profile (sector, market_cap, shares_outstanding); fundamentals (instrument_id, period_end, total_assets, total_debt_noncompliant, investments_noncompliant, income_noncompliant, income_total, revenue, net_income, dividend_per_share) for screening/ratios.
- **holdings**: id, user_id, instrument_id, qty NUMERIC(19,6), avg_cost, invested (derived stored for reporting), account_id, opened_on. Current value derived from latest prices_eod × qty (manual override table **holding_manual_values** for gold/funds).
- **dividends**: id, holding_id, date, amount, purification_due (computed at insert via screening ratio).
- **watchlists / watchlist_items**: user lists of instruments.
- **goals**: id, user_id, name, target_amount, current_amount (derived from linked account/tagged transactions), target_date, monthly_saving.
- **zakat_profiles**: user_id, cash, gold_value, business_assets, debts_due, gold_price_per_gram, silver option, last_calculated_at (snapshots in **zakat_calculations**).
- **screenings**: id, user_id, instrument_id, debt_ratio, inv_ratio, income_ratio, debt_pass, inv_pass, stars, verdict, evaluated_at, inputs JSON (auditable).
- **facts (RAG)**: id, user_id nullable (market facts shared), source (table+id or document), text, embedding vector(1536), as_of. User facts always filtered by user_id in retrieval.
- **ai_conversations / ai_messages**: user_id, role, content, citations JSONB, retrieved_context JSONB, verifier_passed bool.
- **ingestion_runs**: id, source, dataset, started_at, finished_at, status, rows_in, rows_published, validation_report JSONB.
- **audit_log**: id, user_id, action, entity, entity_id, before/after JSONB, ip, created_at. Written on money mutations, imports, deletions.
- **fx_rates**: pair, date, rate, source. **settings**: user key/value (budget per category in **budgets**: user_id, category_id, period, limit_amount).

## Relationships (summary)
users 1-N accounts/transactions/businesses/holdings/goals/screenings/conversations. transactions N-1 accounts, N-0..1 businesses. holdings N-1 instruments; instruments N-1 sectors; indices M-N instruments via constituents (dated). prices/fundamentals keyed to instruments. dividends N-1 holdings.

## Retention
Soft-deleted rows purged after 30 days (job). Full export = JSON of all user rows (GET /me/export.json). Hard delete cascades all user rows + facts + conversations, written to audit_log before purge.
