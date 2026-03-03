import { test } from '@playwright/test';
import HomePage from '../../pages/home/HomePage';
import { SearchProductItemNEW } from '../../pages/home/components/SearchProductItemNEW';

test.beforeEach(async ({ page }) => {
  const home = new HomePage(page);
  await home.loginViaUI();
});


test('T2 [search] Search for a product on the main page', { tag: ['@regression', '@P2'] }, async ({ page }) => {
  const home = new HomePage(page);
  const searchProductItem = new SearchProductItemNEW(page.getByTestId('search-result-product-list'));
  await home.header.search.searchItem('телевизор');
  await searchProductItem.waitForSearchResult();
  await searchProductItem.checkItemInfo(0, 'Телевизор'); 
});

