import { test as base, expect, Cookie } from '@playwright/test';
import HomePage from '../pages/home/HomePage';
import { SearchProductList } from '../pages/home/components/SearchProductList';
import { CartClient } from '../tests/api/cart/CartClient';
import { createAuthenticatedAPIContext } from '../api/request';
import { loginViaApi } from '../utils/login';
import { config } from '../utils/config';

type TestFixtures = {
  homePage: HomePage;
  searchProducts: SearchProductList;
  authenticatedHomePage: HomePage;
  emptyCart: void;
};

type WorkerFixtures = {
  authCookies: Cookie[];
};

export const test = base.extend<TestFixtures, WorkerFixtures>({
  authCookies: [async ({}, use) => {
    const { cookies } = await loginViaApi();
    await use(cookies.map(c => ({ ...c, domain: '.21vek.by' })));
  }, { scope: 'worker' }],

  homePage: async ({ page }, use) => {
    const home = new HomePage(page);
    await use(home);
  },

  searchProducts: async ({ page }, use) => {
    const list = new SearchProductList(
      page.getByTestId('search-result-product-list')
    );
    await use(list);
  },

  authenticatedHomePage: async ({ page, authCookies }, use) => {
    await page.context().addCookies(authCookies);
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
