# Asset provenance

Assets were inspected and captured from public first-party pages during the flagship redesign on 2026-09-28 UTC. No authenticated customer pages, private contact records, or private messages were captured.

| Local asset | Source / meaning |
| --- | --- |
| `public/work/property-website.webp` | `https://www.automatedre.com/marketing/property-website-desktop.webp` — actual generated property-page demonstration. Property, office, and agent content is fictional/illustrative. |
| `public/work/property-flyer.webp` | `https://www.automatedre.com/flyer-examples/v5/signature-listing-featured-property.webp` — actual coordinated listing flyer, fictional demonstration details. |
| `public/work/automatedlo.webp` | Screenshot of the public `https://automatedlo.com` homepage, resized to 1280px and compressed to WebP. |
| `public/work/event-beast.webp` | Screenshot of the public `https://event-beast.vercel.app` desktop preview. This is work through Cuantico AI, with an in-development label. |
| `public/work/event-beast-mobile.webp` | Public Event Beast preview at 390 × 844 CSS pixels / 2× resolution. No signed-in attendee or private messaging content. |
| `public/work/jonathan.webp` | `https://jonathanferrell.com/_app/immutable/assets/jonathan-candid-profile.Cba7_4Lc.avif` — founder portrait already published on Jonathan's own site, converted to WebP for reliable delivery across the tested browser engines. |
| `public/brand/automatedre.svg` | `https://www.automatedre.com/brand/automatedre/horizontal.svg` — AutomatedRE's existing brand identity. |
| `public/brand/mark.svg` | Site's own single-A vector, matching the React component. Used for browser icons. |

The source pages may change. Screenshots are dated captures, not live embedded views. Recheck visibility, permissions, attribution, and labels before refreshing.

The parent-company revision uses only the AutomatedRE product outputs and AutomatedLO screenshot on its homepage. The prior Event Beast and founder portrait files remain historical unused assets; their presence on disk is not an ownership claim or approval to reintroduce a personal portfolio. The asset-refresh scripts now target only the brand family.

## Refresh process

1. `node scripts/capture-reference.mjs` captures public desktop views and the current parent-site baseline into ignored artifact folders.
2. `node scripts/prepare-assets.mjs` downloads the existing AutomatedRE outputs and creates the optimized AutomatedLO screenshot. Inspect source URLs and the captured image before running.
3. `npm run brand:icons` refreshes the favicon and Apple touch icon from `public/brand/mark.svg`.
4. Rebuild, run tests, and visually inspect desktop/mobile renders before publishing.

Contact destination was separately verified from the public `mailto:jonathan@jonathanferrell.com` link on Jonathan's personal site. The previous assumed `hello@automatedbrands.com` address is not used.
