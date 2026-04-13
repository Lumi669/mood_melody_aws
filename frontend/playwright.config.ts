import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command:
      "NEXT_PUBLIC_API_URL_5=http://127.0.0.1:3100/api/mock-save-feedback pnpm exec next dev --hostname 127.0.0.1 --port 3100",
    port: 3100,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
