import BaseComponent from '../../components/BaseComponent';
import { Locator } from '@playwright/test';

export default class AccountModal extends BaseComponent {
  private readonly loginButton = this.element.getByTestId('loginButton');
  private readonly cartButton = this.element.getByRole('link', { name: 'Корзина' });
  private readonly premiumButton = this.element.getByRole('link', { name: '21vek.by Premium' });
  private readonly savedButton = this.element.getByRole('link', { name: 'Избранные товары' });
  private readonly compareButton = this.element.getByRole('link', { name: 'Списки сравнения' });
  private readonly payPartialButton = this.element.getByRole('link', { name: 'Оплата частями' });
  private readonly watchedButton = this.element.getByRole('link', { name: 'Просмотренные' });
  private readonly logoutButton = this.element.getByRole('link', { name: 'Выход' });

  constructor(element: Locator) {
    super(element);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async clickCart(): Promise<void> {
    await this.cartButton.click();
  }

  async clickSaved(): Promise<void> {
    await this.savedButton.click();
  }

  async clickCompare(): Promise<void> {
    await this.compareButton.click();
  }

  async clickWatched(): Promise<void> {
    await this.watchedButton.click();
  }

  async clickLogout(): Promise<void> {
    await this.logoutButton.click();
  }

  async expectVisible(): Promise<void> {
    await super.expectVisible();
  }

  async expectLoginButtonVisible(): Promise<void> {
    await super.expectVisible();
  }
}
