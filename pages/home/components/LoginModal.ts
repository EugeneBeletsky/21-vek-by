import BaseComponent from '../../components/BaseComponent';
import { Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

export interface User {
  email?: string | undefined | null | boolean | number | object;
  password?: string | undefined | null | boolean | number | object;
}

export default class LoginModal extends BaseComponent {
  private modalContainer = this.element.locator('.LoginForm_container__6zfxM');
  private emailInput = this.element.getByTestId('login-form-email');
  private passwordInput = this.element.getByTestId('login-form-password');
  private submitButton = this.element.getByTestId('loginSubmit');
  private closeButton = this.element.getByTestId('modalClose');
  private errorMessage = this.element.locator('.ErrorMessage-module__message');
  private modalLoader = this.element.getByTestId('loader');
  private modalClose = this.element.getByTestId('modalClose');

  constructor(element: Locator) {
    super(element);
  }

  async getModal(): Promise<Locator> {
    return this.modalContainer;
  }

  async getErrorMessage(): Promise<Locator> {
    return this.errorMessage;
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

  async login(user: User) {
    await this.fillEmail(user.email as string);
    await this.fillPassword(user.password as string);
    await this.submit();
    await this.waitForLoaderDisappear();
  }

  async generateRandomUser(): Promise<User> {
    return {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }

  async generateRandomEmail(): Promise<string> {
    return faker.internet.email();
  }

  async generateRandomPassword(): Promise<string> {
    return faker.internet.password();
  }

  async close() {
    await this.closeButton.click();
  }

  async getErrorMessageText(): Promise<string | null> {
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

  async closeModal() {
    if (await this.modalClose.isVisible()) {
      await this.modalClose.click();
    }
  }
} 