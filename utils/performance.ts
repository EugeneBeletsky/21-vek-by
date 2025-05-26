// utils/performance.ts
import { Page } from '@playwright/test';
export async function measurePerformance(page: Page) {
    const metrics = await page.evaluate(() => performance.getEntriesByType('navigation'));
    return metrics[0];
  }