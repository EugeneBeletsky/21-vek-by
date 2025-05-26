// pages/components/ScrollToTopButtonComponent.ts
import { Page } from '@playwright/test';
import BaseComponent from '../../components/BaseComponent';

export default class ScrollToTopButton extends BaseComponent {
  private buttonSelector = this.page.locator('button.style_upButton__MUSza');
  private labelSelector = this.page.locator('.style_upButtonLabel__LPAA4');

  constructor(page: Page) {
    super(page);
  }

  async isVisible(): Promise<boolean> {
    return this.buttonSelector.isVisible();
  }

  async click() {
    await this.buttonSelector.click();
  }

  async getLabel(): Promise<string | null> {
    return this.labelSelector.textContent();
  }
}
