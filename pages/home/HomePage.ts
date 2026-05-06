import { Page } from '@playwright/test';
import BasePage from '../../pages/BasePage';
import Header from './components/Header';
import ScrollToTopButton from './components/ScrollToTopButton';
import LoginModal from './components/LoginModal';
import CookieModal1 from './components/CookieModal1';
import CookieModal2 from './components/CookieModal2';
import AccountModal from './components/AccountModal';
import { config } from '../../utils/config';
import { User } from '../../types/User';

export default class HomePage extends BasePage {
  private readonly mainLogo = this.page.locator('div.logotype');

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

  async open(): Promise<void> {
    await this.goto(config.baseURL);
  }

  async dismissCookies(): Promise<void> {
    await this.cookieModal1.reject();
    await this.cookieModal2.reject();
  }

  async clickLogo(): Promise<void> {
    await this.mainLogo.click();
  }

  /**
   * Full UI login flow from home page.
   * Uses provided user credentials — does NOT fall back to config internally.
   */
  async loginViaUI(user: User): Promise<void> {
    await this.open();
    await this.dismissCookies();
    await this.header.openAccountMenu();
    await this.accountModal.clickLogin();
    await this.loginModal.expectVisible();
    await this.loginModal.login(user);
    await this.loginModal.expectHidden();
    await this.loginModal.close();
  }
}
