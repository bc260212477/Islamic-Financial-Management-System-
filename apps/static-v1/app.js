const { useEffect, useMemo, useRef, useState } = React;

/* ---------- formatting & constants ---------- */
let DISPLAY = { code: "USD", rate: 1 };
const money = (v) => {
  const n = (Number(v) || 0) * DISPLAY.rate;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: DISPLAY.code, maximumFractionDigits: 0 }).format(n);
};
const pct = (v) => `${v > 0 ? "+" : ""}${(Number(v) || 0).toFixed(1)}%`;
const CATEGORIES = [
  { id: "food", label: "Food", color: "#C9A227" }, { id: "housing", label: "Housing", color: "#8A7350" },
  { id: "transport", label: "Transport", color: "#6E9C8C" }, { id: "utilities", label: "Utilities", color: "#A4A093" },
  { id: "family", label: "Family", color: "#B98269" }, { id: "sadaqah", label: "Sadaqah", color: "#2F7A5E" },
  { id: "health", label: "Health", color: "#7D89A7" }, { id: "shopping", label: "Shopping", color: "#A77E9C" }
];
const INCOME_TYPES = ["job", "business", "partnership", "factory", "freelance", "rental", "investment", "other"];
const INV_TYPES = ["Equity", "Sukuk", "Gold", "REIT", "Fund"];
const SCREENS = { halal: { label: "Halal ✓", tone: "green" }, review: { label: "Under review", tone: "gold" }, purify: { label: "Purify dividends", tone: "red" } };
const SEED_EXPENSES = [
  { id: "seed-1", date: "2026-01-02", merchant: "Whole Foods", category: "food", amount: 214 },
  { id: "seed-2", date: "2026-01-04", merchant: "Apartment rent", category: "housing", amount: 1250 },
  { id: "seed-3", date: "2026-01-07", merchant: "Metro & fuel", category: "transport", amount: 180 },
  { id: "seed-4", date: "2026-01-09", merchant: "Electric & internet", category: "utilities", amount: 145 },
  { id: "seed-5", date: "2026-01-12", merchant: "Family support", category: "family", amount: 320 },
  { id: "seed-6", date: "2026-01-15", merchant: "Sadaqah", category: "sadaqah", amount: 150 },
  { id: "seed-7", date: "2026-01-18", merchant: "Pharmacy", category: "health", amount: 96 },
  { id: "seed-8", date: "2026-01-22", merchant: "Home essentials", category: "shopping", amount: 260 },
  { id: "seed-9", date: "2026-01-25", merchant: "Local market", category: "food", amount: 440 }
];
const SEED_INCOME = [
  { id: "inc-1", date: "2026-01-05", source: "Salary — Software Engineer", type: "job", amount: 4800 },
  { id: "inc-2", date: "2026-01-14", source: "Freelance — Web Project", type: "freelance", amount: 1200 },
  { id: "inc-3", date: "2026-01-20", source: "Dividend — Islamic ETF", type: "investment", amount: 240 },
  { id: "inc-4", date: "2026-01-28", source: "Rental — Shop Unit", type: "rental", amount: 650 }
];
const SEED_INVESTMENTS = [
  { id: "inv-1", name: "Global Islamic Equity ETF", type: "Equity", invested: 12000, value: 13850, income: 240, screen: "halal" },
  { id: "inv-2", name: "Sukuk Fund — Short Term", type: "Sukuk", invested: 8000, value: 8320, income: 310, screen: "halal" },
  { id: "inv-3", name: "Gold (50g)", type: "Gold", invested: 3400, value: 3900, income: 0, screen: "halal" },
  { id: "inv-4", name: "Tech Growth Fund", type: "Equity", invested: 5000, value: 5350, income: 60, screen: "review" },
  { id: "inv-5", name: "REIT — Commercial", type: "REIT", invested: 6000, value: 5580, income: 280, screen: "purify" }
];
const BANKS = [
  ["Meezan Bank", "Full-fledged Islamic", "Justice (Retd.) Muhammad Taqi Usmani", "Pakistan's first & largest Islamic bank"],
  ["Faysal Bank", "Converted (2023)", "Mufti Mohib ul Haq", "Second-largest full-fledged Islamic bank"],
  ["BankIslami Pakistan", "Full-fledged Islamic", "Mufti Javed Ahmad", "Dedicated Islamic retail & corporate"],
  ["Dubai Islamic Bank Pakistan", "Full-fledged Islamic", "Dr. Hussein Hamed Hassan", "Subsidiary of DIB UAE"],
  ["MCB Islamic Bank", "Full-fledged Islamic", "Mufti Munib-Ur-Rehman", "Islamic banking arm of MCB"],
  ["Al Baraka Bank (Pakistan)", "Full-fledged Islamic", "Shaikh Esam Mohammad Ishaq", "Part of Al Baraka Group, Bahrain"],
  ["Bank Alfalah Islamic", "Islamic window", "Dr. Mufti Khalil Ahmad Aazami", "Islamic window of Bank Alfalah"],
  ["UBL Ameen", "Islamic window", "Dr. Mufti Muhammad Zubair Usmani", "UBL's dedicated Islamic banking arm"],
  ["HBL Islamic", "Islamic window", "Dr. Mufti Muhammad Zubair Usmani", "HBL's dedicated Islamic banking arm"]
];
const MONTHLY_TREND = [
  { month: "Aug", spend: 3120 }, { month: "Sep", spend: 2870 }, { month: "Oct", spend: 3410 },
  { month: "Nov", spend: 2980 }, { month: "Dec", spend: 3620 }, { month: "Jan", spend: 3055 }
];
const today = () => new Date().toISOString().slice(0, 10);
const categoryFor = (id) => CATEGORIES.find((c) => c.id === id) || CATEGORIES[0];
const formatDate = (d) => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(`${d}T12:00:00`));
function load(key, seed, valid) {
  try { const p = JSON.parse(localStorage.getItem(key)); return Array.isArray(p) ? p.filter(valid) : seed; } catch { return seed; }
}
const loadExpenses = () => load("barakah-expenses", SEED_EXPENSES, (e) => e && e.merchant && Number.isFinite(Number(e.amount)))
  .map((e) => ({ ...e, amount: Number(e.amount), category: categoryFor(e.category).id }));
