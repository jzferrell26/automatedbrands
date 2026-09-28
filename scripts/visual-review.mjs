import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';

const base = process.argv[2] || 'http://127.0.0.1:3214';
await fs.mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ channel: process.platform === 'win32' ? 'msedge' : undefined, headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: 'artifacts/after-desktop.png' });
  for (const id of ['work', 'build', 'studio', 'start']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.locator(`#${id}`).screenshot({ path: `artifacts/after-${id}.png`, style: '.site-header, .skip-link { visibility: hidden !important; }' });
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: 'artifacts/after-full.png', fullPage: true });
  for (const width of [320, 360, 390, 540, 768, 820, 1024, 1440]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto(base, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => ({ viewport: window.innerWidth, documentWidth: document.documentElement.scrollWidth, offenders: [...document.querySelectorAll('main > section, .container, .brief-builder, .nav-inner')].filter(e => e.getBoundingClientRect().right > innerWidth + 1 || e.getBoundingClientRect().left < -1).map(e => e.id || e.className) }));
    if (width === 390) {
      await page.screenshot({ path: 'artifacts/after-mobile-top.png' });
      await page.screenshot({ path: 'artifacts/after-mobile-full.png', fullPage: true });
      for (const id of ['work', 'start']) { await page.locator(`#${id}`).scrollIntoViewIfNeeded(); await page.waitForTimeout(300); await page.locator(`#${id}`).screenshot({ path: `artifacts/after-mobile-${id}.png`, style: '.site-header, .skip-link { visibility: hidden !important; }' }); }
    }
    console.log(JSON.stringify({ width, ...overflow }));
  }
  console.log(JSON.stringify({ pageErrors: errors }));
} finally { await browser.close(); }
