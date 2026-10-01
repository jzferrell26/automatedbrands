import fs from 'node:fs/promises';
import sharp from 'sharp';

await fs.mkdir('public/work', { recursive: true });
await fs.mkdir('public/brand', { recursive: true });
const assets = [
  ['https://www.automatedre.com/marketing/property-website-desktop.webp', 'public/work/property-website.webp'],
  ['https://www.automatedre.com/flyer-examples/v5/signature-listing-featured-property.webp', 'public/work/property-flyer.webp'],
  ['https://www.automatedre.com/brand/automatedre/horizontal.svg', 'public/brand/automatedre.svg'],
];
for (const [url, destination] of assets) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${url}: ${response.status}`);
  await fs.writeFile(destination, Buffer.from(await response.arrayBuffer()));
  console.log(destination);
}
// Run capture-reference first and visually inspect the capture before publishing.
await sharp('artifacts/reference/automatedlo.png').resize({ width: 1280 }).webp({ quality: 86 }).toFile('public/work/automatedlo.webp');
console.log('public/work/automatedlo.webp');
