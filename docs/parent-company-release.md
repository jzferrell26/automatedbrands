# Parent-company release

## Approved change

Automated Brands has a different job from JonathanFerrell.com: introduce the company building the brand family, explain what connects the businesses, and route the right opportunities to the right conversation.

The homepage leads with **We turn better ways of working into businesses.** AutomatedRE and AutomatedLO receive equal, substantial brand chapters. The operating approach is **Find the friction. Build the solution. Grow the business.** The company story has a compact founder attribution instead of the personal-site portrait and portfolio.

## Routes

- `/`: company purpose, brands, approach, company story, and partnership paths.
- `/partners`: clear choice between distribution and a new business opportunity.
- `/partners/distribution`: existing-brand audience and channel fit.
- `/partners/opportunities`: market knowledge, a real problem, and a meaningful contribution.
- `/build-with-us`: a secondary path for a scoped custom project.

The brand-specific product sites remain the home for product adoption, pricing, support, and offers. No personal-site or product-site code was changed. DNS and custom-domain settings are unchanged.

## Preserved boundaries

- The single-A geometry, icon assets, and approved blue/silver/graphite palette are unchanged.
- Event Beast and other outside work are not presented as parent-owned brands.
- No fictional subsidiaries, team size, revenue claims, funding program, or automatic equity arrangements.
- The inquiry helper prepares a local email draft. It does not send or save a lead, and no CRM integration has been added.
- Direct email and readable navigation remain available without JavaScript.

## Verification method

Run lint, TypeScript, the production build, and the Playwright suite before publishing. The suite covers all five routes, three browser profiles, product images, company/brand separation, route metadata, forms, copy failure, reduced motion, skip-link activation, old anchor compatibility, automated accessibility scans, and responsive overflow.

Screenshots in ignored `artifacts/parent-company/` cover desktop and mobile home, each main section, partnership routes, and the mobile inquiry layout. Actual browser renderings—not generated concept art—are used for visual review.

The iPhone WebKit profile's default Tab behavior skips links. Its skip-link test explicitly focuses the native link and verifies visibility and Enter activation; Chromium also verifies sequential Tab access. Interior dark surfaces have explicit backgrounds to remove ambiguity in WebKit's contrast evaluation.

After pushing, `node scripts/verify-deployment.mjs <commit>` checks the exact Git revision and all five public routes. Run the browser suite with `PLAYWRIGHT_BASE_URL` to validate the deployed release. Tests inspect email draft contents and make no real email submission.

Automated checks and visual review are not a comprehensive accessibility certification or a claim of testing on physical mobile devices.