const loadIncome = () => load("barakah-income", SEED_INCOME, (e) => e && e.source && Number.isFinite(Number(e.amount))).map((e) => ({ ...e, amount: Number(e.amount) }));
const loadInvestments = () => load("barakah-investments", SEED_INVESTMENTS, (e) => e && e.name && Number.isFinite(Number(e.invested))).map((e) => ({ ...e, invested: Number(e.invested), value: Number(e.value) || 0, income: Number(e.income) || 0, screen: SCREENS[e.screen] ? e.screen : "halal" }));
function store(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }
function download(name, text, type = "application/json") {
  const url = URL.createObjectURL(new Blob([text], { type })); const a = document.createElement("a");
  a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url);
}

/* ---------- primitives ---------- */
function GlassCard({ children, className = "" }) { return <section className={`glass-card ${className}`}>{children}</section>; }
function Btn({ children, className = "", ...p }) { return <button className={`btn ${className}`} {...p}>{children}</button>; }
function Badge({ children, tone = "muted" }) { return <span className={`badge badge-${tone}`}>{children}</span>; }
function StatCard({ label, value, note, noteClass = "", pill }) {
  return <GlassCard className="stat-card"><div className="stat-top"><div className="stat-label">{label}</div>{pill}</div><div className="stat-value">{value}</div><div className={`stat-note ${noteClass}`}>{note}</div></GlassCard>;
}
function Modal({ title, sub, onClose, children }) {
  useEffect(() => { const k = (e) => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose]);
  return <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <GlassCard className="modal"><div className="panel-heading"><div><h2>{title}</h2><p>{sub}</p></div><button className="btn btn-ghost" onClick={onClose} aria-label="Close">×</button></div>{children}</GlassCard>
  </div>;
}
const Field = ({ label, children }) => <div className="field"><label>{label}</label>{children}</div>;

