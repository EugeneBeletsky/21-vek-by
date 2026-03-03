import { test, expect } from '@playwright/test';
import { config } from '../../utils/config';
import HomePage from '../../pages/home/HomePage';

test.beforeEach(async ({ page }) => {
  // per-test HomePage using built-in page
  const home = new HomePage(page);
  await home.goto(config.baseURL);
  await home.cookieModal1.reject();
  await home.cookieModal2.reject();
});

test.describe('[Login tests]', () => {
  test('T1 [Login] should login successfully with valid credentials', { tag: ['@regression', '@P1'] }, async ({ page }) => {
    const home = new HomePage(page);
    await home.header.openAccountMenu();
    await home.accountModal.clickLoginButton();
    await expect(await home.loginModal.getModal()).toBeVisible();
    await home.loginModal.login(config.credentials.valid.email, config.credentials.valid.password);
    await expect(await home.loginModal.getModal()).toBeHidden();
  });

  test('T2 [Login] should show error on wrong password', { tag: ['@regression', '@P1'] }, async ({ page }) => {
    const home = new HomePage(page);
    await home.header.openAccountMenu();
    await home.accountModal.clickLoginButton();
    await expect(await home.loginModal.getModal()).toBeVisible();
    await home.loginModal.login(config.credentials.valid.email, config.credentials.invalid.password);
    await expect(await home.loginModal.getErrorMessage()).toBeVisible({ timeout: 10000 });
    expect(await home.loginModal.getErrorMessageText()).toContain('Неправильный пароль');
  });

  test('T3 [Login] should show error on wrong email', { tag: ['@regression', '@P1'] }, async ({ page }) => {
    const home = new HomePage(page);
    await home.header.openAccountMenu();
    await home.accountModal.clickLoginButton();
    await expect(await home.loginModal.getModal()).toBeVisible();
    await home.loginModal.login(config.credentials.invalid.email, config.credentials.valid.password);
    await expect(await home.loginModal.getErrorMessage()).toBeVisible({ timeout: 10000 });
    expect(await home.loginModal.getErrorMessageText()).toContain('Проверьте электронную почту или ');
  });

  test('T4 [Login] should show error empty password', { tag: ['@regression', '@P1'] }, async ({ page }) => {
    const home = new HomePage(page);
    await home.header.openAccountMenu();
    await home.accountModal.clickLoginButton();
    await expect(await home.loginModal.getModal()).toBeVisible();
    await home.loginModal.login(config.credentials.valid.email, '');
    await expect(await home.loginModal.getErrorMessage()).toBeVisible({ timeout: 10000 });
    expect(await home.loginModal.getErrorMessageText()).toContain('Пароль не указан');
  });
});