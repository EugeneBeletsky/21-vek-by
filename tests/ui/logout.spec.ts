import { test, expect } from '@playwright/test';
import HomePage from '../../pages/home/HomePage';

test.describe('[Logout tests]', () => {
  test('T1 [Logout] should logout successfully', { tag: ['@regression', '@P2'] }, async ({ page }) => {
    const home = new HomePage(page);
    await home.loginViaUI();

    await test.step('T1.2 [Logout] should logout successfully', async () => {
      await home.header.openAccountMenu();
      await (await home.accountModal.getAccountButtonByText('Выход')).click();
      await home.header.openAccountMenu();
      await expect(await home.accountModal.getLoginButton()).toBeVisible();
    });
  });  
});