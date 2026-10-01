import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = ["/", "/partners", "/partners/distribution", "/partners/opportunities", "/build-with-us"];
const draftRoutes = ["/partners/distribution", "/partners/opportunities", "/build-with-us"];

async function fillIntroduction(page: Page) {
  await page.getByLabel("Your name", { exact: true }).fill("QA Test Person");
  await page.getByLabel(/Company or website/).fill("Example Company");
  await page.locator('textarea[name="detail"]').fill("We work with business owners who repeatedly need a better workflow for their customers.");
  await page.locator('textarea[name="context"]').fill("We bring industry knowledge and direct access to people who experience this problem.");
}

test("home is a parent company, not a personal service portfolio", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  const response = await page.goto("/", { waitUntil: "networkidle" });
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/We turn better\s*ways of working\s*into businesses\./);
  await expect(page.getByRole("link", { name: "Explore our brands", exact: true })).toHaveAttribute("href", "#brands");
  await expect(page.locator("#brands article")).toHaveCount(2);
  await expect(page.locator("#automatedre")).toContainText("AutomatedRE");
  await expect(page.locator("#automatedlo")).toContainText("AutomatedLO");
  await expect(page.locator("main form, .company-hero img, #company img")).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText("Event Beast");
  await expect(page.locator("main")).not.toContainText("Cuantico");
  for (const id of ["brands", "approach", "company", "partnerships"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test("all actual brand imagery loads and the approved logo stays consistent", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth > 0), {
      timeout: 15000, message: `Image did not load: ${await image.getAttribute("alt")}`,
    }).toBe(true);
  }
  const ids = await page.locator("svg linearGradient").evaluateAll(elements => elements.map(e => e.id));
  expect(new Set(ids).size).toBe(ids.length);
  const mark = await page.locator(".site-header .brand-mark > path").evaluateAll(paths => paths.map(p => p.getAttribute("d")));
  expect(mark).toEqual(["M44 7h18l31 72H72L44 7Z", "M7 79 44 7h18L28 79H7Z", "M42 59h22l9 20H32l10-20Z"]);
  const colors = await page.evaluate(() => {
    const css = getComputedStyle(document.documentElement);
    return [css.getPropertyValue("--ice").trim(), css.getPropertyValue("--steel").trim()];
  });
  expect(colors).toEqual(["#78d8ff", "#c4cdd8"]);
});

test("homepage offers distinct distribution and business-opportunity paths", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Explore distribution partnerships/ }).click();
  await expect(page).toHaveURL(/\/partners\/distribution$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("You know the audience.");
  await page.getByRole("link", { name: "Partnership paths" }).click();
  await expect(page).toHaveURL(/\/partners$/);
  await page.getByRole("link", { name: /Explore a business opportunity/ }).click();
  await expect(page).toHaveURL(/\/partners\/opportunities$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("You know the problem.");
});

test("mobile navigation closes and works across routes", async ({ page }, info) => {
  test.skip(info.project.name === "desktop", "Only relevant at mobile sizes.");
  await page.goto("/partners");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(page.locator(".menu-toggle")).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Our brands" }).click();
  await expect(page).toHaveURL(/\/#brands$/);
  await expect(page.locator(".menu-toggle")).toHaveAttribute("aria-expanded", "false");
  await page.locator(".menu-toggle").click();
  await page.keyboard.press("Escape");
  await expect(page.locator(".menu-toggle")).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator(".menu-toggle")).toBeFocused();
});

test("the brand anchor lands below the sticky header", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore our brands", exact: true }).click();
  await expect.poll(() => page.evaluate(() => {
    const heading = document.querySelector("#brands-title")!.getBoundingClientRect();
    const header = document.querySelector(".site-header")!.getBoundingClientRect();
    return heading.top >= header.bottom && heading.top < innerHeight;
  })).toBe(true);
});

for (const route of draftRoutes) {
  test(`${route} prepares an honest email introduction without submitting data`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Review my introduction" }).click();
    expect(await page.getByLabel("Your name", { exact: true }).evaluate((i: HTMLInputElement) => i.validity.valueMissing)).toBe(true);
    await fillIntroduction(page);
    if (route.endsWith("distribution")) await page.getByLabel("Which brand interests you?").selectOption("AutomatedRE");
    const submissions: string[] = [];
    page.on("request", req => {
      if (req.method() === "POST" || req.url().includes("QA%20Test") || req.url().includes("QA+Test")) submissions.push(req.url());
    });
    await page.getByRole("button", { name: "Review my introduction" }).click();
    await expect(page.getByRole("heading", { name: "A good place to start." })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Your introduction", exact: true })).toHaveValue(/QA Test Person/);
    const href = await page.getByRole("link", { name: "Open email draft" }).getAttribute("href");
    expect(href).toMatch(/^mailto:jonathan@jonathanferrell.com\?/);
    expect(new URL(href!).searchParams.get("body")).toContain("Example Company");
    if (route.endsWith("distribution")) expect(new URL(href!).searchParams.get("body")).toContain("Brand of interest: AutomatedRE");
    await expect(page.getByRole("status")).toContainText("Nothing has been sent yet");
    expect(submissions).toEqual([]);
    await page.getByRole("button", { name: "Edit my introduction" }).click();
    await expect(page.getByLabel("Your name", { exact: true })).toHaveValue("QA Test Person");
  });
}

