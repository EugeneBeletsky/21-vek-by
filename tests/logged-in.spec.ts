import * as dotenv from 'dotenv';
dotenv.config();

// @ts-ignore: кастомная фикстура
import { test, expect } from '../fixtures/login.fixture';
import { Page } from '@playwright/test';

// Пример теста с использованием loggedInPage

test('открывается профиль после логина (через фикстуру)', async ({ loggedInPage }: { loggedInPage: Page }) => {
  await loggedInPage.goto(process.env.BASE_URL! + '/profile');
  await expect(loggedInPage.locator('text=Профиль')).toBeVisible();
});
