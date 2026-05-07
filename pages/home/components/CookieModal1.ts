import { Locator } from '@playwright/test';
import { BaseCookieModal } from './BaseCookieModal';

export default class CookieModal1 extends BaseCookieModal {
  protected readonly modalBlock = this.element.locator('.AgreementCookie_modal__x3nra');
  protected readonly rejectButton = this.element.locator('button.AgreementCookie_reject__f5oqP');
  protected readonly acceptButton = this.element.getByTestId('modal-confirmation-button');

  constructor(element: Locator) {
    super(element);
  }
}
