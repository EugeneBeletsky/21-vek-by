import BaseComponent from '../../components/BaseComponent';
import { Locator } from '@playwright/test';

export default class CookieModal1 extends BaseComponent {
  public modalBlock = this.element.locator('.AgreementCookie_modal__x3nra');
  public rejectButton = this.element.locator('button.AgreementCookie_reject__f5oqP');
  public acceptButton = this.element.getByTestId('modal-confirmation-button');

  constructor(element: Locator) {
    super(element);
  }

  async waitForModal(timeout = 5000): Promise<boolean> {
    try {
      await this.modalBlock.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  async reject() {
    if (await this.waitForModal()) {
      await this.rejectButton.click();
      await this.modalBlock.waitFor({ state: 'hidden' });
    }
  }

  async accept() {
    if (await this.waitForModal()) {
      await this.acceptButton.click();
      await this.modalBlock.waitFor({ state: 'hidden' });
    }
  }
}
