import { test, expect } from '../../fixtures/test.fixture';

test('T1 [purchase] Search for a product on the main page', { tag: ['@regression', '@P2'] }, async ({ authenticatedHomePage, searchProducts }) => {
  await authenticatedHomePage.header.search.searchItem('телевизор');
  await searchProducts.waitForSearchResult();
  const price = await searchProducts.getItemPrice(0);
  const info = await searchProducts.getItemInfo(0);
  expect(price).toBeGreaterThan(0);
  expect(info?.toLowerCase()).toContain('телевизор');
  await searchProducts.addToCart(0);
});
