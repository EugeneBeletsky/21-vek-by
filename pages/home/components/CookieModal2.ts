import { Locator } from '@playwright/test';
import { BaseCookieModal } from './BaseCookieModal';

export default class CookieModal2 extends BaseCookieModal {
  protected readonly modalBlock = this.element.locator('.ModalDesktop-module__modalContent');
  protected readonly rejectButton = this.element.locator('.Button-module__button.Button-module__gray-secondary');
  protected readonly acceptButton = this.element.getByTestId('modal-confirmation-button');

  constructor(element: Locator) {
    super(element);
  }
}
