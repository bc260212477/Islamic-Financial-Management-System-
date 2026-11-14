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

const today = () => new Date().toISOString().slice(0, 10);
const categoryFor = (id) => CATEGORIES.find((category) => category.id === id) || CATEGORIES[0];
const formatDate = (date) => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(`${date}T12:00:00`));

function GlassCard({ children, className = "" }) { return <section className={`glass-card ${className}`}>{children}</section>; }
function Btn({ children, className = "", ...props }) { return <button className={`btn ${className}`} {...props}>{children}</button>; }

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

function Placeholder({ title, version }) {
  return <GlassCard className="panel placeholder"><h2>{title}</h2><p>Coming in {version}</p></GlassCard>;
}

function App() {
  const [expenses, setExpenses] = useState(() => {
    try { return JSON.parse(localStorage.getItem("barakah-expenses")) || SEED_EXPENSES; }
    catch { return SEED_EXPENSES; }
  });
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => localStorage.setItem("barakah-expenses", JSON.stringify(expenses)), [expenses]);
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
      <StatCard label="Spent this month" value={money(spent)} note={`${money(3200 - spent)} left of ${money(3200)}`} noteClass={spent > 3200 ? "negative" : ""} />
      <StatCard label="Income this month" value={money(0)} note="Net cash: $0" />
      <StatCard label="Portfolio value" value={money(0)} note="$0 invested" />
      <StatCard label="Sadaqah given" value={money(sadaqah)} note="A quiet act of generosity" noteClass="positive" />
    </section>
    <section className="content-grid"><Transactions expenses={expenses} /><Placeholder title="Monthly spend" version="v1.1" /><Placeholder title="Investments" version="v1.2" /><Placeholder title="Zakat & Sadaqah" version="v1.4" /></section>
    {modalOpen && <AddExpense onClose={() => setModalOpen(false)} onAdd={addExpense} />}
  </main>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
