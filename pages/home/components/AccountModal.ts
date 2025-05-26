import BaseComponent from '../../components/BaseComponent';
import { Page } from '@playwright/test';

export default class AccountModal extends BaseComponent {
  private userToolsToggler = this.page.locator('button.styles_userToolsToggler__c2aHe');
  private loginButton = this.page.getByTestId('loginButton');

  constructor(page: Page) {
    super(page);
  }

  async openAccountModal() {
    await this.userToolsToggler.click();
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
} 