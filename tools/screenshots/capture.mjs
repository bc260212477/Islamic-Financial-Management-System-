import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = process.env.SCREENSHOT_OUT || '../../docs/screenshots'; // relative to tools/screenshots
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();

// --- Static live demo (apps/static-v1) ---
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await page.screenshot({ path: `${OUT}/static-home-desktop.png`, fullPage: true });
const mobile = await browser.newPage({ viewport: { width: 375, height: 800 } });
await mobile.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
await mobile.waitForTimeout(1500);
await mobile.screenshot({ path: `${OUT}/static-home-mobile.png`, fullPage: true });

// --- Laravel platform (seeded FICTIONAL demo user) ---
const app = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await app.goto('http://127.0.0.1:8000/login', { waitUntil: 'networkidle' });
await app.screenshot({ path: `${OUT}/platform-login.png` });
await app.fill('input[name="email"]', 'demo@barakah.local');
await app.fill('input[name="password"]', 'password');
await app.click('button[type="submit"], form button');
await app.waitForLoadState('networkidle');
await app.waitForTimeout(1000);
await app.screenshot({ path: `${OUT}/platform-dashboard.png`, fullPage: true });
for (const [path, name] of [['/accounts', 'platform-accounts'], ['/market', 'platform-market'], ['/calculators', 'platform-calculators'], ['/habits', 'platform-habits']]) {
  await app.goto(`http://127.0.0.1:8000${path}`, { waitUntil: 'networkidle' });
  await app.waitForTimeout(800);
  await app.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
}
await browser.close();
console.log('screenshots written to', OUT);
