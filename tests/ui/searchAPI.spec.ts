import { test, expect } from '@playwright/test';
import HomePage from '../../pages/home/HomePage';
import { SearchProductItem } from '../../pages/home/components/SearchProductItem';
import { loginViaApi } from '../../utils/login';
import { config } from '../../utils/config';

test.describe('Search tests', () => {
  
  test.beforeEach(async ({ page }) => {
    const { cookies } = await loginViaApi();
    await page.context().addCookies(
      cookies.map(cookie => ({
        ...cookie,
        domain: '.21vek.by'
      }))
    );

    const home = new HomePage(page);

    await home.goto(config.baseURL);
    await home.cookieModal.reject();
  });

  test('T1 [Search] Search input is visible', { tag: ['@regression', '@P2'] }, async ({ page }) => {
    const home = new HomePage(page);
    await page.waitForLoadState();
    expect(await home.header.search.isVisible()).toBe(true);
  });

  test('T2 [Search] Search for a product returns relevant result', { tag: ['@regression', '@P2'] }, async ({ page }) => {
    const home = new HomePage(page);
    const searchProductItem = new SearchProductItem(page);

    await home.header.search.searchItem('телевизор');
    await searchProductItem.waitForSearchResult();

    const price = await searchProductItem.getItemPrice(0);
    const info = await searchProductItem.getItemInfo(0);

    expect(price).toBeGreaterThan(0);
    expect(info?.toLowerCase()).toContain('телевизор');
  });

  test('T3 [Search] All products have price > 0', { tag: ['@regression', '@P2'] }, async ({ page }) => {    
    const home = new HomePage(page);
    const searchProductItem = new SearchProductItem(page);

    await home.header.search.searchItem('телевизор');
    await searchProductItem.waitForSearchResult();

    const prices = await searchProductItem.getAllPrices();
    for (const price of prices) {
      expect.soft(price).toBeGreaterThan(0);
    }
  });

  test('T4 [Search] All products have name/info', { tag: ['@regression', '@P2'] }, async ({ page }) => {
    const home = new HomePage(page);
    const searchProductItem = new SearchProductItem(page);

    await home.header.search.searchItem('телевизор');
    await searchProductItem.waitForSearchResult();

    const names = await searchProductItem.getAllInfo();
    for (const name of names) {
      expect.soft(name).not.toBeNull();
    }
  });
});
