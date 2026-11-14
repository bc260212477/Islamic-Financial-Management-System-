import { zakat, purification, screenStock, ribaCheck, debtPayoff, goalMonthly, inflate, taxEstimatorPK, healthScore } from './formulas.mjs';

/* Barakah OS — web SaaS front-end.
   Data: per-user, browser-local (localStorage). Demo seed is FICTIONAL and labelled DEMO.
   Production backend: Laravel platform in apps/platform (same features/formulas, PostgreSQL). */
const $ = s => document.querySelector(s);
const fmt = n => 'PKR ' + Math.round(Number(n || 0)).toLocaleString('en-PK');
const id = () => Math.random().toString(36).slice(2, 9);
const today = () => new Date().toISOString().slice(0, 10);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const tag = m => `<span class="tag ${m.toLowerCase()}">${m}</span>`;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2400); }

/* ---------- auth (demo-grade; production auth is Laravel Breeze) ---------- */
let session = JSON.parse(localStorage.getItem('barakah:session') || 'null');
const key = () => 'barakah-os:v1:' + session.email;
function seed() {
  return {
    accounts: [
      { id: id(), name: 'Meezan Bank — Current', type: 'Bank', balance: 485000 },
      { id: id(), name: 'Cash Wallet', type: 'Cash', balance: 32000 },
      { id: id(), name: 'Al Meezan Investment', type: 'Investment', balance: 1250000 },
    ],
    transactions: [
      { id: id(), date: today(), desc: 'Salary — Tech Co', cat: 'Salary', type: 'income', amount: 650000 },
      { id: id(), date: today(), desc: 'Rent', cat: 'Housing', type: 'expense', amount: 145000 },
      { id: id(), date: today(), desc: 'Groceries — Carrefour', cat: 'Food', type: 'expense', amount: 68500 },
      { id: id(), date: today(), desc: 'Fuel & transport', cat: 'Transport', type: 'expense', amount: 42000 },
      { id: id(), date: today(), desc: 'Freelance project', cat: 'Business', type: 'income', amount: 180000 },
      { id: id(), date: today(), desc: 'Netflix subscription', cat: 'Subscriptions', type: 'expense', amount: 1100 },
      { id: id(), date: today(), desc: 'Spotify subscription', cat: 'Subscriptions', type: 'expense', amount: 750 },
    ],
    budgets: [ { id: id(), cat: 'Food', limit: 90000 }, { id: id(), cat: 'Transport', limit: 50000 }, { id: id(), cat: 'Housing', limit: 150000 } ],
    goals: [ { id: id(), name: 'Hajj Fund', target: 1800000, saved: 640000 }, { id: id(), name: 'Emergency Fund', target: 900000, saved: 517000 }, { id: id(), name: 'Child Education', target: 2500000, saved: 310000 } ],
    businesses: [ { id: id(), name: 'Barakah Design Studio', revenue: 420000, expenses: 265000 } ],
    holdings: [
      { id: id(), symbol: 'OGDC', qty: 1200, price: 268, cost: 231 },
      { id: id(), symbol: 'MARI', qty: 150, price: 2840, cost: 2450 },
      { id: id(), symbol: 'MEBL', qty: 2000, price: 391, cost: 342 },
    ],
    family: [ { id: id(), name: 'Amina (Spouse)', relation: 'Spouse' }, { id: id(), name: 'Yusuf (Son)', relation: 'Child' } ],
    habits: [
      { id: id(), name: 'Fajr in congregation', days: [today()], target: '5×/week' },
      { id: id(), name: 'Qur’an — 1 page', days: [today()], target: 'Daily' },
      { id: id(), name: '30-min walk', days: [], target: 'Daily' },
    ],
    tasks: [
      { id: id(), title: 'File FBR tax return', status: 'todo', due: today(), priority: 'High' },
      { id: id(), title: 'Review PSX watchlist', status: 'doing', due: today(), priority: 'Medium' },
      { id: id(), title: 'Book dentist — Yusuf', status: 'todo', due: '2020-01-01', priority: 'Medium' },
    ],
    journal: [ { id: id(), date: today(), text: 'Weekly review: spending calmer, Fajr streak growing.' } ],
    reading: [ { id: id(), title: 'Riyad as-Salihin', progress: 42 } ],
    skills: [ { id: id(), name: 'Arabic', level: 35 }, { id: id(), name: 'Financial modelling', level: 68 } ],
    health: [ { id: id(), date: today(), metric: 'Steps', value: 8200 }, { id: id(), date: today(), metric: 'Sleep (h)', value: 6.8 } ],
    qard: [ { id: id(), person: 'Bilal (brother)', amount: 50000, due: '' } ],
    plan: 'Free',
  };
}
let S;
function load() { const raw = localStorage.getItem(key()); S = raw ? JSON.parse(raw) : seed(); save(); }
function save() { localStorage.setItem(key(), JSON.stringify(S)); }

/* ---------- market: FICTIONAL demo feed, always labelled DEMO ---------- */
const MARKET = [
  { symbol: 'OGDC', name: 'Oil & Gas Development', price: 268.4, chg: 1.8, debt: 12, nonComp: 4, illiquid: 71 },
  { symbol: 'MARI', name: 'Mari Petroleum', price: 2841, chg: 2.4, debt: 6, nonComp: 3, illiquid: 78 },
  { symbol: 'MEBL', name: 'Meezan Bank', price: 391.2, chg: 0.9, debt: 8, nonComp: 1, illiquid: 64 },
  { symbol: 'ENGRO', name: 'Engro Corporation', price: 512.7, chg: -0.6, debt: 28, nonComp: 9, illiquid: 58 },
  { symbol: 'KONV', name: 'Conventional Bank X', price: 88.1, chg: 0.4, debt: 71, nonComp: 88, illiquid: 22 },
];

