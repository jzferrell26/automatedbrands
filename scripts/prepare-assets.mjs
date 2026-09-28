import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
import sharp from 'sharp';

await fs.mkdir('public/work', { recursive: true });
await fs.mkdir('public/brand', { recursive: true });
const assets = [
  ['https://www.automatedre.com/marketing/property-website-desktop.webp', 'public/work/property-website.webp'],
  ['https://www.automatedre.com/flyer-examples/v5/signature-listing-featured-property.webp', 'public/work/property-flyer.webp'],
  ['https://www.automatedre.com/brand/automatedre/horizontal.svg', 'public/brand/automatedre.svg'],
  ['https://jonathanferrell.com/_app/immutable/assets/jonathan-candid-profile.Cba7_4Lc.avif', 'public/work/jonathan.avif'],
];
for (const [url, destination] of assets) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url}: ${response.status}`);
  await fs.writeFile(destination, Buffer.from(await response.arrayBuffer()));
  console.log(destination);
}
for (const name of ['automatedlo', 'event-beast']) {
  await sharp(`artifacts/reference/${name}.png`).resize({ width: 1280 }).webp({ quality: 86 }).toFile(`public/work/${name}.webp`);
}
const browser = await chromium.launch({ channel: process.platform === 'win32' ? 'msedge' : undefined, headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await page.goto('https://event-beast.vercel.app', { waitUntil: 'networkidle', timeout: 45000 });
  const screenshot = await page.screenshot({ animations: 'disabled' });
  await sharp(screenshot).resize({ width: 780 }).webp({ quality: 87 }).toFile('public/work/event-beast-mobile.webp');
  await page.goto('https://jonathanferrell.com', { waitUntil: 'networkidle', timeout: 45000 });
  console.log('PERSONAL SITE IMAGES', JSON.stringify(await page.evaluate(() => [...document.images].map(i=>({alt:i.alt,src:i.currentSrc})))));
} finally { await browser.close(); }
