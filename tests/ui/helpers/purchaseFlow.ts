import HomePage from '../../../pages/home/HomePage';
import { OrderPage } from '../../../pages/order/OrderPage';
import { SearchResultsPage } from '../../../pages/search/SearchResultsPage';

export async function openOrderWithFirstSearchResult(
  homePage: HomePage,
  searchResultsPage: SearchResultsPage,
  orderPage: OrderPage,
): Promise<void> {
  await homePage.header.search.searchItem('С‚РµР»РµРІРёР·РѕСЂ');
  await searchResultsPage.waitForResults();

  const product = searchResultsPage.products.getItem(0);
  await product.addToCart();
  await product.expectInCart();
  await product.addToCart();

  await orderPage.expectUrl(/\/order/);
  await orderPage.waitForTotal();
}

export async function openDeliveryStep(
  homePage: HomePage,
  searchResultsPage: SearchResultsPage,
  orderPage: OrderPage,
): Promise<void> {
  await openOrderWithFirstSearchResult(homePage, searchResultsPage, orderPage);
  await orderPage.orderTotal.confirmOrder();
  await orderPage.waitForDelivery();
}

export async function openPaymentStep(
  homePage: HomePage,
  searchResultsPage: SearchResultsPage,
  orderPage: OrderPage,
): Promise<void> {
  await openDeliveryStep(homePage, searchResultsPage, orderPage);
  await orderPage.deliveryPage.continueToPayment();
  await orderPage.waitForPayment();
}

export async function openWebpayCardForm(
  homePage: HomePage,
  searchResultsPage: SearchResultsPage,
  orderPage: OrderPage,
): Promise<void> {
  await openPaymentStep(homePage, searchResultsPage, orderPage);
  await orderPage.paymentPage.submitOnlinePayment();
  await orderPage.privacyAgreementModal.declineIfVisible();
}
