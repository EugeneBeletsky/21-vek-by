import { test } from '../../fixtures/test.fixture';
import { CardData } from '../../pages/payment/WebpayPaymentPage';
import { openWebpayCardForm } from './helpers/purchaseFlow';

const card: CardData = {
  number: '4111111111111111',
  month: '12',
  year: '30',
  holder: 'TEST USER',
  cvv: '123',
  email: 'test@example.com',
};

test.describe('[Webpay payment]', () => {
  test(
    'T1 [Webpay payment] user can fill card data without payment submit',
    { tag: ['@regression', '@P2'] },
    async ({ authHomePage, searchResultsPage, orderPage, webpayPaymentPage, emptyCart: _ }) => {
      await openWebpayCardForm(authHomePage, searchResultsPage, orderPage);
      await webpayPaymentPage.expectReady();

      await webpayPaymentPage.fillCardData(card);
      await webpayPaymentPage.expectCardData(card);
      await webpayPaymentPage.returnBack();
      await orderPage.waitForCanceledOrder();
    },
  );
});
