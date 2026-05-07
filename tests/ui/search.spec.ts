import { test, expect } from '../../fixtures/test.fixture';

test.describe('[Search]', () => {
  test(
    'T1 [Search] search input is visible on authenticated home page',
    { tag: ['@regression', '@P1'] },
    async ({ authHomePage }) => {
      await authHomePage.header.search.expectSearchInputVisible();
    },
  );

  test(
    'T2 [Search] searching returns results with price and matching name',
    { tag: ['@regression', '@P2'] },
    async ({ authHomePage, searchResultsPage }) => {
      await authHomePage.header.search.searchItem('телевизор');
      await searchResultsPage.waitForResults();

      const product = searchResultsPage.products.getItem(0);
      await product.expectPriceGreaterThan(0);
      await product.expectInfoContains('телевизор');
    },
  );

  test(
    'T3 [Search] all returned products have a price greater than 0',
    { tag: ['@regression', '@P2'] },
    async ({ authHomePage, searchResultsPage }) => {
      await authHomePage.header.search.searchItem('телевизор');
      await searchResultsPage.waitForResults();
      await searchResultsPage.products.expectAllPricesGreaterThan(0);
    },
  );

  test(
    'T4 [Search] all returned products have a name containing the search query',
    { tag: ['@regression', '@P2'] },
    async ({ authHomePage, searchResultsPage }) => {
      await authHomePage.header.search.searchItem('телевизор');
      await searchResultsPage.waitForResults();

      const items = await searchResultsPage.products.getAllItems();
      for (const item of items) {
        await item.expectInfoContains('телевизор');
      }
    },
  );
});