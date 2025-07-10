import BaseComponent from '../../components/BaseComponent';
import { Locator } from '@playwright/test';

export default class AccountModal extends BaseComponent {
  private userToolsToggler = this.element.locator('button.styles_userToolsToggler__c2aHe');
  private loginButton = this.element.getByTestId('loginButton');
  private accountButtons = this.element.locator('div.ProfileItem_item__ETAVi');

  constructor(element: Locator) {
    super(element);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async getLoginButton() {
    return this.loginButton;
  }

  async getAccountButtonByText(text: string) {
    return this.accountButtons.filter({ hasText: text });
  }
} 