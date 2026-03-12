import { test, expect } from '../../fixtures/test.fixture';

test.describe('[Logout tests]', () => {
  test('T1 [Logout] User should logout successfully', { tag: ['@regression', '@P2'] }, async ({ authenticatedHomePage }) => {
    await test.step('T1.2 [Logout] should logout successfully', async () => {
      await authenticatedHomePage.header.openAccountMenu();
      await (await authenticatedHomePage.accountModal.getAccountButtonByText('Выход')).click();
      await authenticatedHomePage.header.openAccountMenu();
      await expect(await authenticatedHomePage.accountModal.getLoginButton()).toBeVisible();
    });
  });
});
