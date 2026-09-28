import fs from 'node:fs/promises';
import sharp from 'sharp';

const mark = await fs.readFile('public/brand/mark.svg');
const inner = await sharp(mark).resize(144, 127).png().toBuffer();
const apple = await sharp({ create: { width: 180, height: 180, channels: 4, background: '#090c10' } }).composite([{ input: inner, left: 18, top: 26 }]).png().toBuffer();
await fs.writeFile('src/app/apple-icon.png', apple);
const png = await sharp(apple).resize(64, 64).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
header[6] = 64; header[7] = 64;
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
await fs.writeFile('src/app/favicon.ico', Buffer.concat([header, png]));
console.log('Generated brand favicon and Apple touch icon from the shared mark.');
