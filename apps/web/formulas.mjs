// Financial Management System — pure finance formulas (shared by the web SaaS and its node tests).
// Money is handled as plain numbers here for display; the Laravel platform
// stores DECIMAL(19,4). Never float-guess in the platform — see FINANCIAL-RULES.md.
export const NISAB_GOLD_GRAMS = 85;

export function zakat({ cash = 0, goldValue = 0, investments = 0, receivables = 0, debts = 0, goldPricePerGram = 0 }) {
  const assets = cash + goldValue + investments + receivables;
  const net = Math.max(0, assets - debts);
  const nisab = NISAB_GOLD_GRAMS * goldPricePerGram;
  const due = nisab > 0 && net >= nisab ? net * 0.025 : 0;
  return { assets, net, nisab, due, eligible: nisab > 0 && net >= nisab };
}

export function purification(dividend, nonCompliantIncomeRatioPct) {
  return dividend * (nonCompliantIncomeRatioPct / 100);
}

export function screenStock({ debtRatioPct, nonCompliantRatioPct, illiquidAssetsPct = 0 }) {
  const checks = [
    { name: 'Debt ≤ 33% of market cap', value: debtRatioPct, pass: debtRatioPct <= 33 },
    { name: 'Non-compliant income ≤ 30% (directive threshold)', value: nonCompliantRatioPct, pass: nonCompliantRatioPct <= 30 },
    { name: 'Illiquid assets ≥ 20% (has real operations)', value: illiquidAssetsPct, pass: illiquidAssetsPct >= 20 },
  ];
  const passed = checks.filter(c => c.pass).length;
  return { checks, stars: passed, compliant: passed === checks.length };
}

export function ribaCheck({ aprPct = 0, flatFee = 0, lateFeePct = 0, productName = '' }) {
  const flags = [];
  if (aprPct > 0) flags.push(`Charges ${aprPct}% APR — interest (riba) on a loan.`);
  if (flatFee > 0) flags.push(`Flat fee of ${flatFee} regardless of use — check if it is a disguised interest charge.`);
  if (lateFeePct > 0) flags.push(`Late fee of ${lateFeePct}% that grows the debt — impermissible increase on a loan.`);
  return { productName, isRiba: flags.length > 0, flags };
}

export function debtPayoff(debts, monthlyPayment, strategy = 'snowball') {
  // debts: [{name, balance, aprPct, minPayment}] — interest here is shown only to
  // prioritise payoff of existing (already-incurred) debts, never as "profit".
  const sorted = [...debts].sort((a, b) => strategy === 'avalanche' ? b.aprPct - a.aprPct : a.balance - b.balance);
  let months = 0, totalInterest = 0;
  const balances = new Map(sorted.map(d => [d.name, d.balance]));
  while ([...balances.values()].some(b => b > 0.005) && months < 600) {
    months++;
    let pool = monthlyPayment;
    for (const d of sorted) {
      let b = balances.get(d.name);
      if (b <= 0) continue;
      const interest = b * (d.aprPct / 100 / 12);
      totalInterest += interest; b += interest;
      const pay = Math.min(b, Math.max(d.minPayment, 0));
      b -= pay; pool -= pay; balances.set(d.name, b);
    }
    for (const d of sorted) {
      if (pool <= 0) break;
      let b = balances.get(d.name);
      if (b <= 0) continue;
      const pay = Math.min(b, pool); b -= pay; pool -= pay; balances.set(d.name, b);
    }
  }
  return { order: sorted.map(d => d.name), months, totalInterest: Math.round(totalInterest * 100) / 100, debtFree: months < 600 };
}

export function goalMonthly(target, current, months, annualReturnPct = 0) {
  const r = annualReturnPct / 100 / 12;
  const gap = Math.max(0, target - current);
  if (months <= 0) return gap;
  if (r === 0) return gap / months;
  return gap * r / (Math.pow(1 + r, months) - 1);
}

export function inflate(amount, years, inflationPct) {
  return amount * Math.pow(1 + inflationPct / 100, years);
}

export function taxEstimatorPK(annualIncome) {
  // Simplified Pakistan salaried slabs (indicative only — verify with FBR / a tax adviser).
  const slabs = [
    [600000, 0], [1200000, 0.025], [2200000, 0.125], [3200000, 0.225], [4100000, 0.275], [Infinity, 0.35],
  ];
  let tax = 0, prev = 0;
  for (const [cap, rate] of slabs) {
    if (annualIncome > prev) { tax += (Math.min(annualIncome, cap) - prev) * rate; prev = cap; } else break;
  }
  return { tax: Math.round(tax), effectivePct: annualIncome ? Math.round(tax / annualIncome * 1000) / 10 : 0 };
}

export function healthScore({ savingsRatePct, emergencyMonths, debtToIncomePct, zakatReady, habitPct }) {
  const parts = [];
  if (savingsRatePct != null) parts.push(Math.max(0, Math.min(100, savingsRatePct * 4)));
  if (emergencyMonths != null) parts.push(Math.max(0, Math.min(100, emergencyMonths / 6 * 100)));
  if (debtToIncomePct != null) parts.push(Math.max(0, 100 - debtToIncomePct * 2));
  if (zakatReady != null) parts.push(zakatReady ? 100 : 40);
  if (habitPct != null) parts.push(habitPct);
  if (parts.length < 3) return { score: null, parts: parts.length, note: 'Needs ≥3 indicators (FIN-19) — add more data.' };
  return { score: Math.round(parts.reduce((a, b) => a + b, 0) / parts.length), parts: parts.length, note: '' };
}
