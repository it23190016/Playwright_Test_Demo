import { defineConfig, devices } from '@playwright/test';

const port = process.env.TEST_PORT || '3000';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['html'],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      clean: true,
      attachments: {
        screenshot: 'on',
        video: 'on',
        trace: 'on'
      }
    }]
  ],
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    actionTimeout: 60000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],
});