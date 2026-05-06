import BaseComponent from '../../components/BaseComponent';
import { expect } from '@playwright/test';

export default class ScrollToTopButton extends BaseComponent {
  private readonly label = this.element.locator('.style_upButtonLabel__LPAA4');

  async click(): Promise<void> {
    await this.element.click();
  }

  async getLabelText(): Promise<string | null> {
    return this.label.textContent();
  }

  async expectVisible(): Promise<void> {
    await expect(this.element).toBeVisible();
  }

  async expectHidden(): Promise<void> {
    await expect(this.element).toBeHidden();
  }
}
