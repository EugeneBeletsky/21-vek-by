import { test, expect } from '@playwright/test';
import HomePage from '../../pages/home/HomePage';
import { SearchProductItem } from '../../pages/home/components/SearchProductItem';

test.beforeEach(async ({ page }) => {
  const home = new HomePage(page);
  await home.loginViaUI();
});

test('T1 [purchase] Search for a product on the main page', { tag: ['@regression', '@P2'] }, async ({ page }) => {
  const home = new HomePage(page);
  const searchProductItem = new SearchProductItem(page.getByTestId('search-result-product-list'));
  await home.header.search.searchItem('телевизор');
  await searchProductItem.waitForSearchResult();
  const price = await searchProductItem.getItemPrice(0);
  const info = await searchProductItem.getItemInfo(0);
  expect(price).toBeGreaterThan(0);
  expect(info?.toLowerCase()).toContain('телевизор');
  await searchProductItem.addToCart(0);
});

