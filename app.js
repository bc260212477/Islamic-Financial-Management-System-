const { useEffect, useMemo, useState } = React;

const money = (value) => new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 0
}).format(Number(value) || 0);

const CATEGORIES = [
  { id: "food", label: "Food", color: "#C9A227" },
  { id: "housing", label: "Housing", color: "#8A7350" },
  { id: "transport", label: "Transport", color: "#6E9C8C" },
  { id: "utilities", label: "Utilities", color: "#A4A093" },
  { id: "family", label: "Family", color: "#B98269" },
  { id: "sadaqah", label: "Sadaqah", color: "#2F7A5E" },
  { id: "health", label: "Health", color: "#7D89A7" },
  { id: "shopping", label: "Shopping", color: "#A77E9C" }
];

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

const BUDGET = 3200;
const STORAGE_KEY = "barakah-expenses";

const today = () => new Date().toISOString().slice(0, 10);
const categoryFor = (id) => CATEGORIES.find((category) => category.id === id) || CATEGORIES[0];

function loadExpenses() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(parsed)) return SEED_EXPENSES;
    const valid = parsed.filter((e) => e && typeof e.merchant === "string" && Number.isFinite(Number(e.amount)));
    return valid.map((e) => ({
      id: String(e.id || crypto.randomUUID()),
      date: typeof e.date === "string" ? e.date : today(),
      merchant: e.merchant,
      category: categoryFor(e.category).id,
      amount: Number(e.amount)
    }));
  } catch { return SEED_EXPENSES; }
}
const formatDate = (date) => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(`${date}T12:00:00`));

function GlassCard({ children, className = "" }) { return <section className={`glass-card ${className}`}>{children}</section>; }
function Btn({ children, className = "", ...props }) { return <button className={`btn ${className}`} {...props}>{children}</button>; }
function Badge({ children, tone = "muted" }) { return <span className={`badge badge-${tone}`}>{children}</span>; }

function StatCard({ label, value, note, noteClass = "" }) {
  return <GlassCard className="stat-card"><div className="stat-label">{label}</div><div className="stat-value">{value}</div><div className={`stat-note ${noteClass}`}>{note}</div></GlassCard>;
}

function Transactions({ expenses }) {
  const sorted = [...expenses].sort((a, b) => b.date.localeCompare(a.date));
  return <GlassCard className="panel">
    <div className="panel-heading"><div><h2>Recent activity</h2><p>Your latest spending</p></div><span className="stat-label">{expenses.length} entries</span></div>
    <div className="activity-list">{sorted.length ? sorted.map((expense) => {
      const category = categoryFor(expense.category);
      return <div className="activity-item" key={expense.id}>
        <div className="activity-main"><span className="category-dot" style={{ background: category.color }} /><div><div className="merchant">{expense.merchant}</div><div className="activity-meta">{category.label} · {formatDate(expense.date)}</div></div></div>
        <div className="amount">{money(expense.amount)}</div>
      </div>;
    }) : <div className="empty-state">No expenses recorded yet.</div>}</div>
  </GlassCard>;
}

