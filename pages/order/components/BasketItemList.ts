import BaseComponent from '../../components/BaseComponent';
import { BasketItem } from './BasketItem';
import { Locator, expect } from '@playwright/test';

export class BasketItemList extends BaseComponent {
  private readonly items = this.element.getByTestId('basket-item');

  constructor(element: Locator) {
    super(element);
  }

  // Backward-compatible alias (same naming as SearchResultsPage)
  async waitForResults(timeout = 10_000): Promise<void> {
    await this.waitForVisible(timeout);
  }

  // --- Accessors ---

  getItem(index: number): BasketItem {
    return new BasketItem(this.items.nth(index));
  }

  getItemByName(name: string): BasketItem {
    return new BasketItem(this.items.filter({ hasText: name }));
  }

  async getItemCount(): Promise<number> {
    return this.items.count();
  }

  async getAllItems(): Promise<BasketItem[]> {
    const all = await this.items.all();
    return all.map(locator => new BasketItem(locator));
  }

  // --- Assertions ---

  async expectItemCount(expected: number): Promise<void> {
    await expect(this.items).toHaveCount(expected);
  }

  async expectHasItem(name: string): Promise<void> {
    await expect(this.items.filter({ hasText: name })).toBeVisible();
  }
}

