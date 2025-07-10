import BaseComponent from '../../components/BaseComponent';
import { Locator } from '@playwright/test';

export default class LoginModal extends BaseComponent {
  private modalContainer = this.element.locator('.LoginForm_container__6zfxM');
  private emailInput = this.element.getByTestId('login-form-email');
  private passwordInput = this.element.getByTestId('login-form-password');
  private submitButton = this.element.getByTestId('loginSubmit');
  private closeButton = this.element.getByTestId('modalClose');
  private errorMessage = this.element.locator('.ErrorMessage-module__message');
  private modalLoader = this.element.getByTestId('loader');
  

  constructor(element: Locator) {
    super(element);
  }

  async getModal(): Promise<Locator> {
    return this.modalContainer;
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