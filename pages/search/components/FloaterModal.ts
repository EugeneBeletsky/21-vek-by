import BaseComponent from '../../components/BaseComponent';
import { Locator, expect } from '@playwright/test';

export class FloaterModal extends BaseComponent {
  private readonly acceptButton: Locator;

  constructor(element: Locator) {
    super(element);
    this.acceptButton = element.page().getByRole('button', { name: 'Понятно' });
  }

  // --- Actions ---

  async acceptModal(): Promise<void> {
    await this.acceptButton.click();
  }

  async acceptIfVisible(timeout = 2_000): Promise<void> {
    const isVisible = await this.acceptButton
      .waitFor({ state: 'visible', timeout })
      .then(() => true)
      .catch(() => false);

    if (!isVisible) {
      return;
    }

    await this.acceptButton.click();
    await this.acceptButton.waitFor({ state: 'hidden', timeout: 5_000 }).catch(() => undefined);
  }

  // --- Assertions ---

  async expectVisible(): Promise<void> {
    await expect(this.element).toBeVisible();
  }
}
