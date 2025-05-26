// pages/HomePage.ts
import { Page } from '@playwright/test';
import BasePage from '../../pages/BasePage';
import Header from './components/Header';
import ScrollToTopButton from './components/ScrollToTopButton';
import LoginModal from './components/LoginModal';
import CookieModal from './components/CookieModal';
import AccountModal from './components/AccountModal';


export default class HomePage extends BasePage {
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


}