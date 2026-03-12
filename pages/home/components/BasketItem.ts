import BaseComponent from '../../components/BaseComponent';
import { Locator } from '@playwright/test';

export class BasketItem extends BaseComponent {
  readonly title = this.element.locator('.BasketItem_title__MzCQ9');
  readonly counter = this.element.locator('.Counter_counterInput__idJlc');
  readonly increaseCount = this.element.getByLabel('Увеличение количества');
  readonly decreaseCount = this.element.getByLabel('Уменьшение количества');
  readonly oldPrice = this.element.locator('.PriceBlock_priceBlock__bLP4B.BasketItem_grossPrice__Edp__');
  readonly currentPrice = this.element.locator('.PriceBlock_priceBlock__bLP4B');
  readonly discount = this.element.locator('.BasketItem_promotion__Rh5_x.Text-module__text.Text-module__tiny');
  readonly removeButton = this.element.getByLabel('Удалить товар');
  readonly addToFavorites2 = this.element.getByLabel('Избранное');

  constructor(element: Locator) {
    super(element);
  }

  async getTitle(): Promise<string | null> {
    return this.title.textContent();
  }

  async getPrice(): Promise<number> {
    const text = await this.currentPrice.nth(1).textContent();
    return Number(text?.replace(/[^\d,]/g, '').replace(',', '.'));
  }

  async getOldPrice(): Promise<number> {
    const text = await this.oldPrice.textContent();
    return Number(text?.replace(/[^\d,]/g, '').replace(',', '.'));
  }

  async getDiscount(): Promise<number> {
    const text = await this.discount.textContent();
    return Number(text?.replace(/[^\d,]/g, '').replace(',', '.'));
  }

  async getCounter(): Promise<any> {
    return this.counter.inputValue();
  }

  async increaseCounter(): Promise<void> {
    await this.increaseCount.click();
  }

  async decreaseCounter(): Promise<void> {
    await this.decreaseCount.click();
  }

  async removeItem(): Promise<void> {
    await this.removeButton.click();
  }

  async addToFavorites(): Promise<void> {
    await this.addToFavorites2.click();
  }
}
