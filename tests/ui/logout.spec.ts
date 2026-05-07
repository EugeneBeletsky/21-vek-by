import { test } from '../../fixtures/test.fixture';

test.describe('[Logout]', () => {
  test(
    'T1 [Logout] authenticated user can log out successfully',
    { tag: ['@regression', '@P2'] },
    async ({ authHomePage }) => {
      await authHomePage.header.openAccountMenu();
      await authHomePage.accountModal.clickLogout();
      await authHomePage.header.openAccountMenu();
      await authHomePage.accountModal.expectLoginButtonVisible();
    },
  );
});