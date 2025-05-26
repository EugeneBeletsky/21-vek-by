import { Page, test as base, expect, TestInfo } from '@playwright/test';

// Ожидание смены URL
export async function waitForUrlChange(page: Page, action: () => Promise<void>, timeout = 5000) {
  const oldUrl = page.url();
  await action();
  await expect(page).not.toHaveURL(oldUrl, { timeout });
}

// Ожидание завершения сетевых запросов
export async function waitForNetworkIdle(page: Page, timeout = 2000) {
  await page.waitForLoadState('networkidle', { timeout });
}

// Генерация случайной строки
export function randomString(length = 8) {
  return Math.random().toString(36).substring(2, 2 + length);
}

// Генерация случайного email
export function randomEmail() {
  return `user_${randomString(6)}@gmail.com`;
}

// Надёжная очистка инпута
export async function clearInput(page: Page, selector: string) {
  const input = page.locator(selector);
  await input.click({ clickCount: 3 });
  await input.press('Backspace');
}

// Скриншот при падении теста
export async function screenshotOnFailure(page: Page, testInfo: TestInfo) {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({ path: `screenshots/${testInfo.title}.png`, fullPage: true });
  }
}

// Безопасное получение переменной окружения
export function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Env variable ${key} is not set`);
  return value;
}

// Повторить действие несколько раз
export async function retry<T>(fn: () => Promise<T>, retries = 3, delay = 500): Promise<T> {
  let lastError;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      if (i < retries - 1) await new Promise(res => setTimeout(res, delay));
    }
  }
  throw lastError;
} 