import { Page, expect } from '@playwright/test';
import BasePage from '../../pages/BasePage';
import Header from './components/Header';
import ScrollToTopButton from './components/ScrollToTopButton';
import LoginModal from './components/LoginModal';
import CookieModal1 from './components/CookieModal1';
import CookieModal2 from './components/CookieModal2';
import AccountModal from './components/AccountModal';
import { config } from '../../utils/config';

export default class HomePage extends BasePage {
  private mainLogoButton = this.page.locator('div.logotype');
  public readonly scrollToTop: ScrollToTopButton;
  public readonly header: Header;
  public readonly loginModal: LoginModal;
  public readonly cookieModal1: CookieModal1;
  public readonly cookieModal2: CookieModal2;
  public readonly accountModal: AccountModal;

  constructor(page: Page) {
    super(page);
    this.scrollToTop = new ScrollToTopButton(page.locator('button.style_upButton__MUSza'));
    this.header = new Header(page.locator('.styles_headerReactWrapper__TTCde'));
    this.loginModal = new LoginModal(page.getByTestId('modal'));
    this.cookieModal1 = new CookieModal1(page.locator('#modal-cookie'));
    this.cookieModal2 = new CookieModal2(page.getByTestId('modal'));
    this.accountModal = new AccountModal(page.getByTestId('userToolsDropDown'));
  }

  async clickMainLogoButton() {
    await this.mainLogoButton.click();
  }

  async loginViaUI(email = config.credentials.valid.email, password = config.credentials.valid.password) {
    await this.goto(config.baseURL);
    await this.page.waitForLoadState();
    await this.cookieModal1.reject();
    await this.cookieModal2.reject();
    await (await this.header.getAccountModal()).click();
    await this.accountModal.clickLoginButton();
    await expect(await this.loginModal.getModal()).toBeVisible();
    await this.loginModal.login(email, password);
    await expect(await this.loginModal.getModal()).toBeHidden();
  }
}