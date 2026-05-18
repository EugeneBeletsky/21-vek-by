import { test, expect } from '../../fixtures/test.fixture';
import { openPaymentStep } from './helpers/purchaseFlow';

test.describe('[Payment]', () => {
  //to avoid order paywments email from 21vek.by
  test.skip(
    'T1 [Payment] payment step is shown after delivery confirmation',
    { tag: ['@ui', '@regression', '@P2'] },
    async ({ authHomePage, searchResultsPage, orderPage, emptyCart: _ }) => {
      await openPaymentStep(authHomePage, searchResultsPage, orderPage, 'телевизор');

      await orderPage.paymentPage.expectReady();
      expect(await orderPage.paymentPage.getFooterPrice()).toBeGreaterThan(0);
    },
  );
});
