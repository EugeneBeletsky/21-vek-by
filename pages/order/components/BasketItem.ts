import BaseComponent from '../../components/BaseComponent';
import { Locator, expect } from '@playwright/test';
import { parsePrice } from '../../../utils/parsePrice';

export class BasketItem extends BaseComponent {
  private readonly title = this.element.locator('.BasketItem_title__MzCQ9');
  private readonly counter = this.element.locator('.Counter_counterInput__idJlc');
  private readonly increaseButton = this.element.getByLabel('Увеличение количества');
  private readonly decreaseButton = this.element.getByLabel('Уменьшение количества');
  private readonly oldPriceEl = this.element.locator('.PriceBlock_priceBlock__bLP4B.BasketItem_grossPrice__Edp__');
  private readonly currentPriceEl = this.element.locator('.PriceBlock_priceBlock__bLP4B');
  private readonly discountEl = this.element.locator('.BasketItem_promotion__Rh5_x.Text-module__text.Text-module__tiny');
  private readonly removeButton = this.element.getByLabel('Удалить товар');
  private readonly favoritesButton = this.element.getByLabel('Избранное');

  constructor(element: Locator) {
    super(element);
  }

  // --- Actions ---

  async increaseCount(): Promise<void> {
    await this.increaseButton.click();
  }

  async decreaseCount(): Promise<void> {
    await this.decreaseButton.click();
  }

  async remove(): Promise<void> {
    await this.removeButton.click();
  }

  async addToFavorites(): Promise<void> {
    await this.favoritesButton.click();
  }

  // --- Getters ---

  async getTitle(): Promise<string | null> {
    return this.title.textContent();
  }

  async getPrice(): Promise<number> {
    return parsePrice(await this.currentPriceEl.nth(1).textContent());
  }

  async getOldPrice(): Promise<number> {
    return parsePrice(await this.oldPriceEl.textContent());
  }

  async getDiscount(): Promise<number> {
    return parsePrice(await this.discountEl.textContent());
  }

  async getCounterValue(): Promise<number> {
    const value = await this.counter.inputValue();
    return Number(value);
  }

  // --- Assertions ---

  async expectTitle(text: string): Promise<void> {
    await expect(this.title).toContainText(text);
  }

  async expectCounterValue(expected: number): Promise<void> {
    await expect(this.counter).toHaveValue(String(expected));
  }

  async expectVisible(): Promise<void> {
    await expect(this.element).toBeVisible();
  }

  async expectHidden(): Promise<void> {
    await expect(this.element).toBeHidden();
  }
}