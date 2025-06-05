/* eslint-env node */

import { defineConfig, devices } from '@playwright/test';
// import { PlaywrightTestConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

// Configure dotenv
dotenv.config();




/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 180000,
  globalTimeout: 180000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['allure-playwright'],
    ['line']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Enhanced video settings
    video: {
      mode: 'retain-on-failure',
      size: { width: 1366, height: 768 }
    },

    // Enhanced screenshot settings
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    actionTimeout: 10000,
    navigationTimeout: 30000,
    // expect: { timeout: 5000 }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }, 


  ],
  testMatch: /.*.spec.ts/
});
