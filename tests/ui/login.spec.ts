import { test, expect } from '@playwright/test';
import { config } from '../../utils/config';
import HomePage from '../../pages/home/HomePage';

//VARS
let home: HomePage;

test.beforeEach(async ({ page }) => {
  home = new HomePage(page);
});

test.describe('Login tests', () => {
  test('should show error on wrong password', async ({ page }) => {
    await home.goto(config.baseURL);
    await home.cookieModal.reject();
    await home.accountModal.openAccountModal();
    await home.accountModal.clickLoginButton();
    await expect(await home.loginModal.getModal()).toBeVisible();
    await home.loginModal.login(config.credentials.valid.email, config.credentials.invalid.password);
    await page.waitForLoadState();
    await expect(await home.loginModal.getErrorMessage()).toContain('Неправильный пароль');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await home.goto(config.baseURL);
    await home.cookieModal.reject();
    await home.accountModal.openAccountModal();
    await home.accountModal.clickLoginButton();
    await expect(await home.loginModal.getModal()).toBeVisible();
    await home.loginModal.login(config.credentials.valid.email, config.credentials.valid.password);
    await expect(await home.loginModal.getModal()).toBeHidden();
  });
});