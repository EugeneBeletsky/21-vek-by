import BaseComponent from '../../components/BaseComponent';
import { Page} from '@playwright/test';

export default class AccountModal extends BaseComponent {
  private userToolsToggler = this.page.locator('button.styles_userToolsToggler__c2aHe');
  private loginButton = this.page.getByTestId('loginButton');
  private accountButtons = this.page.locator('div.ProfileItem_item__ETAVi');

  constructor(page: Page) {
    super(page);
  }

  async openAccountModal() {
    await this.userToolsToggler.click();
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