test("whitespace-only input is rejected and the copy fallback is clear", async ({ page }) => {
  await page.goto("/partners/opportunities");
  await fillIntroduction(page);
  await page.getByLabel("Your name", { exact: true }).fill("    ");
  await page.getByRole("button", { name: "Review my introduction" }).click();
  await expect(page.locator(".inquiry-form").getByRole("alert")).toContainText("not just spaces");
  await page.getByLabel("Your name", { exact: true }).fill("QA Test Person");
  await page.getByRole("button", { name: "Review my introduction" }).click();
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: () => Promise.reject(new Error("Unavailable")) } }));
  await page.getByRole("button", { name: "Copy introduction" }).click();
  await expect(page.getByRole("status")).toContainText("Clipboard unavailable");
});

test("company and product relationships remain explicit", async ({ page }) => {
  await page.goto("/partners");
  await page.locator("summary").filter({ hasText: "Are you offering investment" }).click();
  await expect(page.getByText(/not a funding application or a promise of equity/)).toBeVisible();
  await page.locator("summary").filter({ hasText: "Where do I go for product pricing" }).click();
  await expect(page.getByText(/Each brand has its own customer experience/)).toBeVisible();
  const rels = await page.locator('a[target="_blank"]').evaluateAll(elements => elements.map(e => e.getAttribute("rel")));
  expect(rels.every(rel => rel?.includes("noopener") && rel.includes("noreferrer"))).toBe(true);
});

test("every public route has a unique heading and correct canonical metadata", async ({ page }) => {
  const titles = new Set<string>();
  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.locator("main")).toHaveCount(1);
    const title = await page.title();
    expect(title).toContain("Automated Brands");
    titles.add(title);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).pathname).toBe(route);
    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute("content");
    expect(new URL(ogUrl!).pathname).toBe(route);
  }
  expect(titles.size).toBe(routes.length);
});

test("no horizontal overflow on every route at phone, tablet, and desktop sizes", async ({ page }, info) => {
  test.skip(info.project.name !== "desktop", "One engine sweeps viewport sizes.");
  test.setTimeout(90000);
  for (const width of [320, 390, 820, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route, { waitUntil: "networkidle" });
      const dimensions = await page.evaluate(() => ({ viewport: innerWidth, content: document.documentElement.scrollWidth }));
      expect(dimensions.content, `${route} overflows at ${width}px`).toBeLessThanOrEqual(dimensions.viewport + 1);
    }
  }
});

test("automated accessibility checks pass across all routes and review state", async ({ page }) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of routes) {
    await page.goto(route, { waitUntil: "networkidle" });
    const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(result.violations.map(v => ({ rule: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })), route).toEqual([]);
  }
  await fillIntroduction(page);
  await page.getByRole("button", { name: "Review my introduction" }).click();
  const result = await new AxeBuilder({ page }).include(".inquiry-form").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(result.violations).toEqual([]);
});

test("reduced motion, skip-link activation, and legacy anchors still work", async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const values = await page.locator(".company-hero h1, .hero-lower").evaluateAll(elements => elements.map(e => getComputedStyle(e).animationName));
  expect(values.every(value => value === "none")).toBe(true);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
  // The iPhone WebKit profile tabs controls rather than links by default.
  // Verify focus/reveal and Enter activation there; Chromium also checks Tab order.
  if (info.project.name === "webkit") await page.getByRole("link", { name: "Skip to content" }).focus();
  else await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  for (const id of ["work", "build", "studio", "process", "start"]) await expect(page.locator(`#${id}`)).toHaveCount(1);
});

test("social image, icons, sitemap, security headers, and branded 404 are served", async ({ page, request }) => {
  const response = await page.goto("/");
  expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response?.headers()["x-frame-options"]).toBe("SAMEORIGIN");
  const og = await page.locator('meta[property="og:image"]').getAttribute("content");
  const image = await request.get(new URL(og!).pathname);
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  for (const path of ["/favicon.ico", "/apple-icon.png", "/robots.txt"]) expect((await request.get(path)).status()).toBe(200);
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  for (const route of routes.slice(1)) expect(await sitemap.text()).toContain(route);
  const missing = await page.goto("/not-a-real-page");
  expect(missing?.status()).toBe(404);
  await page.getByRole("link", { name: "Back to Automated Brands" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("We turn better");
});

test("content, product links, and direct email remain available without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL, viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("We turn better");
    await expect(page.getByRole("navigation", { name: "Navigation without JavaScript" })).toBeVisible();
    await page.goto("/partners/distribution");
    await expect(page.locator(".inquiry-form form")).toBeHidden();
    await expect(page.getByRole("link", { name: "Write to Automated Brands" })).toHaveAttribute("href", /^mailto:jonathan@jonathanferrell.com/);
  } finally { await context.close(); }
});