/* ---------- charts (v1.1) ---------- */
function MonthlySpend() {
  const W = 560, H = 260, padL = 44, padB = 30, padT = 18, plotW = W - padL - 12, plotH = H - padT - padB, max = 4000;
  const step = plotW / MONTHLY_TREND.length, barW = Math.min(52, step * 0.52);
  return <GlassCard className="panel"><div className="panel-heading"><div><h2>Monthly Spend</h2><p>Last 6 months</p></div><Badge tone="gold">{money(3055)} · Jan</Badge></div>
    <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Monthly spend bar chart"><defs>
      <linearGradient id="barGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E5C766" /><stop offset="100%" stopColor="#C9A227" /></linearGradient>
      <linearGradient id="barSoft" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#EDEAE2" /></linearGradient></defs>
      {[0, 1000, 2000, 3000, 4000].map((v) => { const y = padT + plotH - (v / max) * plotH; return <g key={v}><line x1={padL} x2={W - 12} y1={y} y2={y} stroke="rgba(140,134,118,.35)" strokeDasharray="4 5" /><text x={padL - 8} y={y + 4} textAnchor="end" className="chart-axis">{v === 0 ? "0" : `${v / 1000}k`}</text></g>; })}
      {MONTHLY_TREND.map((d, i) => { const h = (d.spend / max) * plotH, x = padL + step * i + (step - barW) / 2, y = padT + plotH - h, last = i === MONTHLY_TREND.length - 1;
        return <g key={d.month}><rect x={x} y={y} width={barW} height={h} rx={barW / 2} fill={last ? "url(#barGold)" : "url(#barSoft)"} stroke="rgba(200,190,160,.35)" /><text x={x + barW / 2} y={y - 7} textAnchor="middle" className="chart-value">{money(d.spend)}</text><text x={x + barW / 2} y={H - 8} textAnchor="middle" className="chart-axis">{d.month}</text></g>; })}
    </svg></GlassCard>;
}
function CategoryDonut({ expenses }) {
  const grouped = useMemo(() => { const s = {}; expenses.forEach((e) => { s[e.category] = (s[e.category] || 0) + e.amount; });
    return Object.entries(s).map(([id, amount]) => ({ ...categoryFor(id), amount })).sort((a, b) => b.amount - a.amount); }, [expenses]);
  const total = grouped.reduce((s, g) => s + g.amount, 0), R = 70, C = 2 * Math.PI * R; let acc = 0;
  const segs = grouped.map((g) => { const f = total ? g.amount / total : 0; const s = { ...g, frac: f, off: acc }; acc += f; return s; });
  return <GlassCard className="panel"><div className="panel-heading"><div><h2>Where it went</h2><p>By category · this month</p></div></div>
    {total ? <div className="donut-wrap"><svg className="donut-svg" viewBox="0 0 200 200" role="img" aria-label="Spending by category donut">
      <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(200,190,160,.18)" strokeWidth="26" />
      {segs.map((s) => <circle key={s.id} cx="100" cy="100" r={R} fill="none" stroke={s.color} strokeWidth="26" strokeDasharray={`${Math.max(s.frac * C - 2, 0)} ${C}`} transform={`rotate(${-90 + s.off * 360} 100 100)`} />)}
      <text x="100" y="96" textAnchor="middle" className="donut-total">{money(total)}</text><text x="100" y="116" textAnchor="middle" className="chart-axis">this month</text></svg>
      <ul className="legend">{segs.slice(0, 5).map((s) => <li key={s.id}><span className="activity-main"><span className="category-dot" style={{ background: s.color }} />{s.label}</span><span className="amount">{money(s.amount)} <span className="legend-pct">{Math.round(s.frac * 100)}%</span></span></li>)}</ul></div>
    : <div className="empty-state">No expenses recorded yet.</div>}</GlassCard>;
}

