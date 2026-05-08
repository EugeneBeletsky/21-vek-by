import BaseComponent from '../../components/BaseComponent';
import { Locator, expect } from '@playwright/test';

export class OrderPromocode extends BaseComponent {
  private readonly promocodePlaceholder = this.element.getByRole('textbox', {name: 'Введите промокод'});
  private readonly promocodeConfirmationButton = this.element.getByTestId('promocodeConfirmation');
  private readonly errorMessagePromocode = this.element.locator('.ErrorMessage-module__message');


  constructor(element: Locator) {
    super(element);
  }

  // --- Actions ---

  async fillPromocode(promocode:string): Promise<void> {
    await this.promocodePlaceholder.fill(promocode);
  }

  async confirmPromocode(): Promise<void> {
    await this.promocodeConfirmationButton.click();
  }

  // --- Getters ---




  // --- Assertions ---

  async expectErrorMessagePromocode(text: string): Promise<void> {
    await expect(this.errorMessagePromocode).toContainText(text);
  }

  async expectVisible(): Promise<void> {
    await expect(this.element).toBeVisible();
  }

  async expectHidden(): Promise<void> {
    await expect(this.element).toBeHidden();
  }
}