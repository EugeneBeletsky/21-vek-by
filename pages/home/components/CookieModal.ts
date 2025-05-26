import BaseComponent from '../../components/BaseComponent';
import { Page } from '@playwright/test';

export default class CookieModal extends BaseComponent {
  private modalSelector = this.page.locator('#modal-cookie');
  private rejectButton = this.page.locator('button.AgreementCookie_reject__f5oqP');
  private rejectButton2 = this.page.locator('.Button-module__button.Button-module__gray-secondary');

  constructor(page: Page) {
    super(page);
  }

  async isVisible(): Promise<boolean> {
    return this.modalSelector.isVisible();
  }

  async reject() {
    if (await this.isVisible()) {
      await this.rejectButton.click();
      await this.page.waitForTimeout(200);
      await this.rejectButton2.click();
    }
  }
} 