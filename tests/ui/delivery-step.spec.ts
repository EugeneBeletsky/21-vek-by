import { test, expect } from '../../fixtures/test.fixture';
import { openDeliveryStep } from './helpers/purchaseFlow';

test.describe('[Delivery]', () => {
  test(
    'T1 [Delivery] delivery step is shown after order confirmation',
    { tag: ['@regression', '@P2'] },
    async ({ authHomePage, searchResultsPage, orderPage, emptyCart: _ }) => {
      await openDeliveryStep(authHomePage, searchResultsPage, orderPage);

      await orderPage.deliveryPage.expectReady();
      expect(await orderPage.deliveryPage.getFooterPrice()).toBeGreaterThan(0);
    },
  );
});
