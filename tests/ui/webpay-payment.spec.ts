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
  //to avoid order paywments email from 21vek.by
  test.skip(
    'T1 [Webpay payment] user can fill card data without payment submit',
    { tag: ['@ui', '@regression', '@P2'] },
    async ({ authHomePage, searchResultsPage, orderPage, webpayPaymentPage, emptyCart: _ }) => {
      await openWebpayCardForm(authHomePage, searchResultsPage, orderPage, 'телевизор');
      await webpayPaymentPage.expectReady();

      await webpayPaymentPage.fillCardData(card);
      await webpayPaymentPage.expectCardData(card);
      await webpayPaymentPage.returnBack();
      await orderPage.waitForCanceledOrder();
    },
  );
});
