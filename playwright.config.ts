/* eslint-env node */

import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 180000,
  expect: { timeout: 10000 },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [        
      ['html', { outputFolder: 'playwright-report', open: 'never' }]
    ]
    : [
      ['html']
    ],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.21vek.by',
    actionTimeout: 15000,
    navigationTimeout: 45000,
    screenshot: { mode: 'only-on-failure', fullPage: true },
    video: { mode: 'retain-on-failure', size: { width: 1366, height: 768 } },
    trace: 'on-first-retry',
    viewport: { width: 1366, height: 768 },
    ignoreHTTPSErrors: true,
    bypassCSP: true,
  },
  projects: [
    {
      name: 'setup',
      testMatch: /tests\/.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      testIgnore: ['tests/api/**'],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium-auth',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json'
      },
      dependencies: ['setup'],
      testMatch: ['tests/**/*.spec.ts']
    },
    {
      name: 'firefox',
      testIgnore: ['tests/api/**'],
      use: { ...devices['Desktop Firefox'] },
    },
  ],
  outputDir: 'test-results',
  testMatch: /.*\.spec\.ts/,
  preserveOutput: 'failures-only',
});
