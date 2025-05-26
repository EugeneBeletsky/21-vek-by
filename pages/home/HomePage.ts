// pages/HomePage.ts
import { Page } from '@playwright/test';
import BasePage from '../../pages/BasePage';
import Header from './components/Header';
import ScrollToTopButton from './components/ScrollToTopButton';


export default class HomePage extends BasePage {
  public readonly scrollToTop: ScrollToTopButton;
  public readonly header: Header;

  constructor(page: Page) {
    super(page);
    this.scrollToTop = new ScrollToTopButton(page);
    this.header = new Header(page);
  }
}