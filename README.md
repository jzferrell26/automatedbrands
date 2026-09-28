# Automated Brands

**Big ideas. Built.** A product-led website for Automated Brands, the parent brand of AutomatedRE and AutomatedLO, with a selective custom software and AI studio practice.

## Run locally

Requires Node.js 22+ and npm. The site uses Next.js 16.3.6, React 19, TypeScript, and CSS with Tailwind's base import.

```sh
npm ci
npm run dev
```

The production site has no database, private API keys, or external form service dependencies. Assets and the main page are statically served; the capability explorer, mobile menu, brief builder, and optional entrance effects hydrate on the client.

## Quality checks

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install webkit
npm test
```

On Windows, tests use installed Microsoft Edge for Chromium and Playwright's WebKit for the iPhone/Safari-engine checks. On Linux/macOS, install Chromium too: `npx playwright install --with-deps chromium webkit`.

The test suite starts the production server on `127.0.0.1:3214`. It covers screen widths, image loading, runtime errors, mobile navigation, keyboard tabs, contact validation, no-JavaScript fallback, reduced motion, automated accessibility checks, metadata, social previews, icons, and the 404 route. Set `PLAYWRIGHT_BASE_URL` to run against a deployed site instead.

For screenshots, start the production server on port 3214 and run `npm run review`. An alternate URL can be passed to `node scripts/visual-review.mjs https://your-site.example`. Screenshots and reports remain in ignored `artifacts/`, `test-results/`, and `playwright-report/` directories.

## Contact behavior — intentionally explicit

The project-brief form **does not submit, send, or save a lead**. It formats the visitor's input locally, lets them review/copy it, then opens an email draft addressed to `jonathan@jonathanferrell.com`. That address was verified on Jonathan's public website. The visitor sends from their own email app.

No success message claims an email has been sent. With JavaScript disabled, a direct email link replaces the builder. No CRM, analytics, marketing pixels, tracking cookies, or local-storage persistence have been added. Do not turn the button into a fake submission. A future direct-send integration requires a real server endpoint, validation, abuse protection, and confirmed delivery/error behavior.

## Deployment

The repository is connected to Vercel. Keep the current primary URL at `https://automatedbrands.vercel.app` until the custom domain is connected. Set `NEXT_PUBLIC_SITE_URL=https://automatedbrands.com` and rebuild when that domain becomes primary; this updates the canonical URL, sitemap, and social metadata together. DNS and domain settings are outside this release.

The response includes a `build-revision` meta tag from Vercel's Git commit SHA so a deployed revision can be checked instead of guessed.

## Brand and content

- The locked parent palette is graphite, titanium silver, soft white, and restrained ice blue. See `docs/brand-direction.md`.
- `src/components/brand.tsx` supplies the single-A mark and wordmark. SVG gradient identifiers are explicitly scoped per instance.
- `public/brand/mark.svg` supplies browser-icon generation. Run `npm run brand:icons` after changing the shared geometry.
- AutomatedRE and AutomatedLO are the two parent-company brands. **Event Beast is a selected build through Cuantico AI**, not presented as an owned subsidiary. Its screen is labeled an in-development preview.
- Product images show real screens/outputs. AutomatedRE's property, office, and agent details are fictional demonstration content, not customer endorsements.
- Asset source URLs, capture notes, and refresh scripts are documented in `docs/asset-sources.md`.

## Main files

`src/app/page.tsx` is the server-rendered homepage. The interactive components are isolated under `src/components/`. Design tokens, responsive layouts, and reduced-motion behavior are in `src/app/globals.css`. Metadata helpers and canonical origin are in `src/lib/site.ts`.

The homepage is intentionally broad in positioning. Avoid mortgage-specific language in the parent-company hero, invented client logos, unverified results, fake availability counters, and guaranteed build timelines.