/* ---------- derived numbers (single source; assistant cites these) ---------- */
function derived() {
  const income = S.transactions.filter(t => t.type === 'income').reduce((a, t) => a + +t.amount, 0);
  const expense = S.transactions.filter(t => t.type === 'expense').reduce((a, t) => a + +t.amount, 0);
  const netWorth = S.accounts.reduce((a, x) => a + +x.balance, 0) + S.holdings.reduce((a, h) => a + h.qty * h.price, 0);
  const invCost = S.holdings.reduce((a, h) => a + h.qty * h.cost, 0);
  const invValue = S.holdings.reduce((a, h) => a + h.qty * h.price, 0);
  const bizProfit = S.businesses.reduce((a, b) => a + (+b.revenue - +b.expenses), 0);
  const habitPct = S.habits.length ? Math.round(S.habits.filter(h => h.days.includes(today())).length / S.habits.length * 100) : 0;
  const overdue = S.tasks.filter(t => t.status !== 'done' && t.due && t.due < today());
  const z = zakat({ cash: S.accounts.reduce((a, x) => a + +x.balance, 0), investments: invValue, goldPricePerGram: 28500 });
  const hs = healthScore({ savingsRatePct: income ? (income - expense) / income * 100 : null, emergencyMonths: expense ? S.accounts.reduce((a, x) => a + +x.balance, 0) / expense : null, debtToIncomePct: null, zakatReady: z.eligible, habitPct });
  return { income, expense, net: income - expense, savingsRate: income ? Math.round((income - expense) / income * 1000) / 10 : 0, netWorth, invCost, invValue, invGain: invValue - invCost, bizProfit, habitPct, overdue, zakat: z, health: hs };
}

/* ---------- charts (inline SVG, labelled with as-of) ---------- */
function barChart(items) {
  const max = Math.max(...items.map(i => i.v), 1);
  return `<svg viewBox="0 0 ${items.length * 70} 150" style="width:100%">${items.map((i, ix) => `<rect x="${ix * 70 + 12}" y="${140 - i.v / max * 120}" width="42" height="${i.v / max * 120}" rx="6" fill="${i.c || '#1B7A43'}"/><text x="${ix * 70 + 33}" y="150" font-size="9" text-anchor="middle" fill="#6B7268">${i.l}</text>`).join('')}</svg><p style="color:var(--muted);font-size:.75rem">As of ${today()} · Source: your entries ${tag('MANUAL')}</p>`;
}
function ring(score) {
  const c = 2 * Math.PI * 46, off = score == null ? c : c * (1 - score / 100);
  return `<svg class="ring" viewBox="0 0 110 110"><circle class="bgc" cx="55" cy="55" r="46"/><circle class="fgc" cx="55" cy="55" r="46" stroke-dasharray="${c}" stroke-dashoffset="${off}"/><text x="55" y="60" text-anchor="middle" font-size="20" font-weight="700" fill="#14532D">${score == null ? '—' : score}</text></svg>`;
}

/* ---------- navigation ---------- */
const NAV = [
  ['Overview', [['dashboard', '🏠 Dashboard']]],
  ['Money OS', [['accounts', '🏦 Accounts'], ['transactions', '⇄ Transactions'], ['budgets', '🎯 Budgets'], ['goals', '🌙 Goals'], ['cashflow', '🌊 Cash Flow']]],
  ['Business OS', [['businesses', '🏢 Businesses']]],
  ['Investments', [['holdings', '📈 Holdings'], ['market', '🇵🇰 PSX Market']]],
  ['Tools', [['tools', '🧰 All Tools'], ['islamic', '☪️ Islamic Finance']]],
  ['Life OS', [['family', '👨‍👩‍👧 Family'], ['habits', '🔥 Habits'], ['tasks', '✅ Tasks & Routine'], ['growth', '📚 Learning & Growth'], ['health', '❤️ Health'], ['legacy', '🕋 Legacy & Community']]],
  ['Intelligence', [['assistant', '🤖 Decision OS (AI)'], ['reports', '📄 Reports']]],
  ['SaaS', [['settings', '⚙️ Workspace & Plans']]],
];
let route = 'dashboard', activeTool = null;

function renderAuth() {
  $('#app-view').hidden = true; $('#auth-view').hidden = false;
  $('#auth-view').innerHTML = `<div class="authwrap"><div class="card goldtop authcard">
    <div class="serif" style="font-size:2rem;color:var(--green)">Barakah <b style="color:var(--gold)">OS</b></div>
    <p style="color:var(--muted)">Live deliberately. Grow barakah. — Money, business, family, habits, learning, health &amp; Islamic finance in one SaaS.</p>
    <div class="banner"><b>Demo workspace.</b> Browser-local data; demo figures are FICTIONAL ${tag('DEMO')} Production sign-in is the Laravel platform.</div>
    <form id="login-form"><label>Email<input name="email" type="email" required value="demo@barakah.local"></label>
    <label>Password<input name="password" type="password" required value="password"></label>
    <button class="btn" style="width:100%">Sign in</button></form>
    <button class="btn gold" id="demo-btn" style="width:100%;margin-top:.6rem">▶ One-click demo login</button>
    <form id="reg-form" style="margin-top:1.2rem"><label>New here? Register — Name<input name="name" required></label><label>Email<input name="email" type="email" required></label><label>Password<input name="password" type="password" required></label><button class="btn ghost" style="width:100%">Create free workspace</button></form>
  </div></div>`;
  const signIn = email => { session = { email, name: email.split('@')[0] }; localStorage.setItem('barakah:session', JSON.stringify(session)); load(); renderApp(); toast('Assalamu alaikum — welcome to Barakah OS'); };
  $('#login-form').onsubmit = e => { e.preventDefault(); signIn(new FormData(e.target).get('email')); };
  $('#demo-btn').onclick = () => signIn('demo@barakah.local');
  $('#reg-form').onsubmit = e => { e.preventDefault(); signIn(new FormData(e.target).get('email')); };
}

function renderApp() {
  $('#auth-view').hidden = true; $('#app-view').hidden = false;
  $('#sidebar').innerHTML = `<div class="brand">Barakah <b>OS</b><br><span style="font-size:.72rem;color:#9FBFA8">Live deliberately. Grow barakah.</span></div>` +
    NAV.map(([g, items]) => `<h4>${g}</h4><nav>${items.map(([r, l]) => `<button data-route="${r}" class="${route === r ? 'active' : ''}"><span>${l.split(' ')[0]}</span><span class="lbl">${l.slice(l.indexOf(' ') + 1)}</span></button>`).join('')}</nav>`).join('') +
    `<div style="margin-top:1rem" class="lbl"><button class="btn gold small" id="logout">Sign out (${esc(session.name)})</button></div>`;
  document.querySelectorAll('[data-route]').forEach(b => b.onclick = () => { route = b.dataset.route; activeTool = null; renderApp(); });
  $('#logout').onclick = () => { session = null; localStorage.removeItem('barakah:session'); renderAuth(); };
  $('#topbar').innerHTML = `<div><b class="serif" style="font-size:1.25rem">${NAV.flatMap(x => x[1]).find(x => x[0] === route)?.[1] || 'Barakah OS'}</b> <span class="tag demo">DEMO DATA</span></div>
    <div><button class="btn ghost small" id="dark">🌙 Dark</button> <button class="btn small" id="quick-add">+ Add transaction</button></div>`;
  $('#dark').onclick = () => document.body.classList.toggle('dark');
  $('#quick-add').onclick = () => { route = 'transactions'; renderApp(); };
  VIEWS[route]();
}

