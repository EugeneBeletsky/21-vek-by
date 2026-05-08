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
  private readonly promocodePlaceholder = this.element.getByPlaceholder('Введите промокод');
  private readonly promocodeConfirmationButton = this.element.getByTestId('promocodeConfirmation');
  private readonly errorMessagePromocode = this.element.locator('.ErrorMessage-module__message');


  constructor(element: Locator) {
    super(element);
  }

  // --- Actions ---

  async fillPromocode(promocode:string): Promise<void> {
    await this.promocodePlaceholder.fill(promocode);
  }

  async confirmOrder(): Promise<void> {
    await this.basketConfirmationButton.click();
  }

  async confirmPromocode(): Promise<void> {
    await this.promocodeConfirmationButton.click();
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

  async expecErrorMessagePromocode(text: string): Promise<void> {
    await expect(this.errorMessagePromocode).toContainText(text);
  }

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