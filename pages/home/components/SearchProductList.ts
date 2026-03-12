import BaseComponent from '../../components/BaseComponent';
import { ProductCard } from './ProductCard';
import { Locator } from '@playwright/test';

export class SearchProductList extends BaseComponent {
  private productItems = this.element.locator('.style_product__xVGB6');

  constructor(element: Locator) {
    super(element);
  }

  async waitForResults(timeout = 10000): Promise<void> {
    await this.element.waitFor({ state: 'visible', timeout });
  }

  getItem(index: number): ProductCard {
    return new ProductCard(this.productItems.nth(index));
  }

  getItemByName(name: string): ProductCard {
    return new ProductCard(this.productItems.filter({ hasText: name }));
  }

  async getItemCount(): Promise<number> {
    return this.productItems.count();
  }

  async getAllItems(): Promise<ProductCard[]> {
    const items = await this.productItems.all();
    return items.map(locator => new ProductCard(locator));
  }

  async getAllPrices(): Promise<number[]> {
    const page = this.element.page();
    const withPrice = this.productItems.filter({
      has: page.getByTestId('card-current-price'),
    });
    const items = await withPrice.all();
    return Promise.all(
      items.map(item => new ProductCard(item).getPrice())
    );
  }

  async getAllInfo(): Promise<(string | null)[]> {
    const page = this.element.page();
    const withInfo = this.productItems.filter({
      has: page.getByTestId('card-info'),
    });
    const items = await withInfo.all();
    return Promise.all(
      items.map(item => new ProductCard(item).getInfo())
    );
  }
}