/* ---------- shared view helpers ---------- */
const view = html => { $('#view').innerHTML = html; };
const form = (id, fields, submitLabel) => `<form class="inline" id="${id}">${fields}<button class="btn small">${submitLabel}</button></form>`;
const inp = (name, label, type = 'text', extra = '') => `<label>${label}<input name="${name}" type="${type}" ${extra}></label>`;
const delBtn = (kind, idv) => `<button class="btn danger small" data-del="${kind}:${idv}">Delete</button>`;
function bindDel(kind, rerender) { document.querySelectorAll(`[data-del^="${kind}:"]`).forEach(b => b.onclick = () => { const i = b.dataset.del.split(':')[1]; S[kind] = S[kind].filter(x => x.id !== i); save(); rerender(); toast('Deleted'); }); }

/* ---------- views ---------- */
const VIEWS = {
  dashboard() {
    const d = derived();
    view(`<div class="grid g4">
      ${[['Net Worth', fmt(d.netWorth)], ['Cash Flow (period)', fmt(d.net)], ['Savings Rate', d.savingsRate + '%'], ['Business Profit', fmt(d.bizProfit)]].map(([l, v]) => `<div class="card goldtop kpi"><div class="label">${l}</div><div class="num">${v}</div></div>`).join('')}
      </div><div class="grid g2" style="margin-top:1rem">
      <div class="card"><h3>Cash flow ${tag('MANUAL')}</h3>${barChart([{ l: 'Income', v: d.income, c: '#1B7A43' }, { l: 'Expenses', v: d.expense, c: '#C6A34F' }, { l: 'Net', v: Math.max(d.net, 0), c: '#14532D' }])}
      <p>Habits today: <b>${d.habitPct}%</b> · Overdue tasks: <b>${d.overdue.length}</b> · Zakat due (est.): <b>${fmt(d.zakat.due)}</b></p></div>
      <div class="card" style="text-align:center"><h3>Financial Health Score</h3>${ring(d.health.score)}<p style="color:var(--muted)">${d.health.score == null ? d.health.note : 'Composite of savings, emergency fund, zakat readiness & habits (FIN-19).'}</p>
      <button class="btn" onclick="document.querySelector('[data-route=assistant]').click()">🤖 What should I fix today?</button></div></div>
      <div class="card" style="margin-top:1rem"><h3>12 Pillars — status</h3><div class="grid g3">${[['💰 Money', fmt(d.netWorth) + ' net worth'], ['🏢 Business', fmt(d.bizProfit) + ' profit'], ['👨‍👩‍👧 Family', S.family.length + ' members'], ['🔥 Habits', d.habitPct + '% today'], ['✅ Tasks', S.tasks.filter(t => t.status !== 'done').length + ' open'], ['📚 Growth', S.skills.length + ' skills tracked'], ['❤️ Health', S.health.length + ' logs'], ['☪️ Islamic', 'Zakat ' + fmt(d.zakat.due)], ['🤖 Decision OS', 'Ask me anything →']].map(([a, b]) => `<div><b>${a}</b><br><span style="color:var(--muted)">${b}</span></div>`).join('')}</div></div>`);
  },
  accounts() {
    view(`<div class="card"><h3>Accounts ${tag('MANUAL')}</h3><table><tr><th>Name</th><th>Type</th><th>Balance</th><th></th></tr>${S.accounts.map(a => `<tr><td>${esc(a.name)}</td><td>${esc(a.type)}</td><td class="serif"><b>${fmt(a.balance)}</b></td><td>${delBtn('accounts', a.id)}</td></tr>`).join('')}</table>
    ${form('f', inp('name', 'Name') + inp('type', 'Type') + inp('balance', 'Balance', 'number', 'step="any"'), 'Add account')}</div>`);
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); S.accounts.push({ id: id(), name: f.get('name'), type: f.get('type'), balance: +f.get('balance') }); save(); VIEWS.accounts(); };
    bindDel('accounts', VIEWS.accounts);
  },
  transactions() {
    const d = derived();
    view(`<div class="grid g3">${[['Income', fmt(d.income)], ['Expenses', fmt(d.expense)], ['Net', fmt(d.net)]].map(([l, v]) => `<div class="card goldtop kpi"><div class="label">${l}</div><div class="num">${v}</div></div>`).join('')}</div>
    <div class="card" style="margin-top:1rem"><h3>Transactions ${tag('MANUAL')}</h3>
    ${form('f', inp('desc', 'Description') + inp('cat', 'Category') + `<label>Type<select name="type"><option>income</option><option>expense</option><option>transfer</option></select></label>` + inp('amount', 'Amount', 'number', 'step="any" required'), 'Add')}
    <table><tr><th>Date</th><th>Description</th><th>Category</th><th>Type</th><th>Amount</th><th></th></tr>${S.transactions.map(t => `<tr><td>${t.date}</td><td>${esc(t.desc)}</td><td>${esc(t.cat)}</td><td>${t.type}</td><td class="serif"><b>${fmt(t.amount)}</b></td><td>${delBtn('transactions', t.id)}</td></tr>`).join('')}</table>
    <p style="color:var(--muted);font-size:.85rem">Transfers are excluded from income/expenses (FIN-21). Family expenses added in Family OS appear here too.</p></div>`);
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); S.transactions.unshift({ id: id(), date: today(), desc: f.get('desc'), cat: f.get('cat'), type: f.get('type'), amount: +f.get('amount') }); save(); VIEWS.transactions(); };
    bindDel('transactions', VIEWS.transactions);
  },
  budgets() {
    view(`<div class="card"><h3>Budgets — spent this period</h3>${S.budgets.map(b => { const spent = S.transactions.filter(t => t.type === 'expense' && t.cat === b.cat).reduce((a, t) => a + +t.amount, 0); const pct = Math.min(100, Math.round(spent / b.limit * 100)); return `<p><b>${esc(b.cat)}</b> — ${fmt(spent)} / ${fmt(b.limit)} (${pct}%) ${spent > b.limit ? '⚠️ Over budget' : ''}</p><div class="progress"><i style="width:${pct}%"></i></div>`; }).join('')}
    ${form('f', inp('cat', 'Category') + inp('limit', 'Monthly limit', 'number', 'required'), 'Add budget')}</div>`);
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); S.budgets.push({ id: id(), cat: f.get('cat'), limit: +f.get('limit') }); save(); VIEWS.budgets(); };
  },
  goals() {
    view(`<div class="grid g2">${S.goals.map(g => { const pct = Math.min(100, Math.round(g.saved / g.target * 100)); return `<div class="card goldtop"><h3>${esc(g.name)}</h3><div class="num serif" style="font-size:1.4rem">${fmt(g.saved)} <span style="color:var(--muted);font-size:.9rem">/ ${fmt(g.target)}</span></div><div class="progress"><i style="width:${pct}%"></i></div><p>${pct}% · Needs ${fmt(goalMonthly(g.target, g.saved, 12))}/mo for 12 months</p><form class="inline" data-goal="${g.id}">${inp('add', 'Add savings', 'number')}<button class="btn small">Save</button></form> ${delBtn('goals', g.id)}</div>`; }).join('')}</div>
    <div class="card" style="margin-top:1rem">${form('f', inp('name', 'Goal name') + inp('target', 'Target', 'number', 'required') + inp('saved', 'Already saved', 'number'), 'Add goal')}</div>`);
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); S.goals.push({ id: id(), name: f.get('name'), target: +f.get('target'), saved: +f.get('saved') || 0 }); save(); VIEWS.goals(); };
    document.querySelectorAll('[data-goal]').forEach(f => f.onsubmit = e => { e.preventDefault(); const g = S.goals.find(x => x.id === f.dataset.goal); g.saved += +new FormData(f).get('add') || 0; save(); VIEWS.goals(); });
    bindDel('goals', VIEWS.goals);
  },
  cashflow() {
    const d = derived();
    const cats = {}; S.transactions.filter(t => t.type === 'expense').forEach(t => cats[t.cat] = (cats[t.cat] || 0) + +t.amount);
    view(`<div class="card"><h3>Cash Flow Statement ${tag('MANUAL')}</h3>${barChart(Object.entries(cats).map(([l, v]) => ({ l: l.slice(0, 8), v, c: '#C6A34F' })))}
    <table><tr><th></th><th>Amount</th></tr><tr><td>Total income</td><td>${fmt(d.income)}</td></tr><tr><td>Total expenses</td><td>${fmt(d.expense)}</td></tr><tr><td><b>Net cash flow</b></td><td><b>${fmt(d.net)}</b></td></tr><tr><td>Savings rate</td><td>${d.savingsRate}%</td></tr></table></div>
    <div class="card" style="margin-top:1rem"><h3>Forecast (simple, from current net)</h3><p>At ${fmt(d.net)}/period: 3 periods ≈ <b>${fmt(d.net * 3)}</b>, 6 periods ≈ <b>${fmt(d.net * 6)}</b>. ${d.net < 0 ? '⚠️ Negative — Decision OS recommends cutting the largest category above.' : 'On track — route surplus to goals before lifestyle creep.'}</p></div>`);
  },
  businesses() {
    view(`<div class="card"><h3>Businesses — kept separate from personal (entity principle)</h3><table><tr><th>Name</th><th>Revenue</th><th>Expenses</th><th>Profit → net worth</th><th></th></tr>${S.businesses.map(b => `<tr><td>${esc(b.name)}</td><td>${fmt(b.revenue)}</td><td>${fmt(b.expenses)}</td><td class="serif"><b>${fmt(+b.revenue - +b.expenses)}</b></td><td>${delBtn('businesses', b.id)}</td></tr>`).join('')}</table>
    ${form('f', inp('name', 'Name') + inp('revenue', 'Revenue', 'number') + inp('expenses', 'Expenses', 'number'), 'Add business')}</div>`);
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); S.businesses.push({ id: id(), name: f.get('name'), revenue: +f.get('revenue'), expenses: +f.get('expenses') }); save(); VIEWS.businesses(); };
    bindDel('businesses', VIEWS.businesses);
  },
  holdings() {
    const d = derived();
    view(`<div class="card"><h3>Holdings ${tag('MANUAL')}</h3><table><tr><th>Symbol</th><th>Qty</th><th>Price</th><th>Value</th><th>Gain/Loss</th><th></th></tr>${S.holdings.map(h => `<tr><td><b>${esc(h.symbol)}</b></td><td>${h.qty}</td><td>${fmt(h.price)}</td><td>${fmt(h.qty * h.price)}</td><td>${fmt(h.qty * (h.price - h.cost))}</td><td>${delBtn('holdings', h.id)}</td></tr>`).join('')}</table>
    <p>Portfolio: <b>${fmt(d.invValue)}</b> · P/L <b>${fmt(d.invGain)}</b></p>${form('f', inp('symbol', 'Symbol') + inp('qty', 'Qty', 'number') + inp('price', 'Price', 'number', 'step="any"') + inp('cost', 'Avg cost', 'number', 'step="any"'), 'Add holding')}</div>`);
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); S.holdings.push({ id: id(), symbol: f.get('symbol').toUpperCase(), qty: +f.get('qty'), price: +f.get('price'), cost: +f.get('cost') }); save(); VIEWS.holdings(); };
    bindDel('holdings', VIEWS.holdings);
  },
  market() {
    view(`<div class="banner">PSX board below is a <b>FICTIONAL demo feed</b> ${tag('DEMO')} — real prices enter via CSV/manual import in the Laravel platform until a licensed feed is approved. Never trade on demo prices.</div>
    <div class="card"><h3>PSX Market &amp; Shariah Screener ${tag('DEMO')}</h3><table><tr><th>Symbol</th><th>Company</th><th>Price</th><th>Change</th><th>Screen</th></tr>
    ${MARKET.map(m => { const s = screenStock({ debtRatioPct: m.debt, nonCompliantRatioPct: m.nonComp, illiquidAssetsPct: m.illiquid }); return `<tr><td><b>${m.symbol}</b></td><td>${m.name}</td><td>${fmt(m.price)}</td><td style="color:${m.chg >= 0 ? 'var(--green2)' : 'var(--danger)'}">${m.chg}%</td><td>${'★'.repeat(s.stars)}${'☆'.repeat(3 - s.stars)} ${s.compliant ? 'Compliant*' : 'Review'}</td></tr>`; }).join('')}</table>
    <p style="color:var(--muted);font-size:.85rem">*Screen: debt ≤33%, non-compliant income ≤30%, illiquid ≥20%. Screening is not a fatwa — verify with a qualified scholar.</p></div>`);
  },
  tools() {
    if (activeTool) return TOOL_VIEWS[activeTool]();
    view(`<h2 class="serif">Tools Hub — every tool works on your data</h2><div class="toolgrid">
    ${TOOLS.map(t => `<button class="toolcard" data-tool="${t.id}"><div class="ic">${t.icon}</div><h3>${t.name}</h3><p>${t.desc}</p></button>`).join('')}</div>
    <p style="color:var(--muted)">Formulas are unit-tested (apps/web/tests) — same rules as the Laravel platform (FINANCIAL-RULES.md).</p>`);
    document.querySelectorAll('[data-tool]').forEach(b => b.onclick = () => { activeTool = b.dataset.tool; VIEWS.tools(); });
  },
  islamic() {
    const d = derived();
    view(`<div class="grid g2"><div class="card goldtop"><h3>☪️ Zakat (live from your accounts)</h3><p>Zakatable assets ${fmt(d.zakat.assets)} · Nisab (85g gold) ${fmt(d.zakat.nisab)}</p><div class="num serif" style="font-size:1.6rem">Due: ${fmt(d.zakat.due)}</div><button class="btn" data-goto-tool="zakat">Open Zakat Calculator</button></div>
    <div class="card"><h3>🕋 Sadaqah Budget</h3><p>Rule: give 2.5% of monthly surplus first. Surplus ${fmt(d.net)} → suggested sadaqah <b>${fmt(Math.max(0, d.net) * 0.025)}</b>/period.</p><h3>🤝 Qard Hasan (interest-free loans given)</h3>${S.qard.map(q => `<p>${esc(q.person)} — ${fmt(q.amount)} ${q.due ? '· due ' + q.due : ''}</p>`).join('')}${form('f', inp('person', 'Person') + inp('amount', 'Amount', 'number') + inp('due', 'Due (optional)', 'date'), 'Record qard')}</div></div>
    <div class="card" style="margin-top:1rem"><h3>No riba, ever</h3><p>Interest is never called “profit” here. Use the <b>Riba Detector</b> in Tools before signing any financing product. Zakat/sadaqah figures are estimates — confirm with a scholar for your madhab (Hanafi nisab default).</p></div>`);
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); S.qard.push({ id: id(), person: f.get('person'), amount: +f.get('amount'), due: f.get('due') }); save(); VIEWS.islamic(); };
    document.querySelector('[data-goto-tool]').onclick = () => { route = 'tools'; activeTool = 'zakat'; renderApp(); };
  },
  family() {
    view(`<div class="card"><h3>Family members</h3>${S.family.map(m => `<p><b>${esc(m.name)}</b> — ${esc(m.relation)} ${delBtn('family', m.id)}</p>`).join('')}${form('fm', inp('name', 'Name') + inp('relation', 'Relation'), 'Add member')}</div>
    <div class="card" style="margin-top:1rem"><h3>Family expense → flows into Cash Flow automatically</h3>${form('fe', inp('desc', 'Description') + inp('amount', 'Amount', 'number', 'required') + `<label>Member<select name="member">${S.family.map(m => `<option>${esc(m.name)}</option>`).join('')}</select></label>`, 'Add family expense')}</div>`);
    $('#fm').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); S.family.push({ id: id(), name: f.get('name'), relation: f.get('relation') }); save(); VIEWS.family(); };
    $('#fe').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); S.transactions.unshift({ id: id(), date: today(), desc: f.get('desc') + ' (' + f.get('member') + ')', cat: 'Family', type: 'expense', amount: +f.get('amount') }); save(); toast('Added — see Transactions & Cash Flow'); VIEWS.family(); };
    bindDel('family', VIEWS.family);
  },
  habits() {
    view(`<div class="card"><h3>Habits — tap to mark today (feeds Health Score &amp; Decision OS)</h3>${S.habits.map(h => { const done = h.days.includes(today()); const streak = h.days.length; return `<p><button class="btn small ${done ? '' : 'ghost'}" data-habit="${h.id}">${done ? '✅' : '○'} ${esc(h.name)}</button> <span style="color:var(--muted)">${esc(h.target)} · ${streak} day(s) logged</span></p>`; }).join('')}
    ${form('f', inp('name', 'Habit name') + inp('target', 'Target (e.g. Daily)'), 'Add habit')}</div>`);
    document.querySelectorAll('[data-habit]').forEach(b => b.onclick = () => { const h = S.habits.find(x => x.id === b.dataset.habit); h.days = h.days.includes(today()) ? h.days.filter(d => d !== today()) : [...h.days, today()]; save(); VIEWS.habits(); });
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); S.habits.push({ id: id(), name: f.get('name'), target: f.get('target'), days: [] }); save(); VIEWS.habits(); };
  },
  tasks() {
    const d = derived();
    view(`<div class="card"><h3>Tasks ${d.overdue.length ? `— ⚠️ ${d.overdue.length} overdue` : ''}</h3><table><tr><th>Task</th><th>Due</th><th>Priority</th><th>Status</th><th></th></tr>${S.tasks.map(t => `<tr><td>${esc(t.title)} ${t.due < today() && t.status !== 'done' ? '<b style="color:var(--danger)">OVERDUE</b>' : ''}</td><td>${t.due || '—'}</td><td>${esc(t.priority)}</td><td><button class="btn small ghost" data-task="${t.id}">${t.status} →</button></td><td>${delBtn('tasks', t.id)}</td></tr>`).join('')}</table>
    ${form('f', inp('title', 'Task') + inp('due', 'Due', 'date') + `<label>Priority<select name="priority"><option>High</option><option>Medium</option><option>Low</option></select></label>`, 'Add task')}
    <p style="color:var(--muted)">Daily routine anchor: Fajr → Qur’an → deep work → family time → Isha review. Tasks feed the Growth pillar and your Friday review.</p></div>`);
    document.querySelectorAll('[data-task]').forEach(b => b.onclick = () => { const t = S.tasks.find(x => x.id === b.dataset.task); t.status = t.status === 'todo' ? 'doing' : t.status === 'doing' ? 'done' : 'todo'; save(); VIEWS.tasks(); });
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); S.tasks.push({ id: id(), title: f.get('title'), due: f.get('due'), priority: f.get('priority'), status: 'todo' }); save(); VIEWS.tasks(); };
    bindDel('tasks', VIEWS.tasks);
  },
  growth() {
    view(`<div class="grid g2"><div class="card"><h3>📖 Reading</h3>${S.reading.map(r => `<p>${esc(r.title)} — ${r.progress}%</p><div class="progress"><i style="width:${r.progress}%"></i></div>`).join('')}${form('fr', inp('title', 'Book title') + inp('progress', 'Progress %', 'number'), 'Add book')}</div>
    <div class="card"><h3>🧠 Skills</h3>${S.skills.map(s => `<p>${esc(s.name)} — Lv ${Math.round(s.level / 20)}</p><div class="progress"><i style="width:${s.level}%"></i></div>`).join('')}${form('fs', inp('name', 'Skill') + inp('level', 'Level %', 'number'), 'Add skill')}</div></div>
    <div class="card" style="margin-top:1rem"><h3>✍️ Journal / Weekly Review</h3>${S.journal.map(j => `<p><b>${j.date}</b> — ${esc(j.text)}</p>`).join('')}${form('fj', inp('text', 'Entry'), 'Add entry')}</div>`);
    $('#fr').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); S.reading.push({ id: id(), title: f.get('title'), progress: +f.get('progress') || 0 }); save(); VIEWS.growth(); };
    $('#fs').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); S.skills.push({ id: id(), name: f.get('name'), level: +f.get('level') || 0 }); save(); VIEWS.growth(); };
    $('#fj').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); S.journal.unshift({ id: id(), date: today(), text: f.get('text') }); save(); VIEWS.growth(); };
  },
  health() {
    view(`<div class="card"><h3>Health log</h3><table><tr><th>Date</th><th>Metric</th><th>Value</th></tr>${S.health.map(h => `<tr><td>${h.date}</td><td>${esc(h.metric)}</td><td>${esc(h.value)}</td></tr>`).join('')}</table>
    ${form('f', inp('metric', 'Metric (Steps / Sleep (h) / Weight)') + inp('value', 'Value'), 'Log')} <p style="color:var(--muted)">Health feeds the Health Score and Decision OS — a body that cannot pray standing is a financial risk too.</p></div>`);
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); S.health.unshift({ id: id(), date: today(), metric: f.get('metric'), value: f.get('value') }); save(); VIEWS.health(); };
  },
  legacy() {
    view(`<div class="grid g2"><div class="card goldtop"><h3>🕋 Wasiyyah (Will) Checker</h3><p>Islamic rule: bequests to non-heirs ≤ ⅓ of the estate after debts &amp; funeral costs.</p><div id="was-out"></div>${form('fw', inp('estate', 'Estate value', 'number', 'required') + inp('bequest', 'Planned bequest to non-heirs', 'number', 'required'), 'Check')}</div>
    <div class="card"><h3>🌳 Legacy &amp; Community roadmap</h3><p>Family Tree · Parent Care Log · Yateem Sponsorship · Marriage/Mahr Goal · Child Education Fund (already in Goals). Community OS and full inheritance (faraid) distribution arrive in v1.7 — faraid shares must be scholar-verified, so this app checks the ⅓ limit only and never issues a fatwa.</p></div></div>`);
    $('#fw').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); const max = +f.get('estate') / 3; $('#was-out').innerHTML = `<p>Max bequest: <b>${fmt(max)}</b> — yours ${fmt(+f.get('bequest'))} is <b>${+f.get('bequest') <= max ? '✅ within the ⅓ limit' : '⚠️ above the ⅓ limit'}</b>.</p>`; };
  },
  assistant() {
    const d = derived();
    view(`<div class="card"><h3>🤖 Decision OS — grounded in YOUR numbers, cites everything</h3><div id="chat">${chatLog.map(m => `<p><b>${m.who}:</b> ${m.text}</p>`).join('')}</div>
    ${form('f', inp('q', 'Ask: “What should I fix today?” · “Can I afford a car?” · “Zakat?”', 'text', 'required'), 'Ask')}
    <p style="color:var(--muted);font-size:.85rem">Refuses trades &amp; fatwas. Says “I don’t have that data” instead of inventing numbers.</p></div>`);
    $('#f').onsubmit = e => { e.preventDefault(); const q = new FormData(e.target).get('q'); chatLog.push({ who: 'You', text: esc(q) }, { who: 'Decision OS', text: answer(q, d) }); VIEWS.assistant(); };
  },
  reports() {
    const d = derived();
    view(`<div class="card"><h3>Reports</h3><table><tr><th>Metric</th><th>Value</th><th>Source</th></tr>
    ${[['Net worth', fmt(d.netWorth), 'Accounts + Holdings'], ['Income', fmt(d.income), 'Transactions'], ['Expenses', fmt(d.expense), 'Transactions'], ['Savings rate', d.savingsRate + '%', 'Transactions'], ['Business profit', fmt(d.bizProfit), 'Businesses'], ['Portfolio P/L', fmt(d.invGain), 'Holdings'], ['Zakat due (est.)', fmt(d.zakat.due), 'Accounts + Holdings'], ['Habits today', d.habitPct + '%', 'Habits'], ['Overdue tasks', d.overdue.length, 'Tasks']].map(r => `<tr><td>${r[0]}</td><td class="serif"><b>${r[1]}</b></td><td>${r[2]} ${tag('MANUAL')}</td></tr>`).join('')}</table>
    <button class="btn" id="csv">⬇ Export transactions CSV</button> <button class="btn ghost" id="json">⬇ Backup JSON</button> <label style="display:inline-block">Restore <input type="file" id="restore" accept=".json" style="width:auto"></label></div>`);
    $('#csv').onclick = () => download('barakah-transactions.csv', 'date,description,category,type,amount\n' + S.transactions.map(t => [t.date, t.desc, t.cat, t.type, t.amount].join(',')).join('\n'), 'text/csv');
    $('#json').onclick = () => download('barakah-backup.json', JSON.stringify(S, null, 2), 'application/json');
    $('#restore').onchange = async e => { S = JSON.parse(await e.target.files[0].text()); save(); renderApp(); toast('Backup restored'); };
  },
  settings() {
    view(`<div class="grid g3">${[['Free', 'PKR 0', 'Dashboard · 2 accounts · Zakat & screener tools · 1 user'], ['Pro', 'PKR 1,499/mo', 'Unlimited accounts · Budgets · Business OS · AI Decision OS · CSV import'], ['Family', 'PKR 2,999/mo', '5 seats · Family OS · Shared goals · Legacy planner']].map(([n, p, f]) => `<div class="card goldtop plan ${S.plan === n ? 'cur' : ''}"><h3>${n}</h3><div class="num serif" style="font-size:1.4rem">${p}</div><p style="color:var(--muted)">${f}</p><button class="btn small" data-plan="${n}">${S.plan === n ? 'Current plan' : 'Choose ' + n}</button></div>`).join('')}</div>
    <div class="card" style="margin-top:1rem"><h3>Workspace (SaaS)</h3><p>Tenant: <b>${esc(session.email)}</b> — your data is isolated to this sign-in on this device. Roles (production Laravel): Owner / Accountant / Viewer (spatie RBAC). Billing: <span class="tag delayed">NOT CONNECTED</span> — no payment provider is wired; plans are informational until you connect Stripe/PayFast.</p>
    <p>Production backend: <b>Laravel platform</b> (PostgreSQL, tenant isolation tests in CI). Connected accounts this session: Vercel (no project yet), Supabase (org ready, no project yet — needs your DB password to create).</p>
    <button class="btn danger" id="reset">Reset demo data</button></div>`);
    document.querySelectorAll('[data-plan]').forEach(b => b.onclick = () => { S.plan = b.dataset.plan; save(); VIEWS.settings(); toast('Plan set to ' + S.plan + ' (demo — billing not connected)'); });
    $('#reset').onclick = () => { S = seed(); save(); renderApp(); };
  },
};

