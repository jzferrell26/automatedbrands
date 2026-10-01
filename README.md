# Automated Brands

**Big ideas. Built.** The parent company behind AutomatedRE and AutomatedLO.

We turn better ways of working into businesses. This site introduces the company, explains the purpose of its brands, and provides specific paths for distribution partnerships and new business opportunities. Selected custom work has a separate, secondary route.

## Site structure

| Route | Purpose |
| --- | --- |
| `/` | Company purpose, the two brands, operating approach, company story, partnership paths |
| `/partners` | Choose a distribution relationship or a new business opportunity |
| `/partners/distribution` | Introduce a relevant audience, channel, or customer base |
| `/partners/opportunities` | Introduce a recurring market problem and a meaningful contribution |
| `/build-with-us` | Discuss a selected, scoped custom project |

The homepage is not Jonathan's personal portfolio. External client work and the large founder portrait have been removed from its public presentation. Product pricing, support, and offers remain with the individual product sites.

## Run locally

Requires Node.js 22+ and npm. The existing stack is Next.js 16.3.6, React 19, TypeScript, and CSS with Tailwind's base import.

```sh
npm ci
npm run dev
```

The site has no database, private API keys, or external form-service dependency. Pages are prerendered; navigation, local email-draft helpers, and optional entrance effects hydrate on the client.

## Quality checks

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install webkit
npm test
```

On Windows, tests use installed Microsoft Edge and Playwright WebKit. On Linux/macOS, install Chromium as well: `npx playwright install --with-deps chromium webkit`.

The test suite starts the production server on `127.0.0.1:3214`. It covers company/brand hierarchy, image loading, preserved logo geometry and palette, routes, mobile navigation, anchor positioning, form validation, email-draft generation, no-JavaScript fallback, reduced motion, keyboard access, automated accessibility scans, overflow, metadata, icons, sitemap, and the branded 404. Set `PLAYWRIGHT_BASE_URL` to test a deployment instead.

For visual review, start the production server on port 3214 and run `npm run review`. An alternate URL can be passed to `node scripts/visual-review.mjs https://your-site.example`. Screenshots remain in ignored `artifacts/parent-company/`; browser traces and reports remain in `test-results/` and `playwright-report/`.

## Inquiry behavior — no implied delivery

Each inquiry helper formats an introduction locally, lets the visitor review or copy it, then opens an email draft addressed to `jonathan@jonathanferrell.com`. This is the existing verified contact, not a newly assumed company inbox. **The visitor sends the email from their own email app. The website does not send, submit, or save the inquiry.**

No success message claims an email has been received. Without JavaScript, a direct email link replaces the helper. No CRM integration, analytics, marketing pixels, tracking cookies, or local-storage persistence have been added. A future direct-send integration needs a real endpoint, validation, abuse protection, and verified delivery/error behavior.

Partner inquiries do not automatically enroll anyone in a referral program, promise commissions, provide funding, or establish shared ownership. Scope and terms must be agreed separately.

## Deployment

The repository is connected to Vercel. Keep the primary URL at `https://automatedbrands.vercel.app` until the custom domain is connected. Set `NEXT_PUBLIC_SITE_URL=https://automatedbrands.com` and rebuild when that domain becomes primary. This updates canonical URLs, sitemap, and social metadata together. No DNS/domain changes are included in this release.

Every route exposes a `build-revision` meta tag from Vercel's Git commit SHA. Run `node scripts/verify-deployment.mjs <commit>` after pushing to confirm the exact release and all public routes.

## Brand and content guardrails

- **Owned brands first. Selected partnerships second. Custom projects third.** See `docs/brand-direction.md`.
- Keep the locked graphite, titanium silver, soft-white, and ice-blue palette. Do not redesign the approved single-A geometry during content work.
- `src/components/brand.tsx` supplies the mark and wordmark with scoped SVG gradient IDs; `public/brand/mark.svg` supplies icon generation.
- AutomatedRE and AutomatedLO are the brand family. Do not turn unrelated work through other organizations into an owned subsidiary.
- Product images are real outputs/screens. AutomatedRE's property, office, and agent content is fictional demonstration material, not an endorsement.
- No invented acquisitions, team size, milestones, business results, funding programs, or guaranteed timelines.
- Jonathan's personal history, speaking, and cross-company portfolio belong on his personal site. The parent has a compact founder attribution.

## Main implementation files

`src/app/layout.tsx` provides the shared header, accessible main landmark, and brand-directory footer. `src/app/page.tsx` is the parent homepage. Partnership routes use `src/components/inquiry-page.tsx` and the client-side `inquiry-form.tsx`. Inquiry intent lives in `src/lib/inquiries.ts`; per-route metadata and canonical origin are in `src/lib/site.ts`. Design tokens and responsive layouts are in `src/app/globals.css`.
