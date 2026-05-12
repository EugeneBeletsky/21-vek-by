import { Locator, expect } from '@playwright/test';
import BaseComponent from '../../components/BaseComponent';
import { parsePrice } from '../../../utils/parsePrice';

export class DeliveryPage extends BaseComponent {
  private readonly submitButton = this.element.getByTestId('delivery-submit');
  private readonly footerPrice = this.element.getByTestId('footer-price');
  private readonly courierDeliveryButton = this.element.locator('button').filter({
    hasText: 'Курьером',
    hasNotText: 'в ваше время',
  });
  private readonly deliveryNotSelectedMessage = this.element.getByText('Способ доставки не указан');

  constructor(element: Locator) {
    super(element);
  }

  // --- Actions ---

  async continueToPayment(): Promise<void> {
    if (await this.deliveryNotSelectedMessage.isVisible().catch(() => false)) {
      await this.courierDeliveryButton.click();
    }

    await this.submitButton.click();
  }

  // --- Getters ---

  async getFooterPrice(): Promise<number> {
    return parsePrice(await this.footerPrice.textContent());
  }

  // --- Assertions ---

  async expectReady(): Promise<void> {
    await expect(this.element).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.footerPrice).toBeVisible();
  }
}
