import { test, expect } from '@playwright/test';
import HomePage from '../../pages/home/HomePage';
import { SearchProductItem } from '../../pages/home/components/SearchProductItem';

test.beforeEach(async ({ page }) => {
  const home = new HomePage(page);
  await home.loginViaUI();
});

test('T1 [search] Search input is visible' , { tag: ['@regression', '@P1'] }, async ({ page }) => {
  const home = new HomePage(page);
  expect(await home.header.search.isVisible()).toBe(true);
});

test('T2 [search] Search for a product on the main page', { tag: ['@regression', '@P2'] }, async ({ page }) => {
  const home = new HomePage(page);
  const searchProductItem = new SearchProductItem(page.getByTestId('search-result-product-list'));
  await home.header.search.searchItem('телевизор');
  await searchProductItem.waitForSearchResult();
  let price = await searchProductItem.getItemPrice(0);
  let info = await searchProductItem.getItemInfo(0);
  expect(price).toBeGreaterThan(0);
  expect(info?.toLowerCase()).toContain('телевизор');  
});

test('T3 [search] All products have a price more than 0', { tag: ['@regression', '@P2'] }, async ({ page }) => {
  const searchProductItem = new SearchProductItem(page.getByTestId('search-result-product-list'));
  await searchProductItem.waitForSearchResult();
  let prices = await searchProductItem.getAllPrices();
  for (let price of prices) {
    expect(price).toBeGreaterThan(0);
  }
});

test('T4 [search] All products have a name', { tag: ['@regression', '@P2'] }, async ({ page }) => {
  const searchProductItem = new SearchProductItem(page.getByTestId('search-result-product-list'));
  await searchProductItem.waitForSearchResult();
  let info = await searchProductItem.getAllInfo();
  for (let item of info) {
    expect(item).not.toBeNull();
  }
});