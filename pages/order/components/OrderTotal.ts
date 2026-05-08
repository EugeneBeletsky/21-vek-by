import BaseComponent from '../../components/BaseComponent';
import { Locator, expect } from '@playwright/test';
import { parsePrice } from '../../../utils/parsePrice';

export class OrderTotal extends BaseComponent {
  private readonly it = this.element.getByTestId('order-total-container');
  private readonly totalPrice = this.element.getByTestId('total-price');
  private readonly totalSummaryPrice = this.element.getByTestId('total-summary').locator('div');
  private readonly totalSummaryCount = this.element.getByTestId('total-summary').locator('span');
  private readonly totalDiscount = this.element.getByTestId('total-discount');
  private readonly bonuses = this.element.getByTestId('bonuses');
  private readonly basketConfirmationButton = this.element.getByTestId('basketConfirmation');

  constructor(element: Locator) {
    super(element);
  }

  // --- Actions ---

  async confirmOrder(): Promise<void> {
    await this.basketConfirmationButton.click();
  }

  // --- Getters ---


  async getTotalPrice(): Promise<number> {
    return parsePrice(await this.totalPrice.textContent());
  }

  async geTotalSummaryPrice(): Promise<number> {
    return parsePrice(await this.totalSummaryPrice.textContent());
  }

  async geTotalSummaryCount(): Promise<number> {
    return parsePrice(await this.totalSummaryCount.nth(0).textContent());
  }

  async getTotalDiscount(): Promise<number> {
    return parsePrice(await this.totalDiscount.textContent());
  }

  async getBonuses(): Promise<number> {
    return parsePrice(await this.bonuses.textContent());
  }

  // --- Assertions ---

  async expectTotalPrice(expected: number): Promise<void> {
    const price = await this.getTotalPrice();
    expect(price).toBe(expected);
  }

  async expectVisible(): Promise<void> {
    await expect(this.element).toBeVisible();
  }

  async expectHidden(): Promise<void> {
    await expect(this.element).toBeHidden();
  }
}