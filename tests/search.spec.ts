import { test } from '@playwright/test';
import HomePage  from '../pages/home/HomePage';

test('поиск товара на главной странице', async ({ page }) => {
  const home = new HomePage(page);
  await home.goto('https://www.21vek.by/');
  await page.waitForTimeout(1000);

  await home.header.search.search('телевизор');
  await page.waitForTimeout(1000);

  // здесь можно добавить проверку редиректа на результаты или видимости списка
});
