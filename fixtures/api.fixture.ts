import { test as base, expect, APIRequestContext } from '@playwright/test';
import { createAPIContext } from '../api/request';
import { AuthClient } from '../tests/api/auth/authClient';
import { Catalog } from '../tests/api/catalog/catalog';
import { CartClient } from '../tests/api/cart/cartClient';

type ApiFixtures = {
  apiContext: APIRequestContext;
  authClient: AuthClient;
  catalog: Catalog;
  authCatalog: Catalog;
  cartClient: CartClient;
  authCartClient: CartClient;
};

export const test = base.extend<ApiFixtures>({
  apiContext: async ({}, use) => {
    const context = await createAPIContext();
    await use(context);
    await context.dispose();
  },

  authClient: async ({ apiContext }, use) => {
    await use(new AuthClient(apiContext));
  },

  catalog: async ({ apiContext }, use) => {
    await use(new Catalog(apiContext));
  },

  cartClient: async ({ apiContext }, use) => {
    await use(new CartClient(apiContext));
  },

  authCatalog: async ({ authClient, catalog }, use) => {
    await authClient.login();
    await use(catalog);
  },

  authCartClient: async ({ authClient, cartClient }, use) => {
    await authClient.login();
    await cartClient.clearCart();
    await use(cartClient);
    await cartClient.clearCart();
  },
});

export { expect };
