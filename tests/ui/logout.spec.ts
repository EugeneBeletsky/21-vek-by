import { test, expect } from '../../fixtures/test.fixture';

test.describe('[Logout tests]', () => {
  test('T1 [Logout] User should logout successfully', { tag: ['@regression', '@P2'] }, async ({ authenticatedHomePage }) => {
    await authenticatedHomePage.header.openAccountMenu();
    await authenticatedHomePage.accountModal.clickLogout();
    await authenticatedHomePage.header.openAccountMenu();
    await authenticatedHomePage.accountModal.expectLoginButtonVisible();
  });
});
