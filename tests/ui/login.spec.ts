import * as dotenv from 'dotenv';
import { test, expect } from '@playwright/test';
import Header from '../../pages/home/components/Header';
import HomePage from '../../pages/home/HomePage';
import LoginModal from '../../pages/home/components/LoginModal';

const BASE_URL = process.env.BASE_URL!;
const VALID_EMAIL = process.env.LOGIN_EMAIL!;
const VALID_PASSWORD = process.env.LOGIN_PASSWORD!;
const INVALID_PASSWORD = 'wrong_password';

dotenv.config();

test.describe('Login tests', () => {
  test('should show error on wrong password', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto(BASE_URL);
    await home.cookieModal.reject();
    await home.accountModal.openAccountModal();
    await home.accountModal.clickLoginButton();
    await expect(await home.loginModal.getModal()).toBeVisible();
    await home.loginModal.login(VALID_EMAIL, INVALID_PASSWORD);
    await page.waitForLoadState();
    await expect(await home.loginModal.getErrorMessage()).toContain('Неправильный пароль');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto(BASE_URL);
    await home.cookieModal.reject();
    await home.accountModal.openAccountModal();
    await home.accountModal.clickLoginButton();
    await expect(await home.loginModal.getModal()).toBeVisible();
    await home.loginModal.login(VALID_EMAIL, VALID_PASSWORD);
    await expect(await home.loginModal.getModal()).toBeHidden();
  });
});