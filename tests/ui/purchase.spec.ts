import { test, expect } from '../../fixtures/test.fixture';
import { ProductCard } from '../../pages/search/components/ProductCard';
import { CardData } from '../../pages/payment/WebpayPaymentPage';

test.describe('[Purchase]', () => {
  /**
   * Shared setup: search for a TV and return the first result card.
   * Avoids duplicating 4 lines across every test.
   */
  async function searchAndGetFirstProduct(
    homePage: Awaited<Parameters<Parameters<typeof test>[2]>[0]>['authHomePage'],
    searchResultsPage: Awaited<Parameters<Parameters<typeof test>[2]>[0]>['searchResultsPage'],
  ): Promise<ProductCard> {
    await homePage.header.search.searchItem('телевизор');
    await searchResultsPage.waitForResults();
    return searchResultsPage.products.getItem(0);
  }

  test(
    'T1 [Purchase] add first search result to cart',
    { tag: ['@regression', '@P2'] },
    async ({ authHomePage, searchResultsPage, emptyCart: _ }) => {
      const product = await searchAndGetFirstProduct(authHomePage, searchResultsPage);

      await product.expectPriceGreaterThan(0);
      await product.expectInfoContains('телевизор');

      await product.addToCart();
      await product.expectInCart();
    },
  );

  test(
    'T2 [Purchase] clicking cart button when already in cart redirects to order page',
    { tag: ['@regression', '@P2'] },
    async ({ authHomePage, searchResultsPage, orderPage, emptyCart: _ }) => {
      const product = await searchAndGetFirstProduct(authHomePage, searchResultsPage);

      await product.addToCart();
      await product.expectInCart();

      await product.addToCart();
      await orderPage.expectUrl(/\/order/);
    },
  );

  test(
    'T3 [Purchase] order page shows correct item details after adding to cart at Basket section',
    { tag: ['@regression', '@P2'] },
    async ({ authHomePage, searchResultsPage, orderPage, emptyCart: _ }) => {
      const product = await searchAndGetFirstProduct(authHomePage, searchResultsPage);

      await product.addToCart();
      await product.expectInCart();
      await product.addToCart();
      await orderPage.expectUrl(/\/order/);
      await orderPage.waitForBasket();

      const item = orderPage.basketItems.getItem(0);
      await item.expectTitle('Телевизор');
      await item.expectCounterValue(1);

      const price = await item.getPrice();
      const oldPrice = await item.getOldPrice();
      const discount = await item.getDiscount();

      expect(price).toBeGreaterThan(0);
      expect(oldPrice).toBeGreaterThan(0);
      expect(discount).toBeGreaterThan(0);
      expect(price).toBeLessThan(oldPrice);
      expect(price).toBe(oldPrice - discount);
    },
  );

  test(
    'T4 [Purchase] order page shows correct item details after adding to cart at Total section',
    { tag: ['@regression', '@P2'] },
    async ({ authHomePage, searchResultsPage, orderPage, emptyCart: _ }) => {
      const product = await searchAndGetFirstProduct(authHomePage, searchResultsPage);

      await product.addToCart();
      await product.expectInCart();
      await product.addToCart();
      await orderPage.expectUrl(/\/order/);
      await orderPage.waitForTotal();

      const orderTotal = await orderPage.orderTotal.getTotalPrice();
      const totalSummaryPrice = await orderPage.orderTotal.geTotalSummaryPrice();
      const totalSummaryCount = await orderPage.orderTotal.geTotalSummaryCount();
      const bonuses = await orderPage.orderTotal.getBonuses();
      const totalDiscount = await orderPage.orderTotal.getTotalDiscount();

      expect(orderTotal).toBeGreaterThan(0);
      expect(totalSummaryPrice).toBeGreaterThan(0);
      expect(totalSummaryCount).toBeGreaterThan(0);
      expect(bonuses).toBeGreaterThan(0);
      expect(totalDiscount).toBeGreaterThan(0);
      expect(orderTotal).toBe(totalSummaryPrice - totalDiscount);
    },
  );

  test(
    'T5 [Purchase] Check fill invalid promocode',
    { tag: ['@regression', '@P2'] },
    async ({ authHomePage, searchResultsPage, orderPage, emptyCart: _ }) => {
      const product = await searchAndGetFirstProduct(authHomePage, searchResultsPage);

      await product.addToCart();
      await product.expectInCart();
      await product.addToCart();
      await orderPage.expectUrl(/\/order/);
      await orderPage.waitForTotal();

      const orderTotalBeforePromocode = await orderPage.orderTotal.getTotalPrice();
      await orderPage.orderPromocode.fillPromocode('BLZ');
      await orderPage.orderPromocode.confirmPromocode();
      await orderPage.waitForPromoCodesResponse();
      await orderPage.orderPromocode.expectErrorMessagePromocode('Промокод недействителен');
      const orderTotalAfterPromocodeConfirm = await orderPage.orderTotal.getTotalPrice();
      expect(orderTotalBeforePromocode).toBe(orderTotalAfterPromocodeConfirm);
    },
  );

  test(
    'T6 [Purchase] search product, add to cart and fill card data',
    { tag: ['@regression', '@P2'] },
    async ({ authHomePage, searchResultsPage, orderPage, webpayPaymentPage, emptyCart: _ }) => {
      const product = await searchAndGetFirstProduct(authHomePage, searchResultsPage);
      const card: CardData = {
        number: '4111111111111111',
        month: '12',
        year: '30',
        holder: 'TEST USER',
        cvv: '123',
        email: 'test@example.com',
      };

      await product.addToCart();
      await product.expectInCart();
      await product.addToCart();
      await orderPage.expectUrl(/\/order/);
      await orderPage.waitForTotal();

      await orderPage.orderTotal.confirmOrder();
      await orderPage.waitForDelivery();
      await orderPage.deliveryPage.continueToPayment();
      await orderPage.waitForPayment();
      await orderPage.paymentPage.submitOnlinePayment();
      await orderPage.privacyAgreementModal.declineIfVisible();

      await webpayPaymentPage.expectReady();
      await webpayPaymentPage.fillCardData(card);
      await webpayPaymentPage.expectCardData(card);
      await webpayPaymentPage.returnBack();
      await orderPage.waitForCanceledOrder();
    },
  );
});
