import BaseComponent from '../../components/BaseComponent';
import { BasketItem } from './BasketItem';
import { Locator } from '@playwright/test';

export class BasketItemList extends BaseComponent {
  private productItems = this.element.getByTestId('basket-item');

  constructor(element: Locator) {
    super(element);
  }

  async waitForResults(timeout = 10000): Promise<void> {
    await this.element.waitFor({ state: 'visible', timeout });
  }

  getItem(index: number): BasketItem {
    return new BasketItem(this.productItems.nth(index));
  }

  getItemByName(name: string): BasketItem {
    return new BasketItem(this.productItems.filter({ hasText: name }));
  }

  async getItemCount(): Promise<number> {
    return this.productItems.count();
  }

  async getAllItems(): Promise<BasketItem[]> {
    const items = await this.productItems.all();
    return items.map(locator => new BasketItem(locator));
  }
}

