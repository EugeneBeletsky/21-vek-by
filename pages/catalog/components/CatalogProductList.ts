import BaseComponent from '../../components/BaseComponent';
import { Locator, expect } from '@playwright/test';
import { ProductCard } from '../../search/components/ProductCard';

export class CatalogProductList extends BaseComponent {
  // Individual product cards use dynamic testids like `product-{sku}`.
  // `product-block` is a section container (not a card), so it is excluded.
  private readonly items = this.element.locator('[data-testid^="product-"]:not([data-testid="product-block"])');

  constructor(element: Locator) {
    super(element);
  }

  // --- Accessors ---

  getItem(index: number): ProductCard {
    return new ProductCard(this.items.nth(index));
  }

  getItemByName(name: string): ProductCard {
    return new ProductCard(this.items.filter({ hasText: name }));
  }

  async getItemCount(): Promise<number> {
    return this.items.count();
  }

  async getAllItems(): Promise<ProductCard[]> {
    const all = await this.items.all();
    return all.map(locator => new ProductCard(locator));
  }

  async getAllPrices(): Promise<number[]> {
    const withPrice = this.items.filter({
      has: this.element.page().getByTestId('card-current-price'),
    });
    const all = await withPrice.all();
    return Promise.all(all.map(loc => new ProductCard(loc).getPrice()));
  }

  // --- Assertions ---

  async expectItemCount(expected: number): Promise<void> {
    await expect(this.items).toHaveCount(expected);
  }

  async expectHasItem(name: string): Promise<void> {
    await expect(this.items.filter({ hasText: name })).toBeVisible();
  }

  async expectAllPricesGreaterThan(min: number): Promise<void> {
    const prices = await this.getAllPrices();
    for (const price of prices) {
      expect(price).toBeGreaterThan(min);
    }
  }

  async expectAllPricesBelowOrEqual(max: number): Promise<void> {
    const prices = await this.getAllPrices();
    for (const price of prices) {
      expect(price).toBeLessThanOrEqual(max);
    }
  }
}
