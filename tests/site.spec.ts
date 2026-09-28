import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("the complete homepage loads without runtime errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", e => errors.push(e.message));
  const response = await page.goto("/", { waitUntil: "networkidle" });
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Big ideas.Built.");
  await expect(page.getByRole("heading", { name: /Less explaining\.\s*More showing\./ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Bring us your idea" })).toHaveAttribute("href", "#start");
  for (const id of ["work", "build", "studio", "process", "start"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
  // Visit each lazy image when it becomes visible and identify individual
  // loading failures instead of reporting one anonymous image-count failure.
  for (const image of await page.locator("main img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((i: HTMLImageElement) => i.complete && i.naturalWidth > 0), {
      timeout: 15000,
      message: `Image did not load: ${await image.getAttribute("alt")}`,
    }).toBe(true);
  }
  expect(errors).toEqual([]);
  const ids = await page.locator("svg linearGradient").evaluateAll(elements => elements.map(e => e.id));
  expect(new Set(ids).size).toBe(ids.length);
});

test("no page overflow at narrow, tablet, and desktop widths", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "Viewport sweep uses the desktop engine.");
  for (const width of [320, 360, 390, 540, 768, 820, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
    expect(dimensions.document, `Overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewport + 1);
  }
});

test("the mobile navigation opens, follows anchors, and closes", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "desktop", "Mobile navigation is hidden on desktop.");
  await page.goto("/");
  const menu = page.locator(".menu-toggle");
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "What we build" }).click();
  await expect(page).toHaveURL(/#build$/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
});

test("capability tabs support pointer and keyboard exploration", async ({ page }) => {
  await page.goto("/");
  const ai = page.getByRole("tab", { name: /Practical AI/ });
  await ai.click();
  await expect(ai).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("heading", { name: "Intelligence with a job to do." })).toBeVisible();
  await ai.press("ArrowDown");
  await expect(page.getByRole("tab", { name: /Connected operations/ })).toBeFocused();
  await expect(page.getByRole("heading", { name: "Less copy. Less paste. More progress." })).toBeVisible();
  await page.getByRole("tab", { name: /Connected operations/ }).press("Home");
  await expect(page.getByRole("tab", { name: /Custom software/ })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toHaveCount(1);
});

test("project brief validates input and prepares a real email without submitting", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Bring us your idea" }).click();
  await page.getByRole("button", { name: "Build my project brief" }).click();
  expect(await page.getByLabel("Your name", { exact: true }).evaluate((element: HTMLInputElement) => element.validity.valueMissing)).toBe(true);
  await page.getByLabel("Your name", { exact: true }).fill("QA Test Person");
  const option = page.getByRole("radio", { name: "Better operations" });
  expect(await option.evaluate(element => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(40);
  await option.check();
  await page.getByLabel(/Company or website/).fill("Example Company");
  await page.getByLabel("What should exist that doesn't yet?", { exact: true }).fill("Our team needs one place to connect orders, invoices, and customer updates.");
  const submissions: string[] = [];
  page.on("request", request => { if (request.method() === "POST" || request.url().includes("QA%20Test")) submissions.push(request.url()); });
  await page.getByRole("button", { name: "Build my project brief" }).click();
  await expect(page.getByRole("heading", { name: "Good ideas start somewhere." })).toBeVisible();
  await expect(page.getByRole("textbox", { name: "Your project brief" })).toHaveValue(/Better operations|better operations/);
  const email = page.locator(".brief-result").getByRole("link", { name: "Email Jonathan" });
  const href = await email.getAttribute("href");
  expect(href).toMatch(/^mailto:jonathan@jonathanferrell.com\?/);
  expect(decodeURIComponent(href || "")).toContain("Example Company");
  await expect(page.getByRole("status")).toContainText("nothing has been sent yet");
  expect(submissions).toEqual([]);
  await page.getByRole("button", { name: "Edit my idea" }).click();
  await expect(page.getByLabel("Your name", { exact: true })).toHaveValue("QA Test Person");
  await expect(page.getByRole("radio", { name: "Better operations" })).toBeChecked();
});

test("FAQ is usable and portfolio attribution stays honest", async ({ page }) => {
  await page.goto("/");
  const question = page.locator(".faq-list summary").filter({ hasText: "Do you only build for mortgage and real estate?" });
  await question.click();
  await expect(page.getByText(/Those are the industries behind our first two brands/)).toBeVisible();
  await expect(page.getByText("SELECTED BUILD / THROUGH CUANTICO AI", { exact: true })).toBeVisible();
  const links = await page.locator('a[target="_blank"]').evaluateAll(elements => elements.map(e => e.getAttribute("rel")));
  expect(links.every(rel => rel?.includes("noopener") && rel.includes("noreferrer"))).toBe(true);
});

test("WCAG A/AA checks pass on the page and brief result", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  for (const id of ["work", "build", "studio", "process", "start"]) await page.locator(`#${id}`).scrollIntoViewIfNeeded();
  const result = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(result.violations, JSON.stringify(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, message: n.failureSummary })) })), null, 2)).toEqual([]);
  await page.getByLabel("Your name", { exact: true }).fill("QA Test Person");
  await page.getByLabel("What should exist that doesn't yet?", { exact: true }).fill("An internal platform for our customer support team.");
  await page.getByRole("button", { name: "Build my project brief" }).click();
  const brief = await new AxeBuilder({ page }).include(".brief-builder").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(brief.violations).toEqual([]);
});

test("reduced motion disables animated decoration", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const values = await page.locator(".hero-copy, .hero-showcase").evaluateAll(elements => elements.map(e => getComputedStyle(e).animationName));
  expect(values.every(value => value === "none")).toBe(true);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe("auto");
});

test("the primary inquiry link lands below the sticky header", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Bring us your idea" }).click();
  await expect(page).toHaveURL(/#start$/);
  await expect.poll(async () => page.evaluate(() => {
    const heading = document.querySelector("#contact-title")!.getBoundingClientRect();
    const header = document.querySelector(".site-header")!.getBoundingClientRect();
    return heading.top >= header.bottom && heading.top < innerHeight;
  })).toBe(true);
});

test("metadata, social image, brand icons, sitemap, and security headers are served", async ({ page, request }) => {
  const response = await page.goto("/");
  await expect(page).toHaveTitle("Automated Brands | Big Ideas. Built.");
  expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response?.headers()["x-frame-options"]).toBe("SAMEORIGIN");
  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  expect(canonical).toMatch(/^https:\/\//);
  const og = await page.locator('meta[property="og:image"]').getAttribute("content");
  expect(og).toBeTruthy();
  const path = new URL(og!).pathname;
  const image = await request.get(path);
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  for (const url of ["/favicon.ico", "/apple-icon.png", "/robots.txt", "/sitemap.xml"]) expect((await request.get(url)).status()).toBe(200);
});

test("a missing page offers a useful branded way home", async ({ page }) => {
  const response = await page.goto("/this-page-does-not-exist");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("This page hasn't");
  await page.getByRole("link", { name: "Back to Automated Brands" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Big ideas.Built.");
});

test("without JavaScript the content and direct contact remain available", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Big ideas.");
    await expect(page.getByText("The brief builder needs JavaScript.", { exact: false })).toBeVisible();
    await expect(page.locator(".brief-builder form")).toBeHidden();
    await expect(page.getByRole("link", { name: "Email Jonathan directly with your idea." })).toHaveAttribute("href", "mailto:jonathan@jonathanferrell.com");
  } finally { await context.close(); }
});
