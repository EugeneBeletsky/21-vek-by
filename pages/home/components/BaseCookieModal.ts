import BaseComponent from '../../components/BaseComponent';
import { Locator } from '@playwright/test';

/**
 * Base class for cookie consent modals.
 * Subclasses provide their own locators via abstract getters.
 */
export abstract class BaseCookieModal extends BaseComponent {
  protected abstract readonly modalBlock: Locator;
  protected abstract readonly rejectButton: Locator;
  protected abstract readonly acceptButton: Locator;

  constructor(element: Locator) {
    super(element);
  }

  private async isModalVisible(timeout = 5_000): Promise<boolean> {
    try {
      await this.modalBlock.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  async reject(): Promise<void> {
    if (await this.isModalVisible()) {
      await this.rejectButton.click();
      await this.modalBlock.waitFor({ state: 'hidden' });
    }
  }

  async accept(): Promise<void> {
    if (await this.isModalVisible()) {
      await this.acceptButton.click();
      await this.modalBlock.waitFor({ state: 'hidden' });
    }
  }
}