/* ---------- transactions (v1.0 + search/filter/delete) ---------- */
function Transactions({ expenses, onDelete }) {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("all");
  const rows = [...expenses].sort((a, b) => b.date.localeCompare(a.date))
    .filter((e) => (cat === "all" || e.category === cat) && e.merchant.toLowerCase().includes(q.toLowerCase()));
  return <GlassCard className="panel"><div className="panel-heading"><div><h2>Recent activity</h2><p>Search, filter, remove entries</p></div><span className="stat-label">{rows.length} of {expenses.length}</span></div>
    <div className="filter-row"><input aria-label="Search expenses" placeholder="Search merchant…" value={q} onChange={(e) => setQ(e.target.value)} />
      <select aria-label="Filter by category" value={cat} onChange={(e) => setCat(e.target.value)}><option value="all">All categories</option>{CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</select></div>
    <div className="activity-list">{rows.length ? rows.map((e) => { const c = categoryFor(e.category);
      return <div className="activity-item" key={e.id}><div className="activity-main"><span className="category-dot" style={{ background: c.color }} /><div><div className="merchant">{e.merchant}</div><div className="activity-meta">{c.label} · {formatDate(e.date)}</div></div></div>
        <div className="row-actions"><span className="amount">{money(e.amount)}</span><button className="icon-btn" aria-label={`Delete ${e.merchant}`} onClick={() => onDelete(e.id)}>×</button></div></div>; })
      : <div className="empty-state">No matching expenses.</div>}</div></GlassCard>;
}

/* ---------- cash flow (v1.3) ---------- */
function CashFlow({ income, onAdd, onDelete }) {
  const [form, setForm] = useState({ source: "", type: "job", amount: "" });
  const total = income.reduce((s, i) => s + i.amount, 0);
  const submit = (e) => { e.preventDefault(); const a = Number(form.amount); if (!form.source.trim() || !(a > 0)) return;
    onAdd({ id: crypto.randomUUID(), date: today(), source: form.source.trim(), type: form.type, amount: a }); setForm({ source: "", type: "job", amount: "" }); };
  return <GlassCard className="panel"><div className="panel-heading"><div><h2>Cash Flow</h2><p>Inflows this month · {money(total)}</p></div><Badge tone="green">{money(total)} in</Badge></div>
    <form className="inline-form" onSubmit={submit}><input aria-label="Income source" placeholder="Source name" value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} />
      <select aria-label="Income type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>{INCOME_TYPES.map((t) => <option key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</option>)}</select>
      <input aria-label="Amount" type="number" min="0.01" step="0.01" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
      <Btn type="submit" className="btn-gold">+ Add inflow</Btn></form>
    <div className="activity-list short">{income.length ? [...income].sort((a, b) => b.date.localeCompare(a.date)).map((i) =>
      <div className="activity-item" key={i.id}><div className="activity-main"><span className="category-dot" style={{ background: "#2F7A5E" }} /><div><div className="merchant">{i.source}</div><div className="activity-meta">{i.type} · {formatDate(i.date)}</div></div></div>
        <div className="row-actions"><span className="amount positive">+{money(i.amount)}</span><button className="icon-btn" aria-label={`Delete ${i.source}`} onClick={() => onDelete(i.id)}>×</button></div></div>)
      : <div className="empty-state">No income recorded yet.</div>}</div></GlassCard>;
}

/* ---------- investments (v1.2) ---------- */
function Investments({ items, onAddClick, onDelete }) {
  const ret = (i) => i.invested ? ((i.value - i.invested) / i.invested) * 100 : 0;
  return <GlassCard className="panel"><div className="panel-heading"><div><h2>Investments</h2><p>Holdings, value and Shariah screening</p></div><Btn className="btn-gold" onClick={onAddClick}>+ Add</Btn></div>
    <div className="table-wrap"><table className="table"><thead><tr><th>Holding</th><th>Invested</th><th>Value</th><th>Return</th><th>Screening</th><th></th></tr></thead>
    <tbody>{items.map((i) => <tr key={i.id}><td><div className="merchant">{i.name}</div><div className="activity-meta">{i.type} · income {money(i.income)}</div></td>
      <td>{money(i.invested)}</td><td>{money(i.value)}</td><td className={ret(i) >= 0 ? "positive" : "negative"}>{pct(ret(i))}</td>
      <td><Badge tone={SCREENS[i.screen].tone}>{SCREENS[i.screen].label}</Badge></td>
      <td><button className="icon-btn" aria-label={`Delete ${i.name}`} onClick={() => onDelete(i.id)}>×</button></td></tr>)}</tbody></table>
    {!items.length && <div className="empty-state">No holdings yet.</div>}</div></GlassCard>;
}

