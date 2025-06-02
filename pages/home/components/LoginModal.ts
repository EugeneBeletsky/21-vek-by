import BaseComponent from '../../components/BaseComponent';
import { Page, Locator } from '@playwright/test';

export default class LoginModal extends BaseComponent {
  private modalSelector = this.page.getByTestId('modal');
  private emailInput = this.page.getByTestId('login-form-email');
  private passwordInput = this.page.getByTestId('login-form-password');
  private submitButton = this.page.getByTestId('loginSubmit');
  private closeButton = this.page.getByTestId('modalClose');
  private errorMessage = this.page.locator('.ErrorMessage-module__message');
  private modalLoader = this.page.getByTestId('loader');
  

  constructor(page: Page) {
    super(page);
  }

  async getModal(): Promise<Locator> {
    return this.modalSelector;
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submit();
    await this.waitForLoaderDisappear();
  }

  async close() {
    await this.closeButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    if (await this.errorMessage.isVisible()) {
      return this.errorMessage.textContent();
    }
    return null;
  }

  async waitForLoaderDisappear() {
    let loader = this.modalLoader;
    if (await loader.isVisible()) {
      await loader.waitFor({ state: 'hidden' });
    }
  }
} 