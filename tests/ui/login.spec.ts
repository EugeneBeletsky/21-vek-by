import { test, expect } from '../../fixtures/test.fixture';
import { config } from '../../utils/config';

test.beforeEach(async ({ homePage }) => {
  await homePage.goto(config.baseURL);
  await homePage.cookieModal1.reject();
  await homePage.cookieModal2.reject();
});

test.describe('[Login tests]', () => {
  test('T1 [Login] should login successfully with valid credentials', { tag: ['@regression', '@P1'] }, async ({ homePage }) => {
    await homePage.header.openAccountMenu();
    await homePage.accountModal.clickLoginButton();
    await expect(await homePage.loginModal.getModal()).toBeVisible();
    await homePage.loginModal.login(config.credentials.valid.email, config.credentials.valid.password);
    await expect(await homePage.loginModal.getModal()).toBeHidden();
  });

  test('T2 [Login] should show error on wrong password', { tag: ['@regression', '@P1'] }, async ({ homePage }) => {
    await homePage.header.openAccountMenu();
    await homePage.accountModal.clickLoginButton();
    await expect(await homePage.loginModal.getModal()).toBeVisible();
    await homePage.loginModal.login(config.credentials.valid.email, config.credentials.invalid.password);
    await expect(await homePage.loginModal.getErrorMessage()).toBeVisible({ timeout: 10000 });
    expect(await homePage.loginModal.getErrorMessageText()).toContain('Неправильный пароль');
  });

  test('T3 [Login] should show error on wrong email', { tag: ['@regression', '@P1'] }, async ({ homePage }) => {
    await homePage.header.openAccountMenu();
    await homePage.accountModal.clickLoginButton();
    await expect(await homePage.loginModal.getModal()).toBeVisible();
    await homePage.loginModal.login(config.credentials.invalid.email, config.credentials.valid.password);
    await expect(await homePage.loginModal.getErrorMessage()).toBeVisible({ timeout: 10000 });
    expect(await homePage.loginModal.getErrorMessageText()).toContain('Проверьте электронную почту или ');
  });

  test('T4 [Login] should show error empty password', { tag: ['@regression', '@P1'] }, async ({ homePage }) => {
    await homePage.header.openAccountMenu();
    await homePage.accountModal.clickLoginButton();
    await expect(await homePage.loginModal.getModal()).toBeVisible();
    await homePage.loginModal.login(config.credentials.valid.email, '');
    await expect(await homePage.loginModal.getErrorMessage()).toBeVisible({ timeout: 10000 });
    expect(await homePage.loginModal.getErrorMessageText()).toContain('Пароль не указан');
  });
});
