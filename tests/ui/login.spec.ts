import { test, expect, Page, BrowserContext } from '@playwright/test';
import { config } from '../../utils/config';
import HomePage from '../../pages/home/HomePage';

//VARS
let home: HomePage;
let page: Page;
let context: BrowserContext;


test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  home = new HomePage(page);
});

test.describe('[Login tests]', () => {
  test('T1 [Login] should login successfully with valid credentials', { tag: ['@regression', '@P1'] }, async () => {
    await home.goto(config.baseURL);
    await home.cookieModal.reject();
    await home.accountModal.openAccountModal();
    await home.accountModal.clickLoginButton();
    await expect(await home.loginModal.getModal()).toBeVisible();
    await home.loginModal.login(config.credentials.valid.email, config.credentials.valid.password);
    await expect(await home.loginModal.getModal()).toBeHidden();
  });

  test('T2 [Login] should show error on wrong password', { tag: ['@regression', '@P1'] }, async () => {
    await home.goto(config.baseURL);
    await home.cookieModal.reject();
    await home.accountModal.openAccountModal();
    await home.accountModal.clickLoginButton();
    await expect(await home.loginModal.getModal()).toBeVisible();
    await home.loginModal.login(config.credentials.valid.email, config.credentials.invalid.password);
    await page.waitForLoadState();
    expect(await home.loginModal.getErrorMessage()).toContain('Неправильный пароль');
  });

  test('T3 [Login] should show error on wrong email', { tag: ['@regression', '@P1'] }, async () => {
    await home.goto(config.baseURL);
    await home.cookieModal.reject();
    await home.accountModal.openAccountModal();
    await home.accountModal.clickLoginButton();
    await expect(await home.loginModal.getModal()).toBeVisible();
    await home.loginModal.login(config.credentials.invalid.email, config.credentials.valid.password);
    await page.waitForLoadState();
    expect(await home.loginModal.getErrorMessage()).toContain('Проверьте электронную почту или ');
  });

  test('T4 [Login] should show error empty password', { tag: ['@regression', '@P1'] }, async () => {
    await home.goto(config.baseURL);
    await home.cookieModal.reject();
    await home.accountModal.openAccountModal();
    await home.accountModal.clickLoginButton();
    await expect(await home.loginModal.getModal()).toBeVisible();
    await home.loginModal.login(config.credentials.valid.email, '');
    await page.waitForLoadState();
    expect(await home.loginModal.getErrorMessage()).toContain('Пароль не указан');
  });
});