import BaseComponent from '../../components/BaseComponent';
import { Locator } from '@playwright/test';

export default class CookieModal2 extends BaseComponent {
  public modalBlock = this.element.locator('.ModalDesktop-module__modalContent');
  public rejectButton2 = this.element.locator('.Button-module__button.Button-module__gray-secondary');

  constructor(element: Locator) {
    super(element);
  }

  async isVisible(): Promise<boolean> {
    return this.modalBlock.isVisible({ timeout: 5000 });
  }

  async reject() {
    if (await this.isVisible()) {
      await this.rejectButton2.click();
    }
  }
}
