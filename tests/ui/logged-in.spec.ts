import { config } from '../../utils/config';
import { test, expect } from '@playwright/test';

test('T1 [logged-in] открывается профиль после логина', { tag: ['@regression', '@P1'] }, async ({ page }) => {
  await page.goto(config.baseURL);
  await new Promise(r => setTimeout(r, 1000));
  await expect(page.getByTestId('header-favorites-count')).toBeVisible();
});
