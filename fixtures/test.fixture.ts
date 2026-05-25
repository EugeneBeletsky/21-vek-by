import { test as base, Cookie } from '@playwright/test';
import HomePage from '../pages/home/HomePage';
import { SearchResultsPage } from '../pages/search/SearchResultsPage';
import { CatalogPage } from '../pages/catalog/CatalogPage';
import { OrderPage } from '../pages/order/OrderPage';
import { WebpayPaymentPage } from '../pages/payment/WebpayPaymentPage';
import { CartClient } from '../tests/api/cart/cartClient';
import { createAuthenticatedAPIContext } from '../api/request';
import { loginViaApi } from '../utils/login';
import { config } from '../utils/config';

type TestFixtures = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  catalogPage: CatalogPage;
  orderPage: OrderPage;
  webpayPaymentPage: WebpayPaymentPage;
  authHomePage: HomePage;
  emptyCart: void;
};

type WorkerFixtures = {
  authCookies: Cookie[];
};

export const test = base.extend<TestFixtures, WorkerFixtures>({

  // --- Worker-scoped: one login per worker, reused across tests ---

  authCookies: [
    async ({}, use) => {
      const { cookies } = await loginViaApi();
      await use(cookies);
    },
    { scope: 'worker' },
  ],

  // --- Page fixtures ---

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },

  catalogPage: async ({ page }, use) => {
    await use(new CatalogPage(page));
  },

  orderPage: async ({ page }, use) => {
    await use(new OrderPage(page));
  },

  webpayPaymentPage: async ({ page }, use) => {
    await use(new WebpayPaymentPage(page));
  },

  /**
   * Authenticated home page — cookies injected at context level,
   * no UI login flow needed. Cookies are remapped to the UI domain.
   * Cookie modals are dismissed before handing over to the test.
   */
  authHomePage: async ({ page, authCookies }, use) => {
    await page.context().addCookies(
      authCookies.map(c => ({ ...c, domain: '.21vek.by' })),
    );
    const home = new HomePage(page);
    await home.open();
    await home.dismissCookies();
    await use(home);
  },

  /**
   * Clears cart via API before the test runs.
   * Depends on authCookies — no browser needed.
   */
  emptyCart: async ({ authCookies }, use) => {
    const apiContext = await createAuthenticatedAPIContext(authCookies);
    const cartClient = new CartClient(apiContext);
    await cartClient.clearCart();
    await apiContext.dispose();
    await use();
  },
});

export { expect } from '@playwright/test';
