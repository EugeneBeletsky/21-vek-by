import { test, expect } from '../../fixtures/test.fixture';
import { openPaymentStep } from './helpers/purchaseFlow';

test.describe('[Payment]', () => {
  test(
    'T1 [Payment] payment step is shown after delivery confirmation',
    { tag: ['@regression', '@P2'] },
    async ({ authHomePage, searchResultsPage, orderPage, emptyCart: _ }) => {
      await openPaymentStep(authHomePage, searchResultsPage, orderPage);

      await orderPage.paymentPage.expectReady();
      expect(await orderPage.paymentPage.getFooterPrice()).toBeGreaterThan(0);
    },
  );
});
