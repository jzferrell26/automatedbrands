# Flagship redesign verification

> Historical verification for the earlier software-studio presentation. The parent-company release replaces that site's hierarchy and test suite. See `parent-company-release.md` for the new release scope and verification.

Verified locally against the production build on 2026-09-28 UTC.

| Check | Result |
| --- | --- |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm run build` | Passed; homepage, icons, social image, robots, sitemap, and branded 404 generated |
| `npm test` | 33 passed; 3 intentionally skipped because they apply to a different viewport project |
| Browser engines | Chromium/Edge desktop, Chromium mobile emulation, WebKit mobile emulation |
| Horizontal overflow | None at 320, 360, 390, 540, 768, 820, 1024, 1440, or 1920 CSS pixels |
| Automated accessibility | No violations in the configured WCAG A/AA axe checks on the page and brief-review state in all three projects |
| Runtime page errors | None in browser smoke checks |

Visually reviewed desktop/mobile opening, portfolio, capability explorer, founder section, and inquiry layout. Fixed contrast issues and responsive line-break spacing found during review. Tested anchor positioning beneath the sticky header, keyboard tabs, mobile-menu dismissal, no-JavaScript fallback, and reduced-motion behavior. The live WebKit pass identified a portrait-loading problem not reproduced locally; the source portrait was converted to WebP and its intrinsic dimensions corrected. Individual image checks now report exactly which image failed.

This is automated testing plus visual review, not a claim of comprehensive accessibility certification or testing on physical mobile hardware.

The brief builder intentionally prepares an email rather than directly sending or storing a lead. Tests inspect the draft and verify that form submission makes no server POST; they do not send a real email. Domain/DNS configuration and a future CRM/direct-send integration are not part of this release.

Production revision verification is performed after pushing with `node scripts/verify-deployment.mjs <commit>`. Its timestamped result is saved to ignored `artifacts/deployment-proof.json`. Run the browser suite with `PLAYWRIGHT_BASE_URL` to validate the deployed build as well.