/* ---------- tools hub ---------- */
const TOOLS = [
  { id: 'zakat', icon: '☪️', name: 'Zakat Calculator', desc: '2.5% on net zakatable assets ≥ nisab (85g gold). FIN-11.' },
  { id: 'screener', icon: '🔍', name: 'Halal Stock Screener', desc: 'Debt ≤33%, non-compliant ≤30%, illiquid ≥20%.' },
  { id: 'purify', icon: '💧', name: 'Dividend Purification', desc: 'Donate dividend × non-compliant income ratio.' },
  { id: 'riba', icon: '🚫', name: 'Riba Detector', desc: 'Check a financing product for interest red flags.' },
  { id: 'debt', icon: '⛰️', name: 'Debt Payoff Planner', desc: 'Snowball vs avalanche — escape existing debt fastest.' },
  { id: 'goal', icon: '🎯', name: 'Goal Planner', desc: 'Monthly saving needed for any target (Hajj, Mahr, home).' },
  { id: 'inflate', icon: '📉', name: 'Inflation Compounder', desc: 'What idle cash loses every year.' },
  { id: 'tax', icon: '🧾', name: 'Tax Estimator (PK)', desc: 'Indicative salaried slabs — verify with FBR.' },
  { id: 'subs', icon: '✂️', name: 'Subscription Audit', desc: 'Find recurring leaks in your transactions.' },
];
const toolShell = (title, body) => view(`<button class="btn ghost small" id="back">← All tools</button><div class="card goldtop" style="margin-top:.7rem"><h3>${title}</h3>${body}<div id="tool-out" style="margin-top:1rem"></div></div>`) || ($('#back').onclick = () => { activeTool = null; VIEWS.tools(); });
let chatLog = [{ who: 'Decision OS', text: 'Assalamu alaikum. Ask me “What should I fix today?” — I only use your real entries and cite them.' }];
function answer(q, d) {
  const s = q.toLowerCase();
  if (/buy|sell|trade|fatwa|halal or haram/.test(s) && /stock|share|trade|buy|sell/.test(s)) return 'I can’t execute or recommend trades, and I never issue fatwas. I can screen a stock with the Halal Screener and show its ratios for your scholar to judge.';
  if (/fix today|today/.test(s)) return `Today: habits at ${d.habitPct}% (${S.habits.filter(h => h.days.includes(today())).length}/${S.habits.length} done), ${d.overdue.length} overdue task(s)${d.overdue.length ? ' — first: “' + esc(d.overdue[0].title) + '”' : ''}, net cash flow ${fmt(d.net)} (savings rate ${d.savingsRate}%). Biggest lever: ${d.overdue.length ? 'clear the overdue task' : d.savingsRate < 15 ? 'raise savings rate toward 15%+' : 'route surplus to your top goal'}. [Sources: Habits, Tasks, Transactions — ${'MANUAL'}]`;
  if (/zakat/.test(s)) return `Zakat estimate: assets ${fmt(d.zakat.assets)}, nisab ${fmt(d.zakat.nisab)}, due <b>${fmt(d.zakat.due)}</b> ${d.zakat.eligible ? '(eligible)' : '(below nisab)'}. [Source: Accounts + Holdings — MANUAL] Confirm with a scholar for your madhab.`;
  if (/afford|car|buy/.test(s)) return `With net cash flow ${fmt(d.net)}/period and net worth ${fmt(d.netWorth)}: a purchase is comfortable if its monthly cost stays under ~30% of net (${fmt(d.net * 0.3)}). Tell me the price and I’ll run the Goal Planner. [Source: Transactions — MANUAL]`;
  if (/debt|loan/.test(s)) return 'Open Tools → Debt Payoff Planner. Interest is never “profit” in Barakah OS; the planner only helps you exit existing debt faster.';
  return 'I don’t have that data in your workspace yet — add it (accounts, transactions, habits or tasks) and ask again. I won’t invent numbers.';
}
const TOOL_VIEWS = {
  zakat() { toolShell('☪️ Zakat Calculator', `${form('f', inp('cash', 'Cash & bank', 'number', 'required') + inp('investments', 'Investments value', 'number') + inp('debts', 'Debts owed', 'number') + inp('gold', 'Gold price / gram (PKR)', 'number', 'value="28500" required'), 'Calculate')}<p style="color:var(--muted)">Known-case check: net 20,600 with nisab 6,630 → zakat 515.00 (FIN-11, unit-tested).</p>`);
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); const z = zakat({ cash: +f.get('cash'), investments: +f.get('investments'), debts: +f.get('debts'), goldPricePerGram: +f.get('gold') }); $('#tool-out').innerHTML = `<p>Net zakatable: <b>${fmt(z.net)}</b> · Nisab: <b>${fmt(z.nisab)}</b><br><span class="serif" style="font-size:1.5rem">Zakat due: ${fmt(z.due)}</span> ${z.eligible ? '' : '(below nisab — no zakat due)'}</p>`; }; },
  screener() { toolShell('🔍 Halal Stock Screener', form('f', inp('debt', 'Debt % of market cap', 'number', 'required') + inp('noncomp', 'Non-compliant income %', 'number', 'required') + inp('illiq', 'Illiquid assets %', 'number'), 'Screen'));
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); const r = screenStock({ debtRatioPct: +f.get('debt'), nonCompliantRatioPct: +f.get('noncomp'), illiquidAssetsPct: +f.get('illiq') }); $('#tool-out').innerHTML = r.checks.map(c => `<p>${c.pass ? '✅' : '❌'} ${c.name} — ${c.value}%</p>`).join('') + `<p><b>${'★'.repeat(r.stars)}${'☆'.repeat(3 - r.stars)}</b> — screening only, not a fatwa.</p>`; }; },
  purify() { toolShell('💧 Dividend Purification', form('f', inp('div', 'Dividend received', 'number', 'required') + inp('ratio', 'Non-compliant income ratio %', 'number', 'required'), 'Calculate'));
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); $('#tool-out').innerHTML = `<p>Donate to purify: <b class="serif" style="font-size:1.3rem">${fmt(purification(+f.get('div'), +f.get('ratio')))}</b></p>`; }; },
  riba() { toolShell('🚫 Riba Detector', form('f', inp('name', 'Product name') + inp('apr', 'APR %', 'number', 'step="any"') + inp('fee', 'Flat fee (PKR)', 'number') + inp('late', 'Late fee %', 'number', 'step="any"'), 'Check'));
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); const r = ribaCheck({ productName: f.get('name'), aprPct: +f.get('apr') || 0, flatFee: +f.get('fee') || 0, lateFeePct: +f.get('late') || 0 }); $('#tool-out').innerHTML = r.isRiba ? r.flags.map(x => `<p>🚩 ${esc(x)}</p>`).join('') + '<p><b>Verdict: contains riba red flags — avoid / ask a scholar.</b></p>' : '<p>✅ No interest red flags in what you entered. Still read the full contract.</p>'; }; },
  debt() { toolShell('⛰️ Debt Payoff Planner', `${form('f', inp('balance', 'Debt balance', 'number', 'required') + inp('apr', 'APR % (existing debt)', 'number', 'step="any" required') + inp('pay', 'Monthly payment', 'number', 'required') + `<label>Strategy<select name="s"><option>snowball</option><option>avalanche</option></select></label>`, 'Plan')}`);
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); const r = debtPayoff([{ name: 'Debt', balance: +f.get('balance'), aprPct: +f.get('apr'), minPayment: 0 }], +f.get('pay'), f.get('s')); $('#tool-out').innerHTML = `<p>Debt-free in <b>${r.months} months</b> · Interest cost meanwhile: ${fmt(r.totalInterest)} (shown only to help you exit faster — never as income).</p>`; }; },
  goal() { toolShell('🎯 Goal Planner', form('f', inp('target', 'Target amount', 'number', 'required') + inp('saved', 'Already saved', 'number') + inp('months', 'Months', 'number', 'value="12" required'), 'Calculate'));
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); $('#tool-out').innerHTML = `<p>Save <b class="serif" style="font-size:1.3rem">${fmt(goalMonthly(+f.get('target'), +f.get('saved'), +f.get('months')))}</b> / month.</p>`; }; },
  inflate() { toolShell('📉 Inflation Compounder', form('f', inp('amt', 'Amount held in cash', 'number', 'required') + inp('yrs', 'Years', 'number', 'value="5"') + inp('inf', 'Inflation %', 'number', 'value="12" step="any"'), 'Calculate'));
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); const future = inflate(+f.get('amt'), +f.get('yrs'), +f.get('inf')); $('#tool-out').innerHTML = `<p>You would need <b>${fmt(future)}</b> in ${f.get('yrs')} years to match today’s ${fmt(+f.get('amt'))} — idle cash silently loses <b>${fmt(future - +f.get('amt'))}</b>.</p>`; }; },
  tax() { toolShell('🧾 Tax Estimator (Pakistan, salaried — indicative)', form('f', inp('inc', 'Annual income (PKR)', 'number', 'required'), 'Estimate'));
    $('#f').onsubmit = e => { e.preventDefault(); const f = new FormData(e.target); const r = taxEstimatorPK(+f.get('inc')); $('#tool-out').innerHTML = `<p>Estimated tax: <b>${fmt(r.tax)}</b> (effective ${r.effectivePct}%). Verify with FBR / a tax adviser before filing.</p>`; }; },
  subs() { const subs = S.transactions.filter(t => /subscription|netflix|spotify|prime|icloud/i.test(t.desc + t.cat)); const total = subs.reduce((a, t) => a + +t.amount, 0); toolShell('✂️ Subscription Audit', subs.length ? `<table><tr><th>Subscription</th><th>Amount</th></tr>${subs.map(t => `<tr><td>${esc(t.desc)}</td><td>${fmt(t.amount)}</td></tr>`).join('')}</table><p>Total leaking: <b>${fmt(total)}/period = ${fmt(total * 12)}/year</b>. Cancel one and route it to a goal.</p>` : '<p>No subscriptions found in your transactions. Add transactions with “subscription” in the name/category.</p>'); },
};
function download(name, content, type) { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([content], { type })); a.download = name; a.click(); }

/* ---------- boot ---------- */
if (session) { load(); renderApp(); } else renderAuth();
