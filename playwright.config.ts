import { defineConfig, devices } from "@playwright/test";

const externalUrl = process.env.PLAYWRIGHT_BASE_URL;
const baseURL = externalUrl || "http://127.0.0.1:3214";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  timeout: 45000,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL, trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], channel: process.platform === "win32" ? "msedge" : undefined, viewport: { width: 1440, height: 1000 } } },
    { name: "mobile", use: { ...devices["iPhone 13"], browserName: "chromium", channel: process.platform === "win32" ? "msedge" : undefined } },
    { name: "webkit", use: { ...devices["iPhone 13"], browserName: "webkit" } },
  ],
  webServer: externalUrl ? undefined : { command: "npm run start -- --hostname 127.0.0.1 --port 3214", url: baseURL, reuseExistingServer: !process.env.CI, timeout: 60000 },
});