/* ---------- zakat (v1.4) ---------- */
function Zakat() {
  const [z, setZ] = useState(() => { try { return { cash: 18500, goldVal: 4200, business: 0, debts: 2100, goldPrice: 78, ...JSON.parse(localStorage.getItem("barakah-zakat") || "{}") }; } catch { return { cash: 18500, goldVal: 4200, business: 0, debts: 2100, goldPrice: 78 }; } });
  useEffect(() => store("barakah-zakat", z), [z]);
  const set = (k) => (e) => setZ({ ...z, [k]: Number(e.target.value) || 0 });
  const net = z.cash + z.goldVal + z.business - z.debts, nisab = 85 * z.goldPrice, eligible = net >= nisab, due = eligible ? net * 0.025 : 0;
  const fields = [["cash", "Cash & bank"], ["goldVal", "Gold/silver value"], ["business", "Business assets"], ["debts", "Debts due now"], ["goldPrice", "Gold price / gram"]];
  return <GlassCard className="panel"><div className="panel-heading"><div><h2>Zakat</h2><p>2.5% on wealth held one lunar year</p></div><Badge tone={eligible ? "gold" : "muted"}>{eligible ? "Due" : "Below nisab"}</Badge></div>
    <div className="form two-col">{fields.map(([k, l]) => <Field key={k} label={l}><input type="number" value={z[k]} onChange={set(k)} /></Field>)}</div>
    <div className="progress" role="progressbar" aria-valuenow={Math.round(Math.min(net / Math.max(nisab, 1), 1) * 100)}><span style={{ width: `${Math.max(Math.min(net / Math.max(nisab, 1), 1), 0) * 100}%` }} /></div>
    <div className="kv"><span>Net wealth</span><strong>{money(net)}</strong></div><div className="kv"><span>Nisab (85g gold)</span><strong>{money(nisab)}</strong></div>
    <div className="gold-box">Zakat payable<strong>{money(due)}</strong></div>
    <p className="footnote">Based on the values you entered. Confirm nisab (85g gold / 595g silver) and price with a current source.</p></GlassCard>;
}

/* ---------- shariah screener + banks (v1.5) ---------- */
function Screener() {
  const [debt, setDebt] = useState(28); const [inv, setInv] = useState(24);
  const dPass = debt <= 33, iPass = inv <= 30;
  const stars = debt < 20 && inv < 15 ? 5 : dPass && iPass ? 4 : dPass !== iPass ? 3 : 1;
  const row = (label, val, set, limit, pass) => <div className="slider-row"><div className="kv"><span>{label}</span><strong>{val}% {pass ? "✓" : "✗"} <span className="legend-pct">≤{limit}%</span></strong></div>
    <input type="range" min="0" max="50" value={val} onChange={(e) => set(Number(e.target.value))} aria-label={label} /></div>;
  return <GlassCard className="panel"><div className="panel-heading"><div><h2>Shariah Screener</h2><p>PSX KMI All Share criteria</p></div><Badge tone={dPass && iPass ? "green" : "gold"}>{dPass && iPass ? "Compliant" : "Review"}</Badge></div>
    {row("Non-compliant debt / total assets", debt, setDebt, 33, dPass)}{row("Non-compliant investments / total assets", inv, setInv, 30, iPass)}
    <div className="stars" aria-label={`${stars} star rating`}>{"★".repeat(stars)}{"☆".repeat(5 - stars)} <span className="legend-pct">{stars}/5 · purification: dividend × non-compliant income ratio</span></div>
    <p className="footnote">SECP revised: debt ratio from 37% → 33%; investments ratio recommended 33% → 30%. KMI-30 tracks Shariah-compliant PSX equities. Screening aid only — not a fatwa.</p></GlassCard>;
}
function Banks() {
  return <GlassCard className="panel"><div className="panel-heading"><div><h2>Pakistan Islamic Banks</h2><p>Shariah-compliant institutions</p></div></div>
    <div className="bank-grid">{BANKS.map(([n, t, chair, note]) => <div className="bank-card" key={n}><div className="merchant">{n}</div><div className="bank-type">{t}</div><div className="activity-meta">Shariah Chair: {chair}</div><div className="activity-meta">{note}</div></div>)}</div>
    <p className="footnote">Pakistani banks do not expose public transaction APIs for personal dashboards. Use CSV export from your bank app or manual entry.</p></GlassCard>;
}

