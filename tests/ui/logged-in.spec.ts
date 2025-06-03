import { config } from '../../utils/config';

// @ts-ignore: кастомная фикстура
import { test, expect } from '../../fixtures/login.fixture';
import { Page } from '@playwright/test';


test('открывается профиль после логина (через фикстуру)', async ({ loggedInPage }: { loggedInPage: Page }) => {
  await loggedInPage.goto(config.baseURL + '/profile');
  await expect(loggedInPage.locator('text=Профиль')).toBeVisible();
});
