import { test, Page, BrowserContext } from '@playwright/test';
import HomePage from '../../pages/home/HomePage';
import { SearchProductItemNEW } from '../../pages/home/components/SearchProductItemNEW';

//VARS
let home: HomePage;
let page: Page;
let context: BrowserContext;
let searchProductItem: SearchProductItemNEW;

test.beforeAll(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  home = new HomePage(page);
  searchProductItem = new SearchProductItemNEW(page.getByTestId('search-result-product-list'));

  await home.loginViaUI();
});


test('T2 [search] Search for a product on the main page', { tag: ['@regression', '@P2'] }, async () => {
  await home.header.search.searchItem('телевизор');
  await searchProductItem.waitForSearchResult();
  await searchProductItem.checkItemPrice(0, 469);
  await searchProductItem.checkItemInfo(0, 'Телевизор'); 
  //check prices of all items greater than 0
  await searchProductItem.checkAllPrices(0);
  //check info of all items contains 'Телевизор'
  await searchProductItem.checkAllInfo('Телевизор');
});

