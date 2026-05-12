import { Locator, expect } from '@playwright/test';
import BaseComponent from '../../components/BaseComponent';

export class PrivacyAgreementModal extends BaseComponent {
  private readonly closeButton = this.element.getByTestId('modalClose');
  private readonly actionButtons = this.element.locator('button').filter({ hasText: /.+/ });
  private readonly declineButton = this.actionButtons.first();
  private readonly agreeButton = this.actionButtons.last();

  constructor(element: Locator) {
    super(element);
  }

  // --- Actions ---

  async decline(): Promise<void> {
    await this.declineButton.click();
  }

  async close(): Promise<void> {
    await this.closeButton.click();
  }

  async declineIfVisible(timeout = 5_000): Promise<boolean> {
    try {
      await this.element.waitFor({ state: 'visible', timeout });
    } catch {
      return false;
    }

    await this.decline();
    return true;
  }

  // --- Assertions ---

  async expectReady(): Promise<void> {
    await expect(this.element).toBeVisible();
    await expect(this.declineButton).toBeVisible();
    await expect(this.agreeButton).toBeVisible();
  }
}
