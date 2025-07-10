import BaseComponent from '../../components/BaseComponent';
import { Locator } from '@playwright/test';

export default class CookieModal1 extends BaseComponent {
  public modalBlock = this.element.locator('.AgreementCookie_modal__x3nra');
  public rejectButton = this.element.locator('button.AgreementCookie_reject__f5oqP');
  public acceptButton = this.element.getByTestId('modal-confirmation-button');

  constructor(element: Locator) {
    super(element);
  }

  async isVisible(): Promise<boolean> {
    return this.modalBlock.isVisible({ timeout: 5000 });
  }

  async reject() {
    if (await this.isVisible()) {
      await this.rejectButton.click();
    }
  }

  async accept() {
    if (await this.isVisible()) {
      await this.acceptButton.click();
    }
  }
}
