import { test, expect, Page, BrowserContext } from '@playwright/test';
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

test.describe('[Logout tests]', () => {
  test('T1 [Logout] should logout successfully', { tag: ['@regression', '@P2'] }, async () => {

    test.step('T1.1 [Login] should login successfully', async () => {
      await home.loginViaUI();
      await page.waitForTimeout(3000);
    });

    test.step('T1.2 [Logout] should logout successfully', async () => {
      await home.accountModal.openAccountModal();
      await (await home.accountModal.getAccountButtonByText('Выход')).click();
      await home.accountModal.openAccountModal();
      await expect(await home.accountModal.getLoginButton()).toBeVisible();
    });

  });  
});