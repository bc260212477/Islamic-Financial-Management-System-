import { test } from 'node:test';
import assert from 'node:assert/strict';
import { zakat, purification, screenStock, debtPayoff, goalMonthly, inflate, healthScore } from '../formulas.mjs';

test('FIN-11 zakat known case: net 20,600, nisab 6,630 -> 515.00', () => {
  const z = zakat({ cash: 20600, goldPricePerGram: 6630 / 85 });
  assert.equal(Math.round(z.due * 100) / 100, 515);
  assert.equal(z.eligible, true);
});
test('zakat below nisab -> 0', () => {
  assert.equal(zakat({ cash: 1000, goldPricePerGram: 28500 }).due, 0);
});
test('purification = dividend x ratio', () => {
  assert.equal(purification(10000, 5), 500);
});
test('screener: 28% debt / 24% non-compliant passes (4-star style case)', () => {
  const s = screenStock({ debtRatioPct: 28, nonCompliantRatioPct: 24, illiquidAssetsPct: 50 });
  assert.equal(s.compliant, true);
});
test('screener rejects conventional bank ratios', () => {
  assert.equal(screenStock({ debtRatioPct: 71, nonCompliantRatioPct: 88, illiquidAssetsPct: 22 }).compliant, false);
});
test('debt payoff terminates debt-free', () => {
  const r = debtPayoff([{ name: 'Card', balance: 120000, aprPct: 24, minPayment: 3000 }], 15000, 'avalanche');
  assert.equal(r.debtFree, true); assert.ok(r.months > 0 && r.months < 24);
});
test('goal monthly without return', () => {
  assert.equal(goalMonthly(120000, 0, 12), 10000);
});
test('inflation compounder', () => {
  assert.equal(Math.round(inflate(100000, 1, 10)), 110000);
});
test('FIN-19 health score needs >=3 indicators', () => {
  assert.equal(healthScore({ savingsRatePct: 20 }).score, null);
  assert.ok(healthScore({ savingsRatePct: 20, emergencyMonths: 6, habitPct: 80 }).score > 0);
});
