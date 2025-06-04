import { config } from '../../utils/config';

// @ts-ignore: кастомная фикстура
import { test, expect } from '../../fixtures/login.fixture';
import { Page } from '@playwright/test';


test('T1 [logged-in] открывается профиль после логина (через фикстуру)', { tag: ['@regression', '@P1'] }, async ({ loggedInPage }: { loggedInPage: Page }) => {
  await loggedInPage.goto(config.baseURL);
  await expect(loggedInPage.getByTestId('header-favorites-count')).toBeVisible();
});
