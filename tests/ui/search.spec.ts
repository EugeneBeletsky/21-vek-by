import { test, expect, Page, BrowserContext } from '@playwright/test';
import { createLoggedInContext } from '../../utils/session';
import HomePage from '../../pages/home/HomePage';

let home: HomePage;
let page: Page;
let context: BrowserContext;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();

  // 1. Получаем гостевые куки
  await page.goto('https://www.21vek.by/');
  const guestCookies = await context.cookies();

  // 2. Логинимся через API, передавая гостевые куки
  await createLoggedInContext(context, 'eugenebeletsky@gmail.com', '21vek_2025', guestCookies as never[]);

  // 3. Перезагружаем страницу, чтобы применились все куки
  await page.reload();

  home = new HomePage(page);
  await home.cookieModal.reject();
});

test('Search for a product on the main page', async () => {
  await home.header.search.search('телевизор');
  await page.waitForTimeout(5000);
  await page.reload()
  await expect(page.getByTestId('header-favorites-count')).toBeVisible();
});







