import { test as base, expect, Page } from '@playwright/test';
import HomePage from '../pages/home/HomePage';

export const test = base.extend<{ loggedInPage: Page }>({
  loggedInPage: async ({ page }, use) => {
    const home = new HomePage(page);
    await home.goto(process.env.BASE_URL!);
    await home.cookieModal.reject();
    await home.accountModal.openAccountModal();
    await home.accountModal.clickLoginButton();
    await home.loginModal.login(process.env.LOGIN_EMAIL!, process.env.LOGIN_PASSWORD!);
    await expect(await home.loginModal.isVisible()).toBeFalsy();
    await use(page);
  },
});

export { expect } from '@playwright/test';
