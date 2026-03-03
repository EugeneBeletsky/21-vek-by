/* eslint-disable no-console, no-undef */
import { test , expect } from '@playwright/test';
import { config } from '../utils/config';


test('authenticate and save storage state', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  // Close cookie dialogs if they appear
  try {
    const modal1 = page.locator('#modal-cookie');
    if (await modal1.isVisible({ timeout: 3000 }).catch(() => false)) {
      await modal1.locator('button:has-text("Отклонить")').click({ timeout: 3000 }).catch(() => {});
    }
  } catch (error) {
    console.warn('Error closing cookie dialog 1:', error);
  }
  try {
    const modal2 = page.getByTestId('modal');
    if (await modal2.isVisible({ timeout: 3000 }).catch(() => false)) {
      await modal2.locator('button:has-text("Отклонить")').click({ timeout: 3000 }).catch(() => {});
    }
  } catch (error) {
    console.warn('Error closing cookie dialog 2:', error);
  }

  // Open login
  await page.getByTestId('userToolsDropDown').locator('button').first().click();
  await page.getByTestId('loginButton').click();

  // Fill credentials
  await page.getByTestId('login-form-email').fill(config.credentials.valid.email);
  await page.getByTestId('login-form-password').fill(config.credentials.valid.password);
  await page.getByTestId('loginSubmit').click();

  // Wait until logged in (favorites counter visible on header)
  await expect(page.getByTestId('header-favorites-count')).toBeVisible({ timeout: 15000 });

  await page.context().storageState({ path: '.auth/user.json' });
});


