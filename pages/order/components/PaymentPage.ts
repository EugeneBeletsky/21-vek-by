import { Locator, expect } from '@playwright/test';
import BaseComponent from '../../components/BaseComponent';
import { parsePrice } from '../../../utils/parsePrice';

export class PaymentPage extends BaseComponent {
  private readonly submitButton = this.element.getByTestId('payment-submit');
  private readonly footerPrice = this.element.getByTestId('footer-price');
  private readonly cardSaveToggle = this.element.getByTestId('card-save-toggle');

  constructor(element: Locator) {
    super(element);
  }

  // --- Actions ---

  async submitOnlinePayment(): Promise<void> {
    await this.submitButton.click();
  }

  // --- Getters ---

  async getFooterPrice(): Promise<number> {
    return parsePrice(await this.footerPrice.textContent());
  }

  // --- Assertions ---

  async expectReady(): Promise<void> {
    await expect(this.element).toBeVisible();
    await expect(this.cardSaveToggle).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.footerPrice).toBeVisible();
  }
}