/* ---------- CSV + backup tools (v1.6 + restore) ---------- */
function CsvTools({ expenses, investments, onExpenses, onInvestments, onRestore, onReset }) {
  const expRef = useRef(), invRef = useRef(), bakRef = useRef(); const [msg, setMsg] = useState("");
  const parse = (file, kind) => { if (!window.Papa) { setMsg("CSV parser still loading — try again in a second."); return; }
    Papa.parse(file, { header: true, skipEmptyLines: true, complete: ({ data }) => {
      if (kind === "exp") { const rows = data.filter((r) => r.merchant && Number(r.amount) > 0).map((r) => ({ id: crypto.randomUUID(), date: /^\d{4}-\d{2}-\d{2}$/.test(r.date || "") ? r.date : today(), merchant: String(r.merchant).trim(), category: categoryFor(r.category).id, amount: Number(r.amount) }));
        onExpenses(rows); setMsg(`Imported ${rows.length} expense rows.`); }
      else { const rows = data.filter((r) => r.name && Number(r.invested) >= 0).map((r) => ({ id: crypto.randomUUID(), name: String(r.name).trim(), type: INV_TYPES.includes(r.type) ? r.type : "Fund", invested: Number(r.invested), value: Number(r.value) || 0, income: Number(r.income) || 0, screen: SCREENS[r.screen] ? r.screen : "halal" }));
        onInvestments(rows); setMsg(`Imported ${rows.length} investment rows.`); } } }); };
  const panel = (title, sub, ref, kind, data, fname) => <GlassCard className="panel"><div className="panel-heading"><div><h2>{title}</h2><p>{sub}</p></div></div>
    <input ref={ref} type="file" accept=".csv,text/csv" hidden onChange={(e) => { e.target.files[0] && parse(e.target.files[0], kind); e.target.value = ""; }} />
    <div className="modal-actions start"><Btn onClick={() => ref.current.click()}>Upload CSV</Btn><Btn className="btn-ghost" onClick={() => download(fname, JSON.stringify(data, null, 2))}>Export JSON</Btn></div></GlassCard>;
  return <React.Fragment>
    {panel("Expenses CSV", "date,merchant,category,amount", expRef, "exp", expenses, "barakah-expenses.json")}
    {panel("Investments CSV", "name,type,invested,value,income,screen", invRef, "inv", investments, "barakah-investments.json")}
    <GlassCard className="panel"><div className="panel-heading"><div><h2>Backup & restore</h2><p>Full data, on your device only</p></div></div>
      <input ref={bakRef} type="file" accept=".json,application/json" hidden onChange={(e) => { const f = e.target.files[0]; if (f) f.text().then((t) => { try { onRestore(JSON.parse(t)); setMsg("Backup restored."); } catch { setMsg("That backup file could not be read."); } }); e.target.value = ""; }} />
      <div className="modal-actions start"><Btn onClick={() => bakRef.current.click()}>Restore backup</Btn><Btn className="btn-ghost" onClick={onReset}>Reset demo data</Btn></div>
      {msg && <p className="footnote" role="status">{msg}</p>}</GlassCard>
  </React.Fragment>;
}

