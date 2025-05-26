// pages/components/ScrollToTopButtonComponent.ts
import { Page } from '@playwright/test';

export default class ScrollToTopButton {
  constructor(private page: Page) {}

  private buttonSelector = 'button.style_upButton__MUSza';
  private labelSelector = '.style_upButtonLabel__LPAA4';

  async isVisible(): Promise<boolean> {
    return this.page.locator(this.buttonSelector).isVisible();
  }

  async click() {
    await this.page.click(this.buttonSelector);
  }

  async getLabel(): Promise<string> {
    return this.page.locator(this.labelSelector).innerText();
  }
}
