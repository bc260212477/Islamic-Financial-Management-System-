# DATA-SOURCES.md — Market Data, Ingestion, and Scraping Policy

## Principles
EOD/delayed data only at launch. Respect each source's terms of service and robots; identify the client; cache aggressively; never present data without `as_of` + source label. If a source's terms prohibit reuse, it is a cross-check only, not a stored feed.

## Sources (ranked)
1. **PSX (psx.com.pk)** — official EOD market data/files, index data (KSE-100, KMI-30, KMI All Share), Market Wrap figures, constituent lists. Primary.
2. **Sarmaaya / PakistanBourse** — fundamentals, ratios, history cross-checks (verify terms before storing; otherwise manual/fallback reference).
3. **Company announcements/financials (via PSX)** — fundamentals periods for screening (total assets, debt, investments, income split).
4. **Owner-entered / CSV** — holdings, manual gold price (default source labelled), FX (also: SBP published rate as labelled reference when ingested).
5. **Static reference** — Islamic banks list (ISLAMIC-FINANCE.md).

## Datasets & cadence
- Index + equity EOD (OHLCV, Δpts, Δ%, FYTD/CYTD where published): each trading day after close (PKT), cron + manual rerun.
- Constituents/weights: on PSX revision + weekly verify. Fundamentals: quarterly as published. Dividends: on announcement. FX: daily (labelled source).

## Pipeline & validation (blocking)
Stage → validate → publish (ARCHITECTURE.md). Validators: schema/types; OHLC sanity (low ≤ open/close ≤ high); %change recomputed vs published ±0.05pt; constituents weights sum 100 ±0.5; row-count vs previous day ±20% alert; duplicates rejected; missing symbols listed in `ingestion_runs.validation_report`. Any blocking failure: do **not** publish; serve last published with its date; open alert (GitHub issue/log). Partial symbol failures: publish market-level, mark symbols stale.

## Fallbacks & display
Stale data always shows its date ("EOD · 12 Nov 2026 · PSX"). Manual price override for holdings (gold, unlisted funds) is labelled "manual". No source → KPI shows "No data" (FIN-08).

## Scraping policy
Prefer published files/APIs over HTML scraping. If scraping is unavoidable: rate-limit (≥2s between requests), off-hours, single user-agent identifying Barakah, honour robots.txt, stop-and-report on 403/captcha (never bypass). Record every source + method in this file when added, with a DECISIONS.md entry.

## GitHub-Repos- catalogue
`bc260212477/GitHub-Repos-` (public, "For Ai research"; category CSVs + `agent_architect.py`; inspected 2026-11-14) is a **discovery catalogue, not a dependency source**. Candidates (orchestration, memory/search, research, security, coding tools) require: license check (MIT/Apache-2.0 preferred), last commit <12 months, dependency/security review, owner approval, DECISIONS.md entry. Core financial logic is always built in-repo.

## Data-mode labels (mandatory, 2026-11-14)
Every price/KPI/report carries one mode: **Live** (licensed real-time feed — none contracted at launch), **Delayed** (licensed delayed feed), **Historical** (EOD/past), **Manual** (owner typed), **CSV** (owner imported), **Demo** (fictional seed). UI badge + API field `data_mode` + `as_of` are required; a dataset's mode is the *weakest* source it contains. Calling Manual/CSV/Demo data "live" is a release-blocking defect (TESTING.md).
