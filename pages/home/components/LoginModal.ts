import BaseComponent from '../../components/BaseComponent';
import { Locator, expect } from '@playwright/test';
import { User } from '../../../types/User';

export default class LoginModal extends BaseComponent {
  private readonly modalContainer = this.element.locator('.LoginForm_container__6zfxM');
  private readonly emailInput = this.element.getByTestId('login-form-email');
  private readonly passwordInput = this.element.getByTestId('login-form-password');
  private readonly submitButton = this.element.getByTestId('loginSubmit');
  private readonly closeButton = this.element.getByTestId('modalClose');
  private readonly errorMessage = this.element.locator('.ErrorMessage-module__message');
  private readonly loader = this.element.getByTestId('loader');

  constructor(element: Locator) {
    super(element);
  }

  // --- Actions ---

  async login(user: User): Promise<void> {
    await this.emailInput.fill(user.email as string);
    await this.passwordInput.fill(user.password as string);
    await this.submitButton.click();
    await this.waitForLoaderHidden();
  }

  async close(): Promise<void> {
    if (await this.closeButton.isVisible()) {
      await this.closeButton.click();
    }
  }

  // --- Assertions ---

  async expectVisible(): Promise<void> {
    await expect(this.modalContainer).toBeVisible();
  }

  async expectHidden(): Promise<void> {
    await expect(this.modalContainer).toBeHidden();
  }

  async expectErrorMessage(text?: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    if (text) {
      await expect(this.errorMessage).toHaveText(text);
    }
  }

  async getErrorMessageText(): Promise<string | null> {
    if (await this.errorMessage.isVisible()) {
      return this.errorMessage.textContent();
    }
    return null;
  }

  // --- Private helpers ---

  private async waitForLoaderHidden(): Promise<void> {
    if (await this.loader.isVisible()) {
      await this.loader.waitFor({ state: 'hidden' });
    }
  }
}
