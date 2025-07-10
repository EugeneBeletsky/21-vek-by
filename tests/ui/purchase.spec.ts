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

test('T1 [purchase] Search for a product on the main page', { tag: ['@regression', '@P2'] }, async () => {
  await home.header.search.searchItem('телевизор');
  await searchProductItem.waitForSearchResult();
  let price = await searchProductItem.getItemPrice(0);
  let info = await searchProductItem.getItemInfo(0);

  expect(price).toBeGreaterThan(0);
  expect(info?.toLowerCase()).toContain('телевизор');
  
  await searchProductItem.addToCart(0);
});