function AddExpense({ onClose, onAdd }) {
  const [form, setForm] = useState({ merchant: "", amount: "", category: "food" });
  useEffect(() => {
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const update = (key) => (event) => setForm({ ...form, [key]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    const amount = Number(form.amount);
    if (!form.merchant.trim() || !Number.isFinite(amount) || amount <= 0) return;
    onAdd({ id: crypto.randomUUID(), date: today(), merchant: form.merchant.trim(), category: form.category, amount });
  };
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <GlassCard className="modal"><div className="panel-heading"><div><h2>Add expense</h2><p>Keep your spending in balance.</p></div><button className="btn btn-ghost" onClick={onClose} aria-label="Close">×</button></div>
      <form className="form" onSubmit={submit}>
        <div className="field"><label htmlFor="merchant">Merchant</label><input id="merchant" value={form.merchant} onChange={update("merchant")} placeholder="e.g. Local market" autoFocus /></div>
        <div className="field"><label htmlFor="amount">Amount</label><input id="amount" type="number" min="0.01" step="0.01" value={form.amount} onChange={update("amount")} placeholder="0.00" /></div>
        <div className="field"><label htmlFor="category">Category</label><select id="category" value={form.category} onChange={update("category")}>{CATEGORIES.map((category) => <option key={category.id} value={category.id}>{category.label}</option>)}</select></div>
        <div className="modal-actions"><Btn type="button" className="btn-ghost" onClick={onClose}>Cancel</Btn><Btn type="submit" className="btn-gold">Add expense</Btn></div>
      </form>
    </GlassCard>
  </div>;
}

const MONTHLY_TREND = [
  { month: "Aug", spend: 3120 }, { month: "Sep", spend: 2870 }, { month: "Oct", spend: 3410 },
  { month: "Nov", spend: 2980 }, { month: "Dec", spend: 3620 }, { month: "Jan", spend: 3055 }
];

function MonthlySpend() {
  const W = 560, H = 260, padL = 44, padB = 30, padT = 18;
  const plotW = W - padL - 12, plotH = H - padT - padB;
  const max = 4000;
  const step = plotW / MONTHLY_TREND.length;
  const barW = Math.min(52, step * 0.52);
  const gridVals = [0, 1000, 2000, 3000, 4000];
  return <GlassCard className="panel">
    <div className="panel-heading"><div><h2>Monthly Spend</h2><p>Last 6 months</p></div><Badge tone="gold">{money(MONTHLY_TREND[MONTHLY_TREND.length - 1].spend)} · Jan</Badge></div>
    <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Bar chart of monthly spend for the last 6 months">
      <defs>
        <linearGradient id="barGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E5C766" /><stop offset="100%" stopColor="#C9A227" /></linearGradient>
        <linearGradient id="barSoft" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor="#EDEAE2" /></linearGradient>
      </defs>
      {gridVals.map((v) => { const y = padT + plotH - (v / max) * plotH; return <g key={v}><line x1={padL} x2={W - 12} y1={y} y2={y} stroke="rgba(140,134,118,.35)" strokeDasharray="4 5" /><text x={padL - 8} y={y + 4} textAnchor="end" className="chart-axis">{v === 0 ? "0" : `${v / 1000}k`}</text></g>; })}
      {MONTHLY_TREND.map((d, i) => {
        const h = (d.spend / max) * plotH; const x = padL + step * i + (step - barW) / 2; const y = padT + plotH - h; const last = i === MONTHLY_TREND.length - 1;
        return <g key={d.month}><rect x={x} y={y} width={barW} height={h} rx={barW / 2} fill={last ? "url(#barGold)" : "url(#barSoft)"} stroke="rgba(200,190,160,.35)" />
          <text x={x + barW / 2} y={y - 7} textAnchor="middle" className="chart-value">{money(d.spend)}</text>
          <text x={x + barW / 2} y={H - 8} textAnchor="middle" className="chart-axis">{d.month}</text></g>;
      })}
    </svg>
  </GlassCard>;
}

function CategoryDonut({ expenses }) {
  const grouped = useMemo(() => {
    const sums = {};
    expenses.forEach((e) => { sums[e.category] = (sums[e.category] || 0) + e.amount; });
    return Object.entries(sums).map(([id, amount]) => ({ ...categoryFor(id), amount })).sort((a, b) => b.amount - a.amount);
  }, [expenses]);
  const total = grouped.reduce((s, g) => s + g.amount, 0);
  const R = 70, C = 2 * Math.PI * R;
  let acc = 0;
  const segments = grouped.map((g) => { const frac = total ? g.amount / total : 0; const seg = { ...g, frac, offset: acc }; acc += frac; return seg; });
  return <GlassCard className="panel">
    <div className="panel-heading"><div><h2>Where it went</h2><p>By category · this month</p></div></div>
    {total ? <div className="donut-wrap">
      <svg className="donut-svg" viewBox="0 0 200 200" role="img" aria-label="Donut chart of spending by category">
        <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(200,190,160,.18)" strokeWidth="26" />
        {segments.map((s) => <circle key={s.id} cx="100" cy="100" r={R} fill="none" stroke={s.color} strokeWidth="26"
          strokeDasharray={`${Math.max(s.frac * C - 2, 0)} ${C}`} transform={`rotate(${-90 + s.offset * 360} 100 100)`} />)}
        <text x="100" y="96" textAnchor="middle" className="donut-total">{money(total)}</text>
        <text x="100" y="116" textAnchor="middle" className="chart-axis">this month</text>
      </svg>
      <ul className="legend">{segments.slice(0, 5).map((s) => <li key={s.id}><span className="activity-main"><span className="category-dot" style={{ background: s.color }} />{s.label}</span><span className="amount">{money(s.amount)} <span className="legend-pct">{Math.round(s.frac * 100)}%</span></span></li>)}</ul>
    </div> : <div className="empty-state">No expenses recorded yet.</div>}
  </GlassCard>;
}

function Placeholder({ title, version }) {
  return <GlassCard className="panel placeholder"><h2>{title}</h2><p>Coming in {version}</p></GlassCard>;
}

function App() {
  const [expenses, setExpenses] = useState(loadExpenses);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses)); } catch {} }, [expenses]);
  const spent = useMemo(() => expenses.reduce((sum, expense) => sum + expense.amount, 0), [expenses]);
  const sadaqah = useMemo(() => expenses.filter((expense) => expense.category === "sadaqah").reduce((sum, expense) => sum + expense.amount, 0), [expenses]);
  const month = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date());
  const addExpense = (expense) => { setExpenses((current) => [...current, expense]); setModalOpen(false); };
  const exportData = () => {
    const blob = new Blob([JSON.stringify(expenses, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const link = document.createElement("a");
    link.href = url; link.download = "barakah-expenses.json"; link.click(); URL.revokeObjectURL(url);
  };
  return <main className="app-shell">
    <header className="topbar"><div><p className="eyebrow">Assalamu alaikum</p><h1>Your wealth, in balance.</h1><p className="subtitle">{month} · Full overview</p></div><div className="actions"><Btn className="btn-ghost" onClick={exportData}>Export</Btn><Btn className="btn-gold" onClick={() => setModalOpen(true)}>+ Add expense</Btn></div></header>
    <section className="stats-grid">
      <StatCard label="Spent this month" value={money(spent)} note={spent > BUDGET ? `${money(spent - BUDGET)} over ${money(BUDGET)}` : `${money(BUDGET - spent)} left of ${money(BUDGET)}`} noteClass={spent > BUDGET ? "negative" : ""} />
      <StatCard label="Income this month" value={money(0)} note="Net cash: $0" />
      <StatCard label="Portfolio value" value={money(0)} note="$0 invested" />
      <StatCard label="Sadaqah given" value={money(sadaqah)} note="A quiet act of generosity" noteClass="positive" />
    </section>
    <section className="charts-grid"><MonthlySpend /><CategoryDonut expenses={expenses} /></section>
    <section className="content-grid"><Transactions expenses={expenses} /><Placeholder title="Investments" version="v1.2" /><Placeholder title="Cash flow" version="v1.3" /><Placeholder title="Zakat" version="v1.4" /><Placeholder title="Shariah screener & Pakistan Islamic banks" version="v1.5" /><Placeholder title="CSV tools" version="v1.6" /></section>
    {modalOpen && <AddExpense onClose={() => setModalOpen(false)} onAdd={addExpense} />}
  </main>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
