import { defineConfig, devices } from '@playwright/test';

const baseURL = 'http://localhost:5173/';

export default defineConfig({
  use: {
    baseURL,
    channel: 'chrome',
    headless: true,
    trace: 'off',
  },
  projects: [
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  timeout: 30_000,
});
