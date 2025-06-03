import { test as base, expect, Page } from '@playwright/test';
import HomePage from '../pages/home/HomePage';

export const test = base.extend<{ loggedInPage: Page }>({
  loggedInPage: async ({ page }, use) => {
    const home = new HomePage(page);
    await home.loginViaUI();
    await use(page);
  },
});

export { expect } from '@playwright/test';
