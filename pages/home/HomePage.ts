// pages/HomePage.ts
import { Page, expect } from '@playwright/test';
import BasePage from '../../pages/BasePage';
import Header from './components/Header';
import ScrollToTopButton from './components/ScrollToTopButton';
import LoginModal from './components/LoginModal';
import CookieModal from './components/CookieModal';
import AccountModal from './components/AccountModal';
import { config } from '../../utils/config';

export default class HomePage extends BasePage {
  private mainLogoButton = this.page.locator('div.logotype');
  public readonly scrollToTop: ScrollToTopButton;
  public readonly header: Header;
  public readonly loginModal: LoginModal;
  public readonly cookieModal: CookieModal;
  public readonly accountModal: AccountModal;

  constructor(page: Page) {
    super(page);
    this.scrollToTop = new ScrollToTopButton(page);
    this.header = new Header(page);
    this.loginModal = new LoginModal(page);
    this.cookieModal = new CookieModal(page);
    this.accountModal = new AccountModal(page);
  }

  async clickMainLogoButton() {
    await this.mainLogoButton.click();
  }

  async loginViaUI(email = config.credentials.valid.email, password = config.credentials.valid.password) {
    await this.goto(config.baseURL);
    await this.cookieModal.reject();
    await this.accountModal.openAccountModal();
    await this.accountModal.clickLoginButton();
    await expect(await this.loginModal.getModal()).toBeVisible();
    await this.loginModal.login(email, password);
    await expect(await this.loginModal.getModal()).toBeHidden();
  }


}