/* ---------- modals ---------- */
function AddExpense({ onClose, onAdd }) {
  const [f, setF] = useState({ merchant: "", amount: "", category: "food" }); const u = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return <Modal title="Add expense" sub="Keep your spending in balance." onClose={onClose}><form className="form" onSubmit={(e) => { e.preventDefault(); const a = Number(f.amount); if (!f.merchant.trim() || !(a > 0)) return; onAdd({ id: crypto.randomUUID(), date: today(), merchant: f.merchant.trim(), category: f.category, amount: a }); }}>
    <Field label="Merchant"><input value={f.merchant} onChange={u("merchant")} placeholder="e.g. Local market" autoFocus /></Field>
    <Field label="Amount"><input type="number" min="0.01" step="0.01" value={f.amount} onChange={u("amount")} placeholder="0.00" /></Field>
    <Field label="Category"><select value={f.category} onChange={u("category")}>{CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</select></Field>
    <div className="modal-actions"><Btn type="button" className="btn-ghost" onClick={onClose}>Cancel</Btn><Btn type="submit" className="btn-gold">Add expense</Btn></div></form></Modal>;
}
function AddInvestment({ onClose, onAdd }) {
  const [f, setF] = useState({ name: "", type: "Equity", invested: "", value: "", income: 0, screen: "halal" }); const u = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return <Modal title="Add investment" sub="A new holding for your portfolio." onClose={onClose}><form className="form" onSubmit={(e) => { e.preventDefault(); if (!f.name.trim() || !(Number(f.invested) >= 0)) return; onAdd({ id: crypto.randomUUID(), name: f.name.trim(), type: f.type, invested: Number(f.invested), value: Number(f.value) || 0, income: Number(f.income) || 0, screen: f.screen }); }}>
    <Field label="Name"><input value={f.name} onChange={u("name")} placeholder="Holding name" autoFocus /></Field>
    <Field label="Type"><select value={f.type} onChange={u("type")}>{INV_TYPES.map((t) => <option key={t}>{t}</option>)}</select></Field>
    <Field label="Invested"><input type="number" min="0" step="0.01" value={f.invested} onChange={u("invested")} /></Field>
    <Field label="Current value"><input type="number" min="0" step="0.01" value={f.value} onChange={u("value")} /></Field>
    <Field label="Income / dividends"><input type="number" min="0" step="0.01" value={f.income} onChange={u("income")} /></Field>
    <Field label="Screening"><select value={f.screen} onChange={u("screen")}>{Object.entries(SCREENS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}</select></Field>
    <div className="modal-actions"><Btn type="button" className="btn-ghost" onClick={onClose}>Cancel</Btn><Btn type="submit" className="btn-gold">Add investment</Btn></div></form></Modal>;
}

/* ---------- app ---------- */
function App() {
  const [expenses, setExpenses] = useState(loadExpenses);
  const [income, setIncome] = useState(loadIncome);
  const [investments, setInvestments] = useState(loadInvestments);
  const [budget, setBudget] = useState(() => Number(localStorage.getItem("barakah-budget")) || 3200);
  const [currency, setCurrency] = useState(() => localStorage.getItem("barakah-currency") || "USD");
  const [theme, setTheme] = useState(() => localStorage.getItem("barakah-theme") || "light");
  const [modal, setModal] = useState(null);
  DISPLAY = currency === "PKR" ? { code: "PKR", rate: 280 } : { code: "USD", rate: 1 };
  useEffect(() => store("barakah-expenses", expenses), [expenses]);
  useEffect(() => store("barakah-income", income), [income]);
  useEffect(() => store("barakah-investments", investments), [investments]);
  useEffect(() => store("barakah-budget", budget), [budget]);
  useEffect(() => { store("barakah-currency", currency); }, [currency]);
  useEffect(() => { store("barakah-theme", theme); document.documentElement.dataset.theme = theme; }, [theme]);
  const spent = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const sadaqah = useMemo(() => expenses.filter((e) => e.category === "sadaqah").reduce((s, e) => s + e.amount, 0), [expenses]);
  const incomeTotal = useMemo(() => income.reduce((s, i) => s + i.amount, 0), [income]);
  const portValue = useMemo(() => investments.reduce((s, i) => s + i.value, 0), [investments]);
  const portInvested = useMemo(() => investments.reduce((s, i) => s + i.invested, 0), [investments]);
  const portReturn = portInvested ? ((portValue - portInvested) / portInvested) * 100 : 0;
  const month = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date());
  const exportAll = () => download("barakah-backup.json", JSON.stringify({ expenses, income, investments, budget, exportedAt: new Date().toISOString() }, null, 2));
  const restore = (d) => { if (Array.isArray(d.expenses)) setExpenses(d.expenses); if (Array.isArray(d.income)) setIncome(d.income); if (Array.isArray(d.investments)) setInvestments(d.investments); if (Number(d.budget) > 0) setBudget(Number(d.budget)); };
  const reset = () => { setExpenses(SEED_EXPENSES); setIncome(SEED_INCOME); setInvestments(SEED_INVESTMENTS); setBudget(3200); };
  const editBudget = () => { const v = window.prompt("Monthly budget (in USD base):", String(budget)); if (v !== null && Number(v) > 0) setBudget(Number(v)); };
  return <main className="app-shell">
    <header className="topbar"><div><p className="eyebrow">Assalamu alaikum</p><h1>Your wealth, in balance.</h1><p className="subtitle">{month} · Full overview · {currency === "PKR" ? "Display PKR (USD×280, display only)" : "USD"}</p></div>
      <div className="actions">
        <Btn className="btn-ghost" onClick={() => setCurrency(currency === "USD" ? "PKR" : "USD")}>{currency} ⇄</Btn>
        <Btn className="btn-ghost" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>{theme === "light" ? "Dark" : "Light"}</Btn>
        <Btn className="btn-ghost" onClick={editBudget}>Budget</Btn>
        <Btn className="btn-ghost" onClick={() => window.print()}>Print</Btn>
        <Btn className="btn-ghost" onClick={exportAll}>Export</Btn>
        <Btn className="btn-gold" onClick={() => setModal("expense")}>+ Add expense</Btn>
      </div></header>
    <section className="stats-grid">
      <StatCard label="Spent this month" value={money(spent)} note={spent > budget ? `${money(spent - budget)} over ${money(budget)}` : `${money(budget - spent)} left of ${money(budget)}`} noteClass={spent > budget ? "negative" : ""} />
      <StatCard label="Income this month" value={money(incomeTotal)} note={`Net cash: ${money(incomeTotal - spent)}`} noteClass={incomeTotal - spent < 0 ? "negative" : "positive"} />
      <StatCard label="Portfolio value" value={money(portValue)} note={`${money(portInvested)} invested`} pill={<Badge tone={portReturn >= 0 ? "green" : "red"}>{pct(portReturn)}</Badge>} />
      <StatCard label="Sadaqah given" value={money(sadaqah)} note="A quiet act of generosity" noteClass="positive" />
    </section>
    <section className="charts-grid"><MonthlySpend /><CategoryDonut expenses={expenses} /></section>
    <section className="content-grid">
      <Transactions expenses={expenses} onDelete={(id) => setExpenses(expenses.filter((e) => e.id !== id))} />
      <CashFlow income={income} onAdd={(i) => setIncome([...income, i])} onDelete={(id) => setIncome(income.filter((i) => i.id !== id))} />
    </section>
    <section className="full-row"><Investments items={investments} onAddClick={() => setModal("investment")} onDelete={(id) => setInvestments(investments.filter((i) => i.id !== id))} /></section>
    <section className="content-grid"><Zakat /><Screener /></section>
    <section className="full-row"><Banks /></section>
    <section className="tools-grid"><CsvTools expenses={expenses} investments={investments}
      onExpenses={(rows) => setExpenses([...expenses, ...rows])} onInvestments={(rows) => setInvestments([...investments, ...rows])}
      onRestore={restore} onReset={reset} /></section>
    <footer className="footer">Barakah Finance · Private, on-device data · Analysis, not licensed financial advice · EOD/demo figures — verify before acting.</footer>
    {modal === "expense" && <AddExpense onClose={() => setModal(null)} onAdd={(e) => { setExpenses([...expenses, e]); setModal(null); }} />}
    {modal === "investment" && <AddInvestment onClose={() => setModal(null)} onAdd={(i) => { setInvestments([...investments, i]); setModal(null); }} />}
  </main>;
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
