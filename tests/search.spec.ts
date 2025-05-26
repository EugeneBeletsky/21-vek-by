import { test, expect, Page } from '@playwright/test';
import HomePage  from '../pages/home/HomePage';


test('Search for a product on the main page', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto('https://www.21vek.by/');
  await page.waitForTimeout(1000);
  await home.cookieModal.reject();
  await home.header.search.search('телевизор');
  await page.waitForTimeout(1000);  
});
