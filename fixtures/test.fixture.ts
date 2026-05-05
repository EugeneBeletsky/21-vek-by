import { test as base, expect, Cookie } from '@playwright/test';
import HomePage from '../pages/home/HomePage';
import { SearchResultsPage } from '../pages/search/SearchResultsPage';
import { OrderPage } from '../pages/order/OrderPage';
import { CartClient } from '../tests/api/cart/cartClient';
import { createAuthenticatedAPIContext } from '../api/request';
import { loginViaApi } from '../utils/login';
import { config } from '../utils/config';

type TestFixtures = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  orderPage: OrderPage;
  authenticatedHomePage: HomePage;
  emptyCart: void;
};

type WorkerFixtures = {
  authCookies: Cookie[];
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  authCookies: [async ({}, use) => {
    const { cookies } = await loginViaApi();
    // Keep original cookie domains for API calls to gate.21vek.by.
    await use(cookies);
  }, { scope: 'worker' }],

  homePage: async ({ page }, use) => {
    const home = new HomePage(page);
    await use(home);
  },

  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },

  orderPage: async ({ page }, use) => {
    await use(new OrderPage(page));
  },

  authenticatedHomePage: async ({ page, authCookies }, use) => {
    // Remap cookie domain for UI site (www.21vek.by) before injecting into browser context.
    await page.context().addCookies(authCookies.map(c => ({ ...c, domain: '.21vek.by' })));
    const home = new HomePage(page);
    await home.goto(config.baseURL);
    await home.cookieModal1.reject();
    await home.cookieModal2.reject();
    await use(home);
  },

  emptyCart: async ({ authCookies }, use) => {
    const apiContext = await createAuthenticatedAPIContext(authCookies);
    const cartClient = new CartClient(apiContext);
    await cartClient.clearCart();
    await apiContext.dispose();
    await use();
  },
});

export { expect };
