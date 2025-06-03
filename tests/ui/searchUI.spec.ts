import { test, expect, Page, BrowserContext } from '@playwright/test';
import HomePage from '../../pages/home/HomePage';
import { SearchProductItem } from '../../pages/home/components/SearchProductItem';

//VARS
let home: HomePage;
let page: Page;
let context: BrowserContext;
let searchProductItem: SearchProductItem;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  home = new HomePage(page);
  searchProductItem = new SearchProductItem(page);
  await home.loginViaUI();
});

test('Search input is visible' , { tag: ['@regression', '@P1'] }, async () => {
  expect(await home.header.search.isVisible()).toBe(true);
});

test('Search for a product on the main page', { tag: ['@regression', '@P2'] }, async () => {
  await home.header.search.searchItem('телевизор');
  await searchProductItem.waitForSearchResult();
  let price = await searchProductItem.getItemPrice(0);
  let info = await searchProductItem.getItemInfo(0);
  expect(price).toBeGreaterThan(0);
  expect(info?.toLowerCase()).toContain('телевизор');  
});

test('All products have a price more than 0', { tag: ['@regression', '@P2'] }, async () => {
  await home.header.search.searchItem('телевизор');
  await searchProductItem.waitForSearchResult();
  let prices = await searchProductItem.getAllPrices();
  for (let price of prices) {
    expect(price).toBeGreaterThan(0);
  }
});

test('All products have a name', { tag: ['@regression', '@P2'] }, async () => {
  await home.header.search.searchItem('телевизор');
  await searchProductItem.waitForSearchResult();
  let info = await searchProductItem.getAllInfo();
  for (let item of info) {
    expect(item).not.toBeNull();
  }
});