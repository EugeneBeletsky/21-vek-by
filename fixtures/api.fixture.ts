import { test as base, expect, APIRequestContext } from '@playwright/test';
import { createAPIContext } from '../api/request';
import { AuthClient } from '../tests/api/auth/authClient';
import { Catalog } from '../tests/api/catalog/catalog';

type ApiFixtures = {
  apiContext: APIRequestContext;
  authClient: AuthClient;
  catalog: Catalog;
  authCatalog: Catalog;
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

  authCatalog: async ({ authClient, catalog }, use) => {
    await authClient.login();
    await use(catalog);
  },
});

export { expect };
