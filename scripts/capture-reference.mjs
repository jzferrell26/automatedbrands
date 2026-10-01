import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

await fs.mkdir('artifacts', { recursive: true });
await fs.mkdir('artifacts/reference', { recursive: true });
const browser = await chromium.launch({ channel: process.platform === 'win32' ? 'msedge' : undefined, headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  for (const [name, url, destination] of [
    ['before-desktop', 'https://automatedbrands.vercel.app', 'artifacts'],
    ['automatedre', 'https://www.automatedre.com', 'artifacts/reference'],
    ['automatedlo', 'https://automatedlo.com', 'artifacts/reference'],
  ]) {
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: path.join(destination, `${name}.png`), animations: 'disabled' });
      const details = await page.evaluate(() => ({ title: document.title, text: document.body.innerText.slice(0, 4000), images: [...document.images].map(i => ({ alt: i.alt, src: i.currentSrc })).slice(0, 16) }));
      console.log(JSON.stringify({ name, status: response?.status(), ...details }));
    } catch (error) { console.log(JSON.stringify({ name, error: String(error) })); }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('https://automatedbrands.vercel.app', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'artifacts/before-mobile.png', fullPage: true, animations: 'disabled' });
} finally { await browser.close(); }
