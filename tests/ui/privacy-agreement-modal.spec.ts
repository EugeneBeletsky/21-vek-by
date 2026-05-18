import { test } from '../../fixtures/test.fixture';
import { openPaymentStep } from './helpers/purchaseFlow';

test.describe('[Privacy agreement modal]', () => {
  //to avoid order paywments email from 21vek.by
  test.skip(
    'T1 [Privacy agreement modal] user can decline advertising consent',
    { tag: ['@ui', '@regression', '@P2'] },
    async ({ authHomePage, searchResultsPage, orderPage, emptyCart: _ }) => {
      await openPaymentStep(authHomePage, searchResultsPage, orderPage, 'телевизор');
      await orderPage.paymentPage.submitOnlinePayment();

      const isModalShown = await orderPage.privacyAgreementModal
        .waitForVisible(5_000)
        .then(() => true)
        .catch(() => false);

      test.skip(!isModalShown, 'Privacy agreement modal was not shown for this order');

      await orderPage.privacyAgreementModal.expectReady();
      await orderPage.privacyAgreementModal.decline();
    },
  );
});
