import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const base = process.argv[2] || 'http://127.0.0.1:3214';
await fs.mkdir('artifacts/parent-company', { recursive: true });
const browser = await chromium.launch({ channel: process.platform === 'win32' ? 'msedge' : undefined, headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  async function load(path = '/') {
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
  }
  async function warmImages() {
    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(async i => { if (!i.complete) await new Promise(resolve => { i.onload = resolve; i.onerror = resolve; }); });
    }
  }
  await load();
  await page.screenshot({ path: 'artifacts/parent-company/home-desktop.png' });
  await warmImages();
  for (const id of ['brands', 'approach', 'company', 'partnerships']) {
    await page.locator(`#${id}`).screenshot({ path: `artifacts/parent-company/${id}.png`, animations: 'disabled', style: '.site-header, .skip-link { visibility: hidden !important; }' });
  }
  await page.evaluate(() => { document.activeElement?.blur(); scrollTo(0, 0); });
  await page.screenshot({ path: 'artifacts/parent-company/home-full.png', fullPage: true });
  for (const route of ['/partners', '/partners/distribution', '/partners/opportunities', '/build-with-us']) {
    await load(route);
    await page.screenshot({ path: `artifacts/parent-company/${route.split('/').filter(Boolean).join('-')}.png`, fullPage: true });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await load();
  await page.screenshot({ path: 'artifacts/parent-company/home-mobile.png' });
  await warmImages();
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: 'artifacts/parent-company/home-mobile-full.png', fullPage: true });
  await load('/partners/distribution');
  await page.screenshot({ path: 'artifacts/parent-company/distribution-mobile.png', fullPage: true });
  console.log(JSON.stringify({ base, directory: 'artifacts/parent-company', pageErrors: errors }));
} finally { await browser.close(); }
