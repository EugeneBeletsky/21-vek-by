import { test, expect } from '../../fixtures/test.fixture';

test('T1 [search] Search input is visible', { tag: ['@regression', '@P1'] }, async ({ authenticatedHomePage }) => {
  const input = await authenticatedHomePage.header.search.getInput();
  await expect(input).toBeVisible();
});

test('T2 [search] Search for a product on the main page', { tag: ['@regression', '@P2'] }, async ({ authenticatedHomePage, searchResultsPage }) => {
  await authenticatedHomePage.header.search.searchItem('телевизор');
  await searchResultsPage.waitForResults();

  const product = searchResultsPage.products.getItem(0);
  expect(await product.getPrice()).toBeGreaterThan(0);
  expect((await product.getInfo())?.toLowerCase()).toContain('телевизор');
});

test('T3 [search] All products have a price more than 0', { tag: ['@regression', '@P2'] }, async ({ authenticatedHomePage, searchResultsPage }) => {
  await authenticatedHomePage.header.search.searchItem('телевизор');
  await searchResultsPage.waitForResults();

  const prices = await searchResultsPage.products.getAllPrices();
  for (const price of prices) {
    expect(price).toBeGreaterThan(0);
  }
});

test('T4 [search] All products have a name', { tag: ['@regression', '@P2'] }, async ({ authenticatedHomePage, searchResultsPage }) => {
  await authenticatedHomePage.header.search.searchItem('телевизор');
  await searchResultsPage.waitForResults();

  const names = await searchResultsPage.products.getAllInfo();
  for (const name of names) {
    expect(name).not.toBeNull();
    expect(name).toContain('Телевизор');
  }
});
