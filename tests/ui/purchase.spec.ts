import { test, expect } from '../../fixtures/test.fixture';

test('T1 [purchase] Search for a product and add it to cart', { tag: ['@regression', '@P2'] }, async ({ authenticatedHomePage, searchProducts, page }) => {
  await authenticatedHomePage.header.search.searchItem('телевизор');
  await searchProducts.waitForResults();

  const product = searchProducts.getItem(0);
  expect(await product.getPrice()).toBeGreaterThan(0);
  expect((await product.getInfo())?.toLowerCase()).toContain('телевизор');

  await product.addToCart();
  await page.waitForLoadState('domcontentloaded');
  await expect(product.cartButton).toContainText('В корзине');
});


