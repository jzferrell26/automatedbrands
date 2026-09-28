import fs from 'node:fs/promises';

const revision = process.argv[2];
const origin = process.argv[3] || 'https://automatedbrands.vercel.app';
if (!revision || !/^[a-f0-9]{7,40}$/.test(revision)) throw new Error('Pass the expected Git revision as the first argument.');
const expected = revision.slice(0, 7);
let last = '';
for (let attempt = 1; attempt <= 24; attempt++) {
  try {
    const response = await fetch(`${origin}/?release-check=${Date.now()}`, { cache: 'no-store', signal: AbortSignal.timeout(15000) });
    const html = await response.text();
    const actual = html.match(/<meta[^>]+name="build-revision"[^>]+content="([^"]+)"/)?.[1] || 'not available';
    if (actual !== last || attempt % 4 === 0) console.log(JSON.stringify({ attempt, status: response.status, expected, actual }));
    last = actual;
    if (response.ok && actual === expected) {
      if (!html.includes('Build my project brief') || !html.includes('Less explaining.')) throw new Error('Revision matches, but expected page content is missing.');
      const proof = { url: origin, expected, actual, status: response.status, checkedAt: new Date().toISOString() };
      await fs.mkdir('artifacts', { recursive: true });
      await fs.writeFile('artifacts/deployment-proof.json', JSON.stringify(proof, null, 2));
      console.log('VERIFIED', JSON.stringify(proof));
      process.exit(0);
    }
  } catch (error) { console.log(JSON.stringify({ attempt, error: String(error) })); }
  await new Promise(resolve => setTimeout(resolve, 7500));
}
throw new Error(`The production URL did not serve revision ${expected} within this verification window. Last seen: ${last}.`);
